<!--
 * @Author: diaochan
 * @Date: 2025-04-07 09:00:00
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-08 20:54:08
 * @Description: FB老账号管理
-->

<template>
  <div class="old-account content-container">
    <page-header
      title="FB老账号管理"
      :back="true"
      style="margin-bottom: 0;"
    />
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="搜索关键词">
              <a-input
                v-model:value="searchForm.keyword"
                placeholder="请输入账户/昵称/链接"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="关联会员">
              <a-select
                v-model:value="searchForm.memberId"
                placeholder="请选择关联会员"
                style="width: 120px"
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
                导入账号
              </a-button>
            </a-upload>
            <a-button type="primary" @click="showAddModal">
              <plus-outlined />
              添加账号
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
              <a :href="record.homeUrl" target="_blank" class="link-text" style="max-width: 200px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ record.homeUrl }}</a>
            </CopyContent>
          </template>
          <template v-if="column.key === 'member'">
            <div>{{ record.memberNickname || '--' }}</div>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除该账号吗？"
                @confirm="handleDelete(record)"
              >
                <a class="danger">删除</a>
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
      <a-form :model="formData" :rules="rules" ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="FB账户" name="uid">
          <a-input v-model:value="formData.uid" placeholder="请输入FB账户" />
        </a-form-item>
        <a-form-item label="FB昵称" name="nickname">
          <a-input v-model:value="formData.nickname" placeholder="请输入FB昵称" />
        </a-form-item>
        <a-form-item label="FB链接" name="homeUrl">
          <a-input v-model:value="formData.homeUrl" placeholder="请输入FB链接" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'
import CopyContent from '@/components/CopyContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import config from '@/config/env'

const loading = ref(false)
const formRef = ref(null)

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
const columns = [
  {
    title: 'FB账户',
    key: 'account',
    dataIndex: 'uid'
  },
  {
    title: 'FB昵称',
    key: 'nickname',
    dataIndex: 'nickname'
  },
  {
    title: 'FB链接',
    key: 'homeUrl'
  },
  {
    title: '关联会员',
    key: 'member'
  },
  {
    title: '操作',
    key: 'action'
  }
]

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
const modalTitle = computed(() => formData.id ? '编辑账号' : '添加账号')

// 表单数据
const formData = reactive({
  id: null,
  uid: '',
  nickname: '',
  homeUrl: ''
})

// 表单校验规则
const rules = {
  uid: [{ required: true, message: '请输入FB账户', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入FB昵称', trigger: 'blur' }],
  homeUrl: [
    { required: true, message: '请输入FB链接', trigger: 'blur' },
    { pattern: /^https?:\/\//, message: '请输入有效的链接，以http://或https://开头', trigger: 'blur' }
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
      message.success('删除成功')
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('删除失败')
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
        message.success(formData.id ? '编辑成功' : '添加成功')
        modalVisible.value = false
        loadData()
      } else {
        message.error(res.message)
      }
    } finally {
      modalLoading.value = false
    }
  }).catch(error => {
    console.log('验证失败', error)
  })
}

// 上传前检查
const beforeUpload = (file) => {
  const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                  file.type === 'application/vnd.ms-excel'
  if (!isExcel) {
    message.error('请上传Excel文件(.xlsx或.xls)')
    return false
  }
  
  // 提示用户Excel文件要求
  const key = 'importTip'
  message.loading({ content: '正在上传和处理Excel文件...', key })

  return true
}

// 上传成功
const handleUploadSuccess = (res) => {
  message.destroy('importTip')
  if (res.code === 0) {
    // 兼容新老接口格式
    const data = res.data || {}
    message.success(`导入成功：${res.message || `总计${data.total || 0}条数据，成功导入${data.imported || 0}条，跳过${data.skipped || 0}条`}`)
    loadData()
  } else {
    message.error(res.message || '导入失败')
  }
}

// 上传失败
const handleUploadError = (error) => {
  console.log(error)
  message.destroy('importTip')
  message.error('上传失败')
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
    message.error('获取会员列表失败')
  }
}

// 初始化
onMounted(() => {
  loadData()
  loadMemberOptions()
})
</script>

<style lang="less" scoped>
.old-account {
  .table-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
  }

  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .left {
      flex: 1;
    }
  }

  .danger {
    color: #ff4d4f;
  }

  .link-text {
    color: #1890ff;
  }
}
</style>
