<script setup lang="ts">
import type { RuleGroup } from '#/types/rule';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElMessage,
  ElPopconfirm,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import {
  createRuleGroup,
  deleteRuleGroup,
  getRuleGroupList,
  updateRuleGroup,
} from '#/api';
import { formatTimestamp } from '#/utils/format';

const loading = ref(false);
const data = ref<RuleGroup[]>([]);
const editingGroup = ref<null | RuleGroup>(null);
const form = ref({ name: '', description: '', priority: 0, enabled: true });

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) return;
    if (editingGroup.value) {
      const row = editingGroup.value;
      form.value = {
        name: row.name,
        description: row.description,
        priority: row.priority,
        enabled: row.enabled,
      };
    } else {
      form.value = { name: '', description: '', priority: 0, enabled: true };
    }
  },
  async onConfirm() {
    if (!form.value.name) {
      ElMessage.warning('请输入名称');
      return;
    }
    modalApi.setState({ confirmLoading: true });
    try {
      await (editingGroup.value ? updateRuleGroup({ id: editingGroup.value.id, ...form.value }) : createRuleGroup(form.value));
      ElMessage.success(editingGroup.value ? '更新成功' : '创建成功');
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
    const res = await getRuleGroupList();
    data.value = res.data;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

function handleCreate() {
  editingGroup.value = null;
  modalApi.open();
}

function handleEdit(row: RuleGroup) {
  editingGroup.value = row;
  modalApi.open();
}

async function handleDelete(id: string) {
  await deleteRuleGroup(id);
  fetchData();
}
</script>

<template>
  <Page title="规则组管理">
    <template #extra>
      <ElButton type="primary" @click="handleCreate">新建规则组</ElButton>
    </template>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="name" label="名称" min-width="160" />
      <ElTableColumn prop="description" label="描述" min-width="200" />
      <ElTableColumn prop="priority" label="优先级" min-width="80" />
      <ElTableColumn label="启用" min-width="80">
        <template #default="slotProps">
          <ElTag
            :type="slotProps?.row?.enabled ? 'success' : 'info'"
            size="small"
            >
{{ slotProps?.row?.enabled ? '是' : '否' }}
</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="关联规则数" min-width="100">
        <template #default="slotProps">
{{
          slotProps?.row?.ruleIds?.length || 0
        }}
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

    <Modal :title="editingGroup ? '编辑规则组' : '新建规则组'">
      <ElForm :model="form" label-width="80px">
        <ElFormItem label="名称" required>
          <ElInput v-model="form.name" />
        </ElFormItem>
        <ElFormItem label="描述">
          <ElInput v-model="form.description" type="textarea" :rows="2" />
        </ElFormItem>
        <ElFormItem label="优先级">
          <ElInputNumber v-model="form.priority" :min="0" />
        </ElFormItem>
        <ElFormItem label="启用">
          <ElSwitch v-model="form.enabled" />
        </ElFormItem>
      </ElForm>
    </Modal>
  </Page>
</template>
