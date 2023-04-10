import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.maximebriand.goldenapp',
  appName: 'golden-hour',
  webDir: 'dist/apps/golden-hour',
  bundledWebRuntime: false,
  "server": {
    "url": "http://localhost:4200"
  }
};

export default config;
