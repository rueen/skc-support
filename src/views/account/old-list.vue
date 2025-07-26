<!--
 * @Author: diaochan
 * @Date: 2025-04-07 09:00:00
 * @LastEditors: diaochan
 * @LastEditTime: 2025-07-26 17:52:55
 * @Description: FB老账号管理
-->

<template>
  <div class="content-container">
    <page-header
      :title="$t('account.list.oldAccount')"
      :back="true"
      style="margin-bottom: 0;"
    />
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('account.oldList.keyword')">
              <a-input
                v-model:value="searchForm.keyword"
                :placeholder="$t('account.oldList.keywordPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('account.oldList.member')">
              <a-select
                v-model:value="searchForm.memberId"
                :placeholder="$t('account.oldList.memberPlaceholder')"
                allow-clear
                show-search
                :filter-option="false"
                @search="loadMemberOptions"
              >
                <a-select-option
                  v-for="item in memberOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.nickname }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleSearch">{{ $t('common.search') }}</a-button>
                <a-button @click="handleReset">{{ $t('common.reset') }}</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-space>
            <a-upload
              name="file"
              :multiple="false"
              :showUploadList="false"
              :action="uploadConfig.action"
              :headers="uploadConfig.headers"
              :beforeUpload="beforeUpload"
              @success="handleUploadSuccess"
              @error="handleUploadError"
              accept=".xlsx,.xls"
            >
              <a-button>
                <upload-outlined />
                {{ $t('account.oldList.import') }}
              </a-button>
            </a-upload>
            <a-button type="primary" @click="showAddModal">
              <plus-outlined />
              {{ $t('account.oldList.add') }}
            </a-button>
          </a-space>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        rowKey="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'account'">
            <div>
              <div>{{ record.uid }}</div>
            </div>
          </template>
          <template v-if="column.key === 'nickname'">
            <div>{{ record.nickname }}</div>
          </template>
          <template v-if="column.key === 'homeUrl'">
            <CopyContent :content="record.homeUrl">
              <a-typography-link :href="record.homeUrl" target="_blank" style="max-width: 320px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                {{ record.homeUrl }}
              </a-typography-link>
            </CopyContent>
          </template>
          <template v-if="column.key === 'member'">
            <div>{{ record.memberNickname || '--' }}</div>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">{{ $t('account.oldList.edit') }}</a>
              <a-popconfirm
                :title="$t('account.oldList.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
                <a-typography-text type="danger">{{ $t('account.oldList.delete') }}</a-typography-text>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 添加/编辑账号弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      @ok="handleModalSubmit"
      :confirmLoading="modalLoading"
    >
      <a-form
        :model="formData"
        :rules="rules"
        ref="formRef"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item :label="$t('account.oldList.FBAccount')" name="uid">
          <a-input v-model:value="formData.uid" :placeholder="$t('account.oldList.FBAccountPlaceholder')" />
        </a-form-item>
        <a-form-item :label="$t('account.oldList.FBNickname')" name="nickname">
          <a-input v-model:value="formData.nickname" :placeholder="$t('account.oldList.FBNicknamePlaceholder')" />
        </a-form-item>
        <a-form-item :label="$t('account.oldList.FBHomepage')" name="homeUrl">
          <a-input v-model:value="formData.homeUrl" :placeholder="$t('account.oldList.FBHomepagePlaceholder')" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'
import CopyContent from '@/components/CopyContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import config from '@/config/env'
import { useI18n } from 'vue-i18n'

const loading = ref(false)
const formRef = ref(null)
const { t } = useI18n()

