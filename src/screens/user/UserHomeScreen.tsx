import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import booksData from '../../data/books.json';

const { width } = Dimensions.get('window');

interface Book {
  id?: string | number;
  id_buku?: string | number;
  idBuku?: string | number;
  judul?: string;
  title?: string;
  namaBuku?: string;
  pengarang?: string;
  author?: string;
  penulis?: string;
  penerbit?: string;
  tahun?: number;
  tahunTerbit?: number;
  stok?: number;
  available?: number;
  photo?: string;
  kategori?: string;
  [key: string]: any;
}

const UserHomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryPress = (category: string) => {
    navigation.navigate('Books' as never, { category } as never);
  };

  const handleViewAllBooks = () => {
    navigation.navigate('Books' as never);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Load from JSON
      const books = booksData as Book[];
      
      // Ambil lebih banyak buku untuk horizontal scroll (10 buku)
      const featured = books.slice(0, 10);
      setFeaturedBooks(featured);
      
      console.log('✅ Loaded featured books:', featured.length);
    } catch (error) {
      console.error('Error loading books:', error);
      setFeaturedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Welcome Section - Modern Gradient Style */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeContent}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Selamat Datang!</Text>
            <Text style={styles.welcomeSubtitle}>Temukan buku favorit Anda di perpustakaan</Text>
          </View>
          <View style={styles.welcomeIconContainer}>
            <MaterialIcons name="menu-book" size={64} color="#fff" />
          </View>
        </View>
      </View>

      {/* Quick Stats - Modern Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.statCardPrimary]}>
          <View style={styles.statIconContainer}>
            <MaterialIcons name="library-books" size={28} color="#6200ee" />
          </View>
          <Text style={styles.statNumber}>{booksData.length}</Text>
          <Text style={styles.statLabel}>Total Buku</Text>
        </View>
        <View style={[styles.statCard, styles.statCardSuccess]}>
          <View style={styles.statIconContainer}>
            <MaterialIcons name="bookmark" size={28} color="#4caf50" />
          </View>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Dipinjam</Text>
        </View>
        <View style={[styles.statCard, styles.statCardWarning]}>
          <View style={styles.statIconContainer}>
            <MaterialIcons name="history" size={28} color="#ff9800" />
          </View>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Riwayat</Text>
        </View>
      </View>

      {/* Featured Books - Full Width Horizontal Scroll */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Title style={styles.sectionTitle}>Buku Populer</Title>
            <Text style={styles.sectionSubtitle}>Buku paling banyak dipinjam</Text>
          </View>
          <Button 
            mode="text" 
            compact 
            onPress={handleViewAllBooks}
            labelStyle={styles.viewAllButton}
          >
            Lihat Semua
          </Button>
        </View>
        
        {/* Horizontal Scroll - Full Width */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.horizontalScrollContent}
          style={styles.horizontalScroll}
        >
          {featuredBooks.map((book, index) => {
            const bookId = book.id || book.id_buku || book.idBuku || index;
            const bookTitle = book.judul || book.title || book.namaBuku || 'Judul tidak tersedia';
            const bookAuthor = book.pengarang || book.author || book.penulis || 'Pengarang tidak tersedia';
            const available = book.stok || book.available || 0;
            const isLast = index === featuredBooks.length - 1;
            
            return (
              <Card 
                key={bookId} 
                style={[
                  styles.featuredCard,
                  isLast && styles.featuredCardLast
                ]}
                elevation={3}
              >
                <View style={styles.featuredImageContainer}>
                  <View style={styles.bookIconWrapper}>
                    <MaterialIcons name="menu-book" size={56} color="#6200ee" />
                  </View>
                  {available > 0 && (
                    <View style={styles.availabilityBadge}>
                      <MaterialIcons name="check-circle" size={14} color="#4caf50" />
                      <Text style={styles.availabilityBadgeText}>{available}</Text>
                    </View>
                  )}
                </View>
                <Card.Content style={styles.featuredContent}>
                  <Title numberOfLines={2} style={styles.featuredTitle}>
                    {bookTitle}
                  </Title>
                  <Paragraph numberOfLines={1} style={styles.featuredAuthor}>
                    {bookAuthor}
                  </Paragraph>
                  {book.kategori && (
                    <View style={styles.categoryTag}>
                      <Text style={styles.categoryTagText}>{book.kategori}</Text>
                    </View>
                  )}
                </Card.Content>
                <Card.Actions style={styles.featuredActions}>
                  <Button 
                    mode="contained" 
                    compact 
                    onPress={() => {}}
                    style={styles.borrowButton}
                    labelStyle={styles.borrowButtonLabel}
                  >
                    Pinjam
                  </Button>
                </Card.Actions>
              </Card>
            );
          })}
        </ScrollView>
      </View>

      {/* Categories - Modern Grid */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Title style={styles.sectionTitle}>Kategori</Title>
            <Text style={styles.sectionSubtitle}>Jelajahi berdasarkan kategori</Text>
          </View>
        </View>
        <View style={styles.categoriesGrid}>
          <TouchableOpacity 
            style={[styles.categoryCard, styles.categoryCardFiction]}
            onPress={() => handleCategoryPress('Fiksi')}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIconContainer}>
              <MaterialIcons name="auto-stories" size={36} color="#6200ee" />
            </View>
            <Text style={styles.categoryText}>Fiksi</Text>
            <Text style={styles.categoryCount}>
              {booksData.filter((b: Book) => b.kategori === 'Fiksi').length} buku
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.categoryCardEducation]}
            onPress={() => handleCategoryPress('Pendidikan')}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIconContainer}>
              <MaterialIcons name="school" size={36} color="#4caf50" />
            </View>
            <Text style={styles.categoryText}>Pendidikan</Text>
            <Text style={styles.categoryCount}>
              {booksData.filter((b: Book) => b.kategori === 'Pendidikan').length} buku
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.categoryCardBusiness]}
            onPress={() => handleCategoryPress('Bisnis')}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIconContainer}>
              <MaterialIcons name="trending-up" size={36} color="#ff9800" />
            </View>
            <Text style={styles.categoryText}>Bisnis</Text>
            <Text style={styles.categoryCount}>
              {booksData.filter((b: Book) => b.kategori === 'Bisnis').length} buku
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.categoryCardScience]}
            onPress={() => handleCategoryPress('Sains')}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIconContainer}>
              <MaterialIcons name="science" size={36} color="#2196f3" />
            </View>
            <Text style={styles.categoryText}>Sains</Text>
            <Text style={styles.categoryCount}>
              {booksData.filter((b: Book) => b.kategori === 'Sains').length} buku
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  // Welcome Card - Modern Design
  welcomeCard: {
    margin: 16,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingVertical: 28,
  },
  welcomeTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 15,
    lineHeight: 22,
  },
  welcomeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 28,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopWidth: 3,
  },
  statCardPrimary: {
    borderTopColor: '#6200ee',
  },
  statCardSuccess: {
    borderTopColor: '#4caf50',
  },
  statCardWarning: {
    borderTopColor: '#ff9800',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  // Section
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  viewAllButton: {
    fontSize: 13,
    color: '#6200ee',
    fontWeight: '600',
  },
  // Horizontal Scroll - Full Width
  horizontalScroll: {
    marginLeft: 0,
  },
  horizontalScrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  featuredCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  featuredCardLast: {
    marginRight: 16,
  },
  featuredImageContainer: {
    height: 220,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bookIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    elevation: 2,
  },
  availabilityBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4caf50',
    marginLeft: 4,
  },
  featuredContent: {
    padding: 14,
    paddingBottom: 8,
  },
  featuredTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 20,
  },
  featuredAuthor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  categoryTagText: {
    fontSize: 10,
    color: '#6200ee',
    fontWeight: '600',
  },
  featuredActions: {
    padding: 12,
    paddingTop: 0,
  },
  borrowButton: {
    flex: 1,
    borderRadius: 8,
  },
  borrowButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 4,
  },
  // Categories
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderTopWidth: 3,
  },
  categoryCardFiction: {
    borderTopColor: '#6200ee',
  },
  categoryCardEducation: {
    borderTopColor: '#4caf50',
  },
  categoryCardBusiness: {
    borderTopColor: '#ff9800',
  },
  categoryCardScience: {
    borderTopColor: '#2196f3',
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
});

export default UserHomeScreen;

