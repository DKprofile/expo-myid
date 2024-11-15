import { NativeModule, requireNativeModule } from 'expo';

import { ExpoMyidModuleEvents } from './ExpoMyid.types';

declare class ExpoMyidModule extends NativeModule<ExpoMyidModuleEvents> {
  myid_login({clientHash, clientId, clientHashId}: {clientId: string, clientHashId: string, clientHash: string; mode: "DEBUG"|"PRODUCTION"; locale: "ru"|"en"|"uz"}): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoMyidModule>('ExpoMyid');
