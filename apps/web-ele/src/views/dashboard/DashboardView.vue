<script setup lang="ts">
import type { ServiceHealth } from '#/api';
import type { ModelStatus } from '#/types/model';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElCard, ElTable, ElTableColumn, ElTag } from 'element-plus';

import {
  checkAllServices,
  getModelStatus,
  getPolicyList,
  getRuleList,
} from '#/api';

const ruleTotal = ref(0);
const policyTotal = ref(0);
const models = ref<ModelStatus[]>([]);
const services = ref<ServiceHealth[]>([]);

onMounted(async () => {
  const [ruleRes, policyRes, modelRes, serviceRes] = await Promise.allSettled([
    getRuleList({ page: 1, page_size: 1 }),
    getPolicyList({ page: 1, page_size: 1 }),
    getModelStatus(),
    checkAllServices(),
  ]);
  if (ruleRes.status === 'fulfilled') ruleTotal.value = ruleRes.value.total;
  if (policyRes.status === 'fulfilled')
    policyTotal.value = policyRes.value.total;
  if (modelRes.status === 'fulfilled') {
    const raw = modelRes.value as any;
    models.value = (
      Array.isArray(raw) ? raw : (raw?.data ?? raw?.models ?? [])
    ) as ModelStatus[];
  }
  if (serviceRes.status === 'fulfilled') services.value = serviceRes.value;
});
</script>

<template>
  <Page title="首页概览">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <ElCard shadow="hover">
        <div class="text-sm text-[var(--el-text-color-secondary)]">
          规则总数
        </div>
        <div class="text-2xl font-bold mt-2">{{ ruleTotal }}</div>
      </ElCard>
      <ElCard shadow="hover">
        <div class="text-sm text-[var(--el-text-color-secondary)]">
          策略总数
        </div>
        <div class="text-2xl font-bold mt-2">{{ policyTotal }}</div>
      </ElCard>
      <ElCard shadow="hover">
        <div class="text-sm text-[var(--el-text-color-secondary)]">模型数</div>
        <div class="text-2xl font-bold mt-2">{{ models.length }}</div>
      </ElCard>
    </div>

    <!-- 服务状态 -->
    <ElCard shadow="hover" class="mb-6">
      <template #header>服务健康状态</template>
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="svc in services"
          :key="svc.name"
          class="flex items-center gap-2"
        >
          <ElTag
            :type="svc.status === 'healthy' ? 'success' : 'danger'"
            size="small"
          >
            {{ svc.status }}
          </ElTag>
          <span class="text-sm">{{ svc.name }}</span>
        </div>
      </div>
    </ElCard>

    <!-- 模型状态 -->
    <ElCard shadow="hover">
      <template #header>模型运行状态</template>
      <ElTable :data="models" stripe>
        <ElTableColumn prop="model_id" label="模型ID" min-width="160" />
        <ElTableColumn prop="event_type" label="事件类型" min-width="100" />
        <ElTableColumn prop="version" label="版本" min-width="120" />
        <ElTableColumn
          prop="is_ready"
          label="状态"
          min-width="80"
          :formatter="(_row: any) => (_row?.is_ready ? '就绪' : '未就绪')"
        />
      </ElTable>
    </ElCard>
  </Page>
</template>
