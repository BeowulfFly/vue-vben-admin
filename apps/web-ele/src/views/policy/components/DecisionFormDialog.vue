<script setup lang="ts">
import type { DecisionConfig } from '#/types/policy';

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
} from 'element-plus';

import { saveDecisionConfig } from '#/api';
import { EVENT_TYPE_OPTIONS } from '#/constants/enums';

const props = defineProps<{ config: DecisionConfig | null }>();
const emit = defineEmits<{ saved: [] }>();

const form = ref({
  policyName: '',
  eventType: '',
  model: '',
  appId: '',
  platformId: '',
  productId: '',
  policyWeight: { ruleWeight: 50, modelWeight: 50 },
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) return;
    form.value = props.config ? {
        policyName: props.config.policyName,
        eventType: props.config.eventType,
        model: props.config.model,
        appId: props.config.appId,
        platformId: props.config.platformId,
        productId: props.config.productId,
        policyWeight: { ...props.config.policyWeight },
      } : {
        policyName: '',
        eventType: '',
        model: '',
        appId: '',
        platformId: '',
        productId: '',
        policyWeight: { ruleWeight: 50, modelWeight: 50 },
      };
  },
  async onConfirm() {
    if (!form.value.policyName || !form.value.eventType) {
      ElMessage.warning('请填写策略名称和事件类型');
      return;
    }
    modalApi.setState({ confirmLoading: true });
    try {
      const payload: DecisionConfig = {
        ...form.value,
        rules: props.config?.rules ?? [],
      };
      await saveDecisionConfig(payload);
      ElMessage.success('保存成功');
      modalApi.close();
      emit('saved');
    } finally {
      modalApi.setState({ confirmLoading: false });
    }
  },
});
</script>

<template>
  <Modal :title="config ? '编辑决策配置' : '新建决策配置'">
    <ElForm :model="form" label-width="90px">
      <ElFormItem label="策略名称" required>
        <ElInput v-model="form.policyName" />
      </ElFormItem>
      <ElFormItem label="事件类型" required>
        <ElSelect v-model="form.eventType" class="!w-40">
          <ElOption
            v-for="opt in EVENT_TYPE_OPTIONS"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="关联模型">
        <ElInput v-model="form.model" />
      </ElFormItem>
      <ElFormItem label="应用ID">
        <ElInput v-model="form.appId" />
      </ElFormItem>
      <ElFormItem label="平台ID">
        <ElInput v-model="form.platformId" />
      </ElFormItem>
      <ElFormItem label="产品ID">
        <ElInput v-model="form.productId" />
      </ElFormItem>
      <ElFormItem label="规则权重">
        <ElInputNumber
          v-model="form.policyWeight.ruleWeight"
          :min="0"
          :max="100"
        />
      </ElFormItem>
      <ElFormItem label="模型权重">
        <ElInputNumber
          v-model="form.policyWeight.modelWeight"
          :min="0"
          :max="100"
        />
      </ElFormItem>
    </ElForm>
  </Modal>
</template>
