<!--
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-07-27 15:16:53
 * @Description: 
-->
<template>
  <div class="content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('task.search.taskName')">
              <a-input
                v-model:value="searchForm.taskName"
                :placeholder="$t('common.inputPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('task.search.channelId')">
              <a-select
                v-model:value="searchForm.channelId"
                :placeholder="$t('common.selectPlaceholder')"
                allow-clear
              >
                <a-select-option
                  v-for="item in channelOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('task.search.taskStatus')">
              <a-select
                v-model:value="searchForm.taskStatus"
                :placeholder="$t('common.selectPlaceholder')"
                allowClear
              >
                <a-select-option 
                  v-for="option in taskStatusOptions" 
                  :key="option.value" 
                  :value="option.value"
                >
                  {{ option.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <!-- 任务组筛选 -->
            <a-form-item :label="$t('task.search.taskGroup')">
              <a-select
                v-model:value="searchForm.taskGroupId"
                :placeholder="$t('common.selectPlaceholder')"
                allowClear
                show-search
                :filter-option="false"
                @search="loadTaskGroupOptions"
              >
                <a-select-option 
                  v-for="option in taskGroupOptions" 
                  :key="option.id" 
                  :value="option.id"
                >
                  {{ option.taskGroupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <!--  -->
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
              {{ $t('task.list.create') }}
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
          <template v-if="column.key === 'taskName'">
            <a-space>
              <a-avatar :src="record.channelIcon" />
              {{ record.taskName }}
              <a-tag color="orange" v-if="record.taskGroup">{{ record.taskGroup.taskGroupName }}</a-tag>
            </a-space>
          </template>
          <template v-if="column.key === 'taskQuota'">
            <span v-if="record.unlimitedQuota">{{ $t('task.list.unlimited') }}</span>
            <span v-else>{{ record.quota }}</span>
            <span> / {{ record.submittedCount }}</span>
          </template>
          <template v-if="column.key === 'taskStatus'">
              {{ enumStore.getEnumText('TaskStatus', record.taskStatus) }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">{{ $t('task.list.edit') }}</a>
              <a-popconfirm
                :title="$t('task.list.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
              <a><a-typography-text type="danger">{{ $t('task.list.delete') }}</a-typography-text></a>
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
import { useEnumStore } from '@/stores'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()

const loading = ref(false)
const enumStore = useEnumStore()
const { t } = useI18n()

// 搜索表单
const searchForm = reactive({
  taskName: '',
  channelId: undefined,
  taskStatus: undefined,
  taskGroupId: undefined,
})

// 渠道选项
const channelOptions = ref([])
const taskGroupOptions = ref([])

// 计算任务状态选项
const taskStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }
  
  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('TaskStatus')
})

// 表格列配置
const columns = computed(() => [
  {
    title: t('task.list.name'),
    key: 'taskName'
  },
  {
    title: t('task.list.status'),
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    customRender: ({ text }) => {
      // 使用store提供的方法获取枚举文本
      return enumStore.getEnumText('TaskStatus', text)
    }
  },
  {
    title: t('task.list.quota'),
    key: 'taskQuota'
  },
  {
    title: t('task.list.startTime'),
    dataIndex: 'startTime',
    key: 'startTime',
    sorter: true,
  },
  {
    title: t('task.list.endTime'),
    dataIndex: 'endTime',
    key: 'endTime',
    sorter: true,
  },
  {
    title: t('task.list.action'),
    key: 'action',
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
  Object.assign(searchForm, {
    taskName: '',
    channelId: undefined,
    taskStatus: undefined,
    taskGroupId: undefined,
  })
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
  router.push('/task/create')
}

const handleEdit = (record) => {
  router.push(`/task/edit/${record.id}`)
}

const handleDelete = async (record) => {
  try {
    const res = await del('task.delete', {}, {
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
    const res = await get('task.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...sorter,
      ...searchForm
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

const loadChannelOptions = async () => {
  const res = await get('channel.list')
  if(res.code === 0){
    channelOptions.value = res.data.list
  } 
}

const loadTaskGroupOptions = async (keyword = '') => {
  const res = await get('taskGroup.list', {
    page: 1,
    pageSize: 50,
    taskGroupName: keyword
  })
  if(res.code === 0){
    taskGroupOptions.value = res.data.list || []
  }
}

// 初始化
onMounted(async () => {
  loadData()
  loadChannelOptions()
  loadTaskGroupOptions()
})
</script>

<style lang="less" scoped>

</style> 