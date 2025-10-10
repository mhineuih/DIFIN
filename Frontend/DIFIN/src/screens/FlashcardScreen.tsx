// src/screens/FlashcardScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import FlashcardCard from '../components/Flashcard';
import { API_HOST } from '../services/api';

type Flashcard = { id: number; english_word: string; vietnamese_meaning: string; example_sentence?: string };

export default function FlashcardScreen() {
  const [cards, setCards] = useState<Flashcard[] | null>(null);
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    fetch(API_HOST + '/api/flashcards')
      .then(r => r.json())
      .then(j => setCards(j.flashcards ?? []))
      .catch(err => {
        console.error(err);
        setCards([]);
      });
  }, []);

  if (!cards) return <ActivityIndicator style={{ marginTop: 40 }} />;

  const card = cards[index] ?? null;
  const next = () => {
    setShowMeaning(false);
    setIndex(prev => (cards?.length ? (prev + 1) % cards.length : 0));
  };

  return (
    <View style={styles.container}>
      {card ? (
        <>
          <FlashcardCard
            english={card.english_word}
            meaning={card.vietnamese_meaning}
            showMeaning={showMeaning}
            onToggle={() => setShowMeaning(s => !s)}
          />
          <Text onPress={next} style={styles.next}>Next</Text>
        </>
      ) : (
        <Text>No flashcards available</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  next: { marginTop: 12, color: '#007AFF', textAlign: 'center' }
});
