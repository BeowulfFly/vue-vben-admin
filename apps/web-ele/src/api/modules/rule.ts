import type { ApiResponse, PaginatedResponse } from '#/types/api';
import type {
  CreateFeatureRequest,
  CreateRuleGroupRequest,
  CreateRuleRequest,
  Feature,
  FeatureValue,
  Rule,
  RuleGroup,
  UpdateFeatureRequest,
  UpdateRuleGroupRequest,
  UpdateRuleRequest,
} from '#/types/rule';

import { requestClient } from '../request';

// ========== 规则 ==========

export function getRuleList(params: {
  group_id?: string;
  page?: number;
  page_size?: number;
}) {
  return requestClient.get<PaginatedResponse<Rule>>('/v1/risk-rule/rule-list', {
    params,
  });
}

export function getRule(id: string) {
  return requestClient.get<ApiResponse<Rule>>('/v1/risk-rule/rule-get', {
    params: { id },
  });
}

export function createRule(data: CreateRuleRequest) {
  return requestClient.post<ApiResponse<Rule>>(
    '/v1/risk-rule/rule-create',
    data,
  );
}

export function updateRule(data: UpdateRuleRequest) {
  return requestClient.post<ApiResponse<Rule>>(
    '/v1/risk-rule/rule-update',
    data,
  );
}

export function deleteRule(id: string) {
  return requestClient.post<ApiResponse<Rule>>('/v1/risk-rule/rule-delete', {
    id,
  });
}

export function enableRule(id: string, enabled: boolean) {
  return requestClient.post<ApiResponse<Rule>>('/v1/risk-rule/rule-enable', {
    id,
    enabled,
  });
}

// ========== 规则组 ==========

export function getRuleGroupList() {
  return requestClient.get<ApiResponse<RuleGroup[]>>(
    '/v1/risk-rule/group-list',
  );
}

export function createRuleGroup(data: CreateRuleGroupRequest) {
  return requestClient.post<ApiResponse<RuleGroup>>(
    '/v1/risk-rule/group-create',
    data,
  );
}

export function updateRuleGroup(data: UpdateRuleGroupRequest) {
  return requestClient.post<ApiResponse<RuleGroup>>(
    '/v1/risk-rule/group-update',
    data,
  );
}

export function deleteRuleGroup(id: string) {
  return requestClient.post<ApiResponse<RuleGroup>>(
    '/v1/risk-rule/group-delete',
    { id },
  );
}

// ========== 特征 ==========

export function getFeatureList() {
  return requestClient.get<ApiResponse<Feature[]>>(
    '/v1/risk-rule/feature-list',
  );
}

export function getFeature(id: string) {
  return requestClient.get<ApiResponse<Feature>>('/v1/risk-rule/feature-get', {
    params: { id },
  });
}

export function createFeature(data: CreateFeatureRequest) {
  return requestClient.post<ApiResponse<Feature>>(
    '/v1/risk-rule/feature-create',
    data,
  );
}

export function updateFeature(data: UpdateFeatureRequest) {
  return requestClient.post<ApiResponse<Feature>>(
    '/v1/risk-rule/feature-update',
    data,
  );
}

export function deleteFeature(id: string) {
  return requestClient.post<ApiResponse<Feature>>(
    '/v1/risk-rule/feature-delete',
    { id },
  );
}

// ========== 特征值 ==========

export function getFeatureValue(user_id: string, feature_name: string) {
  return requestClient.get<ApiResponse<FeatureValue>>(
    '/v1/risk-rule/feature-value-get',
    { params: { user_id, feature_name } },
  );
}

export function setFeatureValue(
  user_id: string,
  feature_name: string,
  value: string,
) {
  return requestClient.post('/v1/risk-rule/feature-value-set', {
    user_id,
    feature_name,
    value,
  });
}
