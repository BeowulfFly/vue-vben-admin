<script setup lang="ts">
import type { ServiceHealth } from '#/api';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElButton, ElCard, ElMessage, ElTag } from 'element-plus';

import { checkAllServices, triggerGraphRefresh } from '#/api';

const services = ref<ServiceHealth[]>([]);
const refreshLoading = ref(false);

onMounted(async () => {
  services.value = await checkAllServices();
});

async function handleRefreshGraph() {
  refreshLoading.value = true;
  try {
    await triggerGraphRefresh();
    ElMessage.success('图谱刷新任务已触发');
  } finally {
    refreshLoading.value = false;
  }
}
</script>

<template>
  <Page title="服务监控">
    <template #extra>
      <ElButton :loading="refreshLoading" @click="handleRefreshGraph">
        手动触发图谱刷新
      </ElButton>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ElCard v-for="svc in services" :key="svc.name" shadow="hover">
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium">{{ svc.name }}</span>
          <ElTag
            :type="
              svc.status === 'healthy'
                ? 'success'
                : svc.status === 'degraded'
                  ? 'warning'
                  : 'danger'
            "
            size="small"
          >
            {{ svc.status }}
          </ElTag>
        </div>
        <div class="text-xs text-[var(--el-text-color-secondary)]">
          {{ svc.url }}
        </div>
      </ElCard>
    </div>
  </Page>
</template>
