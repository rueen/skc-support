<template>
  <div class="content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('group.groupName')">
              <a-input
                v-model:value="searchForm.groupName"
                :placeholder="$t('group.groupNamePlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('group.owner')">
              <a-select
                v-model:value="searchForm.ownerId"
                :placeholder="$t('group.ownerPlaceholder')"
                allow-clear
                show-search
                :filter-option="false"
                @search="loadMemberOptions"
              >
                <a-select-option v-for="item in memberOptions" :key="item.id" :value="item.id">
                  {{ item.memberNickname }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleSearch">
                  {{ $t('common.search') }}
                </a-button>
                <a-button @click="handleReset">
                  {{ $t('common.reset') }}
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon><plus-outlined /></template>
              {{ $t('group.add') }}
            </a-button>
          </a-space>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'memberCount'">
            {{ record.memberCount }}
            <a-typography-link @click="handleViewMember(record)">{{ $t('group.view') }}</a-typography-link>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">{{ $t('group.edit') }}</a>
              <a-popconfirm
                :title="$t('group.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
                <a-typography-text type="danger">{{ $t('group.delete') }}</a-typography-text>
              </a-popconfirm>
            </a-space>
          </template>
          <template v-else-if="column.key === 'groupLink'">
            <CopyContent :content="record.groupLink">
              <div class="link-text-container">
                <a :href="record.groupLink" target="_blank" class="link-text">{{ record.groupLink }}</a>
              </div>
            </CopyContent>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 添加/编辑/查看群弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      :confirmLoading="modalLoading"
      @ok="handleModalOk"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item :label="$t('group.groupName')" name="groupName">
          <a-input
            v-model:value="formData.groupName"
            :placeholder="$t('group.groupNamePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('group.groupLink')" name="groupLink">
          <a-input
            v-model:value="formData.groupLink"
            :placeholder="$t('group.groupLinkPlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('group.owner')" name="ownerId">
          <a-select
            v-model:value="formData.ownerId"
            :placeholder="$t('group.ownerPlaceholder')"
            allow-clear
            show-search
            :filter-option="false"
            @search="loadMemberOptions"
          >
            <a-select-option v-for="item in memberOptions" :key="item.id" :value="item.id">
              {{ item.nickname }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'
import { useRouter } from 'vue-router'
import CopyContent from '@/components/CopyContent.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit, view
const formRef = ref()

// 搜索表单
const searchForm = reactive({
  groupName: '',
  ownerId: undefined
})

// 表单数据
const formData = reactive({
  groupName: '',
  groupLink: '',
  ownerId: undefined
})
const currentId = ref(undefined)

// 表单校验规则
const rules = {
  groupName: [{ required: true, message: t('group.groupNameRequired') }],
  groupLink: [{ required: true, message: t('group.groupLinkRequired') }]
}

// 会员选项（群主）
const memberOptions = ref([])

// 表格列配置
const columns = computed(() => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100
  },
  {
    title: t('group.groupName'),
    dataIndex: 'groupName',
    key: 'groupName'
  },
  {
    title: t('group.groupLink'),
    dataIndex: 'groupLink',
    key: 'groupLink',
    ellipsis: true
  },
  {
    title: t('group.owner'),
    dataIndex: 'ownerName',
    key: 'ownerName'
  },
  {
    title: t('group.memberCount'),
    key: 'memberCount',
    align: 'right'
  },
  {
    title: t('group.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: t('group.action'),
    key: 'action',
    width: 200
  }
])

// 表格数据
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: t('group.addTitle'),
    edit: t('group.editTitle')
  }
  return titles[modalType.value]
})

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    name: '',
    ownerId: undefined
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 添加群
const handleAdd = () => {
  modalType.value = 'add'
  formData.groupName = ''
  formData.groupLink = ''
  formData.ownerId = undefined
  modalVisible.value = true
}

const handleViewMember = (record) => {
  router.push(`/member?groupId=${record.id}`)
}

// 编辑群
const handleEdit = (record) => {
  currentId.value = record.id
  modalType.value = 'edit'
  formData.groupName = record.groupName
  formData.groupLink = record.groupLink
  formData.ownerId = record.ownerId
  modalVisible.value = true
}

// 删除群
const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    const res = await del('group.delete', { id: record.id }, {
      urlParams: {
        id: record.id
      }
    }) 
    if(res.code === 0){
      message.success('删除成功')
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('删除失败')
  }
}

const addGroup = async () => {
  const res = await post('group.add', formData)
  if(res.code === 0){
    message.success('添加成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}
const editGroup = async () => {
  const res = await put('group.edit', formData, {
    urlParams: {
      id: currentId.value
    }
  })
  if(res.code === 0){
    message.success('编辑成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}
// 确认弹窗
const handleModalOk = async () => {
  try {
    await formRef.value.validate()
    modalLoading.value = true
    // TODO: 实现保存逻辑
    switch(modalType.value){
      case 'add':
        await addGroup()
        break
      case 'edit':
        await editGroup()
        break
    }
  } catch (error) {
    console.error(error)
  } finally {
    modalLoading.value = false
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    const res = await get('group.list', {
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

// 获取会员列表
const loadMemberOptions = async (keyword = '') => {
  try {
    // TODO: 实现获取会员列表逻辑
    const res = await get('member.list', {
      page: 1,
      pageSize: 50,
      memberNickname: keyword
    })  
    if(res.code === 0){
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
</style> 