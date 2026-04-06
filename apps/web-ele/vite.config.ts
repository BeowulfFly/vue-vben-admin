import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          // risk-rule-service
          '/v1/risk-rule': {
            target:
              'http://k8s-tianjite-riskrule-70708392dd-1086b4f013d6de11.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
          '/v1/policy-weight': {
            target:
              'http://k8s-tianjite-riskrule-70708392dd-1086b4f013d6de11.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
          '/v1/policy': {
            target:
              'http://k8s-tianjite-riskrule-70708392dd-1086b4f013d6de11.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
          // risk-service
          '/v1/risk': {
            target:
              'http://k8s-tianjite-riskserv-bf98f614af-9582115cd1b82c35.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
          '/v1/auth': {
            target:
              'http://k8s-tianjite-riskserv-bf98f614af-9582115cd1b82c35.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
          '/v1/user': {
            target:
              'http://k8s-tianjite-riskserv-bf98f614af-9582115cd1b82c35.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
          '/v1/app': {
            target:
              'http://k8s-tianjite-riskserv-bf98f614af-9582115cd1b82c35.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
          // model-service / graph-service
          '/api': {
            target:
              'http://k8s-tianjite-modelser-d2a844e25b-760d174791108449.elb.ap-southeast-1.amazonaws.com',
            changeOrigin: true,
          },
        },
      },
    },
  };
});
