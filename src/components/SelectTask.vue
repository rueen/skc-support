<template>
  <a-modal
    :open="visible"
    :title="$t('task.selectTask.title')"
    :width="900"
    :confirm-loading="confirmLoading"
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <div class="select-task-modal">
      <!-- 筛选表单 -->
      <div class="filter-form">
        <a-form layout="inline" :model="searchForm">
          <a-form-item :label="$t('task.search.taskName')">
            <a-input
              v-model:value="searchForm.taskName"
              :placeholder="$t('common.inputPlaceholder')"
              allow-clear
              style="width: 140px;"
            />
          </a-form-item>
          <a-form-item :label="$t('task.search.channelId')">
            <a-select
              v-model:value="searchForm.channelId"
              :placeholder="$t('task.search.channelPlaceholder')"
              style="width: 120px"
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
              :placeholder="$t('task.search.statusPlaceholder')"
              allow-clear
              style="width: 120px"
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
          <a-form-item>
            <a-space>
              <a-button type="primary" @click="handleSearch">{{ $t('common.search') }}</a-button>
              <a-button @click="handleReset">{{ $t('common.reset') }}</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>

      <!-- 已选择任务数量提示 -->
      <div class="selected-info">
        <a-alert
          :message="$t('task.selectTask.selectedCount', { count: selectedTaskIds.length })"
          type="info"
          show-icon
        />
      </div>

      <!-- 任务列表 -->
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        :row-selection="rowSelection"
        rowKey="id"
        @change="handleTableChange"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'taskName'">
            <a-space>
              <a-avatar :src="record.channelIcon" size="small" />
              <span>{{ record.taskName }}</span>
            </a-space>
          </template>
          <template v-if="column.key === 'taskTime'">
            <div>{{ record.startTime }} - {{ record.endTime }}</div>
          </template>
          <template v-if="column.key === 'taskStatus'">
            {{ enumStore.getEnumText('TaskStatus', record.taskStatus) }}
          </template>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { get } from '@/utils/request'
import { useEnumStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const enumStore = useEnumStore()
const { t } = useI18n()

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  selectedId: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

// 状态
const loading = ref(false)
const confirmLoading = ref(false)
const selectedTaskIds = ref([]) // 选中的任务ID

// 搜索表单
const searchForm = reactive({
  taskName: '',
  channelId: undefined,
  taskStatus: undefined,
})

// 渠道选项
const channelOptions = ref([])

// 计算任务状态选项
const taskStatusOptions = computed(() => {
  if (!enumStore.loaded) {
    return []
  }
  return enumStore.getEnumOptions('TaskStatus')
})

// 表格列配置
const columns = computed(() => [
  {
    title: t('task.list.name'),
    key: 'taskName',
    width: 200
  },
  {
    title: t('task.list.status'),
    key: 'taskStatus',
    width: 100
  },
  {
    title: t('task.list.time'),
    key: 'taskTime',
    width: 200
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

// 表格选择配置
const rowSelection = computed(() => ({
  selectedRowKeys: selectedTaskIds.value,
  onChange: (selectedKeys, selectedRows) => {
    handleSelectionChange(selectedKeys, selectedRows)
  },
  getCheckboxProps: (record) => ({
    disabled: false
  })
}))

// 处理选择变化
const handleSelectionChange = (selectedKeys, selectedRows) => {
  // 获取当前页面的任务ID
  const currentPageIds = tableData.value.map(item => item.id)
  
  // 移除当前页面的旧选择，保留其他页面的选择
  const otherPageSelectedIds = selectedTaskIds.value.filter(id => !currentPageIds.includes(id))
  
  // 合并其他页面的选择和当前页面的新选择
  selectedTaskIds.value = [...otherPageSelectedIds, ...selectedKeys]
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.taskName = ''
  searchForm.channelId = undefined
  searchForm.taskStatus = undefined
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 确认选择
const handleConfirm = () => {
  emit('confirm', {
    taskIds: selectedTaskIds.value
  })
  handleCancel()
}

// 取消选择
const handleCancel = () => {
  emit('update:visible', false)
  emit('cancel')
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await get('task.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm
    })
    if (res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
      
      // 选中状态基于selectedTaskIds进行判断，不需要额外处理
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// 加载渠道选项
const loadChannelOptions = async () => {
  const res = await get('channel.list')
  if (res.code === 0) {
    channelOptions.value = res.data.list
  }
}

// 初始化选中状态
const initializeSelection = () => {
  if (props.selectedId && props.selectedId.length > 0) {
    selectedTaskIds.value = [...props.selectedId]
  }
}

// 监听visible变化
watch(() => props.visible, (newVal) => {
  if (newVal) {
    loadData()
    if (!channelOptions.value.length) {
      loadChannelOptions()
    }
    initializeSelection()
  } else {
    // 重置状态
    selectedTaskIds.value = []
    pagination.current = 1
  }
})

// 监听selectedId变化
watch(() => props.selectedId, () => {
  if (props.visible) {
    initializeSelection()
  }
}, { deep: true })

// 初始化
onMounted(() => {
  if (props.visible) {
    loadData()
    loadChannelOptions()
    initializeSelection()
  }
})
</script>

<style lang="less" scoped>
.select-task-modal {
  .filter-form {
    margin-bottom: 16px;
    padding: 16px;
    background: #fafafa;
    border-radius: 6px;
  }
  
  .selected-info {
    margin-bottom: 16px;
  }
}
</style> 