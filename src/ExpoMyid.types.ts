import type { StyleProp, ViewStyle } from 'react-native';



export type ExpoMyidModuleEvents = {
  onMyid: (params: onMyidPayload) => void;
};

export type onMyidPayload = {
  code: string;
  error: string;
  status: "success"|"error"
};
