import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";

// Import your GIF
const loadingGif = require("../../assets/images/loading.gif");

interface Book {
  id: number;
  title: string;
  subject: string;
  priceMrp: number;
  priceNow: number;
  image: string;
  images?: string[];
  distance?: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "NCERT Mathematics Textbook for Class XI Edition 2024",
    subject: "Mathematics",
    priceMrp: 2000,
    priceNow: 1200,
    image: "https://ncert.nic.in/textbook/pdf/jemh1cc.jpg",
    images: [
      "https://ncert.nic.in/textbook/pdf/jemh1cc.jpg",
      "https://ncert.nic.in/textbook/pdf/kech1cc.jpg",
      "https://ncert.nic.in/textbook/pdf/jemh1cc.jpg",
    ],
  },
  {
    id: 2,
    title: "NCERT Chemistry Part I Textbook for Class XI Edition 2024",
    subject: "Chemistry",
    priceMrp: 1800,
    priceNow: 855,
    image: "https://ncert.nic.in/textbook/pdf/kech1cc.jpg",
    distance: "25 km",
  },
  {
    id: 3,
    title: "General English Textbook for All Exams Edition 2024",
    subject: "English",
    priceMrp: 1300,
    priceNow: 1500,
    image: "https://ncert.nic.in/textbook/pdf/jehe1cc.jpg",
    distance: "15 km",
  },
  {
    id: 4,
    title: "NCERT Science Textbook for Class XI Edition 2024",
    subject: "Science",
    priceMrp: 1500,
    priceNow: 1000,
    image: "https://ncert.nic.in/textbook/pdf/jesc1cc.jpg",
    distance: "2 km",
  },
];

