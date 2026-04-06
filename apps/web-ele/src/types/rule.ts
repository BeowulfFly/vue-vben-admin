export interface RuleCondition {
  type: number;
  featureName: string;
  operator: number;
  value: string;
  valueTo?: string;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  type: number;
  groupId: string;
  conditions: RuleCondition[];
  score: number;
  priority: number;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CreateRuleRequest {
  name: string;
  description?: string;
  type: number;
  group_id?: string;
  conditions: RuleCondition[];
  score?: number;
  priority?: number;
  enabled?: boolean;
}

export interface UpdateRuleRequest extends Partial<CreateRuleRequest> {
  id: string;
}

export interface RuleGroup {
  id: string;
  name: string;
  description: string;
  priority: number;
  enabled: boolean;
  ruleIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface CreateRuleGroupRequest {
  name: string;
  description?: string;
  priority?: number;
  enabled?: boolean;
}

export interface UpdateRuleGroupRequest extends Partial<CreateRuleGroupRequest> {
  id: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  valueType: string;
  defaultValue: string;
  featureType: number;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CreateFeatureRequest {
  name: string;
  description?: string;
  value_type: string;
  default_value?: string;
  feature_type?: number;
  enabled?: boolean;
}

export interface UpdateFeatureRequest extends Partial<CreateFeatureRequest> {
  id: string;
}

export interface FeatureValue {
  user_id: string;
  feature_name: string;
  value: string;
  updated_at: number;
}
