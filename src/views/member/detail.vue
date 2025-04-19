<template>
  <div class="member-form content-container">
    <page-header
      :title="isEdit ? $t('member.detail.editTitle') : $t('member.detail.addTitle')"
      :back="true"
    />
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item
          :label="$t('member.detail.memberAccount')"
          name="memberAccount"
          :rules="rules.memberAccount"
        >
          <a-input v-model:value="formData.memberAccount" :placeholder="$t('member.detail.memberAccountPlaceholder')" />
        </a-form-item>

        <a-form-item
          :label="$t('member.detail.password')"
          name="password"
          :rules="[{ required: !isEdit, message: $t('member.detail.passwordPlaceholder') }]"
        >
          <a-input v-model:value="formData.password" :placeholder="$t('member.detail.passwordPlaceholder')" />
        </a-form-item>
        
        <a-form-item
          :label="$t('member.detail.memberNickname')"
          name="memberNickname"
          :rules="rules.memberNickname"
        >
          <a-input v-model:value="formData.memberNickname" :placeholder="$t('member.detail.memberNicknamePlaceholder')" />
        </a-form-item>
        
        <a-form-item
          :label="$t('member.detail.inviter')"
          name="inviterId"
        >
          <a-select
            v-model:value="formData.inviterId"
            :placeholder="$t('member.detail.inviterPlaceholder')"
            :loading="inviterLoading"
            show-search
            allow-clear
            :filter-option="false"
            @search="loadInviterOptions"
            @select="handleInviterSelect"
          >
            <a-select-option
              v-for="item in inviterOptions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.nickname }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :label="$t('member.detail.group')"
          name="groupIds"
        >
          <a-select
            v-model:value="formData.groupIds"
            :placeholder="$t('member.detail.groupPlaceholder')"
            :loading="groupLoading"
            mode="multiple"
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
        
        <a-form-item :wrapper-col="{ offset: 4 }">
          <a-space>
            <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
              {{ $t('common.submit') }}
            </a-button>
            <a-button @click="$router.back()">{{ $t('common.cancel') }}</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { get, post, put } from '@/utils/request'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n()

const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  memberNickname: '',
  memberAccount: '',
  password: '',
  groupIds: [],
  inviterId: undefined,
})

// 表单校验规则
const rules = {
  memberAccount: [
    { required: true, message: t('member.detail.memberAccountPlaceholder') },
    { 
      validator: (rule, value) => {
        // 菲律宾手机号格式：9开头的10位数字
        const phPhoneRegex = /^9[0-9]{9}$/;
        // 邮箱格式验证
        const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        
        if (!value) {
          return Promise.resolve();
        }
        
        if (phPhoneRegex.test(value) || emailRegex.test(value)) {
          return Promise.resolve();
        }
        
        return Promise.reject(t('member.detail.memberAccountRule'));
      }
    }
  ]
}

// 群组选择器
const groupLoading = ref(false)
const groupOptions = ref([])

// 邀请人选择器
const inviterLoading = ref(false)
const inviterOptions = ref([])

// 加载群组选项
const loadGroupOptions = async (keyword = '', inviterId = null) => {
  groupLoading.value = true
  try {
    // TODO: 实现加载群组选项的逻辑
    const res = await get('group.list', {
      page: 1,
      pageSize: 50,
      groupName: keyword,
      memberId: inviterId
    })
    if(res.code === 0){
      groupOptions.value = res.data.list || [];
      const isExist = formData.groupIds.some(item => groupOptions.value.some(option => option.id === item))
      
      if(!isExist){
        formData.groupIds = []
      }
    }
  } finally {
    groupLoading.value = false
  }
}

// 邀请人选择
const handleInviterSelect = (value) => {
  groupOptions.value = []
  loadGroupOptions()
}

// 加载邀请人选项
const loadInviterOptions = async (keyword = '') => {
  inviterLoading.value = true
  try {
    const res = await get('member.list', {
      page: 1,
      pageSize: 50,
      memberNickname: keyword
    })
    if(res.code === 0){
      inviterOptions.value = res.data.list || []
    }
  } finally {
    inviterLoading.value = false
  }
}

// 加载会员信息
const loadMemberInfo = async () => {
  if (!isEdit.value) return
  
  try {
    // TODO: 实现加载会员信息的逻辑
    const res = await get('member.detail', {}, {
      urlParams: {
        id: route.params.id
      }
    })
    if(res.code === 0){
      const data = res.data;
      Object.assign(formData, {
        memberNickname: data.nickname,
        memberAccount: data.account,
        groupIds: data.groups.map(item => item.groupId),
        inviterId: data.inviterId,
      })
    }
  } catch (error) {
    message.error('load member info failed')
    router.back()
  }
}

const addMember = async () => {
  const res = await post('member.add', formData)
  if(res.code === 0){
    message.success(res.message)
    router.back()
  } else {
    message.error(res.message)
  }
}
const editMember = async () => {
  const res = await put('member.edit', formData, {
    urlParams: {
      id: route.params.id
    }
  })
  if(res.code === 0){
    message.success(res.message)
    router.back()
  } else {
    message.error(res.message)
  }
}
// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    try {
      submitLoading.value = true
      // TODO: 实现提交逻辑
      if(isEdit.value){
        editMember()
      } else {
        addMember()
      }
    } catch (error) {
      message.error('submit failed')
    } finally {
      submitLoading.value = false
    }
  })
}

onMounted(async () => {
  await loadMemberInfo()
  await loadInviterOptions()
  await loadGroupOptions()
})
</script>

<style lang="less" scoped>
.member-form {
  .form-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
  }
}
</style> 