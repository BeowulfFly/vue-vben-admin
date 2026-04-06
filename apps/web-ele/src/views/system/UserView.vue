<script setup lang="ts">
import type { User } from '#/types/auth';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElInput,
  ElTag,
} from 'element-plus';

import { getUser } from '#/api';

const searchUserId = ref('');
const userData = ref<null | User>(null);

const [Modal, modalApi] = useVbenModal({
  footer: false,
});

async function handleSearch() {
  if (!searchUserId.value) return;
  const res = await getUser(searchUserId.value);
  userData.value = res.data;
}
</script>

<template>
  <Page title="用户管理">
    <template #extra>
      <ElButton type="primary" @click="modalApi.open()">新建用户</ElButton>
    </template>

    <div class="flex items-center gap-3 mb-4">
      <ElInput
        v-model="searchUserId"
        placeholder="输入用户ID查询"
        clearable
        class="!w-60"
        @keyup.enter="handleSearch"
      />
      <ElButton type="primary" @click="handleSearch">查询</ElButton>
    </div>

    <ElDescriptions v-if="userData" :column="2" border>
      <ElDescriptionsItem label="用户名">
{{
        userData.username
      }}
</ElDescriptionsItem>
      <ElDescriptionsItem label="邮箱">
{{
        userData.email
      }}
</ElDescriptionsItem>
      <ElDescriptionsItem label="手机">
{{
        userData.phone
      }}
</ElDescriptionsItem>
      <ElDescriptionsItem label="平台">
{{
        userData.platform_id
      }}
</ElDescriptionsItem>
      <ElDescriptionsItem label="产品">
{{
        userData.product_id
      }}
</ElDescriptionsItem>
      <ElDescriptionsItem label="状态">
        <ElTag
          :type="userData.status === 1 ? 'success' : 'info'"
          size="small"
          >
{{ userData.status === 1 ? '启用' : '禁用' }}
</ElTag>
      </ElDescriptionsItem>
    </ElDescriptions>

    <Modal title="新建用户">
      <p>注册表单开发中...</p>
    </Modal>
  </Page>
</template>
