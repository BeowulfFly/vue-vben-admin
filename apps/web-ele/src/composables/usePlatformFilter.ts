import { ref } from 'vue';

export function usePlatformFilter() {
  const platform = ref('');
  const product = ref('');

  function reset() {
    platform.value = '';
    product.value = '';
  }

  return { platform, product, reset };
}
