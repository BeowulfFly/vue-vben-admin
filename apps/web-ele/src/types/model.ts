export interface ModelInfo {
  modelId: string;
  modelName: string;
  modelVersion: string;
  modelType: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ModelStatus {
  model_id: string;
  version: string;
  event_type: string;
  is_ready: boolean;
}

export interface FeatureInfo {
  featureId: string;
  featureName: string;
  featureType: string;
  description: string;
  defaultValue: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface PredictRequest {
  user_id: string;
  event_type: string;
  event_time: number;
  event_data?: Record<string, unknown>;
  platform_id: string;
  product_id: string;
  client_ip?: string;
  device_id?: string;
  location?: string;
  app_id?: string;
}

export interface PredictResponse {
  model_score: number;
  model_version: string;
  data_field_count: number;
  latency_ms: number;
}
