<script setup lang="ts">
import type { Policy } from '#/types/policy';

import { onMounted, ref, watch } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { deletePolicy, getPolicyList } from '#/api';
import { usePagination } from '#/composables/usePagination';
import { EVENT_TYPE_OPTIONS } from '#/constants/enums';
import { formatTimestamp } from '#/utils/format';

import PolicyFormDialog from './components/PolicyFormDialog.vue';

const { page, pageSize, total, handleCurrentChange, handleSizeChange } =
  usePagination();
const loading = ref(false);
const data = ref<Policy[]>([]);
const filterScene = ref('');
const editingPolicy = ref<null | Policy>(null);

const [PolicyModal, policyModalApi] = useVbenModal({
  connectedComponent: PolicyFormDialog,
});

async function fetchData() {
  loading.value = true;
  try {
    const res = await getPolicyList({
      page: page.value,
      page_size: pageSize.value,
      scene: filterScene.value || undefined,
    });
    data.value = res.data;
    total.value = res.total;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);
watch([page, pageSize], fetchData);

function handleCreate() {
  editingPolicy.value = null;
  policyModalApi.open();
}

function handleEdit(row: Policy) {
  editingPolicy.value = row;
  policyModalApi.open();
}

async function handleDelete(id: string) {
  await deletePolicy(id);
  fetchData();
}
</script>

<template>
  <Page title="策略列表">
    <template #extra>
      <ElButton type="primary" @click="handleCreate">新建策略</ElButton>
    </template>

    <div class="flex items-center gap-3 mb-4">
      <ElSelect
        v-model="filterScene"
        placeholder="场景筛选"
        clearable
        class="!w-40"
        @change="fetchData"
      >
        <ElOption
          v-for="opt in EVENT_TYPE_OPTIONS"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </ElSelect>
    </div>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="name" label="策略名称" min-width="160" />
      <ElTableColumn prop="platform_id" label="平台" min-width="80" />
      <ElTableColumn prop="product_id" label="产品" min-width="80" />
      <ElTableColumn prop="model" label="关联模型" min-width="140" />
      <ElTableColumn prop="scene" label="场景" min-width="80" />
      <ElTableColumn label="状态" min-width="80">
        <template #default="slotProps">
          <ElTag
            :type="slotProps?.row?.status ? 'success' : 'info'"
            size="small"
            >
{{ slotProps?.row?.status ? '启用' : '禁用' }}
</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" min-width="160">
        <template #default="slotProps">
{{
          formatTimestamp(slotProps?.row?.updated_at)
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
            @confirm="handleDelete(slotProps.row.id)"
          >
            <template #reference>
<ElButton link type="danger">删除</ElButton>
</template>
          </ElPopconfirm>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      class="mt-4 justify-end"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <PolicyModal :policy="editingPolicy" @saved="fetchData" />
  </Page>
</template>
