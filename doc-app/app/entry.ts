import Application from './app';
import config from './config/environment';
import { installShoebox, bootRehydrated } from 'vite-ember-ssr/client';

installShoebox();
bootRehydrated(Application, config);
