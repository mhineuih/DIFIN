// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { postJson } from '../services/api';
import { useNavigation } from '@react-navigation/native';

type NavProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await postJson('/api/auth/login', { email, password });
      if (data.error) {
        Alert.alert('Đăng nhập thất bại', data.error);
        return;
      }
      // Navigate with user data
      navigation.reset({ index: 0, routes: [{ name: 'Home', params: { user: data.user } }] });
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể kết nối server');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Language</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Mật khẩu" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.btnText}>Đăng nhập</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  link: { color: '#007AFF', textAlign: 'center', marginTop: 12 }
});
