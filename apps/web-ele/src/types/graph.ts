export interface CommunityDistribution {
  community_id: null | string;
  size: number;
}

export interface SharedDeviceGroup {
  shared_device: null | string;
  user_count: number;
  user_ids: string[];
}

export interface SharedIpGroup {
  shared_ip: null | string;
  user_count: number;
}

export interface LoginFeatureRequest {
  platform: string;
  product: string;
  uid: string;
  event_time: string;
  ip: string;
  device_id: string;
}

export interface LoginFeatureResponse {
  shared_device_user_cnt: number;
  shared_ip_user_cnt: number;
  login_community_user_cnt: number;
  login_similarity_user_cnt: number;
}

export interface BetFeatureResponse {
  bet_community_user_cnt: number;
  bet_similarity_user_cnt: number;
}
