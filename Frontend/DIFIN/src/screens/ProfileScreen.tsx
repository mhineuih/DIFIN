// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen({ route }: any) {
  const user = route.params?.user;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: {user?.name ?? '-'}</Text>
      <Text>Email: {user?.email ?? '-'}</Text>
      <Text>Joined: {user?.created_at ?? '-'}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 }
});
