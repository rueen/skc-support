<template>
  <div class="task-form content-container">
    <page-header
      :title="isEdit ? $t('task.group.editTitle') : $t('task.group.createTitle')"
      :back="true"
      class="page-header"
    >
    </page-header>
    <div>
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 19 }"
        layout="horizontal"
      >
        <a-form-item :label="$t('task.group.name')">
          <a-input
            v-model:value="formData.taskGroupName"
            :placeholder="$t('common.inputPlaceholder')"
            style="width: 300px;"
          />
        </a-form-item>
        <a-form-item :label="$t('task.group.reward')">
          <a-input-number
            v-model:value="formData.taskGroupReward"
            :min="0"
            :precision="2"
            :step="0.1"
            :placeholder="$t('common.inputPlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('task.group.relatedTask')">
          <div>
            <a-button type="primary" @click="handleSelectTask">{{ $t('task.group.selectTaskBtnText', { count: selectedTaskIds.length }) }}</a-button>
            <!-- 预览已选任务列表 -->
            <a-table
              :columns="selectedTasksColumns"
              :data-source="selectedTasks"
              :loading="selectedTasksLoading"
              :pagination="false"
              style="margin-top: 10px;"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'taskName'">
                  <a-space>
                    <a-avatar :src="record.channelIcon" />
                    {{ record.taskName }}
                  </a-space>
                </template>
                <template v-if="column.key === 'taskStatus'">
                    {{ enumStore.getEnumText('TaskStatus', record.taskStatus) }}
                </template>
              </template>
            </a-table>
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
          <a-space>
            <a-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</a-button>
            <a-button @click="handleCancel">{{ $t('common.cancel') }}</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>

    <!-- 选择任务组件 -->
    <SelectTask
      v-model:visible="selectTaskVisible"
      :selectedId="selectedTaskIds"
      @confirm="handleTaskSelectConfirm"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import SelectTask from '@/components/SelectTask.vue'
import { get, post, put } from '@/utils/request'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useEnumStore } from '@/stores'

const { t } = useI18n()
const enumStore = useEnumStore()
const route = useRoute()
const router = useRouter()
const formRef = ref()

// 页面状态
const isEdit = computed(() => route.name === 'TaskEdit')

// 任务选择相关状态
const selectTaskVisible = ref(false)
const selectedTaskIds = ref([]) // 选中的任务ID列表
const selectedTasks = ref([]) // 选中的任务完整信息（用于显示）
const selectedTasksLoading = ref(false)
const selectedTasksColumns = computed(() => [
  {
    title: t('task.list.name'),
    key: 'taskName'
  },
  {
    title: t('task.list.status'),
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    customRender: ({ text }) => {
      // 使用store提供的方法获取枚举文本
      return enumStore.getEnumText('TaskStatus', text)
    }
  },
  {
    title: t('task.list.startTime'),
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: t('task.list.endTime'),
    dataIndex: 'endTime',
    key: 'endTime',
  }
])

// 表单数据
const formData = reactive({
  taskGroupName: '',
  taskGroupReward: 0,
})

// 表单校验规则
const rules = {
  taskGroupName: [{ required: true, message: t('task.group.validation.taskGroupNameRequired') }],
  taskGroupReward: [{ required: true, message: t('task.group.validation.taskGroupRewardRequired') }],
}

// 选择任务
const handleSelectTask = () => {
  selectTaskVisible.value = true
}

// 处理任务选择确认
const handleTaskSelectConfirm = ({ taskIds }) => {
  selectedTaskIds.value = taskIds
  // 根据选中的ID从当前数据中获取任务信息用于显示
  loadSelectedTasksInfo()
}

// 加载已选任务的显示信息
const loadSelectedTasksInfo = async () => {
  try {
    selectedTasksLoading.value = true
    const res = await get('task.list', {
      page: 1,
      pageSize: 100,
      sorterField: 'startTime',
      sorterOrder: 'ascend',
      taskIds: selectedTaskIds.value
    })
    if(res.code === 0){
      selectedTasks.value = res.data.list;
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error(error)
  } finally {
    selectedTasksLoading.value = false
  }
}

const handleAdd = async () => {
  
}

const handleEdit = async () => {
  
}
// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    if(isEdit.value) {
      await handleEdit()
    } else {
      await handleAdd()
    }
  })
}

// 取消
const handleCancel = () => {
  router.back()
}

// 获取任务详情
const getTaskDetail = async (id) => {
  try {
    // TODO: 实现获取任务详情逻辑
    const res = await get('task.detail', {}, {
      urlParams: {
        id
      }
    })
    if(res.code === 0){
      let data = {};
      for(let key in res.data) {
        if(key !== 'groups') {
          data[key] = res.data[key]
        }
      }
      // 转换日期字符串为日期对象
      if (data.startTime) {
        data.startTime = dayjs(data.startTime)
      }
      if (data.endTime) {
        data.endTime = dayjs(data.endTime)
      }
      Object.assign(formData, data)
    }
  } catch (error) {
    console.log(error)
    message.error(error)
  }
}

onMounted(() => {
  if (isEdit.value) {
    getTaskDetail(route.params.id)
  }
})
</script>

<style lang="less" scoped>
.task-form {
  .selected-tasks-info {
    margin-top: 8px;
    
    .selected-tasks-list {
      margin-top: 8px;
      
      .ant-tag {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
}
</style> 