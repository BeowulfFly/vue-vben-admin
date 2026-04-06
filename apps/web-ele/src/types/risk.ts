export interface RiskDecision {
  id: string;
  platformId: string;
  productId: string;
  modelId: string;
  policyId: string;
  uid: number;
  bizId: string;
  eventType: string;
  eventTime: string;
  modelVersion: string;
  feature: string;
  modelScore: number;
  ruleScore: number;
  finalScore: number;
  hitRules: string;
  modelDecision: number;
  ruleDecision: number;
  finalDecision: number;
  decisionType: 'auto_block' | 'auto_pass' | 'need_review';
  createdTime: string;
}

export interface SubmitRiskEventRequest {
  user_id: string;
  event_type: string;
  event_id: string;
  event_time: number;
  event_data?: Record<string, string>;
  client_ip?: string;
  device_id?: string;
  location?: string;
  app_id?: string;
  platform_id?: string;
  product_id?: string;
}

export interface RiskScoreResponse {
  eventId: string;
  ruleScore: number;
  modelScore: number;
  finalScore: number;
  level: number;
}
