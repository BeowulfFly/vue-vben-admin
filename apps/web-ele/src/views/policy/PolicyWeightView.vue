<script setup lang="ts">
import type { PolicyWeight } from '#/types/policy';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElMessage,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import {
  createPolicyWeight,
  getPolicyWeightList,
  updatePolicyWeight,
} from '#/api';

const loading = ref(false);
const data = ref<PolicyWeight[]>([]);
const editingWeight = ref<null | PolicyWeight>(null);
const form = ref({
  policy_id: '',
  rule_weight: 50,
  model_weight: 50,
  comment: '',
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) return;
    if (editingWeight.value) {
      const row = editingWeight.value;
      form.value = {
        policy_id: row.policy_id,
        rule_weight: row.rule_weight,
        model_weight: row.model_weight,
        comment: row.comment,
      };
    } else {
      form.value = {
        policy_id: '',
        rule_weight: 50,
        model_weight: 50,
        comment: '',
      };
    }
  },
  async onConfirm() {
    if (!form.value.policy_id) {
      ElMessage.warning('请输入关联策略ID');
      return;
    }
    modalApi.setState({ confirmLoading: true });
    try {
      await (editingWeight.value ? updatePolicyWeight({
          id: editingWeight.value.id,
          rule_weight: form.value.rule_weight,
          model_weight: form.value.model_weight,
          comment: form.value.comment,
        }) : createPolicyWeight(form.value));
      ElMessage.success(editingWeight.value ? '更新成功' : '创建成功');
      modalApi.close();
      fetchData();
    } finally {
      modalApi.setState({ confirmLoading: false });
    }
  },
});

async function fetchData() {
  loading.value = true;
  try {
    const res = await getPolicyWeightList();
    data.value = res.data;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

function handleCreate() {
  editingWeight.value = null;
  modalApi.open();
}

function handleEdit(row: PolicyWeight) {
  editingWeight.value = row;
  modalApi.open();
}
</script>

<template>
  <Page title="策略权重配置">
    <template #extra>
      <ElButton type="primary" @click="handleCreate">新建权重</ElButton>
    </template>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="policy_id" label="关联策略ID" min-width="200" />
      <ElTableColumn prop="rule_weight" label="规则权重" min-width="100" />
      <ElTableColumn prop="model_weight" label="模型权重" min-width="100" />
      <ElTableColumn prop="comment" label="备注" min-width="160" />
      <ElTableColumn label="操作" min-width="80">
        <template #default="slotProps">
          <ElButton link type="primary" @click="handleEdit(slotProps.row)">
编辑
</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <Modal :title="editingWeight ? '编辑权重' : '新建权重'">
      <ElForm :model="form" label-width="100px">
        <ElFormItem label="关联策略ID" required>
          <ElInput v-model="form.policy_id" :disabled="!!editingWeight" />
        </ElFormItem>
        <ElFormItem label="规则权重">
          <ElInputNumber v-model="form.rule_weight" :min="0" :max="100" />
        </ElFormItem>
        <ElFormItem label="模型权重">
          <ElInputNumber v-model="form.model_weight" :min="0" :max="100" />
        </ElFormItem>
        <ElFormItem label="备注">
          <ElInput v-model="form.comment" type="textarea" :rows="2" />
        </ElFormItem>
      </ElForm>
    </Modal>
  </Page>
</template>
