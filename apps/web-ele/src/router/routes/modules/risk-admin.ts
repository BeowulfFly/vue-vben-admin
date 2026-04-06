import type { RouteRecordRaw } from 'vue-router';

import DashboardView from '#/views/dashboard/DashboardView.vue';
import CommunityView from '#/views/graph/CommunityView.vue';
import SharedDeviceView from '#/views/graph/SharedDeviceView.vue';
import SharedIpView from '#/views/graph/SharedIpView.vue';
import ModelFeatureView from '#/views/model/ModelFeatureView.vue';
import ModelListView from '#/views/model/ModelListView.vue';
import DecisionConfigView from '#/views/policy/DecisionConfigView.vue';
import PolicyListView from '#/views/policy/PolicyListView.vue';
import PolicyWeightView from '#/views/policy/PolicyWeightView.vue';
import DecisionLogView from '#/views/risk/DecisionLogView.vue';
import FeatureView from '#/views/rule/FeatureView.vue';
import RuleGroupView from '#/views/rule/RuleGroupView.vue';
import RuleListView from '#/views/rule/RuleListView.vue';
import AppKeyView from '#/views/system/AppKeyView.vue';
import MonitorView from '#/views/system/MonitorView.vue';
import UserView from '#/views/system/UserView.vue';

const routes: RouteRecordRaw[] = [
  {
    meta: { icon: 'lucide:layout-dashboard', order: 1, title: '概览' },
    name: 'Dashboard',
    path: '/dashboard',
    component: DashboardView,
  },
  {
    meta: { icon: 'lucide:shield', order: 2, title: '规则管理' },
    name: 'RuleGroup',
    path: '/rule',
    children: [
      {
        name: 'RuleList',
        path: '/rule/list',
        component: RuleListView,
        meta: { title: '规则列表', icon: 'lucide:list' },
      },
      {
        name: 'RuleGroupList',
        path: '/rule/group',
        component: RuleGroupView,
        meta: { title: '规则组', icon: 'lucide:layers' },
      },
      {
        name: 'FeatureList',
        path: '/rule/feature',
        component: FeatureView,
        meta: { title: '特征管理', icon: 'lucide:database' },
      },
    ],
  },
  {
    meta: { icon: 'lucide:file-text', order: 3, title: '策略管理' },
    name: 'PolicyGroup',
    path: '/policy',
    children: [
      {
        name: 'PolicyList',
        path: '/policy/list',
        component: PolicyListView,
        meta: { title: '策略列表', icon: 'lucide:list' },
      },
      {
        name: 'PolicyWeight',
        path: '/policy/weight',
        component: PolicyWeightView,
        meta: { title: '权重配置', icon: 'lucide:sliders' },
      },
      {
        name: 'DecisionConfig',
        path: '/policy/decision',
        component: DecisionConfigView,
        meta: { title: '决策配置', icon: 'lucide:settings' },
      },
    ],
  },
  {
    meta: { icon: 'lucide:brain', order: 4, title: '模型管理' },
    name: 'ModelGroup',
    path: '/model',
    children: [
      {
        name: 'ModelList',
        path: '/model/list',
        component: ModelListView,
        meta: { title: '模型列表', icon: 'lucide:list' },
      },
      {
        name: 'ModelFeature',
        path: '/model/feature',
        component: ModelFeatureView,
        meta: { title: '特征列表', icon: 'lucide:database' },
      },
    ],
  },
  {
    meta: { icon: 'lucide:git-branch', order: 5, title: '关系图谱' },
    name: 'GraphGroup',
    path: '/graph',
    children: [
      {
        name: 'CommunityView',
        path: '/graph/community',
        component: CommunityView,
        meta: { title: '社区分布', icon: 'lucide:network' },
      },
      {
        name: 'SharedDevice',
        path: '/graph/device',
        component: SharedDeviceView,
        meta: { title: '共享设备', icon: 'lucide:smartphone' },
      },
      {
        name: 'SharedIp',
        path: '/graph/ip',
        component: SharedIpView,
        meta: { title: '共享IP', icon: 'lucide:wifi' },
      },
    ],
  },
  {
    meta: { icon: 'lucide:clipboard-list', order: 6, title: '风险记录' },
    name: 'DecisionLog',
    path: '/risk/log',
    component: DecisionLogView,
  },
  {
    meta: { icon: 'lucide:settings', order: 7, title: '系统管理' },
    name: 'SystemGroup',
    path: '/system',
    children: [
      {
        name: 'UserManage',
        path: '/system/user',
        component: UserView,
        meta: { title: '用户管理', icon: 'lucide:users' },
      },
      {
        name: 'AppKey',
        path: '/system/appkey',
        component: AppKeyView,
        meta: { title: '应用密钥', icon: 'lucide:key' },
      },
      {
        name: 'Monitor',
        path: '/system/monitor',
        component: MonitorView,
        meta: { title: '服务监控', icon: 'lucide:activity' },
      },
    ],
  },
];

export default routes;
