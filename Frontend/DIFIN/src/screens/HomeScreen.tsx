// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: Props) {
  const user = route.params?.user;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name ?? 'Guest'}</Text>
      <View style={{ marginVertical: 8 }}>
        <Button title="Flashcards" onPress={() => navigation.navigate('Flashcards')} />
      </View>
      <View style={{ marginVertical: 8 }}>
        <Button title="Practice Pronunciation" onPress={() => navigation.navigate('Practice', { user })} />
      </View>
      <View style={{ marginVertical: 8 }}>
        <Button title="Talk with AI" onPress={() => navigation.navigate('AITalk', { user })} />
      </View>
      <View style={{ marginVertical: 8 }}>
        <Button title="Profile" onPress={() => navigation.navigate('Profile', { user })} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 }
});
