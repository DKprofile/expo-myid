// Reexport the native module. On web, it will be resolved to ExpoMyidModule.web.ts
// and on native platforms to ExpoMyidModule.ts



import {useEffect, useState} from "react";
import {onMyidPayload} from "./ExpoMyid.types";
import ExpoMyidModule from "./ExpoMyidModule";


export * from './ExpoMyid.types';
// export const useMyIdEvent = () => useEvent(ExpoMyid, 'onMyid');


export const MyId = ExpoMyidModule;

export const useMyIdEvent = () => {
  const [state, setState] = useState<onMyidPayload|null>(null);

  useEffect(() => {
    const subscription = ExpoMyidModule.addListener("onMyid", (payload) => {
      setState(payload);
    })

    return () => {
      subscription.remove();
    }
  }, []);

  return state;
}
