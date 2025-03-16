<template>
  <div class="other-bill content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="会员昵称">
              <a-input
                v-model:value="searchForm.memberNickname"
                placeholder="请输入会员昵称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="账单类型">
              <a-select
                v-model:value="searchForm.billType"
                placeholder="请选择账单类型"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="option in billTypeList"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="结算状态">
              <a-select
                v-model:value="searchForm.settlementStatus"
                placeholder="请选择结算状态"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="option in settlementStatusList"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
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
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'billType'">
            {{ billTypeJson[record.billType] }}
          </template>
          <template v-if="column.key === 'settlementStatus'">
            {{ settlementStatusJson[record.settlementStatus] }}
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { get } from '@/utils/request'
import { useEnumStore } from '@/stores'

const enumStore = useEnumStore()

const billTypeList = enumStore.arrEnum.BillType
const billTypeJson = enumStore.jsonEnum.BillType
const settlementStatusList = enumStore.arrEnum.SettlementStatus
const settlementStatusJson = enumStore.jsonEnum.SettlementStatus

const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  memberNickname: '',
  billType: undefined,
  settlementStatus: undefined
})

// 表格列配置
const columns = [
  {
    title: '会员昵称',
    dataIndex: 'memberNickname',
    key: 'memberNickname'
  },
  {
    title: '账单类型',
    dataIndex: 'billType',
    key: 'billType'
  },
  {
    title: '关联任务',
    dataIndex: 'taskName',
    key: 'taskName'
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '结算状态',
    dataIndex: 'settlementStatus',
    key: 'settlementStatus'
  }
]

// 表格数据
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    memberNickname: '',
    billType: undefined,
    settlementStatus: undefined
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    const res = await get('settlement.otherBills', {
      page: pagination.current,
      pageSize: pagination.pageSize,
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
.other-bill {
  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style> 