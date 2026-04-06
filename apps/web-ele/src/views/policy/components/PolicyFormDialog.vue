<script setup lang="ts">
import type { Policy } from '#/types/policy';

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

import { createPolicy, updatePolicy } from '#/api';
import { EVENT_TYPE_OPTIONS } from '#/constants/enums';

const props = defineProps<{ policy: null | Policy }>();
const emit = defineEmits<{ saved: [] }>();

const form = ref({
  name: '',
  platform_id: 0,
  product_id: 0,
  model: '',
  scene: '',
  status: true,
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) return;
    form.value = props.policy ? {
        name: props.policy.name,
        platform_id: props.policy.platform_id,
        product_id: props.policy.product_id,
        model: props.policy.model,
        scene: props.policy.scene,
        status: props.policy.status,
      } : {
        name: '',
        platform_id: 0,
        product_id: 0,
        model: '',
        scene: '',
        status: true,
      };
  },
  async onConfirm() {
    if (!form.value.name) {
      ElMessage.warning('请输入策略名称');
      return;
    }
    modalApi.setState({ confirmLoading: true });
    try {
      await (props.policy ? updatePolicy({ id: props.policy.id, ...form.value }) : createPolicy(form.value));
      ElMessage.success(props.policy ? '更新成功' : '创建成功');
      modalApi.close();
      emit('saved');
    } finally {
      modalApi.setState({ confirmLoading: false });
    }
  },
});
</script>

<template>
  <Modal :title="policy ? '编辑策略' : '新建策略'">
    <ElForm :model="form" label-width="90px">
      <ElFormItem label="策略名称" required>
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="平台ID">
        <ElInputNumber v-model="form.platform_id" :min="0" />
      </ElFormItem>
      <ElFormItem label="产品ID">
        <ElInputNumber v-model="form.product_id" :min="0" />
      </ElFormItem>
      <ElFormItem label="关联模型">
        <ElInput v-model="form.model" />
      </ElFormItem>
      <ElFormItem label="场景">
        <ElSelect
          v-model="form.scene"
          placeholder="请选择场景"
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
      </ElFormItem>
      <ElFormItem label="状态">
        <ElSwitch v-model="form.status" />
      </ElFormItem>
    </ElForm>
  </Modal>
</template>
