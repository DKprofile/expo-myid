import * as React from 'react';

import { ExpoMyidViewProps } from './ExpoMyid.types';

export default function ExpoMyidView(props: ExpoMyidViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
