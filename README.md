# expo-myid

Wrapper of https://docs.myid.uz/#/en/sdk my id sdk

# Installation in managed Expo projects
`expo install expo-myid expo-camera` 

`npx expo prebuild`


### In app.config.ts or app.json
Add the following to your plugins section in app.json:
```json
    "plugins": [
        "expo-myid",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true
        }
      ]
    ]
```

> YOU MUST PREBUILD YOUR CLEAN AFTER INSTALLATION OF THE LIBRARY 

`npx expo prebuild --clean`

`npm run android` or `npm run ios`

# Usage
```typescript jsx
import ExpoMyid, {useMyIdEvent} from 'expo-myid';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';

const client_id = 'sample_client_id';
const clientHashId = 'sample_client_hash_id';
const mode: "DEBUG"|"PRODUCTION" = 'DEBUG';
const clientHash = `sample_client_hash`;
const language = 'ru';

export default function App() {
  const payload = useMyIdEvent(); // null or onMyidPayload

  console.log(payload)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Async functions">
          <Button
            title="Myid"
            onPress={async () => {
              ExpoMyid.myid_login({
                clientHashId: clientHashId,
                clientId: client_id,
                clientHash: clientHash,
                mode: mode,
                locale: language
              })
            }} // will open login intent
          />
        </Group>
        <Group name="Events">
          <Text>Status: {payload?.status}</Text>
          <Text>Error: {payload?.error}</Text>
          <Text>Code: {payload?.code}</Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}
    
```


# Types
### ExpoMyid.myid_login
```typescript
type myid_login = (
  props:
    {
      clientId: string,
      clientHashId: string,
      clientHash: string,
      mode: "DEBUG" | "PRODUCTION",
      locale: "ru" | "en" | "uz",
    }
) => Promise<void>
```

### useMyIdEvent();
```typescript
type useMyIdEvent = () => null | onMyidPayload;
```

### onMyidPayload
```typescript

export type onMyidPayload = {
  code: string;
  error: string;
  status: "success"|"error"
};

```
