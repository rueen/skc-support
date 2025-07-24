<!--
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-07-24 21:14:38
 * @Description: 
-->
<template>
  <div class="content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('task.search.taskGroupName')">
              <a-input
                v-model:value="searchForm.taskGroupName"
                :placeholder="$t('common.inputPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('task.search.taskName')">
              <a-input
                v-model:value="searchForm.taskName"
                :placeholder="$t('common.inputPlaceholder')"
                allow-clear
              />
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
            <a-button type="primary" @click="handleAdd">
              <template #icon><plus-outlined /></template>
              {{ $t('task.group.create') }}
            </a-button>
          </a-space>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        :showSorterTooltip="false"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'statistics'">
            {{ record.enrolledCount }}/{{ record.completedCount }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">{{ $t('common.edit') }}</a>
              <a-popconfirm
                :title="$t('common.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
              <a><a-typography-text type="danger">{{ $t('common.delete') }}</a-typography-text></a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { get, del } from '@/utils/request'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const loading = ref(false)
const { t } = useI18n()

// 搜索表单
const searchForm = reactive({
  taskGroupName: '',
  taskName: '',
})

// 表格列配置
const columns = computed(() => [
  {
    title: t('task.group.name'),
    dataIndex: 'taskGroupName',
    key: 'taskGroupName'
  },
  {
    title: t('task.group.statistics'),
    key: 'statistics'
  },
  {
    title: t('task.group.createTime'),
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: true,
  },
  {
    title: t('task.group.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime',
    sorter: true,
  },
  {
    title: t('common.operation'),
    key: 'action',
    fixed: 'right',
    width: 180
  }
])

// 表格数据
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})
const sorter = reactive({
  sorterField: undefined,
  sorterOrder: undefined
})

// 方法定义
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const handleReset = () => {
  searchForm.taskGroupName = ''
  searchForm.taskName = ''
  handleSearch()
}

const handleTableChange = (pag, filters, _sorter) => {
  Object.assign(pagination, pag)
  Object.assign(sorter, {
    sorterField: _sorter.field,
    sorterOrder: _sorter.order
  })
  loadData()
}

const handleAdd = () => {
  router.push('/taskGroup/create')
}

const handleEdit = (record) => {
  router.push(`/taskGroup/edit/${record.id}`)
}

const handleDelete = async (record) => {
  try {
    const res = await del('taskGroup.delete', {}, {
      urlParams: {
        id: record.id
      }
    })
    if(res.code === 0){
      message.success(t('common.deleteSuccess'))
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error(t('common.deleteFailed'))
  }
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await get('taskGroup.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm,
      ...sorter
    })
    if(res.code === 0){
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// const handleViewRelatedTasks = (record) => {
//   router.push(`/task?taskGroupId=${record.id}`)
// }

// 初始化
onMounted(async () => {
  loadData()
})
</script>

<style lang="less" scoped>

</style> 