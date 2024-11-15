import { registerWebModule, NativeModule } from 'expo';

import { ExpoMyidModuleEvents } from './ExpoMyid.types';

class ExpoMyidModule extends NativeModule<ExpoMyidModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoMyidModule);
