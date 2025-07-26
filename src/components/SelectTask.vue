<template>
  <a-modal
    :open="visible"
    :title="$t('task.selectTask.title')"
    :width="900"
    :confirm-loading="confirmLoading"
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <div class="select-task-modal table-container">
      <!-- 筛选表单 -->
      <div class="filter-form">
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
              allow-clear
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
      <div class="selected-info" v-if="props.mode === 'multiple'">
        <a-alert
          :message="$t('task.selectTask.selectedCount', { count: selectedTaskIds.length })"
          type="info"
          show-icon
        />
      </div>

      <!-- 单选模式下的选中提示 -->
      <div class="selected-info" v-if="props.mode === 'single' && selectedTask">
        <a-alert
          :message="$t('task.selectTask.selectedTask', { name: selectedTask.taskName })"
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
    type: [Array, Number, String],
    default: () => []
  },
  selectedTaskInfo: {
    type: Object,
    default: () => ({})
  },
  /**
   * 选择模式：'multiple' 多选，'single' 单选
   */
  mode: {
    type: String,
    default: 'multiple',
    validator: (value) => ['multiple', 'single'].includes(value)
  }
})

// Emits
const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

// 状态
const loading = ref(false)
const confirmLoading = ref(false)
const selectedTaskIds = ref([]) // 选中的任务ID
const selectedTask = ref(null) // 单选模式下选中的任务信息

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
])

// 表格数据
const tableData = ref([])

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})
const sorter = reactive({
  sorterField: undefined,
  sorterOrder: undefined
})

// 表格选择配置
const rowSelection = computed(() => {
  if (props.mode === 'single') {
    return {
      type: 'radio',
      selectedRowKeys: selectedTaskIds.value,
      onChange: (selectedKeys, selectedRows) => {
        // 单选模式下，selectedKeys 也是数组，但只有一个元素或为空
        handleSingleSelectionChange(selectedKeys, selectedRows)
      },
      getCheckboxProps: (record) => ({
        disabled: false
      })
    }
  } else {
    return {
      selectedRowKeys: selectedTaskIds.value,
      onChange: (selectedKeys, selectedRows) => {
        handleSelectionChange(selectedKeys, selectedRows)
      },
      getCheckboxProps: (record) => ({
        disabled: false
      })
    }
  }
})

// 处理单选变化
const handleSingleSelectionChange = (selectedKeys, selectedRows) => {
  selectedTaskIds.value = selectedKeys || []
  selectedTask.value = selectedRows && selectedRows.length > 0 ? selectedRows[0] : null
}

// 处理多选变化
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
const handleTableChange = (pag, filters, _sorter) => {
  Object.assign(pagination, pag)
  Object.assign(sorter, {
    sorterField: _sorter.field,
    sorterOrder: _sorter.order
  })
  loadData()
}

// 确认选择
const handleConfirm = () => {
  if (props.mode === 'single') {
    emit('confirm', {
      taskId: selectedTaskIds.value[0] || null,
      task: selectedTask.value
    })
  } else {
    emit('confirm', {
      taskIds: selectedTaskIds.value
    })
  }
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
      ...sorter,
      ...searchForm
    })
    if (res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
      
      // 数据加载完成后，在单选模式下需要重新查找选中的任务信息
      if (props.mode === 'single' && selectedTaskIds.value.length > 0 && !selectedTask.value) {
        const selectedId = selectedTaskIds.value[0]
        const task = tableData.value.find(item => item.id === selectedId)
        if (task) {
          selectedTask.value = task
        }
      }
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
  if (props.mode === 'single') {
    // 单选模式
    let id = null
    if (Array.isArray(props.selectedId)) {
      id = props.selectedId.length > 0 ? props.selectedId[0] : null
    } else {
      id = props.selectedId
    }
    
    if (id != null && id !== '') {
      selectedTaskIds.value = [id]
      // 查找对应的任务信息
      const task = tableData.value.find(item => item.id === id)
      if (task) {
        selectedTask.value = task
      } else {
        selectedTask.value = props.selectedTaskInfo
      }
    } else {
      selectedTaskIds.value = []
      selectedTask.value = null
    }
  } else {
    // 多选模式
    if (props.selectedId && props.selectedId.length > 0) {
      selectedTaskIds.value = Array.isArray(props.selectedId) ? [...props.selectedId] : [props.selectedId]
    } else {
      selectedTaskIds.value = []
    }
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
    if (props.mode === 'single') {
      selectedTask.value = null
    }
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