import type {
  CommunityDistribution,
  SharedDeviceGroup,
  SharedIpGroup,
} from '#/types/graph';

import { requestClient } from '../request';

export function getCommunityDistribution(params: {
  behavior: string;
  platform: string;
  product: string;
  top_n?: number;
}) {
  return requestClient.get<{ data: CommunityDistribution[] }>(
    '/api/v1/community/distribution',
    { params },
  );
}

export function getSharedDevices(params: {
  min_shared_users?: number;
  platform: string;
  product: string;
}) {
  return requestClient.get<{ data: SharedDeviceGroup[] }>(
    '/api/v1/risk/shared-devices',
    { params },
  );
}

export function getSharedIps(params: {
  min_shared_users?: number;
  platform: string;
  product: string;
}) {
  return requestClient.get<{ data: SharedIpGroup[] }>(
    '/api/v1/risk/shared-ips',
    { params },
  );
}
