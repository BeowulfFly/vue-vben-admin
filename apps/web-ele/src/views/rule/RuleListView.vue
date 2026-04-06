<script setup lang="ts">
import type { Rule, RuleGroup } from '#/types/rule';

import { onMounted, ref, watch } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import { deleteRule, enableRule, getRuleGroupList, getRuleList } from '#/api';
import { usePagination } from '#/composables/usePagination';
import { RULE_TYPE_MAP } from '#/constants/enums';
import { formatTimestamp } from '#/utils/format';

import RuleFormDialog from './components/RuleFormDialog.vue';

const { page, pageSize, total, handleCurrentChange, handleSizeChange } =
  usePagination();
const loading = ref(false);
const data = ref<Rule[]>([]);
const groups = ref<RuleGroup[]>([]);
const filterGroupId = ref('');
const editingRule = ref<null | Rule>(null);

const [RuleModal, ruleModalApi] = useVbenModal({
  connectedComponent: RuleFormDialog,
});

async function fetchData() {
  loading.value = true;
  try {
    const res = await getRuleList({
      page: page.value,
      page_size: pageSize.value,
      group_id: filterGroupId.value || undefined,
    });
    data.value = res.data;
    total.value = res.total;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const groupRes = await getRuleGroupList();
  groups.value = groupRes.data;
  fetchData();
});

watch([page, pageSize], fetchData);

function handleCreate() {
  editingRule.value = null;
  ruleModalApi.open();
}

function handleEdit(row: Rule) {
  editingRule.value = row;
  ruleModalApi.open();
}

async function handleDelete(id: string) {
  await deleteRule(id);
  fetchData();
}

async function handleToggleEnable(row: Rule) {
  await enableRule(row.id, !row.enabled);
  fetchData();
}
</script>

<template>
  <Page title="规则列表">
    <template #extra>
      <ElButton type="primary" @click="handleCreate">新建规则</ElButton>
    </template>

    <div class="flex items-center gap-3 mb-4">
      <ElSelect
        v-model="filterGroupId"
        placeholder="按规则组筛选"
        clearable
        class="!w-52"
        @change="fetchData"
      >
        <ElOption
          v-for="g in groups"
          :key="g.id"
          :label="g.name"
          :value="g.id"
        />
      </ElSelect>
    </div>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="name" label="名称" min-width="160" />
      <ElTableColumn label="类型" min-width="100">
        <template #default="slotProps">
{{
          RULE_TYPE_MAP[slotProps?.row?.type] || slotProps?.row?.type
        }}
</template>
      </ElTableColumn>
      <ElTableColumn prop="score" label="分值" min-width="70" />
      <ElTableColumn prop="priority" label="优先级" min-width="70" />
      <ElTableColumn label="启用" min-width="80">
        <template #default="slotProps">
          <ElSwitch
            :model-value="slotProps?.row?.enabled"
            @change="handleToggleEnable(slotProps.row)"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" min-width="160">
        <template #default="slotProps">
{{
          formatTimestamp(slotProps?.row?.updatedAt)
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
            @confirm="handleDelete(slotProps?.row?.id)"
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

    <RuleModal :rule="editingRule" :groups="groups" @saved="fetchData" />
  </Page>
</template>
