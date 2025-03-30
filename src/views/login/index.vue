<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title">
        <h1>{{ $t('app.title') }}</h1>
        <p>{{ $t('login.title') }}</p>
      </div>
      
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        @finish="handleLogin"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="formData.username"
            size="large"
            :placeholder="$t('login.username')"
          >
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        
        <a-form-item name="password">
          <a-input-password
            v-model:value="formData.password"
            size="large"
            :placeholder="$t('login.password')"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>
        
        <a-form-item>
          <a-checkbox
            v-model:checked="formData.remember"
          >
            {{ $t('login.rememberMe') }}
          </a-checkbox>
        </a-form-item>
        
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
            block
          >
            {{ $t('login.login') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref()
const loading = ref(false)

const formData = reactive({
  username: 'admin', // 默认填入用户名
  password: 'admin123', // 默认填入密码
  remember: true
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ]
}

const handleLogin = async (values) => {
  try {
    loading.value = true
    
    // 发送原始密码，由服务器进行 Argon2 验证
    // 在实际生产环境中，应该使用 HTTPS 确保传输安全
    const loginParams = {
      username: values.username,
      password: values.password
    };
    
    await userStore.login(loginParams)
    router.push('/')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
  
  .login-box {
    width: 368px;
    margin: 0 auto;
    padding: 32px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    
    .login-title {
      text-align: center;
      margin-bottom: 40px;
      
      h1 {
        font-size: 33px;
        font-weight: 600;
        margin-bottom: 12px;
        color: @primary-color;
      }
      
      p {
        font-size: 14px;
        color: @text-color-secondary;
        margin: 0;
      }
    }
  }
}
</style> 