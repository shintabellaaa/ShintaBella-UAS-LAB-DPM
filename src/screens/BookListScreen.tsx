import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchBooks, deleteBook } from '../services/api';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Book, RootStackParamList } from '../types';

const BookListScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loadBooks = async () => {
    const fetchedBooks = await fetchBooks();
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error('Book id is undefined');
      return;
    }
    await deleteBook(id);
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2} // Menentukan jumlah kolom menjadi 2
        columnWrapperStyle={styles.columnWrapper} // Menambahkan gaya untuk merapikan kolom
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.genre}>{item.genre}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.totalPages}>Pages: {item.totalPages}</Text>
            <View style={styles.buttonContainer}>
              {/* Tombol Edit */}
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => navigation.navigate('BookDetail', { id: item.id })}
              >
                <Icon name="create-outline" size={16} color="#fff" />
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              {/* Tombol Delete */}
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => handleDelete(item.id)}
              >
                <Icon name="trash-outline" size={16} color="#fff" />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* Tombol Add New Book */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('BookDetail', {})}
      >
        <Icon name="add-circle-outline" size={18} color="#fff" />
        <Text style={styles.addButtonText}>Add New Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4e342e', // Latar belakang coklat gelap
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  bookItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#6d4c41', // Warna kartu coklat medium
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#5d4037', // Border coklat gelap
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d7ccc8', // Teks coklat terang
    marginBottom: 6,
    textShadowColor: 'rgba(215, 204, 200, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  author: {
    fontSize: 16,
    color: '#bcaaa4', // Warna abu kecoklatan
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: '#a1887f', // Coklat pastel lembut
    fontStyle: 'italic',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#d7ccc8', // Teks coklat terang
    marginBottom: 10,
    lineHeight: 20,
  },
  totalPages: {
    fontSize: 14,
    color: '#a1887f', // Coklat pastel lembut
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8d6e63', // Tombol coklat medium
    padding: 10,
    borderRadius: 8,
    shadowColor: '#8d6e63',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d32f2f', // Tombol merah kecoklatan
    padding: 10,
    borderRadius: 8,
    shadowColor: '#d32f2f',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6d4c41', // Tombol tambah coklat medium
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#6d4c41',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
});

export default BookListScreen;
