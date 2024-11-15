import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoMyidViewProps } from './ExpoMyid.types';

const NativeView: React.ComponentType<ExpoMyidViewProps> =
  requireNativeView('ExpoMyid');

export default function ExpoMyidView(props: ExpoMyidViewProps) {
  return <NativeView {...props} />;
}
