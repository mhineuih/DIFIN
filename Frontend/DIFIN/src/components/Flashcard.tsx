// src/components/FlashcardCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  english: string;
  meaning: string;
  showMeaning: boolean;
  onToggle: () => void;
};

export default function FlashcardCard({ english, meaning, showMeaning, onToggle }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.word}>{showMeaning ? meaning : english}</Text>
      <TouchableOpacity style={styles.btn} onPress={onToggle}>
        <Text style={styles.btnText}>{showMeaning ? 'Ẩn nghĩa' : 'Xem nghĩa'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#ddd', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  word: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  btn: { backgroundColor: '#007AFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
});
