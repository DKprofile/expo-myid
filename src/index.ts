// Reexport the native module. On web, it will be resolved to ExpoMyidModule.web.ts
// and on native platforms to ExpoMyidModule.ts
export { default } from './ExpoMyidModule';
export { default as ExpoMyidView } from './ExpoMyidView';
export * from  './ExpoMyid.types';
