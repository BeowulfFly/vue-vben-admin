<script setup lang="ts">
import type { AppKey } from '#/types/auth';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { ElAlert, ElButton, ElTable, ElTableColumn, ElTag } from 'element-plus';

import { createAppKey } from '#/api';

const createdKey = ref<AppKey | null>(null);
const data = ref<AppKey[]>([]);

const [Modal, modalApi] = useVbenModal({
  footer: false,
});

async function _handleCreate() {
  // TODO: 表单收集 name, platform_id, product_id
  const res = await createAppKey({ name: '', platform_id: '', product_id: '' });
  createdKey.value = res.data;
}
</script>

<template>
  <Page title="应用密钥管理">
    <template #extra>
      <ElButton type="primary" @click="modalApi.open()">创建密钥</ElButton>
    </template>

    <ElTable :data="data" stripe>
      <ElTableColumn prop="name" label="应用名称" min-width="160" />
      <ElTableColumn prop="app_id" label="App ID" min-width="160" />
      <ElTableColumn label="App Secret" min-width="140">
        <template #default>••••••••</template>
      </ElTableColumn>
      <ElTableColumn prop="platform_id" label="平台" min-width="100" />
      <ElTableColumn prop="product_id" label="产品" min-width="100" />
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
    </ElTable>

    <Modal title="创建密钥">
      <p>密钥创建表单开发中...</p>
      <ElAlert v-if="createdKey" type="warning" :closable="false" class="mt-4">
        <p>
          App Secret（仅显示一次）：<strong>{{ createdKey.app_secret }}</strong>
        </p>
      </ElAlert>
    </Modal>
  </Page>
</template>
