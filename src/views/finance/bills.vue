<template>
  <div class="other-bill content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('financial.bills.billNo')">
              <a-input
                v-model:value="searchForm.billNo"
                :placeholder="$t('financial.bills.billNoPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('financial.bills.billType')">
              <a-select
                v-model:value="searchForm.billType"
                :placeholder="$t('financial.bills.billTypePlaceholder')"
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
            <a-form-item :label="$t('financial.bills.settlementStatus')">
              <a-select
                v-model:value="searchForm.settlementStatus"
                :placeholder="$t('financial.bills.settlementStatusPlaceholder')"
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
            <a-form-item :label="$t('financial.bills.createTime')">
              <a-range-picker
                v-model:value="searchForm.timeRange"
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
            <a-form-item :label="$t('financial.bills.relatedTaskName')">
              <a-input
                v-model:value="searchForm.taskName"
                :placeholder="$t('financial.bills.taskNamePlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('financial.bills.memberNickname')">
              <a-input
                v-model:value="searchForm.memberNickname"
                :placeholder="$t('financial.bills.taskNamePlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('financial.bills.relatedGroupName')">
              <a-select
                v-model:value="searchForm.relatedGroupId"
                :placeholder="$t('financial.bills.relatedGroupNamePlaceholder')"
                style="width: 120px"
                allow-clear
                show-search
                :filter-option="false"
                @search="loadGroupOptions"
              >
                <a-select-option
                  v-for="item in groupOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.groupName }}
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
            <a-typography-link @click="handleMemberDetail(record)">{{ record.memberNickname }}</a-typography-link>
          </template>
          <template v-if="column.key === 'taskName'">
            <a-typography-link @click="handleTaskDetail(record)" v-if="record.taskName">{{ record.taskName }}</a-typography-link>
            <span v-else>--</span>
          </template>
          <template v-if="column.key === 'relatedGroupName'">
            {{ record.relatedGroupName || '--' }}
          </template>
          <template v-if="column.key === 'billType'">
            {{ enumStore.getEnumText('BillType', record.billType) }}
          </template>
          <template v-if="column.key === 'amount'">
            <a-typography-text type="danger" v-if="record.billType === 'reward_deduction'"> - {{ record.amount }}</a-typography-text>
            <span v-else>{{ record.amount }}</span>
          </template>
          <template v-if="column.key === 'remark'">
            <div style="max-width: 250px;">
              <span v-if="record.remark">{{ record.remark }}({{ $t('financial.bills.operator') }}: {{ record.waiterName }})</span>
              <span v-else>--</span>
            </div>
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
  billNo: '',
  billType: undefined,
  settlementStatus: undefined,
  timeRange: [],
  taskName: '',
  memberNickname: '',
  relatedGroupId: undefined
})

// 显示失败原因
const showFailReason = (record) => {
  Modal.error({
    title: '结算失败原因',
    content: record.failureReason,
  });
}

// 表格列配置
const columns = computed(() => [
  {
    title: t('financial.bills.billNo'),
    dataIndex: 'billNo',
    key: 'billNo'
  },
  {
    title: t('financial.bills.memberNickname'),
    key: 'memberNickname'
  },
  {
    title: t('financial.bills.billType'),
    dataIndex: 'billType',
    key: 'billType'
  },
  {
    title: t('financial.bills.relatedTaskName'),
    key: 'taskName'
  },
  {
    title: t('financial.bills.relatedGroupName'),
    key: 'relatedGroupName'
  },
  {
    title: t('financial.bills.amount'),
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  },
  {
    title: t('financial.bills.remark'),
    key: 'remark'
  },
  {
    title: t('financial.bills.createTime'),
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: t('financial.bills.settlementStatus'),
    key: 'settlementStatus'
  }
])

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
    billNo: '',
    billType: undefined,
    settlementStatus: undefined,
    timeRange: [],
    taskName: '',
    memberNickname: '',
    relatedGroupId: undefined
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
  router.push(`/submitted-tasks/detail/${record.submittedId}?type=confirm`)
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      billNo: searchForm.billNo,
      billType: searchForm.billType,
      settlementStatus: searchForm.settlementStatus,
      startTime: searchForm.timeRange?.[0],
      endTime: searchForm.timeRange?.[1],
      taskName: searchForm.taskName,
      memberNickname: searchForm.memberNickname,
      relatedGroupId: searchForm.relatedGroupId
    }
    const res = await get('finance.bills', {
      ...params
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

// 获取群组列表
const groupOptions = ref([])
const loadGroupOptions = async (keyword = '') => {
  try {
    const res = await get('group.list', {
      page: 1,
      pageSize: 50,
      groupName: keyword
    })  
    if(res.code === 0){
      groupOptions.value = res.data.list || []
    }
  } catch (error) {
    message.error('获取群组列表失败')
  }
}

// 初始化
onMounted(() => {
  loadData()
  loadGroupOptions()
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