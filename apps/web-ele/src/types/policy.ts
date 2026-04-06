export interface Policy {
  id: string;
  policy_id: string;
  name: string;
  platform_id: number;
  product_id: number;
  model: string;
  scene: string;
  status: boolean;
  created_at: number;
  updated_at: number;
}

export interface CreatePolicyRequest {
  name: string;
  platform_id: number;
  product_id: number;
  model?: string;
  scene?: string;
  status?: boolean;
}

export interface UpdatePolicyRequest extends Partial<CreatePolicyRequest> {
  id: string;
}

export interface PolicyWeight {
  id: string;
  policy_id: string;
  rule_weight: number;
  model_weight: number;
  comment: string;
  updated_at: number;
}

export interface CreatePolicyWeightRequest {
  policy_id: string;
  rule_weight?: number;
  model_weight?: number;
  comment?: string;
}

export interface UpdatePolicyWeightRequest {
  id: string;
  rule_weight?: number;
  model_weight?: number;
  comment?: string;
}

export interface PolicyWeightInConfig {
  ruleWeight: number;
  modelWeight: number;
}

export interface RuleInConfig {
  name: string;
  type: string;
  conditions: RuleConditionInConfig[];
  score: number;
  priority: number;
}

export interface RuleConditionInConfig {
  feature: string;
  operator: string;
  value: string;
  valueTo?: string;
}

export interface DecisionConfig {
  policyName: string;
  eventType: string;
  model: string;
  policyWeight: PolicyWeightInConfig;
  rules: RuleInConfig[];
  appId: string;
  platformId: string;
  productId: string;
}
