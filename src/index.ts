// Reexport the native module. On web, it will be resolved to ExpoMyidModule.web.ts
// and on native platforms to ExpoMyidModule.ts


import ExpoMyid from "./ExpoMyidModule";
import {useEvent} from "expo";

export {default} from './ExpoMyidModule';
export * from './ExpoMyid.types';
export const useMyIdEvent = () => useEvent(ExpoMyid, 'onMyid');
