<script setup lang="ts">
import { computed } from 'vue';

import { RISK_LEVEL_MAP } from '#/constants/enums';

const props = defineProps<{ level: number }>();

const config = computed(
  () => RISK_LEVEL_MAP[props.level] ?? { label: '未知', color: 'info' },
);
</script>

<template>
  <el-tag :type="(config.color as any) || undefined" size="small">
    {{ config.label }}
  </el-tag>
</template>
