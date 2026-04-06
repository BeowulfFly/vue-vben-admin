import type { ApiResponse, PaginatedResponse } from '#/types/api';
import type {
  CreatePolicyRequest,
  CreatePolicyWeightRequest,
  DecisionConfig,
  Policy,
  PolicyWeight,
  UpdatePolicyRequest,
  UpdatePolicyWeightRequest,
} from '#/types/policy';

import { requestClient } from '../request';

// ========== 策略 ==========

export function getPolicyList(params: {
  page?: number;
  page_size?: number;
  platform_id?: number;
  product_id?: number;
  scene?: string;
}) {
  return requestClient.get<PaginatedResponse<Policy>>('/v1/policy/list', {
    params,
  });
}

export function getPolicy(id: string) {
  return requestClient.get<ApiResponse<Policy>>('/v1/policy/get', {
    params: { id },
  });
}

export function createPolicy(data: CreatePolicyRequest) {
  return requestClient.post<ApiResponse<Policy>>('/v1/policy/create', data);
}

export function updatePolicy(data: UpdatePolicyRequest) {
  return requestClient.post<ApiResponse<Policy>>('/v1/policy/update', data);
}

export function deletePolicy(id: string) {
  return requestClient.post<ApiResponse<Policy>>('/v1/policy/delete', { id });
}

// ========== 策略权重 ==========

export function getPolicyWeightList() {
  return requestClient.get<ApiResponse<PolicyWeight[]>>(
    '/v1/policy-weight/list',
  );
}

export function getPolicyWeight(policy_id: string) {
  return requestClient.get<ApiResponse<PolicyWeight>>('/v1/policy-weight/get', {
    params: { policy_id },
  });
}

export function createPolicyWeight(data: CreatePolicyWeightRequest) {
  return requestClient.post<ApiResponse<PolicyWeight>>(
    '/v1/policy-weight/create',
    data,
  );
}

export function updatePolicyWeight(data: UpdatePolicyWeightRequest) {
  return requestClient.post<ApiResponse<PolicyWeight>>(
    '/v1/policy-weight/update',
    data,
  );
}

// ========== 决策配置 ==========

export function getDecisionConfigList(params: {
  app_id?: string;
  platform_id?: string;
  product_id?: string;
}) {
  return requestClient.get<ApiResponse<DecisionConfig[]>>(
    '/v1/risk/decision-config-list',
    { params },
  );
}

export function getDecisionConfig(params: {
  app_id: string;
  event_type: string;
  platform_id: string;
  product_id: string;
}) {
  return requestClient.get<ApiResponse<DecisionConfig>>(
    '/v1/risk/decision-config-get',
    { params },
  );
}

export function saveDecisionConfig(config: DecisionConfig) {
  return requestClient.post('/v1/risk/decision-config-save', { config });
}

export function deleteDecisionConfig(params: {
  app_id: string;
  event_type: string;
  platform_id: string;
  product_id: string;
}) {
  return requestClient.delete('/v1/risk/decision-config-delete', { params });
}
