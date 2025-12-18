// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { router } from "expo-router";
// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const Dashboard = () => {
//   return (
//     <LinearGradient colors={["#70F3FA", "#FFFFFF"]} style={{ flex: 1 }}>
//       <View style={styles.topSection}>
//         {/* Back + Title */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
//             <Ionicons name="chevron-back" size={24} color="#000" />
//           </TouchableOpacity>

//           <Text style={styles.headerText}>
//             Select your location to share knowledge
//           </Text>
//         </View>

//         {/* Search Bar */}
//         <View style={styles.searchBox}>
//           <MaterialIcons name="search" size={20} color="#003EF9" />
//           <TextInput
//             placeholder="Search your area, street name..."
//             placeholderTextColor="#6B6B6B"
//             style={styles.searchInput}
//           />
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default Dashboard;

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   topSection: {
//     width: "100%",
//     paddingTop: 50,
//     paddingBottom: 10,
//     paddingHorizontal: 16,
//     borderBottomWidth: 0.2,
//   },

//   headerRow: {
//     flexDirection: "column",

//     marginBottom: 10,
//   },

//   headerText: {
//     fontSize: 14,
//     fontWeight: "400",
//     color: "#000000",
//     marginLeft: 5,
//     flexShrink: 1,
//     fontFamily: "poppins",
//   },

//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ECEBEB",
//     borderRadius: 9,
//     paddingHorizontal: 10,
//     height: 40,
//     elevation: 2,
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 8,
//     color: "#000",
//     fontWeight: "400",
//     fontFamily: "Poppins",
//   },

//   mapContainer: {
//     height: "50%",
//   },
// });

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BannerCarousel from "../Components/Banner";
import { Image } from "expo-image";

const NEAR_BOOKS = [
  {
    id: "1",
    name: "NCERT Mathematics Class X",
    image: "https://ncert.nic.in/textbook/pdf/jemh1cc.jpg",
    mrp: 2000,
    price: 1509,
    distance: "2.5 km",
  },
  {
    id: "2",
    name: "NCERT Chemistry Class XII",
    image: "https://ncert.nic.in/textbook/pdf/kech1cc.jpg",
    mrp: 2500,
    price: 1900,
    distance: "2 km",
  },
  {
    id: "3",
    name: "NCERT Physics Class XI",
    image: "https://ncert.nic.in/textbook/pdf/leph1cc.jpg",
    mrp: 1000,
    price: 763,
    distance: "3 km",
  },
];

const Dashboard = () => {
  const [liveAddress, setLiveAddress] = useState("Fetching location...");

  useEffect(() => {
    (async () => {
      try {
        // 1️⃣ Ask permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLiveAddress("Location permission denied");
          return;
        }

        // 2️⃣ Get current GPS location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const { latitude, longitude } = location.coords;

        // 3️⃣ Reverse geocode to address
        const addressResponse = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (addressResponse.length > 0) {
          const addr = addressResponse[0];

          // 4️⃣ Build readable address (India-friendly)
          const formattedAddress = [
            addr.name,
            addr.city || addr.district,
            addr.subregion, // area
            addr.street,
            addr.region, // state
          ]
            .filter(Boolean)
            .join(", ");

          setLiveAddress(formattedAddress);
        }
      } catch (error) {
        console.log("Location error:", error);
        setLiveAddress("Unable to fetch location");
      }
    })();
  }, []);

  return (
    <LinearGradient colors={["#6FE9F0", "#CFF7FA"]} style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        {/* Location + Profile */}
        <View style={styles.headerRow}>
          {/* Location */}
          <TouchableOpacity activeOpacity={0.7} style={styles.locationBox}>
            <Ionicons name="location-sharp" size={16} color="#000" />
            <Text style={styles.locationTitle}>Home</Text>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>

          {/* Right Icons */}
          <View style={styles.rightIcons}>
            {/* Coins */}
            <View style={styles.coinBox}>
              <View style={styles.rupeeIconWrapper}>
                <MaterialIcons
                  name="currency-rupee"
                  size={14}
                  color="#E6CB00"
                />
              </View>
              <Text style={styles.coinText}>10</Text>
            </View>

            {/* Avatar */}
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color="#555" />
            </View>
          </View>
        </View>

        {/* Address */}
        <Text style={styles.addressText} numberOfLines={1}>
          {liveAddress}
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#003EF9" />
          <TextInput
            placeholder="Search for your favorite Book"
            placeholderTextColor="#000000E0"
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <Ionicons name="mic" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Coursel Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.mainContent}
      >
        <BannerCarousel />
        {/* Book Near Me */}
        {/* ===== Book Near Me ===== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Book Near Me</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bookList}
          >
            {NEAR_BOOKS.map((item) => (
              <View key={item.id} style={styles.bookCard}>
                {/* Image */}
                <View style={styles.imageWrapper}>
                  <Text style={styles.distanceBadge}>📍 {item.distance}</Text>
                  <View style={styles.imagePlaceholder}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.bookImage}
                      resizeMode="cover"
                    />
                  </View>
                </View>

                {/* Book Info */}
                <Text style={styles.bookName} numberOfLines={2}>
                  {item.name}
                </Text>

                <Text style={styles.mrp}>₹{item.mrp}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>

                <Text style={styles.buyText}>Buy at ₹{item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 14,
    height: "18.5%",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },

  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginHorizontal: 1,
  },

  addressText: {
    fontSize: 12,
    color: "#000000E0",
    marginTop: 1,
    fontWeight: 400,
    marginBottom: 10,
    width: "70%",
  },

  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  coinBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D900",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    borderColor: "#6634C991",
    borderWidth: 1,
    marginRight: 10,
  },
  rupeeIconWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6CB00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  coinText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    backgroundColor: "#CBE2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECEBEB",
    borderRadius: 9,
    paddingHorizontal: 12,
    height: 42,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 5,
    fontSize: 15,
    color: "#000000E0",
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  bookList: {
    paddingHorizontal: 12,
  },

  bookCard: {
    width: 130,
    marginRight: 12,
  },

  imageWrapper: {
    position: "relative",
  },

  imagePlaceholder: {
    height: 160,
    borderRadius: 8,
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
  },

  distanceBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "#fff",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 2,
    elevation: 2,
  },

  bookName: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    color: "#000",
  },

  mrp: {
    fontSize: 11,
    color: "#777",
    textDecorationLine: "line-through",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  buyText: {
    fontSize: 12,
    color: "#003EF9",
    fontWeight: "600",
    marginTop: 2,
  },
  bookImage: {
  width: "100%",
  height: "100%",
  borderRadius: 8,
},

});
