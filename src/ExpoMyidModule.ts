import { NativeModule, requireNativeModule } from 'expo';

import { ExpoMyidModuleEvents } from './ExpoMyid.types';

declare class ExpoMyidModule extends NativeModule<ExpoMyidModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoMyidModule>('ExpoMyid');
