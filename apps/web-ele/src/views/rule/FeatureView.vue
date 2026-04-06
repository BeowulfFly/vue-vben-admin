<script setup lang="ts">
import type { Feature } from '#/types/rule';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElOption,
  ElPopconfirm,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus';

import {
  createFeature,
  deleteFeature,
  getFeatureList,
  updateFeature,
} from '#/api';
import { FEATURE_TYPE_MAP } from '#/constants/enums';
import { formatTimestamp } from '#/utils/format';

const loading = ref(false);
const data = ref<Feature[]>([]);
const editingFeature = ref<Feature | null>(null);
const form = ref({
  name: '',
  description: '',
  valueType: 'string',
  defaultValue: '',
  featureType: 1,
  enabled: true,
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) return;
    if (editingFeature.value) {
      const row = editingFeature.value;
      form.value = {
        name: row.name,
        description: row.description,
        valueType: row.valueType,
        defaultValue: row.defaultValue,
        featureType: row.featureType,
        enabled: row.enabled,
      };
    } else {
      form.value = {
        name: '',
        description: '',
        valueType: 'string',
        defaultValue: '',
        featureType: 1,
        enabled: true,
      };
    }
  },
  async onConfirm() {
    if (!form.value.name) {
      ElMessage.warning('请输入名称');
      return;
    }
    modalApi.setState({ confirmLoading: true });
    try {
      await (editingFeature.value ? updateFeature({
          id: editingFeature.value.id,
          name: form.value.name,
          description: form.value.description,
          value_type: form.value.valueType,
          default_value: form.value.defaultValue,
          feature_type: form.value.featureType,
          enabled: form.value.enabled,
        }) : createFeature({
          name: form.value.name,
          description: form.value.description,
          value_type: form.value.valueType,
          default_value: form.value.defaultValue,
          feature_type: form.value.featureType,
          enabled: form.value.enabled,
        }));
      ElMessage.success(editingFeature.value ? '更新成功' : '创建成功');
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
    const res = await getFeatureList();
    data.value = res.data;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

function handleCreate() {
  editingFeature.value = null;
  modalApi.open();
}

function handleEdit(row: Feature) {
  editingFeature.value = row;
  modalApi.open();
}

async function handleDelete(id: string) {
  await deleteFeature(id);
  fetchData();
}
</script>

<template>
  <Page title="特征管理">
    <template #extra>
      <ElButton type="primary" @click="handleCreate">新建特征</ElButton>
    </template>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="name" label="名称" min-width="160" />
      <ElTableColumn prop="description" label="描述" min-width="200" />
      <ElTableColumn prop="valueType" label="值类型" min-width="90" />
      <ElTableColumn prop="defaultValue" label="默认值" min-width="90" />
      <ElTableColumn label="特征类型" min-width="100">
        <template #default="slotProps">
{{
          FEATURE_TYPE_MAP[slotProps?.row?.featureType] ||
          slotProps?.row?.featureType
        }}
</template>
      </ElTableColumn>
      <ElTableColumn label="启用" min-width="70">
        <template #default="slotProps">
          <ElTag
            :type="slotProps?.row?.enabled ? 'success' : 'info'"
            size="small"
            >
{{ slotProps?.row?.enabled ? '是' : '否' }}
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

    <Modal :title="editingFeature ? '编辑特征' : '新建特征'">
      <ElForm :model="form" label-width="80px">
        <ElFormItem label="名称" required>
          <ElInput v-model="form.name" />
        </ElFormItem>
        <ElFormItem label="描述">
          <ElInput v-model="form.description" type="textarea" :rows="2" />
        </ElFormItem>
        <ElFormItem label="值类型">
          <ElSelect v-model="form.valueType" class="!w-36">
            <ElOption label="string" value="string" />
            <ElOption label="int" value="int" />
            <ElOption label="float" value="float" />
            <ElOption label="bool" value="bool" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="默认值">
          <ElInput v-model="form.defaultValue" />
        </ElFormItem>
        <ElFormItem label="特征类型">
          <ElSelect v-model="form.featureType" class="!w-36">
            <ElOption
              v-for="(label, val) in FEATURE_TYPE_MAP"
              :key="val"
              :label="label"
              :value="Number(val)"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="启用">
          <ElSwitch v-model="form.enabled" />
        </ElFormItem>
      </ElForm>
    </Modal>
  </Page>
</template>
