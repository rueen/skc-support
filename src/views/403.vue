<!--
 * @Author: diaochan
 * @Date: 2025-03-08 21:00:00
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-08 21:00:00
 * @Description: 403 无权限访问页面
-->

<template>
  <div class="forbidden-container">
    <div class="forbidden-content">
      <div class="forbidden-icon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#f5222d"/>
          <path d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" fill="#f5222d" fill-opacity=".2"/>
          <path d="M488 296c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="#f5222d"/>
        </svg>
      </div>
      <h1 class="forbidden-title">403</h1>
      <div class="forbidden-desc">抱歉，您没有权限访问此页面</div>
      <div class="forbidden-actions">
        <a-button type="primary" @click="goBack">返回上一页</a-button>
        <a-button @click="goHome" style="margin-left: 16px">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回上一页
const goBack = () => {
  router.go(-1);
};

// 返回首页
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.forbidden-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.forbidden-content {
  text-align: center;
  padding: 48px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  width: 100%;
}

.forbidden-icon {
  margin-bottom: 24px;
}

.forbidden-title {
  font-size: 72px;
  font-weight: 600;
  color: #f5222d;
  margin: 0 0 16px;
  line-height: 1;
}

.forbidden-desc {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 32px;
}

.forbidden-actions {
  margin-top: 24px;
}
</style> 