// 上传配置
const uploadConfig = {
  action: `${config.businessApiUrl}/old-accounts-fb/import`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

// 搜索表单
const searchForm = reactive({
  keyword: '',
  memberId: undefined
})

// 会员选项
const memberOptions = ref([])

// 表格列配置
const columns = computed(() => [
  {
    title: t('account.oldList.FBAccount'),
    key: 'account',
    dataIndex: 'uid'
  },
  {
    title: t('account.oldList.FBNickname'),
    key: 'nickname',
    dataIndex: 'nickname'
  },
  {
    title: t('account.oldList.FBHomepage'),
    key: 'homeUrl'
  },
  {
    title: t('account.oldList.linkedMember'),
    key: 'member'
  },
  {
    title: t('account.oldList.action'),
    key: 'action',
  }
])

// 表格数据
const tableData = ref([])
// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 弹窗相关
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalTitle = computed(() => formData.id ? t('account.oldList.editTitle') : t('account.oldList.addTitle'))

// 表单数据
const formData = reactive({
  id: null,
  uid: '',
  nickname: '',
  homeUrl: ''
})

// 表单校验规则
const rules = {
  uid: [{ required: true, message: t('account.oldList.FBAccountPlaceholder'), trigger: 'blur' }],
  nickname: [{ required: true, message: t('account.oldList.FBNicknamePlaceholder'), trigger: 'blur' }],
  homeUrl: [
    { required: true, message: t('account.oldList.FBHomepagePlaceholder'), trigger: 'blur' },
    { pattern: /^https?:\/\//, message: t('account.oldList.FBHomepagePlaceholder2'), trigger: 'blur' }
  ]
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await get('oldAccount.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm
    })
    if(res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// 重置表单
const resetForm = () => {
  formData.id = null
  formData.uid = ''
  formData.nickname = ''
  formData.homeUrl = ''
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 显示添加弹窗
const showAddModal = () => {
  resetForm()
  modalVisible.value = true
}

// 编辑账号
const handleEdit = (record) => {
  resetForm()
  Object.assign(formData, {
    id: record.id,
    uid: record.uid,
    nickname: record.nickname,
    homeUrl: record.homeUrl
  })
  modalVisible.value = true
}

// 删除账号
const handleDelete = async (record) => {
  try {
    const res = await del('oldAccount.delete', { id: record.id }, {
      urlParams: { id: record.id }
    })
    if (res.code === 0) {
      message.success('delete success')
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('delete failed')
  }
}

// 提交表单
const handleModalSubmit = () => {
  formRef.value.validate().then(async () => {
    modalLoading.value = true
    try {
      let res
      if (formData.id) {
        // 编辑
        res = await put('oldAccount.edit', formData, {
          urlParams: { id: formData.id }
        })
      } else {
        // 添加
        res = await post('oldAccount.add', formData)
      }

      if (res.code === 0) {
        message.success(formData.id ? 'edit success' : 'add success')
        modalVisible.value = false
        loadData()
      } else {
        message.error(res.message)
      }
    } finally {
      modalLoading.value = false
    }
  }).catch(error => {
    console.log('validate failed', error)
  })
}

// 上传前检查
const beforeUpload = (file) => {
  const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                  file.type === 'application/vnd.ms-excel'
  if (!isExcel) {
    message.error(t('account.oldList.uploadExcelError'))
    return false
  }
  
  // 提示用户Excel文件要求
  const key = 'importTip'
  message.loading({ content: t('account.oldList.uploadExcelLoading'), key })

  return true
}

// 上传成功
const handleUploadSuccess = (res) => {
  message.destroy('importTip')
  if (res.code === 0) {
    // 兼容新老接口格式
    const data = res.data || {}
    Modal.success({
      content: `import success: ${`total ${data.total || 0} data, imported ${data.imported || 0} data, skipped ${data.skipped || 0} data(Linked Member)`}`
    })
    loadData()
  } else {
    message.error(res.message || 'import failed')
  }
}

// 上传失败
const handleUploadError = (error) => {
  console.log(error)
  message.destroy('importTip')
  message.error('upload failed')
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.memberId = undefined
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, {
    current: pag.current,
    pageSize: pag.pageSize
  })
  loadData()
}

// 获取会员列表
const loadMemberOptions = async (keyword = '') => {
  try {
    const res = await get('member.list', {
      page: 1,
      pageSize: 50,
      memberNickname: keyword
    })
    if (res.code === 0) {
      memberOptions.value = res.data.list || []
    }
  } catch (error) {
    message.error('get member list failed')
  }
}

// 初始化
onMounted(() => {
  loadData()
  loadMemberOptions()
})
</script>

<style lang="less" scoped>

</style>
