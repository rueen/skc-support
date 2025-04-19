<template>
  <div class="system-config-container">
    <page-header
      :title="$t('systemConfig.pageTitle')"
      :back="true"
    />
    <a-spin :spinning="loading">
      <a-form
        :model="formState"
        :rules="rules"
        ref="formRef"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
      >
        <!-- 最大群成员数 -->
        <a-form-item :label="$t('systemConfig.maxGroupMembers')" name="maxGroupMembers">
          <a-input-number
            v-model:value="formState.max_group_members"
            :min="1"
            :max="1000"
            placeholder="请输入最大群成员数"
            :disabled="formDisabled"
          />
          <div class="form-item-desc">
            <div>{{ $t('systemConfig.maxGroupMembersDesc1') }}</div>
            <div>{{ $t('systemConfig.maxGroupMembersDesc2') }}</div>
          </div>
        </a-form-item>
        
        <!-- 群主收益率 -->
        <a-form-item :label="$t('systemConfig.groupOwnerProfitRate')" name="ownerProfitRate">
          <a-input-number
            v-model:value="formState.group_owner_commission_rate"
            :min="0"
            :max="100"
            :step="0.1"
            :precision="1"
            addonAfter="%"
            :placeholder="$t('systemConfig.groupOwnerProfitRatePlaceholder')"
            :disabled="formDisabled"
          />
          <div class="form-item-desc">{{ $t('systemConfig.groupOwnerProfitRateDesc') }}</div>
        </a-form-item>
        
        <!-- 邀请奖励金额 -->
        <a-form-item :label="$t('systemConfig.inviteRewardAmount')" name="inviteRewardAmount">
          <a-input-number
            v-model:value="formState.invite_reward_amount"
            :min="0"
            :max="1000"
            :step="0.1"
            :precision="1"
            addonBefore="¥"
            :placeholder="$t('systemConfig.inviteRewardAmountPlaceholder')"
            :disabled="formDisabled"
          />
          <div class="form-item-desc">{{ $t('systemConfig.inviteRewardAmountDesc') }}</div>
        </a-form-item>

        <!-- 提现门槛 -->
        <a-form-item :label="$t('systemConfig.withdrawalThreshold')" name="withdrawalThreshold">
          <a-input-number
            v-model:value="formState.withdrawal_threshold"
            :min="0"
            :max="99999"
            :step="1"
            addonBefore="¥"
            :placeholder="$t('systemConfig.withdrawalThresholdPlaceholder')"
            :disabled="formDisabled"
          />
          <div class="form-item-desc">{{ $t('systemConfig.withdrawalThresholdDesc') }}</div>
        </a-form-item>
        
        <!-- 按钮区域 -->
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-space>
            <a-button type="primary" @click="handleSubmit" :loading="submitting" v-if="!formDisabled">{{ $t('common.save') }}</a-button>
            <a-button @click="handleEdit" v-if="formDisabled">{{ $t('common.edit') }}</a-button>
            <a-button @click="handleReset" v-if="!formDisabled">{{ $t('common.reset') }}</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { get, post } from '@/utils/request'

// 表单引用
const formRef = ref(null)

// 加载状态
const loading = ref(false)
const submitting = ref(false)

// 表单是否禁用（查看状态）
const formDisabled = ref(true)

// 表单数据
const formState = reactive({
  max_group_members: null, // 最大群成员数
  group_owner_commission_rate: null, // 群主收益率
  invite_reward_amount: null // 邀请奖励金额
})

// 表单校验规则
const rules = {
  max_group_members: [
    { required: true, message: '请输入最大群成员数', trigger: 'blur' },
    { type: 'number', min: 10, max: 1000, message: '群成员数必须在 10-1000 之间', trigger: 'blur' }
  ],
  group_owner_commission_rate: [
    { required: true, message: '请输入群主收益率', trigger: 'blur' },
    { type: 'number', min: 0, max: 100, message: '收益率必须在 0-100 之间', trigger: 'blur' }
  ],
  invite_reward_amount: [
    { required: true, message: '请输入邀请奖励金额', trigger: 'blur' },
    { type: 'number', min: 0, max: 1000, message: '奖励金额必须在 0-1000 之间', trigger: 'blur' }
  ],
  withdrawal_threshold: [
    { required: true, message: '请输入提现门槛', trigger: 'blur' },
    { type: 'number', min: 0, max: 99999, message: '提现门槛必须在 0-99999 之间', trigger: 'blur' }
  ]
}

// 获取系统配置
const fetchSystemConfig = async () => {
  loading.value = true
  try {
    const res = await get('system.getAllConfig')
    // 更新表单数据
    if (res && res.data) {
      const json = {};
      res.data.forEach(item => {
        json[item.config_key] = item
      })
      Object.assign(formState, {
        max_group_members: json.max_group_members.config_value, // 最大群成员数
        group_owner_commission_rate: (json.group_owner_commission_rate.config_value - 0) * 100, // 群主收益率
        invite_reward_amount: json.invite_reward_amount.config_value, // 邀请奖励金额
        withdrawal_threshold: json.withdrawal_threshold.config_value // 提现门槛
      })
    }
  } catch (error) {
    message.error('获取系统配置失败：' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

// 保存系统配置
const saveSystemConfig = async () => {
  submitting.value = true
  const configs = {
    max_group_members: formState.max_group_members, // 最大群成员数
    group_owner_commission_rate: formState.group_owner_commission_rate / 100, // 群主收益率
    invite_reward_amount: formState.invite_reward_amount, // 邀请奖励金额
    withdrawal_threshold: formState.withdrawal_threshold // 提现门槛
  }
  const res = await post('system.saveAllConfig', {
    configs
  })
  
  submitting.value = false
  if (res && res.code === 0) {
    message.success('保存系统配置成功')
    fetchSystemConfig()
    // 保存成功后，切换到查看模式
    formDisabled.value = true
  } else {
    message.error(res.message || '保存失败')
  }
}

// 提交表单
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      saveSystemConfig()
    })
    .catch(error => {
      console.error('表单验证失败', error)
    })
}

// 进入编辑模式
const handleEdit = () => {
  formDisabled.value = false
}

// 重置表单
const handleReset = () => {
  // 重置为初始状态
  fetchSystemConfig()
}

// 页面加载时获取系统配置
onMounted(() => {
  fetchSystemConfig()
})
</script>

<style scoped>
.system-config-container {
  background-color: #fff;
  padding: 24px;
  border-radius: 2px;
}

.form-item-desc {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 4px;
}
</style> 