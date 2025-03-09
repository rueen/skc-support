<template>
  <div class="member-form content-container">
    <page-header
      :title="isEdit ? '编辑会员' : '新增会员'"
      :back="true"
      class="page-header"
    />
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="会员名称" name="name">
          <a-input v-model:value="formState.name" placeholder="请输入会员名称" />
        </a-form-item>
        
        <a-form-item label="账号" name="account">
          <a-input v-model:value="formState.account" placeholder="请输入账号（手机号/邮箱）" />
        </a-form-item>
        
        <a-form-item label="所属群" name="groupId">
          <a-select
            v-model:value="formState.groupId"
            placeholder="请选择所属群"
            :loading="groupLoading"
          >
          <a-select-option
              v-for="item in groupOptions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="邀请人" name="inviterId">
          <a-select
            v-model:value="formState.inviterId"
            placeholder="请选择邀请人"
            :loading="inviterLoading"
            show-search
            :filter-option="filterInviter"
          >
            <a-select-option
              v-for="item in inviterOptions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="职业" name="occupation">
          <a-select
            v-model:value="formState.occupation"
            placeholder="请选择职业"
            style="width: 200px"
          >
            <a-select-option
              v-for="type in Object.values(OccupationType)"
              :key="type"
              :value="type"
            >
              {{ getOccupationTypeText(type) }}
            </a-select-option>
          </a-select>
        </a-form-item>
        
        <a-form-item label="群主标识" name="isGroupOwner">
          <a-switch v-model:checked="formState.isGroupOwner" />
        </a-form-item>
        
        <a-form-item :wrapper-col="{ offset: 4 }">
          <a-space>
            <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
              提交
            </a-button>
            <a-button @click="$router.back()">取消</a-button>
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
import PageHeader from '@/components/PageHeader/index.vue'
import { OccupationType, OccupationTypeLang } from '@/constants/enums'
import { useI18n } from 'vue-i18n'
import { get, post } from '@/utils/request'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t, locale } = useI18n()

const isEdit = computed(() => !!route.params.id)

// 表单数据
const formState = reactive({
  name: '',
  account: '',
  occupation: undefined,
  groupId: undefined,
  isGroupOwner: false,
  inviterId: undefined,
})

// 表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入会员名称' }
  ],
  account: [
    { required: true, message: '请输入账号' },
    { 
      validator: (rule, value) => {
        // 手机号格式验证
        const phoneRegex = /^1[3-9]\d{9}$/;
        // 邮箱格式验证
        const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        
        if (!value) {
          return Promise.resolve();
        }
        
        if (phoneRegex.test(value) || emailRegex.test(value)) {
          return Promise.resolve();
        }
        
        return Promise.reject('请输入正确的手机号或邮箱格式');
      }
    }
  ],
  groupId: [
    { required: true, message: '请选择所属群' }
  ],
  inviterId: [
    { required: true, message: '请选择邀请人' }
  ]
}

// 群组选择器
const groupLoading = ref(false)
const groupOptions = ref([])

// 邀请人选择器
const inviterLoading = ref(false)
const inviterOptions = ref([])

// 邀请人搜索过滤
const filterInviter = (input, option) => {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

// 加载群组选项
const loadGroupOptions = async () => {
  groupLoading.value = true
  try {
    // TODO: 实现加载群组选项的逻辑
    const res = await get('group.list', {
      params: {
        page: 1,
        pageSize: 50,
        keyword: ''
      }
    })
    if(res.success){
      groupOptions.value = res.data.list || []
    }
  } finally {
    groupLoading.value = false
  }
}

// 加载邀请人选项
const loadInviterOptions = async () => {
  inviterLoading.value = true
  try {
    const res = await get('member.list', {
      params: {
        page: 1,
        pageSize: 50
      }
    })
    if(res.success){
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
    const res = await get('member.detail', {
      params: {
        id: route.params.id
      }
    })
    if(res.success){
      Object.assign(formState, res.data)
    }
  } catch (error) {
    message.error('加载会员信息失败')
    router.back()
  }
}

const addMember = async () => {
  const res = await post('member.add', formState)
  if(res.success){
    message.success('提交成功')
    router.back()
  } else {
    message.error(res.message)
  }
}
const editMember = async () => {
  const res = await post('member.edit', formState)
  if(res.success){
    message.success('提交成功')
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
      message.error('提交失败')
    } finally {
      submitLoading.value = false
    }
  })
}

// 获取职业类型文本
const getOccupationTypeText = (type) => {
  return OccupationTypeLang[type]?.[locale.value] || type
}

onMounted(() => {
  loadGroupOptions()
  loadInviterOptions()
  loadMemberInfo()
})
</script>

<style lang="less" scoped>
.member-form {
  .page-header {
    :deep(.ant-page-header-heading-left) {
      flex: 1;
    }
  }

  .form-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
  }
}
</style> 