// src/screens/PracticeScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { API_HOST } from '../services/api';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function PracticeScreen({ route }: any) {
  const user = route.params?.user;
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<any>(null);

  const TARGET = 'Hello, how are you today?';

  const start = async () => {
    try {
      const path = Platform.select({
        ios: 'hello.m4a',
        android: `${RNFS.DocumentDirectoryPath}/hello.mp3`,
      }) as string;
      await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener(() => {});
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Start record failed');
    }
  };

  const stop = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      upload(result);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Stop record failed');
    }
  };

  const upload = async (filePath: string) => {
    try {
      setLoading(true);
      const uri = Platform.OS === 'android' ? 'file://' + filePath : filePath;
      const name = filePath.split('/').pop() || 'audio.mp3';
      const form = new FormData();
      // @ts-ignore
      form.append('audio', { uri, name, type: 'audio/mpeg' });
      form.append('sentence', TARGET);
      if (user?.id) form.append('userId', String(user.id));

      const res = await fetch(API_HOST + '/api/ai/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: form as any,
      });

      const json = await res.json();
      setTranscription(json.transcription || null);
      setEvaluation(json.evaluation || null);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Target: {TARGET}</Text>
      {!isRecording ? <Button title="Start Recording" onPress={start} /> : <Button title="Stop & Upload" color="#d9534f" onPress={stop} />}
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}

      {transcription && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '700' }}>Transcription:</Text>
          <Text>{transcription}</Text>
        </View>
      )}

      {evaluation && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '700' }}>Evaluation:</Text>
          <Text>{JSON.stringify(evaluation)}</Text>
        </View>
      )}
    </View>
  );
}
