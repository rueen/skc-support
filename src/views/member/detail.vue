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
        
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="formState.phone" placeholder="请输入手机号" />
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
        
        <a-form-item label="所属群" name="groupId">
          <a-select
            v-model:value="formState.groupId"
            placeholder="请选择所属群"
            :loading="groupLoading"
            :options="groupOptions"
          />
        </a-form-item>
        
        <a-form-item label="群主标识" name="isGroupOwner">
          <a-switch v-model:checked="formState.isGroupOwner" />
        </a-form-item>
        
        <a-form-item label="备注" name="remark">
          <a-textarea
            v-model:value="formState.remark"
            :rows="4"
            placeholder="请输入备注信息"
          />
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
import { CreatorCategory, OccupationType, OccupationTypeLang } from '@/constants/enums'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t, locale } = useI18n()

const isEdit = computed(() => !!route.params.id)

// 表单数据
const formState = reactive({
  name: '',
  phone: '',
  occupation: undefined,
  groupId: undefined,
  isGroupOwner: false,
  remark: ''
})

// 表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入会员名称' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
  ],
  groupId: [
    { required: true, message: '请选择所属群' }
  ]
}

// 群组选择器
const groupLoading = ref(false)
const groupOptions = ref([])

// 加载群组选项
const loadGroupOptions = async () => {
  groupLoading.value = true
  try {
    // TODO: 实现加载群组选项的逻辑
    groupOptions.value = [
      { label: '测试群组1', value: '1' },
      { label: '测试群组2', value: '2' }
    ]
  } finally {
    groupLoading.value = false
  }
}

// 加载会员信息
const loadMemberInfo = async () => {
  if (!isEdit.value) return
  
  try {
    // TODO: 实现加载会员信息的逻辑
    Object.assign(formState, {
      name: '张三',
      phone: '13800138000',
      groupId: '1',
      isGroupOwner: true,
      remark: '测试备注'
    })
  } catch (error) {
    message.error('加载会员信息失败')
    router.back()
  }
}

// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    try {
      submitLoading.value = true
      // TODO: 实现提交逻辑
      message.success('提交成功')
      router.back()
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