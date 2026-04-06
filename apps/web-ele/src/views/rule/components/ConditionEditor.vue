<script setup lang="ts">
import type { RuleCondition } from '#/types/rule';

import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus';

import { CONDITION_TYPE_MAP, OPERATOR_MAP } from '#/constants/enums';

const props = defineProps<{
  conditions: RuleCondition[];
}>();

const emit = defineEmits<{
  'update:conditions': [value: RuleCondition[]];
}>();

function update(index: number, field: keyof RuleCondition, value: unknown) {
  const next = props.conditions.map((c, i) =>
    i === index ? { ...c, [field]: value } : c,
  );
  emit('update:conditions', next);
}

function addCondition() {
  emit('update:conditions', [
    ...props.conditions,
    { type: 1, featureName: '', operator: 1, value: '' },
  ]);
}

function removeCondition(index: number) {
  emit(
    'update:conditions',
    props.conditions.filter((_, i) => i !== index),
  );
}
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="(cond, i) in conditions"
      :key="i"
      class="flex items-center gap-2 flex-wrap"
    >
      <ElSelect
        :model-value="cond.type"
        placeholder="条件类型"
        class="!w-32"
        @update:model-value="update(i, 'type', $event)"
      >
        <ElOption
          v-for="(label, val) in CONDITION_TYPE_MAP"
          :key="val"
          :label="label"
          :value="Number(val)"
        />
      </ElSelect>
      <ElInput
        :model-value="cond.featureName"
        placeholder="特征名"
        class="!w-40"
        @update:model-value="update(i, 'featureName', $event)"
      />
      <ElSelect
        :model-value="cond.operator"
        placeholder="操作符"
        class="!w-32"
        @update:model-value="update(i, 'operator', $event)"
      >
        <ElOption
          v-for="(label, val) in OPERATOR_MAP"
          :key="val"
          :label="label"
          :value="Number(val)"
        />
      </ElSelect>
      <ElInput
        :model-value="cond.value"
        placeholder="值"
        class="!w-28"
        @update:model-value="update(i, 'value', $event)"
      />
      <ElInput
        v-if="cond.operator === 9"
        :model-value="cond.valueTo"
        placeholder="结束值"
        class="!w-28"
        @update:model-value="update(i, 'valueTo', $event)"
      />
      <ElButton link type="danger" @click="removeCondition(i)">删除</ElButton>
    </div>
    <ElButton type="primary" link @click="addCondition">+ 添加条件</ElButton>
  </div>
</template>
