<template>
  <a-modal
    :open="visible"
    :title="$t('article.selectArticle.title')"
    :width="900"
    :confirm-loading="confirmLoading"
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <div class="select-article-modal">
      <!-- 筛选表单 -->
      <div class="filter-form">
        <a-form layout="inline" :model="searchForm">
          <a-form-item :label="$t('article.title')">
            <a-input
              v-model:value="searchForm.title"
              :placeholder="$t('common.inputPlaceholder')"
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="$t('article.location')">
            <a-input
              v-model:value="searchForm.location"
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

      <!-- 已选择文章数量提示 -->
      <div class="selected-info" v-if="props.mode === 'multiple'">
        <a-alert
          :message="$t('article.selectArticle.selectedCount', { count: selectedArticleIds.length })"
          type="info"
          show-icon
        />
      </div>

      <!-- 单选模式下的选中提示 -->
      <div class="selected-info" v-if="props.mode === 'single' && selectedArticle">
        <a-alert
          :message="$t('article.selectArticle.selectedArticle', { title: selectedArticle.title })"
          type="info"
          show-icon
        />
      </div>

      <!-- 文章列表 -->
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
          <template v-if="column.key === 'content'">
            <div class="content-preview">
              {{ record.content.length > 50 ? record.content.substring(0, 50) + '...' : record.content }}
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <a @click="handlePreview(record)">{{ $t('article.preview') }}</a>
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
import config from '@/config/env'

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
  selectedArticleInfo: {
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
const selectedArticleIds = ref([]) // 选中的文章ID
const selectedArticle = ref(null) // 单选模式下选中的文章信息

// 搜索表单
const searchForm = reactive({
  title: '',
  location: ''
})

// 表格列配置
const columns = computed(() => [
  {
    title: t('article.title'),
    dataIndex: 'title',
    key: 'title',
    width: 200
  },
  {
    title: t('article.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime',
    // sorter: true,
    width: 180
  },
  {
    title: t('article.action'),
    key: 'action',
    width: 100
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
      selectedRowKeys: selectedArticleIds.value,
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
      selectedRowKeys: selectedArticleIds.value,
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
  selectedArticleIds.value = selectedKeys || []
  selectedArticle.value = selectedRows && selectedRows.length > 0 ? selectedRows[0] : null
}

// 处理多选变化
const handleSelectionChange = (selectedKeys, selectedRows) => {
  // 获取当前页面的文章ID
  const currentPageIds = tableData.value.map(item => item.id)
  
  // 移除当前页面的旧选择，保留其他页面的选择
  const otherPageSelectedIds = selectedArticleIds.value.filter(id => !currentPageIds.includes(id))
  
  // 合并其他页面的选择和当前页面的新选择
  selectedArticleIds.value = [...otherPageSelectedIds, ...selectedKeys]
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.title = ''
  searchForm.location = ''
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

// 预览文章
const handlePreview = (record) => {
  window.open(`${config.h5Url}/article/${record.id}`, '_blank')
}

// 确认选择
const handleConfirm = () => {
  if (props.mode === 'single') {
    emit('confirm', {
      articleId: selectedArticleIds.value[0] || null,
      article: selectedArticle.value
    })
  } else {
    emit('confirm', {
      articleIds: selectedArticleIds.value
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
    const res = await get('article.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...sorter,
      ...searchForm
    })
    if (res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
      
      // 数据加载完成后，在单选模式下需要重新查找选中的文章信息
      if (props.mode === 'single' && selectedArticleIds.value.length > 0 && !selectedArticle.value) {
        const selectedId = selectedArticleIds.value[0]
        const article = tableData.value.find(item => item.id === selectedId)
        if (article) {
          selectedArticle.value = article
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
      selectedArticleIds.value = [id]
      // 查找对应的文章信息
      const article = tableData.value.find(item => item.id === id)
      if (article) {
        selectedArticle.value = article
      } else {
        selectedArticle.value = props.selectedArticleInfo
      }
    } else {
      selectedArticleIds.value = []
      selectedArticle.value = null
    }
  } else {
    // 多选模式
    if (props.selectedId && props.selectedId.length > 0) {
      selectedArticleIds.value = Array.isArray(props.selectedId) ? [...props.selectedId] : [props.selectedId]
    } else {
      selectedArticleIds.value = []
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
    selectedArticleIds.value = []
    if (props.mode === 'single') {
      selectedArticle.value = null
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
.select-article-modal {
  .filter-form {
    margin-bottom: 16px;
    padding: 16px;
    background: #fafafa;
    border-radius: 6px;
  }
  
  .selected-info {
    margin-bottom: 16px;
  }
  
  .content-preview {
    max-width: 280px;
    word-break: break-all;
    line-height: 1.4;
  }
}
</style> 