const Disclosure = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.35;
  const params = useLocalSearchParams();

  const [location] = useState<string>(
    "Action Area I, 1/2, Newtown, New Town, Cha..."
  );
  const [isDisclosureOpen, setIsDisclosureOpen] = useState<boolean>(false);
  const [isBuyNowExpanded, setIsBuyNowExpanded] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const featuredBook = books[0];
  const gridBooks = books.slice(1);
  const productImages = featuredBook.images || [featuredBook.image];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentImageIndex(index);
  };

  const toggleSellerLocation = () => {
    setIsBuyNowExpanded(!isBuyNowExpanded);
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={[styles.imageContainer, { height: IMAGE_HEIGHT, width: SCREEN_WIDTH }]}>
      <Image
        source={{ uri: item }}
        style={styles.productImage}
        resizeMode="contain"
      />
    </View>
  );

  const handleBuy = () => {
    setIsBuying(true);
    setTimeout(() => {
      setIsBuying(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#d4f1f4" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: SCREEN_WIDTH * 0.04 }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="books near me"
              defaultValue="books near me"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.sellButton}>
            <Image
              source={require("../../assets/images/Sellbook.png")}
              style={styles.sellIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Product Card */}
          <View>
            {/* Image Carousel Section */}
            <View style={styles.carouselContainer}>
              {/* Distance Badge */}
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceBadgeText}>2.5 km</Text>
              </View>

              {/* Image Counter */}
              <View style={styles.imageCounter}>
                <Text style={styles.imageCounterText}>
                  {currentImageIndex + 1}/{productImages.length}
                </Text>
              </View>

              {/* Horizontal Image Carousel */}
              <FlatList
                ref={flatListRef}
                data={productImages}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => `image-${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                snapToInterval={SCREEN_WIDTH}
                decelerationRate="fast"
                style={{ height: IMAGE_HEIGHT }}
              />
            </View>

            {/* Product Details Section */}
            <View style={[styles.productDetails, { paddingHorizontal: SCREEN_WIDTH * 0.04 }]}>
              {/* Title */}
              <Text style={styles.productTitle}>
                NCERT Mathematics Textbook for Class XI Edition 2024 (English Medium){" "}
                <Text style={styles.moreText}>......more</Text>
              </Text>

              {/* "At Lowest Price" Badge */}
              <View style={styles.lowestPriceBadge}>
                <Text style={styles.lowestPriceBadgeText}>At Lowest Price</Text>
              </View>

              {/* Price Row */}
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>₹2,000</Text>
                <View style={styles.currentPriceContainer}>
                  <Text style={styles.nowAtText}>Now at</Text>
                  <Text style={styles.currentPrice}>₹1,200</Text>
                </View>
              </View>

              {/* Buy Now Button */}
              <LinearGradient
                colors={["#003EF9", "#002593"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buyNowGradient}
              >
                <TouchableOpacity
                  onPress={toggleSellerLocation}
                  style={styles.buyNowButton}
                >
                  <Text style={styles.buyNowText}>Buy Now at ₹1,200</Text>
                  <Ionicons
                    name="chevron-down"
                    size={22}
                    color="#fff"
                    style={{
                      transform: [{ rotate: isBuyNowExpanded ? "180deg" : "0deg" }],
                    }}
                  />
                </TouchableOpacity>

                {/* Expanded Seller Location Options */}
                {isBuyNowExpanded && (
                  <View style={styles.expandedSection}>
                    <Text style={styles.sellerLocationTitle}>Seller's Location</Text>

                    {/* Location Address */}
                    <View style={styles.locationCard}>
                      <Ionicons name="location" size={20} color="#0066ff" style={styles.locationIcon} />
                      <View style={styles.locationTextContainer}>
                        <Text style={styles.locationTitle}>Newtown, Kolkata</Text>
                        <Text style={styles.locationSubtitle}>Action Area I, New Town - 2.5 km away</Text>
                      </View>
                    </View>

                    {/* View on Map Button */}
                    <TouchableOpacity style={styles.mapButton}>
                      <Ionicons name="map" size={18} color="#fff" />
                      <Text style={styles.mapButtonText}>View on Map</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </LinearGradient>

              {/* View Seller Location Button */}
              <LinearGradient
                colors={["#6ED9F7", "#5dd3e8"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.viewLocationGradient}
              >
                <TouchableOpacity onPress={toggleSellerLocation} style={styles.viewLocationButton}>
                  <Ionicons name="location" size={18} color="#FF5757" />
                  <Text style={styles.viewLocationText}>View seller's location</Text>
                </TouchableOpacity>
              </LinearGradient>

              {/* Terms & Conditions Accordion */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  onPress={() => setIsDisclosureOpen(!isDisclosureOpen)}
                  style={styles.termsHeader}
                >
                  <Text style={styles.termsTitle}>Terms & Conditions</Text>
                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color="#666"
                    style={{
                      transform: [{ rotate: isDisclosureOpen ? "180deg" : "0deg" }],
                    }}
                  />
                </TouchableOpacity>

                {isDisclosureOpen && (
                  <View style={styles.termsContent}>
                    <Text style={styles.termItem}>• Payment will be made hand to hand there.</Text>
                    <Text style={styles.termItem}>• Buyer must inspect the book condition before purchase.</Text>
                    <Text style={styles.termItem}>• No returns or refunds after the transaction is complete.</Text>
                    <Text style={styles.termItem}>• Meet at a safe public location for the exchange.</Text>
                    <Text style={styles.termItem}>• Seller is responsible for the accuracy of book details.</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Your Current Location Section */}
          <View style={[styles.currentLocationSection, { paddingHorizontal: SCREEN_WIDTH * 0.04 }]}>
            <Text style={styles.currentLocationTitle}>Your Current Location</Text>

            {/* Current Location Display */}
            <LinearGradient
              colors={["#88D4FF", "#ffffffff"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.locationDisplayGradient}
            >
              <Ionicons name="location-outline" size={20} color="#0066ff" />
              <Text style={styles.locationDisplayText} numberOfLines={1}>
                {location}
              </Text>
            </LinearGradient>

            {/* Update Location Button */}
            <LinearGradient
              colors={["#90D7FF", "#05A5FF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.updateLocationGradient}
            >
              <TouchableOpacity style={styles.updateLocationButton}>
                <Text style={styles.updateLocationText}>Update Location</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Buy at ₹1,200 Full Width Button */}
          <TouchableOpacity
            style={[styles.mainBuyButton, { marginHorizontal: SCREEN_WIDTH * 0.04 }]}
            onPress={handleBuy}
          >
            <Text style={styles.mainBuyButtonText}>Buy at ₹1,200</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={[styles.suggestedTitle, { left: SCREEN_WIDTH * 0.04 }]}>
            suggested books
          </Text>

          {/* Grid of Books - 2 columns */}
          <View style={[styles.gridContainer, { paddingHorizontal: SCREEN_WIDTH * 0.04 }]}>
            {gridBooks.map((book) => (
              <View key={book.id} style={[styles.gridCard, { width: "48%", height: SCREEN_HEIGHT * 0.3 }]}>
                {/* Image Container */}
                <View style={[styles.gridImageContainer, { height: SCREEN_HEIGHT * 0.225 }]}>
                  {book.distance && (
                    <View style={styles.gridDistanceBadge}>
                      <Text style={styles.gridDistanceBadgeText}>{book.distance}</Text>
                    </View>
                  )}
                  <Image
                    source={{ uri: book.image }}
                    style={styles.gridImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Details */}
                <View style={styles.gridDetails}>
                  <Text numberOfLines={2} style={styles.gridTitle}>
                    {book.title}
                  </Text>

                  {/* Price Row */}
                  <View style={styles.gridPriceRow}>
                    <Text style={styles.gridOriginalPrice}>
                      ₹{book.priceMrp.toLocaleString()}
                    </Text>
                    <View style={styles.gridCurrentPriceContainer}>
                      <Text style={styles.gridNowAtText}>Now at</Text>
                      <Text style={styles.gridCurrentPrice}>
                        ₹{book.priceNow.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Loading overlay with GIF */}
        {isBuying && (
          <View style={styles.loadingOverlay}>
            <View style={[styles.loadingCard, { width: SCREEN_WIDTH * 0.6 }]}>
              <Image
                source={loadingGif}
                style={styles.loadingGif}
                resizeMode="contain"
              />
              <Text style={styles.loadingText}>Processing your order...</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d4f1f4" },
  safeArea: { flex: 1 },
  header: {
    paddingVertical: 15,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#d4f1f4",
  },
  backButton: { padding: 4 },
  searchBar: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
    fontWeight: "400",
  },
  sellButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sellIcon: { width: 24, height: 24 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  carouselContainer: { position: "relative" },
  distanceBadge: {
    position: "absolute",
    bottom: 12,
    left: 16,
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  distanceBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  imageCounter: {
    position: "absolute",
    top: 12,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 10,
  },
  imageCounterText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 15,
  },
  productImage: { width: "65%", height: "100%", borderRadius: 4 },
  productDetails: { paddingTop: 12 },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    lineHeight: 22,
    marginBottom: 8,
  },
  moreText: { color: "#0066ff", fontWeight: "400" },
  lowestPriceBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#0066ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 12,
  },
  lowestPriceBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
  },
  currentPriceContainer: { flexDirection: "row", alignItems: "baseline" },
  nowAtText: {
    fontSize: 20,
    color: "#0066ff",
    fontWeight: "500",
    marginRight: 6,
  },
  currentPrice: {
    fontSize: 20,
    color: "#0066ff",
    fontWeight: "800",
    textShadowColor: "rgba(0, 102, 255, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buyNowGradient: {
    borderRadius: 11,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  buyNowButton: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 16,
  },
  buyNowText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginLeft: 16,
  },
  expandedSection: {
    backgroundColor: "#97d9ffff",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sellerLocationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 2,
    shadowColor: "#000",
    backgroundColor: "#fdfdfeff",
    borderRadius: 8,
  },
  locationIcon: { marginRight: 10 },
  locationTextContainer: { flex: 1 },
  locationTitle: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
    marginBottom: 2,
  },
  locationSubtitle: { fontSize: 11, color: "#666" },
  mapButton: {
    backgroundColor: "#0066ff",
    height: 44,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  mapButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  viewLocationGradient: {
    height: 50,
    borderRadius: 11,
    marginBottom: 16,
    marginTop: -25,
    overflow: "hidden",
  },
  viewLocationButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  viewLocationText: { color: "#000", fontSize: 14, fontWeight: "500" },
  termsContainer: {
    backgroundColor: "#f5f9ff",
    borderWidth: 1,
    borderColor: "#63a2ef",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 11,
  },
  termsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  termsTitle: { fontSize: 14, fontWeight: "600", color: "#000" },
  termsContent: { marginTop: 10 },
  termItem: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    marginBottom: 6,
  },
  currentLocationSection: { marginTop: 20 },
  currentLocationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  locationDisplayGradient: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbdefb",
  },
  locationDisplayText: {
    flex: 1,
    fontSize: 13,
    color: "#555",
    marginLeft: 8,
  },
  updateLocationGradient: {
    height: 44,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: 0,
    overflow: "hidden",
  },
  updateLocationButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  updateLocationText: { color: "#000", fontSize: 15, fontWeight: "600" },
  mainBuyButton: {
    backgroundColor: "#4dd4e3",
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainBuyButtonText: { color: "#000", fontSize: 18, fontWeight: "700" },
  divider: { height: 1, backgroundColor: "#d4d4d4ff", marginBottom: 12 },
  suggestedTitle: {
    fontSize: 20,
    color: "#040404ff",
    fontWeight: "500",
    marginRight: 6,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  gridImageContainer: {
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    position: "relative",
  },
  gridDistanceBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 10,
  },
  gridDistanceBadgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
  gridImage: { width: "80%", height: "90%" },
  gridDetails: { padding: 10 },
  gridTitle: {
    fontSize: 11,
    color: "#000",
    lineHeight: 15,
    height: 30,
    marginBottom: 6,
    fontWeight: "500",
  },
  gridPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridOriginalPrice: {
    fontSize: 10,
    color: "#999",
    textDecorationLine: "line-through",
  },
  gridCurrentPriceContainer: { flexDirection: "row", alignItems: "baseline" },
  gridNowAtText: { fontSize: 9, color: "#0066ff", marginRight: 3 },
  gridCurrentPrice: { fontSize: 13, color: "#0066ff", fontWeight: "700" },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  loadingGif: { width: 120, height: 120, marginBottom: 10 },
  loadingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },
});

export default Disclosure;
