<script setup lang="ts">
import type { RiskDecision } from '#/types/risk';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  ElDatePicker,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import { usePagination } from '#/composables/usePagination';
import {
  DECISION_TYPE_MAP,
  EVENT_TYPE_OPTIONS,
} from '#/constants/enums';
import { formatScore, formatTimestamp } from '#/utils/format';

const { page, pageSize, total } = usePagination();
const loading = ref(false);
const data = ref<RiskDecision[]>([]);
const filterEventType = ref('');

// TODO: 后端需补充决策记录查询接口
</script>

<template>
  <Page title="决策记录">
    <div class="flex items-center gap-3 mb-4">
      <ElSelect
        v-model="filterEventType"
        placeholder="事件类型"
        clearable
        class="!w-40"
      >
        <ElOption
          v-for="opt in EVENT_TYPE_OPTIONS"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </ElSelect>
      <ElDatePicker type="daterange" placeholder="时间范围" class="!w-64" />
    </div>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn type="expand">
        <template #default="slotProps">
          <pre class="text-xs p-4 bg-[var(--el-fill-color-light)] rounded">{{
            slotProps?.row?.feature
          }}</pre>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="uid" label="UID" min-width="100" />
      <ElTableColumn prop="bizId" label="业务ID" min-width="140" />
      <ElTableColumn prop="eventType" label="事件类型" min-width="100" />
      <ElTableColumn label="规则分" min-width="80">
        <template #default="slotProps">
{{
          formatScore(slotProps?.row?.ruleScore)
        }}
</template>
      </ElTableColumn>
      <ElTableColumn label="模型分" min-width="80">
        <template #default="slotProps">
{{
          formatScore(slotProps?.row?.modelScore)
        }}
</template>
      </ElTableColumn>
      <ElTableColumn label="融合分" min-width="80">
        <template #default="slotProps">
{{
          formatScore(slotProps?.row?.finalScore)
        }}
</template>
      </ElTableColumn>
      <ElTableColumn label="决策" min-width="100">
        <template #default="slotProps">
          <ElTag
            :type="
              DECISION_TYPE_MAP[slotProps?.row?.decisionType]?.color as any
            "
            size="small"
          >
            {{
              DECISION_TYPE_MAP[slotProps?.row?.decisionType]?.label ||
              slotProps?.row?.decisionType
            }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="hitRules" label="命中规则" min-width="160" />
      <ElTableColumn label="触发时间" min-width="160">
        <template #default="slotProps">
{{
          formatTimestamp(slotProps?.row?.eventTime)
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
    />
  </Page>
</template>
