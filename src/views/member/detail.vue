<template>
  <div class="member-form content-container">
    <page-header
      :title="isEdit ? '编辑会员' : '新增会员'"
      :back="true"
    />
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item
          label="账号"
          name="memberAccount"
          :rules="rules.memberAccount"
        >
          <a-input v-model:value="formData.memberAccount" placeholder="请输入账号（手机号/邮箱）" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: !isEdit, message: '请输入密码' }]"
        >
          <a-input v-model:value="formData.password" placeholder="请输入密码" />
        </a-form-item>
        
        <a-form-item
          label="会员昵称"
          name="memberNickname"
          :rules="rules.memberNickname"
        >
          <a-input v-model:value="formData.memberNickname" placeholder="请输入会员昵称" />
        </a-form-item>
        
        <a-form-item label="邀请人" name="inviterId">
          <a-select
            v-model:value="formData.inviterId"
            placeholder="请选择邀请人"
            :loading="inviterLoading"
            show-search
            allow-clear
            :filter-option="filterInviter"
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

        <a-form-item label="所属群" name="groupIds">
          <a-select
            v-model:value="formData.groupIds"
            placeholder="请选择所属群"
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
import { get, post, put } from '@/utils/request'

const route = useRoute()
const router = useRouter()
const formRef = ref()

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
const loadGroupOptions = async (keyword = '') => {
  groupLoading.value = true
  try {
    // TODO: 实现加载群组选项的逻辑
    const res = await get('group.list', {
      page: 1,
      pageSize: 50,
      groupName: keyword,
      memberId: formData.inviterId
    })
    if(res.code === 0){
      groupOptions.value = res.data.list || []
    }
  } finally {
    groupLoading.value = false
  }
}

// 邀请人选择
const handleInviterSelect = (value) => {
  loadGroupOptions()
}

// 加载邀请人选项
const loadInviterOptions = async () => {
  inviterLoading.value = true
  try {
    const res = await get('member.list', {
      page: 1,
      pageSize: 50
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
    message.error('加载会员信息失败')
    router.back()
  }
}

const addMember = async () => {
  const res = await post('member.add', formData)
  if(res.code === 0){
    message.success('提交成功')
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