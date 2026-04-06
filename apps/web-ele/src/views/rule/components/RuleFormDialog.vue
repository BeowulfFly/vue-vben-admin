<script setup lang="ts">
import type { Rule, RuleCondition } from '#/types/rule';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElMessage,
  ElOption,
  ElSelect,
  ElSwitch,
} from 'element-plus';

import { createRule, updateRule } from '#/api';
import { RULE_TYPE_MAP } from '#/constants/enums';

import ConditionEditor from './ConditionEditor.vue';

const props = defineProps<{
  groups?: { id: string; name: string }[];
  rule: null | Rule;
}>();

const emit = defineEmits<{ saved: [] }>();

const saving = ref(false);
const form = ref({
  name: '',
  description: '',
  type: 1,
  groupId: '',
  score: 0,
  priority: 0,
  enabled: true,
  conditions: [] as RuleCondition[],
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) return;
    form.value = props.rule ? {
        name: props.rule.name,
        description: props.rule.description,
        type: props.rule.type,
        groupId: props.rule.groupId,
        score: props.rule.score,
        priority: props.rule.priority,
        enabled: props.rule.enabled,
        conditions: props.rule.conditions ? [...props.rule.conditions] : [],
      } : {
        name: '',
        description: '',
        type: 1,
        groupId: '',
        score: 0,
        priority: 0,
        enabled: true,
        conditions: [],
      };
  },
  async onConfirm() {
    if (!form.value.name) {
      ElMessage.warning('请输入规则名称');
      return;
    }
    saving.value = true;
    modalApi.setState({ confirmLoading: true });
    try {
      await (props.rule ? updateRule({
          id: props.rule.id,
          name: form.value.name,
          description: form.value.description,
          type: form.value.type,
          group_id: form.value.groupId || undefined,
          score: form.value.score,
          priority: form.value.priority,
          enabled: form.value.enabled,
          conditions: form.value.conditions,
        }) : createRule({
          name: form.value.name,
          description: form.value.description,
          type: form.value.type,
          group_id: form.value.groupId || undefined,
          score: form.value.score,
          priority: form.value.priority,
          enabled: form.value.enabled,
          conditions: form.value.conditions,
        }));
      ElMessage.success(props.rule ? '更新成功' : '创建成功');
      modalApi.close();
      emit('saved');
    } finally {
      saving.value = false;
      modalApi.setState({ confirmLoading: false });
    }
  },
});
</script>

<template>
  <Modal :title="rule ? '编辑规则' : '新建规则'">
    <ElForm :model="form" label-width="80px">
      <ElFormItem label="规则名称" required>
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="描述">
        <ElInput v-model="form.description" type="textarea" :rows="2" />
      </ElFormItem>
      <ElFormItem label="类型">
        <ElSelect v-model="form.type" class="!w-40">
          <ElOption
            v-for="(label, val) in RULE_TYPE_MAP"
            :key="val"
            :label="label"
            :value="Number(val)"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="规则组" v-if="groups?.length">
        <ElSelect
          v-model="form.groupId"
          placeholder="不分组"
          clearable
          class="!w-52"
        >
          <ElOption
            v-for="g in groups"
            :key="g.id"
            :label="g.name"
            :value="g.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="分值">
        <ElInputNumber v-model="form.score" :min="0" :max="100" />
      </ElFormItem>
      <ElFormItem label="优先级">
        <ElInputNumber v-model="form.priority" :min="0" />
      </ElFormItem>
      <ElFormItem label="启用">
        <ElSwitch v-model="form.enabled" />
      </ElFormItem>
      <ElFormItem label="条件">
        <ConditionEditor v-model:conditions="form.conditions" />
      </ElFormItem>
    </ElForm>
  </Modal>
</template>
