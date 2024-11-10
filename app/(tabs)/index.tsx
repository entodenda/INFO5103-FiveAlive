import { Image, StyleSheet, Platform, Text, Modal, Alert, Pressable, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import InfoModal, { GetTip } from '@/components/InfoModal';


export default function HomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState(true);

  const text = "hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!hello world!"
const thistext = GetTip();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
        The Dashboard

        </ThemedText>
      </ThemedView>
      <InfoModal
        visible={isModalVisible}
        text={thistext}
        onClose={() => setIsModalVisible(false)}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: '#000',
    borderRadius: 50,
    color: '#fff',
    width: '40%',
   textAlign: 'center',
    padding: 10,
  },
  modalView: {
    margin: 'auto',
    width: '80%',
    minHeight: 100,
    backgroundColor: '#F00',
    borderRadius: 50,
    paddingTop: 10,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
