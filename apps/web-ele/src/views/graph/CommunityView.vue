<script setup lang="ts">
import type { CommunityDistribution } from '#/types/graph';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  ElOption,
  ElSelect,
  ElSlider,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import { getCommunityDistribution } from '#/api';
import PlatformProductFilter from '#/components/PlatformProductFilter.vue';
import { usePlatformFilter } from '#/composables/usePlatformFilter';

const { platform, product } = usePlatformFilter();
const behavior = ref('login');
const topN = ref(20);
const loading = ref(false);
const data = ref<CommunityDistribution[]>([]);

async function fetchData() {
  if (!platform.value || !product.value) return;
  loading.value = true;
  try {
    const res = await getCommunityDistribution({
      platform: platform.value,
      product: product.value,
      behavior: behavior.value,
      top_n: topN.value,
    });
    data.value = res.data;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Page title="社区分布">
    <PlatformProductFilter
      v-model:platform="platform"
      v-model:product="product"
      @search="fetchData"
    >
      <ElSelect v-model="behavior" class="!w-28">
        <ElOption label="登录" value="login" />
        <ElOption label="游戏" value="game" />
      </ElSelect>
      <ElSlider v-model="topN" :min="5" :max="200" :step="5" class="!w-32" />
    </PlatformProductFilter>

    <ElTable v-loading="loading" :data="data" stripe>
      <ElTableColumn prop="community_id" label="社区ID" min-width="160" />
      <ElTableColumn prop="size" label="成员数量" sortable min-width="120" />
    </ElTable>
  </Page>
</template>
