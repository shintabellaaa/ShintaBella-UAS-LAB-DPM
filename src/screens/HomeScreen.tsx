import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Book Tracker</Text>
        <Text style={styles.subtitle}>
          Manage your books and track your reading progress.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3e2723', // Warna latar belakang coklat gelap
  },
  card: {
    backgroundColor: '#6d4c41', // Warna kartu coklat medium
    borderRadius: 20,
    padding: 25,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5d4037', // Menambahkan border coklat gelap
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d7ccc8', // Aksen coklat terang untuk teks
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(215, 204, 200, 0.4)', // Bayangan warna coklat terang
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#d7ccc8', // Warna teks abu kecoklatan terang
    lineHeight: 24,
    marginTop: 10,
  },
});

export default HomeScreen;
