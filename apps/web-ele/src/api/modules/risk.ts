import type { ApiResponse } from '#/types/api';
import type { RiskScoreResponse, SubmitRiskEventRequest } from '#/types/risk';

import { requestClient } from '../request';

export function submitRiskEvent(data: SubmitRiskEventRequest) {
  return requestClient.post<ApiResponse<RiskScoreResponse>>(
    '/v1/risk/risk-event-submit',
    data,
  );
}
