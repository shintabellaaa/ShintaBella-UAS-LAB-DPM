import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAuthToken, removeAuthToken } from '../utils/auth';
import { fetchUserProfile, editProfile } from '../services/api';
import { RootStackParamList, User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadUserProfile = async () => {
      const token = await getAuthToken();
      if (token) {
        try {
          const profileData = await fetchUserProfile() as User;
          setUser(profileData);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
      setLoading(false);
    };

    loadUserProfile();
  }, []);

  const handleLogout = async () => {
    await removeAuthToken();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const openEditModal = () => {
    if (user) {
      setEditedUsername(user.username);
      setEditedEmail(user.email);
      setEditModalVisible(true);
    }
  };

  const handleSaveChanges = async () => {
    if (!editedUsername || !editedEmail) {
      alert('All fields are required.');
      return;
    }

    try {
      if (user) {
        const updatedProfile = await editProfile(user.id, {
          username: editedUsername,
          email: editedEmail,
        });
        setUser(updatedProfile);
        setEditModalVisible(false);
        alert('Profile updated successfully.');
      }
    } catch (error) {
      console.error('Failed to update user profile:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.username}!</Text>
      <View style={styles.profileCard}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for Editing Profile */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={editedUsername}
              onChangeText={setEditedUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedEmail}
              onChangeText={setEditedEmail}
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6d4c41', // Latar belakang coklat medium
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d7ccc8', // Teks coklat terang
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#4e342e', // Coklat gelap untuk kartu profil
    borderRadius: 15,
    padding: 20,
    width: '90%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  label: {
    color: '#d7ccc8', // Teks coklat terang
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    color: '#bcaaa4', // Teks abu kecoklatan
    fontSize: 16,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#8d6e63', // Warna tombol coklat medium
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#a1887f', // Warna tombol coklat pastel
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparan untuk modal
  },
  modalContent: {
    backgroundColor: '#4e342e', // Latar belakang modal coklat gelap
    borderRadius: 15,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d7ccc8', // Teks coklat terang
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#5d4037', // Input coklat medium
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#ffffff', // Teks putih
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#8d6e63', // Tombol simpan coklat medium
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#a1887f', // Tombol batal coklat pastel
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
