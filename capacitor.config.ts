import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ricardoapaes.diariodoxixi',
  appName: 'Diario do Xixi',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: 'diariodoxixi.keystore',
      keystorePassword: '230387',
      keystoreAlias: 'diariodoxixi',
      keystoreAliasPassword: '230387'
    }
  }
};

export default config;
