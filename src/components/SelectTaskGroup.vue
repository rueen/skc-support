<template>
  <a-modal
    :open="visible"
    :title="$t('task.selectTaskGroup.title')"
    :width="900"
    :confirm-loading="confirmLoading"
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <div class="select-task-group-modal">
      <!-- 筛选表单 -->
      <div class="filter-form">
        <a-form layout="inline" :model="searchForm">
          <a-form-item :label="$t('task.search.taskGroupName')">
            <a-input
              v-model:value="searchForm.taskGroupName"
              :placeholder="$t('common.inputPlaceholder')"
              allow-clear
              style="width: 160px;"
            />
          </a-form-item>
          <a-form-item :label="$t('task.search.taskName')">
            <a-input
              v-model:value="searchForm.taskName"
              :placeholder="$t('common.inputPlaceholder')"
              allow-clear
              style="width: 140px;"
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

      <!-- 已选择任务组数量提示 -->
      <div class="selected-info" v-if="props.mode === 'multiple'">
        <a-alert
          :message="$t('task.selectTaskGroup.selectedCount', { count: selectedTaskGroupIds.length })"
          type="info"
          show-icon
        />
      </div>

      <!-- 单选模式下的选中提示 -->
      <div class="selected-info" v-if="props.mode === 'single' && selectedTaskGroup">
        <a-alert
          :message="$t('task.selectTaskGroup.selectedTaskGroup', { name: selectedTaskGroup.taskGroupName })"
          type="info"
          show-icon
        />
      </div>

      <!-- 任务组列表 -->
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
          <template v-if="column.key === 'statistics'">
            {{ record.enrolledCount }}/{{ record.completedCount }}
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
import { useI18n } from 'vue-i18n'

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
  selectedTaskGroupInfo: {
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
const selectedTaskGroupIds = ref([]) // 选中的任务组ID
const selectedTaskGroup = ref(null) // 单选模式下选中的任务组信息

// 搜索表单
const searchForm = reactive({
  taskGroupName: '',
  taskName: ''
})

// 表格列配置
const columns = computed(() => [
  {
    title: t('task.group.name'),
    dataIndex: 'taskGroupName',
    key: 'taskGroupName',
    width: 200
  },
  {
    title: t('task.group.statistics'),
    key: 'statistics',
    width: 120
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
const sorter = reactive({
  sorterField: undefined,
  sorterOrder: undefined
})

// 表格选择配置
const rowSelection = computed(() => {
  if (props.mode === 'single') {
    return {
      type: 'radio',
      selectedRowKeys: selectedTaskGroupIds.value,
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
      selectedRowKeys: selectedTaskGroupIds.value,
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
  selectedTaskGroupIds.value = selectedKeys || []
  selectedTaskGroup.value = selectedRows && selectedRows.length > 0 ? selectedRows[0] : null
}

// 处理多选变化
const handleSelectionChange = (selectedKeys, selectedRows) => {
  // 获取当前页面的任务组ID
  const currentPageIds = tableData.value.map(item => item.id)
  
  // 移除当前页面的旧选择，保留其他页面的选择
  const otherPageSelectedIds = selectedTaskGroupIds.value.filter(id => !currentPageIds.includes(id))
  
  // 合并其他页面的选择和当前页面的新选择
  selectedTaskGroupIds.value = [...otherPageSelectedIds, ...selectedKeys]
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.taskGroupName = ''
  searchForm.taskName = ''
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
      taskGroupId: selectedTaskGroupIds.value[0] || null,
      taskGroup: selectedTaskGroup.value
    })
  } else {
    emit('confirm', {
      taskGroupIds: selectedTaskGroupIds.value
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
    const res = await get('taskGroup.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...sorter,
      ...searchForm
    })
    if (res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
      
      // 数据加载完成后，在单选模式下需要重新查找选中的任务组信息
      if (props.mode === 'single' && selectedTaskGroupIds.value.length > 0 && !selectedTaskGroup.value) {
        const selectedId = selectedTaskGroupIds.value[0]
        const taskGroup = tableData.value.find(item => item.id === selectedId)
        if (taskGroup) {
          selectedTaskGroup.value = taskGroup
        }
      }
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
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
      selectedTaskGroupIds.value = [id]
      // 查找对应的任务组信息
      const taskGroup = tableData.value.find(item => item.id === id)
      if (taskGroup) {
        selectedTaskGroup.value = taskGroup
      } else {
        selectedTaskGroup.value = props.selectedTaskGroupInfo
      }
    } else {
      selectedTaskGroupIds.value = []
      selectedTaskGroup.value = null
    }
  } else {
    // 多选模式
    if (props.selectedId && props.selectedId.length > 0) {
      selectedTaskGroupIds.value = Array.isArray(props.selectedId) ? [...props.selectedId] : [props.selectedId]
    } else {
      selectedTaskGroupIds.value = []
    }
  }
}

// 监听visible变化
watch(() => props.visible, (newVal) => {
  if (newVal) {
    loadData()
    initializeSelection()
  } else {
    // 重置状态
    selectedTaskGroupIds.value = []
    if (props.mode === 'single') {
      selectedTaskGroup.value = null
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
    initializeSelection()
  }
})
</script>

<style lang="less" scoped>
.select-task-group-modal {
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