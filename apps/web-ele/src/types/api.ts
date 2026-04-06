/** 通用基础响应 */
export interface BaseResponse {
  success: boolean;
  message: string;
  code: number;
}

/** 带数据的响应 */
export interface ApiResponse<T = unknown> {
  base: BaseResponse;
  data: T;
}

/** 分页响应 */
export interface PaginatedResponse<T = unknown> {
  base: BaseResponse;
  data: T[];
  total: number;
}

/** 分页请求参数 */
export interface PaginationParams {
  page: number;
  page_size: number;
}

/** Feature Service 通用响应 */
export interface FeatureServiceResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
