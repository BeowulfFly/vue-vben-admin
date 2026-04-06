<script setup lang="ts">
import type { SharedDeviceGroup } from '#/types/graph';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElSlider, ElTable, ElTableColumn, ElTag } from 'element-plus';

import { getSharedDevices } from '#/api';
import PlatformProductFilter from '#/components/PlatformProductFilter.vue';
import { usePlatformFilter } from '#/composables/usePlatformFilter';

const { platform, product } = usePlatformFilter();
const minUsers = ref(10);
const loading = ref(false);
const data = ref<SharedDeviceGroup[]>([]);

async function fetchData() {
  if (!platform.value || !product.value) return;
  loading.value = true;
  try {
    const res = await getSharedDevices({
      platform: platform.value,
      product: product.value,
      min_shared_users: minUsers.value,
    });
    data.value = res.data;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Page title="共享设备团伙">
    <PlatformProductFilter
      v-model:platform="platform"
      v-model:product="product"
      @search="fetchData"
    >
      <span class="text-sm">最少共享用户:</span>
      <ElSlider v-model="minUsers" :min="2" :max="100" class="!w-32" />
    </PlatformProductFilter>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn type="expand">
        <template #default="slotProps">
          <div class="p-4">
            <ElTag
              v-for="uid in slotProps?.row?.user_ids"
              :key="uid"
              size="small"
              class="mr-1 mb-1"
              >
{{ uid }}
</ElTag>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="shared_device" label="设备ID" min-width="200" />
      <ElTableColumn
        prop="user_count"
        label="共享用户数"
        sortable
        min-width="120"
      />
    </ElTable>
  </Page>
</template>
