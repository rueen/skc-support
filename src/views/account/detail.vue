<template>
  <div class="content-container">
    <page-header
      :title="$t('account.detail.editTitle')"
      :back="true"
      :useDefaultBack="false"
      @back="handleGoBack"
    />
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item :label="$t('account.detail.platform')" name="platform">
          <a-avatar :src="accountDetail.channelIcon" size="small" />
          {{accountDetail.channelName}}
        </a-form-item>
        <a-form-item :label="$t('account.detail.account')" name="account">
          <a-input v-model:value="formData.account" />
        </a-form-item>
        <a-form-item :label="$t('account.detail.homepage')" name="homeUrl">
          <a-input v-model:value="formData.homeUrl" />
        </a-form-item>
        <a-form-item label="UID" name="uid">
          <a-input v-model:value="formData.uid" />
        </a-form-item>
        <a-form-item :label="$t('account.detail.fansCount')" name="fansCount" v-if="channelCustomFields.includes('fansCount')">
          <a-input v-model:value="formData.fansCount" />
        </a-form-item>
        <a-form-item :label="$t('account.detail.friendsCount')" name="friendsCount" v-if="channelCustomFields.includes('friendsCount')">
          <a-input v-model:value="formData.friendsCount" />
        </a-form-item>
        <a-form-item :label="$t('account.detail.postsCount')" name="postsCount" v-if="channelCustomFields.includes('postsCount')">
          <a-input v-model:value="formData.postsCount" />
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
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { useI18n } from 'vue-i18n'
import { get, put } from '@/utils/request'
import { decryptFilters } from '@/utils/routeParamsEncryption'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n()

const accountDetail = ref({})
const channelCustomFields = ref([])

// 获取并解密路由中的filters参数
const filtersParam = ref(null)
const getRouteFilters = () => {
  const encryptedFilters = route.query.filters
  if (encryptedFilters) {
    filtersParam.value = decryptFilters(encryptedFilters)
    // console.log('解密后的filters参数:', filtersParam.value)
  }
}

// 表单数据
const formData = reactive({
  homeUrl: '',
  uid: '',
  account: '',
  fansCount: '',
  friendsCount: '',
  postsCount: ''
})

// 表单校验规则
const rules = {
  memberAccount: [
    { required: true, message: t('member.detail.memberAccountPlaceholder') },
    
  ]
}

const loadAccountDetail = async () => {
  const res = await get('account.detail', {}, {
    urlParams: {
      id: route.params.id
    }
  })
  if(res.code === 0){
    Object.assign(formData, res.data)
    accountDetail.value = res.data;
    channelCustomFields.value = res.data.channelCustomFields
  } else {
    message.error(res.message)
  }
}

// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    try {
      const params = {}
      Object.keys(formData).forEach(key => {
        if(formData[key] != null) {
          if(['account', 'homeUrl', 'uid'].includes(key)){
            params[key] = formData[key].trim()
          } else {
            params[key] = formData[key]
          }
        }
      })
      submitLoading.value = true
      await put('account.edit', params, {
        urlParams: {
          id: accountDetail.value.id
        }
      })
      message.success('success')
      router.back()
    } catch (error) {
      console.log(error)
      message.error('submit failed')
    } finally {
      submitLoading.value = false
    }
  })
}

// 自定义返回按钮事件
const handleGoBack = () => {
  const queryParams = {};
  if(route.query.filters){
    queryParams.filters = route.query.filters;
  }
  router.push({
    path: '/account',
    query: queryParams
  })
}

onMounted(async () => {
  // 获取并解密filters参数
  getRouteFilters()
  loadAccountDetail()
})
</script>

<style lang="less" scoped>

</style> 