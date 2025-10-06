// src/screens/AITalkScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { API_HOST } from '../services/api';

type Msg = { id: string; from: 'user' | 'ai'; text: string };

export default function AITalkScreen({ route }: any) {
  const user = route.params?.user;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);

  const send = async () => {
    if (!input.trim()) return;
    const msg: Msg = { id: String(Date.now()), from: 'user', text: input };
    setMessages(prev => [...prev, msg]);
    setInput('');
    try {
      const res = await fetch(API_HOST + '/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userId: user?.id }),
      });
      const json = await res.json();
      const aiText = json.reply || '...';
      setMessages(prev => [...prev, { id: String(Date.now() + 1), from: 'ai', text: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: String(Date.now() + 2), from: 'ai', text: 'Server error' }]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={messages}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={item.from === 'user' ? styles.user : styles.ai}><Text>{item.text}</Text></View>
        )}
      />
      <View style={styles.bottom}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Say something..." />
        <Button title="Send" onPress={send} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  user: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6', padding: 8, borderRadius: 8, marginBottom: 6 },
  ai: { alignSelf: 'flex-start', backgroundColor: '#EFEFEF', padding: 8, borderRadius: 8, marginBottom: 6 },
  bottom: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8 }
});
