<script setup lang="ts">
import type { DecisionConfig } from '#/types/policy';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElInput,
  ElPopconfirm,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import { deleteDecisionConfig, getDecisionConfigList } from '#/api';
import PlatformProductFilter from '#/components/PlatformProductFilter.vue';
import { usePlatformFilter } from '#/composables/usePlatformFilter';

import DecisionFormDialog from './components/DecisionFormDialog.vue';

const { platform, product } = usePlatformFilter();
const loading = ref(false);
const data = ref<DecisionConfig[]>([]);
const appId = ref('');
const editingConfig = ref<DecisionConfig | null>(null);

const [DecisionModal, decisionModalApi] = useVbenModal({
  connectedComponent: DecisionFormDialog,
});

async function fetchData() {
  loading.value = true;
  try {
    const res = (await getDecisionConfigList({
      app_id: appId.value || undefined,
      platform_id: platform.value || undefined,
      product_id: product.value || undefined,
    })) as any;
    data.value = res.configs ?? res.data ?? [];
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

function handleCreate() {
  editingConfig.value = null;
  decisionModalApi.open();
}

function handleEdit(row: DecisionConfig) {
  editingConfig.value = row;
  decisionModalApi.open();
}

async function handleDelete(config: DecisionConfig) {
  await deleteDecisionConfig({
    app_id: config.appId,
    platform_id: config.platformId,
    product_id: config.productId,
    event_type: config.eventType,
  });
  fetchData();
}
</script>

<template>
  <Page title="决策配置">
    <template #extra>
      <ElButton type="primary" @click="handleCreate">新建配置</ElButton>
    </template>

    <PlatformProductFilter
      v-model:platform="platform"
      v-model:product="product"
      @search="fetchData"
    >
      <ElInput v-model="appId" placeholder="应用ID" clearable class="!w-40" />
    </PlatformProductFilter>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="eventType" label="事件类型" min-width="100" />
      <ElTableColumn prop="policyName" label="策略名称" min-width="160" />
      <ElTableColumn prop="model" label="关联模型" min-width="140" />
      <ElTableColumn label="规则权重" min-width="100">
        <template #default="slotProps">
{{
          slotProps?.row?.policyWeight?.ruleWeight
        }}
</template>
      </ElTableColumn>
      <ElTableColumn label="模型权重" min-width="100">
        <template #default="slotProps">
{{
          slotProps?.row?.policyWeight?.modelWeight
        }}
</template>
      </ElTableColumn>
      <ElTableColumn label="规则数" min-width="80">
        <template #default="slotProps">
{{
          slotProps?.row?.rules?.length || 0
        }}
</template>
      </ElTableColumn>
      <ElTableColumn label="操作" min-width="120">
        <template #default="slotProps">
          <ElButton link type="primary" @click="handleEdit(slotProps.row)">
编辑
</ElButton>
          <ElPopconfirm
            title="确认删除？"
            @confirm="handleDelete(slotProps.row)"
          >
            <template #reference>
<ElButton link type="danger">删除</ElButton>
</template>
          </ElPopconfirm>
        </template>
      </ElTableColumn>
    </ElTable>

    <DecisionModal :config="editingConfig" @saved="fetchData" />
  </Page>
</template>
