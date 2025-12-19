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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
  
  const [location] = useState<string>(
    "Action Area I, 1/2, Newtown, New Town, Cha..."
  );
  const [isDisclosureOpen, setIsDisclosureOpen] = useState<boolean>(false);
  const [isBuyNowExpanded, setIsBuyNowExpanded] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const featuredBook = books[0];
  const gridBooks = books.slice(1);
  const productImages = featuredBook.images || [featuredBook.image];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentImageIndex(index);
  };

  // Handler to toggle the seller location expansion
  const toggleSellerLocation = () => {
    setIsBuyNowExpanded(!isBuyNowExpanded);
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View
      style={{
        height: IMAGE_HEIGHT,
        width: SCREEN_WIDTH,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingVertical: SCREEN_HEIGHT * 0.024,
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: item }}
        style={{ width: "65%", height: "100%", borderRadius: 4 }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#d4f1f4" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#2ee0f4ff" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: SCREEN_WIDTH * 0.04,
            paddingVertical: SCREEN_HEIGHT * 0.015,
            paddingTop: SCREEN_HEIGHT * 0.05,
            flexDirection: "row",
            alignItems: "center",
            gap: SCREEN_WIDTH * 0.05,
            backgroundColor: "#d4f1f4",
          }}
        >
          <TouchableOpacity style={{ padding: 4 }}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              height: 44,
              borderRadius: 8,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 15,
                color: "#000",
                fontWeight: "400",
              }}
              placeholder="books near me"
              defaultValue="books near me"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Image
              source={require("../../assets/images/Sellbook.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Main Product Card */}
          <View>
            {/* Image Carousel Section */}
            <View style={{ position: "relative" }}>
              {/* 2.5 km Badge - Bottom Left */}
              <View
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 16,
                  backgroundColor: "#ff6b6b",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  2.5 km
                </Text>
              </View>

              {/* Image Counter - Top Right */}
              <View
                style={{
                  position: "absolute",
                  top: 12,
                  right: 16,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 12,
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {currentImageIndex + 1}/{productImages.length}
                </Text>
              </View>

              {/* Horizontal Image Carousel */}
              <FlatList
                ref={flatListRef}
                data={productImages}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => `image-${index}`}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                snapToInterval={SCREEN_WIDTH}
                decelerationRate="fast"
                style={{ height: IMAGE_HEIGHT }}
              />
            </View>

            {/* Product Details Section */}
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, paddingTop: 12 }}>
              {/* Title */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#000",
                  lineHeight: 22,
                  marginBottom: 8,
                }}
              >
                NCERT Mathematics Textbook for Class XI Edition 2024 (English
                Medium)
                {" "}
                <Text style={{ color: "#0066ff", fontWeight: "400" }}>
                  ......more
                </Text>
              </Text>

              {/* "At Lowest Price" Badge */}
              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#0066ff",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 4,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: "700",
                    letterSpacing: 0.3,
                  }}
                >
                  At Lowest Price
                </Text>
              </View>

              {/* Price Row */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#999",
                    textDecorationLine: "line-through",
                  }}
                >
                  ₹2,000
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "baseline" }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#0066ff",
                      fontWeight: "500",
                      marginRight: 6,
                    }}
                  >
                    Now at
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#0066ff",
                      fontWeight: "800",
                      textShadowColor: "rgba(0, 102, 255, 0.3)",
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 4,
                    }}
                  >
                    ₹1,200
                  </Text>
                </View>
              </View>

              {/* Buy Now Button */}
              <LinearGradient
                colors={["#003EF9", "#002593"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 11,
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                <TouchableOpacity
                  onPress={toggleSellerLocation}
                  style={{
                    height: 60,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 24,
                    paddingRight: 16,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 17,
                      fontWeight: "700",
                      flex: 1,
                      textAlign: "center",
                      marginLeft: 16,
                    }}
                  >
                    Buy Now at ₹1,200
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={22}
                    color="#fff"
                    style={{
                      transform: [
                        { rotate: isBuyNowExpanded ? "180deg" : "0deg" },
                      ],
                    }}
                  />
                </TouchableOpacity>

                {/* Expanded Seller Location Options */}
                {isBuyNowExpanded && (
                  <View
                    style={{
                      backgroundColor: "#97d9ffff",
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#000",
                        marginBottom: 12,
                      }}
                    >
                      Seller's Location
                    </Text>

                    {/* Location Address */}
                    <View
                      style={{
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
                      }}
                    >
                      <Ionicons
                        name="location"
                        size={20}
                        color="#0066ff"
                        style={{ marginRight: 10 }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#000",
                            fontWeight: "500",
                            marginBottom: 2,
                          }}
                        >
                          Newtown, Kolkata
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: "#666",
                          }}
                        >
                          Action Area I, New Town - 2.5 km away
                        </Text>
                      </View>
                    </View>

                    {/* View on Map Button */}
                    <TouchableOpacity
                      style={{
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
                      }}
                    >
                      <Ionicons name="map" size={18} color="#fff" />
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                      >
                        View on Map
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </LinearGradient>

              {/* View Seller Location Button with Gradient */}
              <LinearGradient
                colors={["#6ED9F7", "#5dd3e8"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                  height: 50,
                  borderRadius: 11,
                  marginBottom: 16,
                  marginTop: -25,
                  overflow: "hidden",
                }}
              >
                <TouchableOpacity
                  onPress={toggleSellerLocation}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Ionicons name="location" size={18} color="#FF5757" />
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    View seller's location
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              {/* Terms & Conditions Accordion */}
              <View
                style={{
                  backgroundColor: "#f5f9ff",
                  borderWidth: 1,
                  borderColor: "#63a2ef",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderRadius: 11,
                }}
              >
                <TouchableOpacity
                  onPress={() => setIsDisclosureOpen(!isDisclosureOpen)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    Terms & Conditions
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color="#666"
                    style={{
                      transform: [
                        { rotate: isDisclosureOpen ? "180deg" : "0deg" },
                      ],
                    }}
                  />
                </TouchableOpacity>

                {isDisclosureOpen && (
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#555",
                        lineHeight: 20,
                        marginBottom: 6,
                      }}
                    >
                      • Payment will be made hand to hand there.
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#555",
                        lineHeight: 20,
                        marginBottom: 6,
                      }}
                    >
                      • Buyer must inspect the book condition before purchase.
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#555",
                        lineHeight: 20,
                        marginBottom: 6,
                      }}
                    >
                      • No returns or refunds after the transaction is complete.
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#555",
                        lineHeight: 20,
                        marginBottom: 6,
                      }}
                    >
                      • Meet at a safe public location for the exchange.
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#555",
                        lineHeight: 20,
                      }}
                    >
                      • Seller is responsible for the accuracy of book details.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Your Current Location Section */}
          <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, marginTop: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "#000",
                marginBottom: 10,
              }}
            >
              Your Current Location
            </Text>

            {/* Current Location Display with Gradient */}
            <LinearGradient
              colors={["#88D4FF", "#ffffffff"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                padding: 14,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#bbdefb",
              }}
            >
              <Ionicons name="location-outline" size={20} color="#0066ff" />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#555",
                  marginLeft: 8,
                }}
                numberOfLines={1}
              >
                {location}
              </Text>
            </LinearGradient>

            {/* Update Location Button with Gradient */}
            <LinearGradient
              colors={["#90D7FF", "#05A5FF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                height: 44,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                marginTop: 0,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                >
                  Update Location
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Buy at ₹1,200 Full Width Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#4dd4e3",
              height: 54,
              marginHorizontal: SCREEN_WIDTH * 0.04,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Buy at ₹1,200
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: "#d4d4d4ff",
              marginBottom: 12,
            }}
          />

          <Text
            style={{
              fontSize: 20,
              color: "#040404ff",
              fontWeight: "500",
              marginRight: 6,
              left: SCREEN_WIDTH * 0.04,
              marginBottom: 12,
            }}
          >
            suggested books
          </Text>

          {/* Grid of Books - 2 columns */}
          <View
            style={{
              paddingHorizontal: SCREEN_WIDTH * 0.04,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {gridBooks.map((book) => (
              <View
                key={book.id}
                style={{
                  width: "48%",
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  marginBottom: 16,
                  overflow: "hidden",
                  elevation: 1,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.08,
                  shadowRadius: 2,
                }}
              >
                {/* Image Container */}
                <View
                  style={{
                    height: SCREEN_HEIGHT * 0.225,
                    backgroundColor: "#fafafa",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    position: "relative",
                  }}
                >
                  {book.distance && (
                    <View
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        backgroundColor: "#ff6b6b",
                        paddingHorizontal: 6,
                        paddingVertical: 3,
                        borderRadius: 8,
                        zIndex: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 9,
                          fontWeight: "700",
                        }}
                      >
                        {book.distance}
                      </Text>
                    </View>
                  )}
                  <Image
                    source={{ uri: book.image }}
                    style={{ width: "80%", height: "90%" }}
                    resizeMode="contain"
                  />
                </View>

                {/* Details */}
                <View style={{ padding: 10 }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 11,
                      color: "#000",
                      lineHeight: 15,
                      height: 30,
                      marginBottom: 6,
                      fontWeight: "500",
                    }}
                  >
                    {book.title}
                  </Text>

                  {/* Price Row */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#999",
                        textDecorationLine: "line-through",
                      }}
                    >
                      ₹{book.priceMrp.toLocaleString()}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "baseline" }}
                    >
                      <Text
                        style={{
                          fontSize: 9,
                          color: "#0066ff",
                          marginRight: 3,
                        }}
                      >
                        Now at
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#0066ff",
                          fontWeight: "700",
                        }}
                      >
                        ₹{book.priceNow.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Disclosure;
