<script setup lang="ts">
defineEmits<{ search: [] }>();
const platform = defineModel<string>('platform', { default: '' });
const product = defineModel<string>('product', { default: '' });

</script>

<template>
  <div class="mb-4 flex items-center gap-3">
    <el-input v-model="platform" placeholder="平台ID" clearable class="!w-40" />
    <el-input v-model="product" placeholder="产品ID" clearable class="!w-40" />
    <slot></slot>
    <el-button type="primary" @click="$emit('search')">搜索</el-button>
  </div>
</template>
