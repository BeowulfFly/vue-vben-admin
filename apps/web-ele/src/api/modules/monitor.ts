import { requestClient } from '../request';

export interface ServiceHealth {
  name: string;
  url: string;
  status?: 'degraded' | 'error' | 'healthy';
  details?: Record<string, unknown>;
}

const HEALTH_ENDPOINTS: Array<{ name: string; url: string }> = [
  { name: 'Risk Service', url: '/v1/risk/health' },
  { name: 'Feature Service', url: '/api/v1/health/ready' },
  { name: 'Model Service', url: '/api/v1/health' },
];

export async function checkAllServices(): Promise<ServiceHealth[]> {
  const results = await Promise.allSettled(
    HEALTH_ENDPOINTS.map(async (ep) => {
      const res = await requestClient.get(ep.url);
      return {
        name: ep.name,
        url: ep.url,
        status: 'healthy' as const,
        details: res,
      };
    }),
  );

  return results.map((result, i) => {
    if (result.status === 'fulfilled') return result.value;
    return {
      ...(HEALTH_ENDPOINTS[i] as { name: string; url: string }),
      status: 'error' as const,
    };
  });
}

export function triggerGraphRefresh(since_ts?: string) {
  return requestClient.post(
    '/api/v1/jobs/daily-refresh/run',
    since_ts ? { since_ts } : {},
  );
}
