import { ConfigPlugin } from 'expo/config-plugins';
import {withBuildProperties} from "expo-build-properties";



export const withMyId: ConfigPlugin = (config) => withBuildProperties(config, {
  android: {
    extraMavenRepos: [
      {url: "https://artifactory.aigroup.uz:443/artifactory/myid"}
    ]
  }
})

export default withMyId;
