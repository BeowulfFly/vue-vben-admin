import { ref } from 'vue';

export function usePagination(defaultPageSize = 10) {
  const page = ref(1);
  const pageSize = ref(defaultPageSize);
  const total = ref(0);

  function handleCurrentChange(val: number) {
    page.value = val;
  }

  function handleSizeChange(val: number) {
    pageSize.value = val;
    page.value = 1;
  }

  function reset() {
    page.value = 1;
    total.value = 0;
  }

  return {
    page,
    pageSize,
    total,
    handleCurrentChange,
    handleSizeChange,
    reset,
  };
}
