import ExpoMyid, {useMyIdEvent} from 'expo-myid';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';

const client_id = 'sample_client_id';
const clientHashId = 'sample_client_hash_id';
const mode: "DEBUG"|"PRODUCTION" = 'DEBUG';
const clientHash = `sample_client_hash`;
const language = 'ru';

export default function App() {
  const payload = useMyIdEvent();

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
            }}
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

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
