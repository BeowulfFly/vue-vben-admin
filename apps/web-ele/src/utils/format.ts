/**
 * 毫秒时间戳转日期字符串
 */
export function formatTimestamp(ts: number | string, withTime = true): string {
  if (!ts) return '-';
  const n = typeof ts === 'string' ? Number(ts) : ts;
  if (Number.isNaN(n)) return '-';
  const date = new Date(n > 1e12 ? n : n * 1000);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  if (!withTime) return `${y}-${m}-${d}`;
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

/**
 * 数字格式化（千分位）
 */
export function formatNumber(num: number): string {
  if (num === null || num === undefined) return '-';
  return num.toLocaleString();
}

/**
 * 分数展示（保留两位小数）
 */
export function formatScore(score: number): string {
  if (score === null || score === undefined || score < 0) return '-';
  return score.toFixed(2);
}
