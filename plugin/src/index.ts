import { ConfigPlugin } from 'expo/config-plugins';
import {withBuildProperties} from "expo-build-properties";



export const withMyId: ConfigPlugin = (config) => withBuildProperties(config, {
  android: {
    extraMavenRepos: [
      {url: "https://artifactory.aigroup.uz:443/artifactory/myid"}
    ]
  },
  ios: {
    extraPods: [{
      name: "MyIdSDK",
      version: "~> 2.2.9",
    }]
  }
})

export default withMyId;
