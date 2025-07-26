<template>
  <div class="ad content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('ad.title')">
              <a-input
                v-model:value="searchForm.title"
                :placeholder="$t('common.inputPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('ad.status')">
              <a-select
                v-model:value="searchForm.status"
                :placeholder="$t('common.selectPlaceholder')"
                allowClear
              >
                <a-select-option 
                  v-for="option in adStatusOptions"
                  :key="option.value" 
                  :value="option.value"
                >
                  {{ option.text }}
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
          <a-button type="primary" @click="handleAdd">
            <plus-outlined />
            {{ $t('ad.add') }}
          </a-button>
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
import { message } from 'ant-design-vue'
import { get, del } from '@/utils/request'
import { useI18n } from 'vue-i18n'
import { useEnumStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const enumStore = useEnumStore()
const { t } = useI18n()
const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  title: '',
  status: undefined,
})

const adStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }
  
  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('AdStatus')
})

// 表格列配置
const columns = computed(() => [
  {
    title: t('ad.title'),
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: t('ad.location'),
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: t('ad.status'),
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }) => {
      // 使用store提供的方法获取枚举文本
      return enumStore.getEnumText('AdStatus', text)
    }
  },
  {
    title: t('common.startTime'),
    dataIndex: 'startTime',
    key: 'startTime',
    sorter: true
  },
  {
    title: t('common.endTime'),
    dataIndex: 'endTime',
    key: 'endTime',
    sorter: true
  },
  {
    title: t('common.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime',
    sorter: true
  },
  {
    title: t('common.operation'),
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
const sorter = reactive({
  sorterField: undefined,
  sorterOrder: undefined
})

const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const handleReset = () => {
  Object.assign(searchForm, {
    title: '',
    status: undefined,
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

const handleDelete = async (record) => {
  try {
    const res = await del('ad.delete', {
      id: record.id
    }, {
      urlParams: {
        id: record.id
      }
    })
    if (res.code === 0) {
      message.success(res.message)
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.error(error)
  }
}

// 添加文章
const handleAdd = () => {
  router.push('/ad/create')
}

// 编辑文章
const handleEdit = (record) => {
  router.push(`/ad/edit/${record.id}`)
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await get('ad.list', {
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

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="less" scoped>

</style> 