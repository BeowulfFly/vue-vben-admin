import type { PaginatedResponse } from '#/types/api';
import type {
  FeatureInfo,
  ModelInfo,
  ModelStatus,
  PredictRequest,
  PredictResponse,
} from '#/types/model';

import { requestClient } from '../request';

export function getModelList(params: {
  app_id?: string;
  model_type?: string;
  page?: number;
  page_size?: number;
  platform_id?: string;
  product_id?: string;
}) {
  return requestClient.get<PaginatedResponse<ModelInfo>>(
    '/v1/risk/model-list',
    { params },
  );
}

export function getModelFeatureList(params: {
  app_id?: string;
  event_type?: string;
  feature_type?: string;
  page?: number;
  page_size?: number;
  platform_id?: string;
  product_id?: string;
}) {
  return requestClient.get<PaginatedResponse<FeatureInfo>>(
    '/v1/risk/feature-list',
    { params },
  );
}

export function getModelStatus() {
  return requestClient.get<ModelStatus[]>('/api/v1/models');
}

export function predict(data: PredictRequest) {
  return requestClient.post<PredictResponse>('/api/v1/predict', data);
}
