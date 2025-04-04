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
                  v-for="option in billTypeOptions"
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
                  v-for="option in settlementStatusOptions"
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
          <template v-if="column.key === 'memberNickname'">
            <a @click="handleMemberDetail(record)">{{ record.memberNickname }}</a>
          </template>
          <template v-if="column.key === 'taskName'">
            <span v-if="record.billType === 'withdrawal'">--</span>
            <a @click="handleTaskDetail(record)" v-else>{{ record.taskName }}</a>
          </template>
          <template v-if="column.key === 'billType'">
            {{ enumStore.getEnumText('BillType', record.billType) }}
          </template>
          <template v-if="column.key === 'settlementStatus'">
            <span v-if="record.billType === 'withdrawal'">{{ enumStore.getEnumText('WithdrawalStatus', record.withdrawalStatus) }}</span>
            <span v-else>{{ enumStore.getEnumText('SettlementStatus', record.settlementStatus) }}</span>
            <info-circle-outlined 
              v-if="record.settlementStatus === 'failed' || record.withdrawalStatus === 'failed'" 
              class="status-icon" 
              @click="showFailReason(record)"
            />
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { get } from '@/utils/request'
import { useEnumStore } from '@/stores'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const enumStore = useEnumStore()
const router = useRouter()

// 计算账单类型选项
const billTypeOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }

  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('BillType')
})

const settlementStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }

  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('SettlementStatus')
})

const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  memberNickname: '',
  billType: undefined,
  settlementStatus: undefined
})

// 显示失败原因
const showFailReason = (record) => {
  Modal.error({
    title: '结算失败原因',
    content: record.failureReason,
  });
}

// 表格列配置
const columns = [
  {
    title: '会员昵称',
    key: 'memberNickname'
  },
  {
    title: '账单类型',
    dataIndex: 'billType',
    key: 'billType'
  },
  {
    title: '关联任务',
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
    title: '状态',
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

// 会员详情
const handleMemberDetail = (record) => {
  router.push(`/member/view/${record.memberId}`)
}

// 任务详情
const handleTaskDetail = (record) => {
  router.push(`/submitted-tasks/detail/${record.submittedId}`)
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    const res = await get('finance.bills', {
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
  
  .status-icon {
    margin-left: 8px;
    color: #ff4d4f;
    cursor: pointer;
  }
  
  .fail-reason-content {
    min-height: 100px;
    
    .no-reason {
      color: #999;
      font-style: italic;
    }
  }
}
</style> 