<script setup lang="ts">
import type { ModelInfo } from '#/types/model';

import { onMounted, ref, watch } from 'vue';

import { Page } from '@vben/common-ui';

import { ElPagination, ElTable, ElTableColumn, ElTag } from 'element-plus';

import { getModelList } from '#/api';
import { usePagination } from '#/composables/usePagination';
import { formatTimestamp } from '#/utils/format';

const { page, pageSize, total, handleCurrentChange, handleSizeChange } =
  usePagination();
const loading = ref(false);
const data = ref<ModelInfo[]>([]);

async function fetchData() {
  loading.value = true;
  try {
    const res = (await getModelList({
      page: page.value,
      page_size: pageSize.value,
    })) as any;
    data.value = res.models ?? res.data ?? [];
    total.value = res.total ?? 0;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);
watch([page, pageSize], fetchData);
</script>

<template>
  <Page title="模型列表">
    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="modelName" label="模型名称" min-width="160" />
      <ElTableColumn prop="modelVersion" label="版本" min-width="140" />
      <ElTableColumn prop="modelType" label="类型" min-width="100" />
      <ElTableColumn prop="description" label="描述" min-width="200" />
      <ElTableColumn label="状态" min-width="80">
        <template #default="slotProps">
          <ElTag
            :type="slotProps?.row?.status === 1 ? 'success' : 'info'"
            size="small"
            >
{{ slotProps?.row?.status === 1 ? '启用' : '禁用' }}
</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" min-width="160">
        <template #default="slotProps">
{{
          formatTimestamp(slotProps?.row?.updatedAt)
        }}
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
  </Page>
</template>
