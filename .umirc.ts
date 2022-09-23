import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', name: '智慧农业大屏', component: '@/pages/index' },
    ///{ path: '/map', component: '@/pages/components/map/index' },
  ],
  fastRefresh: {},
  publicPath: './',
  hash: true,
  base: '/manage/daping2',
  history: {
    type: 'hash',
  },
});
