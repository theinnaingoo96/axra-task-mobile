import React, { useEffect, useState } from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { setupApollo } from './src/api/client';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthProvider } from './src/hooks/useAuth';

const App = () => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    setupApollo().then(setClient).catch(console.error);
  }, []);

  if (!client) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
