// @ts-nocheck
import { defineConfig } from 'umi';
import proxy from './config/proxy';

const { REACT_APP_ENV } = process.env;
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  proxy: proxy[REACT_APP_ENV || 'dev'],
  nodeModulesTransform: {
    type: 'none',
  },
  ///////routes: [
  ///////  { path: '/', name: '智慧农业大屏', component: '@/pages/index' },
  ///////  ///{ path: '/map', component: '@/pages/components/map/index' },
  ///////],
  fastRefresh: {},
  publicPath: './',
  hash: true,
  ///base: '/manage/daping2',
  history: {
    type: 'browser',
  },
  mpa: {},
});
