/** 规则类型 */
export const RULE_TYPE_MAP: Record<number, string> = {
  1: 'AMOUNT',
  2: 'FREQUENCY',
  3: 'TIME',
  4: 'DEVICE',
  5: 'IP',
  6: 'BEHAVIOR',
};

/** 规则操作符 */
export const OPERATOR_MAP: Record<number, string> = {
  1: 'EQ (=)',
  2: 'NE (≠)',
  3: 'GT (>)',
  4: 'GTE (≥)',
  5: 'LT (<)',
  6: 'LTE (≤)',
  7: 'IN',
  8: 'NOT_IN',
  9: 'BETWEEN',
};

/** 风险等级 */
export const RISK_LEVEL_MAP: Record<number, { color: string; label: string; }> =
  {
    0: { label: '无风险', color: '' },
    1: { label: '低风险', color: 'info' },
    2: { label: '中风险', color: 'warning' },
    3: { label: '高风险', color: 'danger' },
    4: { label: '极高风险', color: 'danger' },
  };

/** 决策类型 */
export const DECISION_TYPE_MAP: Record<
  string,
  { color: string; label: string; }
> = {
  auto_pass: { label: '自动通过', color: 'success' },
  auto_block: { label: '自动拦截', color: 'danger' },
  need_review: { label: '人工审核', color: 'warning' },
};

/** 特征类型 */
export const FEATURE_TYPE_MAP: Record<number, string> = {
  1: '参数特征',
  2: '行为特征',
  3: '设备特征',
};

/** 条件类型 */
export const CONDITION_TYPE_MAP: Record<number, string> = {
  1: '参数规则',
  2: '特征规则',
};

/** 事件类型 */
export const EVENT_TYPE_OPTIONS = [
  { label: '登录', value: 'login' },
  { label: '提现', value: 'withdraw' },
  { label: '充值', value: 'recharge' },
  { label: '投注', value: 'bet' },
];

/** 错误码 — 来自 doc/error_code.js */
export const ERROR_MESSAGES: Record<number, string> = {
  1: '无效的ID',
  2: '参数无效',
  10: '资源不存在',
  11: '资源已存在',
  12: '并发请求，请稍后重试',
  20: '数据库操作失败',
  21: 'Redis操作失败',
  22: 'JSON处理失败',
  1001: '用户参数错误',
  1002: '用户已存在',
  1003: '用户不存在',
  1004: '密码错误',
  1005: '用户已禁用',
  1006: '用户创建失败',
  2001: '应用参数错误',
  2002: '应用不存在',
  2003: '应用已禁用',
  2004: '应用密钥错误',
  3001: 'Token无效',
  3002: 'Token已过期',
  3003: 'Token刷新失败',
  4000: '认证令牌已过期',
  4001: '缺少认证令牌',
  4002: '无效的认证令牌',
  4050: '权限被拒绝',
  7000: '风险事件不存在',
  7001: '参数无效',
  7002: '规则不存在',
  7003: '模型服务错误',
  7004: '权重配置不存在',
  7005: '创建风险事件失败',
  7006: '更新风险事件失败',
  7007: '无效的评分值',
  7008: '决策配置不存在',
  7100: '规则不存在',
  7101: '规则已存在',
  7102: '创建规则失败',
  7103: '更新规则失败',
  7104: '删除规则失败',
  7105: '规则分数总和必须等于100',
  7106: '规则分数不合法',
  7200: '规则组不存在',
  7201: '规则组已存在',
  7202: '创建规则组失败',
  7203: '更新规则组失败',
  7204: '删除规则组失败',
  7300: '特征不存在',
  7301: '特征已存在',
  7302: '创建特征失败',
  7303: '更新特征失败',
  7304: '删除特征失败',
  7400: '特征值不存在',
  7401: '设置特征值失败',
  7500: '策略不存在',
  7501: '策略已存在',
  7502: '创建策略失败',
  7503: '更新策略失败',
  7504: '删除策略失败',
  7600: '策略权重不存在',
  7601: '创建策略权重失败',
  7602: '更新策略权重失败',
  7603: '策略权重配置不合法',
};
