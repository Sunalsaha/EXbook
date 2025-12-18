// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MapView from "react-native-maps";
// const { width } = Dimensions.get("window");

// const UserCurrentLocation = () => {
//   return (
//     <LinearGradient colors={["#70F3FA", "#FFFFFF"]} style={styles.gradient}>
// {/* TOP SEARCH SECTION */}
// <LinearGradient colors={["#FFFFFF", "#85F4FA"]} style={styles.topSection}>
//   {/* Back + Title */}
//   <View style={styles.headerRow}>
//     <TouchableOpacity activeOpacity={0.7}>
//       <Ionicons name="chevron-back" size={24} color="#000" />
//     </TouchableOpacity>

//     <Text style={styles.headerText}>
//       Select your location to share knowledge
//     </Text>
//   </View>

//   {/* Search Bar */}
//   <View style={styles.searchBox}>
//     <MaterialIcons name="search" size={20} color="#003EF9" />
//     <TextInput
//       placeholder="Search your area, street name..."
//       placeholderTextColor="#6B6B6B"
//       style={styles.searchInput}
//     />
//   </View>
// </LinearGradient>
//       {/* ===== MAP SECTION ===== */}
//       <View style={styles.mapContainer}>
//         <MapView
//           style={StyleSheet.absoluteFillObject}
//           initialRegion={{
//             latitude: 23.5726, // dummy (Kolkata)
//             longitude: 88.3639,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         />

//         {/* Center Pin */}
//         <View style={styles.pinWrapper}>
//           <Ionicons name="location-sharp" size={40} color="#FF3B30" />
//         </View>

//         {/* Current Location Button */}
//         <TouchableOpacity style={styles.currentLocationBtn}>
//           <MaterialIcons name="my-location" size={22} color="#000" />
//         </TouchableOpacity>

//         <View>
//           <TextInput placeholder="Village / Locality"></TextInput>

//           <TextInput placeholder="Block / Tehsil"></TextInput>
//           <TextInput placeholder="District"></TextInput>
//           <TextInput placeholder="State"></TextInput>
//           <TextInput placeholder="PIN Code"></TextInput>

//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// export default UserCurrentLocation;

// const styles = StyleSheet.create({
// gradient: {
//   flex: 1,
// },

// topSection: {
//   width: "100%",
//   paddingTop: 50,
//   paddingBottom: 10,
//   paddingHorizontal: 16,
//   borderBottomWidth: 1,
//   borderBottomColor: "red",
// },

// headerRow: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginBottom: 10,
// },

// headerText: {
//   fontSize: 14,
//   fontWeight: "400",
//   color: "#000000",
//   marginLeft: 5,
//   flexShrink: 1,
//   fontFamily: "poppins",
// },

// searchBox: {
//   flexDirection: "row",
//   alignItems: "center",
//   backgroundColor: "#ECEBEB",
//   borderRadius: 9,
//   paddingHorizontal: 10,
//   height: 40,
//   elevation: 2, // Android shadow
// },

// searchInput: {
//   flex: 1,
//   fontSize: 16,
//   marginLeft: 8,
//   color: "#000",
//   fontWeight: 400,
//   fontFamily: "Poppins",
// },

//   /* ===== MAP ===== */
//   mapContainer: {
//     flex: 1,
//   },

//   pinWrapper: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -20,
//     marginTop: -40,
//   },

//   currentLocationBtn: {
//     position: "absolute",
//     bottom: 30,
//     right: 16,
//     backgroundColor: "#FFFFFF",
//     padding: 12,
//     borderRadius: 30,
//     elevation: 3,
//   },
// });

// const LightMapStyle = [
//   {
//     elementType: "geometry",
//     stylers: [{ color: "#c2c3c6ff" }],
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#6b6b6b" }],
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [{ color: "#eef1f2" }],
//   },
//   {
//     elementType: "labels.icon",
//     stylers: [{ visibility: "on" }],
//   },

//   /* Roads */
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [{ color: "#FDFEFE" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.stroke",
//     stylers: [{ color: "#FDFEFE" }],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#677F83" }],
//   },

//   /* Highways */
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [{ color: "#FDFEFE" }],
//   },

//   /* Water */
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#A7DBFF" }],
//   },

//   /* POIs – hidden (very important) */
//   {
//     featureType: "poi",
//     stylers: [{ visibility: "off" }],
//   },

//   /* Transit */
//   {
//     featureType: "transit",
//     stylers: [{ visibility: "off" }],
//   },

//   /* Landscape */
//   {
//     featureType: "landscape",
//     elementType: "geometry",
//     stylers: [{ color: "#eef1f2" }],
//   },
// ];

// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Dimensions,
//   Keyboard,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width, height } = Dimensions.get("window");

// const UserCurrentLocation = () => {
//   const mapRef = useRef<MapView>(null);
//   const [region, setRegion] = useState({
//     latitude: 22.5726,
//     longitude: 88.3639,
//     latitudeDelta: 0.04,
//     longitudeDelta: 0.04,
//   });
//   const [pinCoordinate, setPinCoordinate] = useState({
//     latitude: 22.5726,
//     longitude: 88.3639,
//   });
//   const [locality, setLocality] = useState("");
//   const [block, setBlock] = useState("");
//   const [district, setDistrict] = useState("");
//   const [state, setState] = useState("");
//   const [pin, setPin] = useState("");
//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }
//     })();

//     const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
//       setKeyboardHeight(e.endCoordinates.height);
//     });
//     const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardHeight(0);
//     });

//     return () => {
//       keyboardDidShow.remove();
//       keyboardDidHide.remove();
//     };
//   }, []);

// const handleCurrentLocation = async () => {
//   try {
//     let position = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.High,
//     });

//     // 🔹 FULL RAW LOCATION OBJECT
//     console.log("📍 Raw position object:", position);

//     // 🔹 EXTRACTED COORDINATES
//     const {
//       latitude,
//       longitude,
//       altitude,
//       accuracy,
//       altitudeAccuracy,
//       heading,
//       speed,
//     } = position.coords;

//     console.log("📌 Latitude:", latitude);
//     console.log("📌 Longitude:", longitude);
//     console.log("🎯 Accuracy (meters):", accuracy);
//     console.log("⬆️ Altitude:", altitude);
//     console.log("🧭 Heading:", heading);
//     console.log("🚀 Speed:", speed);
//     console.log("⛰️ Altitude Accuracy:", altitudeAccuracy);
//     console.log(
//       "⏱️ Timestamp:",
//       new Date(position.timestamp).toLocaleString()
//     );

//     const newCoord = {
//       latitude,
//       longitude,
//     };

//     setPinCoordinate(newCoord);

//     mapRef.current?.animateToRegion(
//       {
//         ...newCoord,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       },
//       1000
//     );

//     await updateAddress(latitude, longitude);
//   } catch (error) {
//     console.log("❌ Error getting current location:", error);
//   }
// };

//   const handleDragEnd = async (e: any) => {
//     const newCoord = e.nativeEvent.coordinate;
//     setPinCoordinate(newCoord);
//     mapRef.current?.animateToRegion(
//       {
//         ...newCoord,
//         latitudeDelta: region.latitudeDelta,
//         longitudeDelta: region.longitudeDelta,
//       },
//       500
//     );
//     await updateAddress(newCoord.latitude, newCoord.longitude);
//   };

//   const updateAddress = async (lat: number, lng: number) => {
//     try {
//       const res = await Location.reverseGeocodeAsync({
//         latitude: lat,
//         longitude: lng,
//       });

//       console.log("🏠 Reverse geocode result:", res);

//       if (res.length > 0) {
//         const a = res[0];
//         console.log("📍 Address Details:", {
//           name: a.name,
//           street: a.street,
//           city: a.city,
//           district: a.district,
//           region: a.region,
//           postalCode: a.postalCode,
//           country: a.country,
//         });
//       }
//     } catch (e) {
//       console.log("❌ Address fetch error:", e);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       {/* ===== TOP SEARCH SECTION ===== */}
//       <View style={styles.topSection}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity>
//             <Ionicons name="chevron-back" size={26} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>
//             Select your location to Share knowledge
//           </Text>
//         </View>
//         <View style={styles.searchBox}>
//           <MaterialIcons name="search" size={20} color="#FF3B30" />
//           <TextInput
//             placeholder="Search for area, street name..."
//             placeholderTextColor="#888"
//             style={styles.searchInput}
//           />
//         </View>
//       </View>

//       {/* ===== MAP ===== */}
//       <View style={styles.mapContainer}>
//         <MapView
//           ref={mapRef}
//           style={StyleSheet.absoluteFillObject}
//           customMapStyle={LightMapStyle}
//           showsUserLocation={false}
//         >
//           <Marker
//             coordinate={pinCoordinate}
//             draggable
//             onDragEnd={handleDragEnd}
//             anchor={{ x: 0.5, y: 1 }} // Anchor at bottom center for pin feel
//           >
//             <Ionicons name="location-sharp" size={42} color="#FF3B30" />
//           </Marker>
//           <View style={styles.centerIndicator}>
//   <View style={styles.centerDot} />
// </View>
//         </MapView>

//         {/* Tooltip */}
//         {/* <View style={styles.tooltip}>
//           <Text style={styles.tooltipText}>
//             Move pin to your exact location
//           </Text>
//         </View> */}

//         {/* Use Current Location Button */}
//         <Pressable
//           onPress={handleCurrentLocation}
//           style={({ pressed }) => [
//             styles.currentLocationBtn,
//             { opacity: pressed ? 0.85 : 1 },
//           ]}
//         >
//           <MaterialIcons name="my-location" size={20} color="#FF3B30" />
//           <Text style={styles.currentLocationText}>Use current location</Text>
//         </Pressable>

// {/* ===== BOTTOM ADDRESS CARD ===== */}
// <View
//   style={[styles.bottomCard, { paddingBottom: keyboardHeight + 10 }]}
// >
//   <View style={styles.dragHandle} />

//   <TextInput
//     placeholder="Village / Locality"
//     placeholderTextColor="#888"
//     style={styles.addressInput}
//     value={locality}
//     onChangeText={setLocality}
//   />

//   <TextInput
//     placeholder="Block / Tehsil"
//     placeholderTextColor="#888"
//     style={styles.addressInput}
//     value={block}
//     onChangeText={setBlock}
//   />

//   <TextInput
//     placeholder="District"
//     placeholderTextColor="#888"
//     style={styles.addressInput}
//     value={district}
//     onChangeText={setDistrict}
//   />

//   <View style={styles.row}>
//     <TextInput
//       placeholder="State"
//       placeholderTextColor="#888"
//       style={[styles.addressInput, styles.halfInput]}
//       value={state}
//       onChangeText={setState}
//     />
//     <TextInput
//       placeholder="PIN Code"
//       placeholderTextColor="#888"
//       keyboardType="number-pad"
//       style={[styles.addressInput, styles.halfInput]}
//       value={pin}
//       onChangeText={setPin}
//     />
//   </View>

//   <Text style={styles.saveAsText}>Save address as</Text>

//   <View style={styles.tagRow}>
//     <TouchableOpacity style={styles.tag}>
//       <Ionicons name="home-outline" size={16} color="#FF3B30" />
//       <Text style={styles.tagText}>Home</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.tag}>
//       <Ionicons name="briefcase-outline" size={16} color="#FF3B30" />
//       <Text style={styles.tagText}>Work</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.tag}>
//       <Ionicons name="location-outline" size={16} color="#FF3B30" />
//       <Text style={styles.tagText}>Other</Text>
//     </TouchableOpacity>
//   </View>

//   <TouchableOpacity style={styles.saveBtn}>
//     <Text style={styles.saveBtnText}>Save address</Text>
//   </TouchableOpacity>
// </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default UserCurrentLocation;

// // Styles remain the same as previous version (for brevity, not repeating here)
// // Make sure to include the ZomatoLikeMapStyle array from the previous code.

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },

//   topSection: {
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },

//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 12,
//   },

//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 12,
//     color: "#000",
//     flex: 1,
//   },

//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 48,
//     borderWidth: 1,
//     borderColor: "#FF3B30",
//   },

//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 15,
//     color: "#000",
//   },

//   mapContainer: { flex: 1 },

//   tooltipText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   pinWrapper: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: -21,
//     marginTop: -42,
//   },

//   pinCircle: {
//     position: "absolute",
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "rgba(255, 59, 48, 0.15)",
//     borderWidth: 2,
//     borderColor: "rgba(255, 59, 48, 0.3)",
//   },

//   currentLocationBtn: {
//     position: "absolute",
//     left: 16,
//     bottom: 280, // ⬅️ ABOVE bottom card
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 30,

//     // 🔥 TOUCH FIX
//     zIndex: 999,
//     elevation: 20,

//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },

//   currentLocationText: {
//     marginLeft: 8,
//     color: "#FF3B30",
//     fontSize: 14,
//     fontWeight: "600",
//   },

//   bottomCard: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 16,
//     paddingTop: 12,

//     elevation: 10,
//     zIndex: 10, // ⬅️ LOWER than button
//   },

//   dragHandle: {
//     width: 40,
//     height: 5,
//     backgroundColor: "#ccc",
//     alignSelf: "center",
//     borderRadius: 3,
//     marginBottom: 16,
//   },

//   addressInput: {
//     backgroundColor: "#f5f5f5",
//     borderRadius: 12,
//     padding: 14,
//     color: "#000",
//     marginBottom: 12,
//     fontSize: 15,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   halfInput: {
//     width: "48%",
//   },

//   saveAsText: {
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 8,
//     marginTop: 4,
//   },

//   tagRow: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },

//   tag: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#FF3B30",
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 30,
//     marginRight: 12,
//   },

//   tagText: {
//     marginLeft: 6,
//     fontSize: 14,
//     color: "#FF3B30",
//     fontWeight: "500",
//   },

//   saveBtn: {
//     backgroundColor: "#FF3B30",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 20,
//   },

//   saveBtnText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   centerIndicator: {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   marginLeft: -12,
//   marginTop: -12,
//   width: 24,
//   height: 24,
//   borderRadius: 12,
//   backgroundColor: "rgba(0,122,255,0.15)",
//   justifyContent: "center",
//   alignItems: "center",
// },
// centerDot: {
//   width: 10,
//   height: 10,
//   borderRadius: 5,
//   backgroundColor: "#007AFF",
// },

// });

// /* ===== ZOMATO-LIKE MAP STYLE ===== */
// // const ZomatoLikeMapStyle = [
// //   {
// //     elementType: "geometry",
// //     stylers: [{ color: "#f5f5f5" }],
// //   },
// //   {
// //     elementType: "labels.icon",
// //     stylers: [{ visibility: "off" }],
// //   },
// //   {
// //     elementType: "labels.text.fill",
// //     stylers: [{ color: "#616161" }],
// //   },
// //   {
// //     elementType: "labels.text.stroke",
// //     stylers: [{ color: "#f5f5f5" }],
// //   },
// //   {
// //     featureType: "administrative.land_parcel",
// //     elementType: "labels.text.fill",
// //     stylers: [{ color: "#bdbdbd" }],
// //   },
// //   {
// //     featureType: "poi",
// //     elementType: "geometry",
// //     stylers: [{ color: "#eeeeee" }],
// //   },
// //   {
// //     featureType: "poi",
// //     elementType: "labels.text.fill",
// //     stylers: [{ color: "#757575" }],
// //   },
// //   {
// //     featureType: "poi.park",
// //     elementType: "geometry",
// //     stylers: [{ color: "#e5e5e5" }],
// //   },
// //   {
// //     featureType: "road",
// //     elementType: "geometry",
// //     stylers: [{ color: "#ffffff" }],
// //   },
// //   {
// //     featureType: "road.arterial",
// //     elementType: "labels.text.fill",
// //     stylers: [{ color: "#757575" }],
// //   },
// //   {
// //     featureType: "road.highway",
// //     elementType: "geometry",
// //     stylers: [{ color: "#dadada" }],
// //   },
// //   {
// //     featureType: "road.highway",
// //     elementType: "labels.text.fill",
// //     stylers: [{ color: "#616161" }],
// //   },
// //   {
// //     featureType: "water",
// //     elementType: "geometry",
// //     stylers: [{ color: "#c9c9c9" }],
// //   },
// //   {
// //     featureType: "water",
// //     elementType: "labels.text.fill",
// //     stylers: [{ color: "#9e9e9e" }],
// //   },
// // ];

// const LightMapStyle = [
//   {
//     elementType: "geometry",
//     stylers: [{ color: "#c2c3c6ff" }],
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#6b6b6b" }],
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [{ color: "#eef1f2" }],
//   },
//   {
//     elementType: "labels.icon",
//     stylers: [{ visibility: "on" }],
//   },

//   /* Roads */
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [{ color: "#FDFEFE" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.stroke",
//     stylers: [{ color: "#FDFEFE" }],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#677F83" }],
//   },

//   /* Highways */
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [{ color: "#FDFEFE" }],
//   },

//   /* Water */
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#A7DBFF" }],
//   },

//   /* POIs – hidden (very important) */
//   {
//     featureType: "poi",
//     stylers: [{ visibility: "off" }],
//   },

//   /* Transit */
//   {
//     featureType: "transit",
//     stylers: [{ visibility: "off" }],
//   },

//   /* Landscape */
//   {
//     featureType: "landscape",
//     elementType: "geometry",
//     stylers: [{ color: "#eef1f2" }],
//   },
// ];

// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Location from "expo-location";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Dimensions,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MapView, { Circle, Region } from "react-native-maps";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// const DEFAULT_DELTA = {
//   latitudeDelta: 0.01,
//   longitudeDelta: 0.01,
// };

// export default function UserCurrentLocation() {
//   const mapRef = useRef<MapView>(null);

//   const [addressType, setAddressType] = useState<
//     "Home" | "Work" | "Other" | null
//   >(null);

//   /** 🔵 USER GPS LOCATION */
//   const [userLocation, setUserLocation] = useState<{
//     latitude: number;
//     longitude: number;
//     accuracy: number;
//   } | null>(null);

//   /** 📍 SELECTED LOCATION (MAP CENTER) */
//   const [selectedLocation, setSelectedLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);

//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   /* ================= INIT ================= */
//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") return;

//       const pos = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });

//       const coord = {
//         latitude: pos.coords.latitude,
//         longitude: pos.coords.longitude,
//         accuracy: pos.coords.accuracy ?? 50,
//       };

//       setUserLocation(coord);
//       setSelectedLocation(coord);

//       mapRef.current?.animateToRegion({ ...coord, ...DEFAULT_DELTA }, 800);

//       updateAddress(coord.latitude, coord.longitude);
//     })();

//     const show = Keyboard.addListener("keyboardDidShow", (e) =>
//       setKeyboardHeight(e.endCoordinates.height)
//     );
//     const hide = Keyboard.addListener("keyboardDidHide", () =>
//       setKeyboardHeight(0)
//     );

//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);

//   const AddressTag = ({
//     label,
//     icon,
//   }: {
//     label: "Home" | "Work" | "Other";
//     icon: keyof typeof Ionicons.glyphMap;
//   }) => {
//     const isActive = addressType === label;

//     return (
//       <TouchableOpacity
//         onPress={() => setAddressType(label)}
//         style={[
//           styles.tag,
//           isActive && styles.tagActive, // 👈 active style
//         ]}
//       >
//         <Ionicons name={icon} size={16} color={isActive ? "#007AFF" : "#000"} />
//         <Text style={[styles.tagText, isActive && styles.tagTextActive]}>
//           {label}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   console.log(addressType);

//   /* ================= USE CURRENT LOCATION ================= */
//   const handleCurrentLocation = async () => {
//     try {
//       let position = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });

//       // 🔹 FULL RAW LOCATION OBJECT
//       console.log("📍 Raw position object:", position);

//       // 🔹 EXTRACTED COORDINATES
//       const {
//         latitude,
//         longitude,
//         altitude,
//         accuracy,
//         altitudeAccuracy,
//         heading,
//         speed,
//       } = position.coords;

//       const newCoord = {
//         latitude,
//         longitude,
//       };

//       setSelectedLocation(newCoord);

//       mapRef.current?.animateToRegion(
//         {
//           ...newCoord,
//           latitudeDelta: 0.005,
//           longitudeDelta: 0.005,
//         },
//         1000
//       );

//       await updateAddress(latitude, longitude);
//     } catch (error) {
//       console.log("❌ Error getting current location:", error);
//     }
//   };

//   /* ================= MAP MOVE ================= */
//   const handleRegionChangeComplete = (region: Region) => {
//     const center = {
//       latitude: region.latitude,
//       longitude: region.longitude,
//     };

//     setSelectedLocation(center);
//     updateAddress(center.latitude, center.longitude);
//   };

//   /* ================= REVERSE GEOCODE ================= */
//   const updateAddress = async (lat: number, lng: number) => {
//     try {
//       const res = await Location.reverseGeocodeAsync({
//         latitude: lat,
//         longitude: lng,
//       });
//       console.log("📍 Address:", res[0]);
//     } catch (e) {
//       console.log("Reverse geocode error", e);
//     }
//   };

//   if (!selectedLocation) return null;
//   console.log(SCREEN_HEIGHT);
//   const BOTTOM_SHEET_RATIO = 0.38;
//   const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * BOTTOM_SHEET_RATIO;

//   const MAP_PADDING = {
//     top: 0,
//     right: 0,
//     bottom: BOTTOM_SHEET_HEIGHT,
//     left: 0,
//   };

//   const PIN_TOP = `${((1 - BOTTOM_SHEET_RATIO) * 100) / 2}%`;
//   console.log(PIN_TOP);

//   return (
//     <LinearGradient colors={["#70F3FA", "#FFFFFF"]} style={{ flex: 1 }}>
//       {/* ===== TOP ===== */}
//       {/* TOP SEARCH SECTION */}
//       <LinearGradient colors={["#FFFFFF", "#85F4FA"]} style={styles.topSection}>
//         {/* Back + Title */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity activeOpacity={0.7}>
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
//       </LinearGradient>

//       {/* ===== MAP ===== */}
//       <View style={styles.mapContainer}>
//         <View style={{ height: "100%" }}>
//           <MapView
//             ref={mapRef}
//             style={StyleSheet.absoluteFillObject}
//             customMapStyle={LightMapStyle}
//             initialRegion={{ ...selectedLocation, ...DEFAULT_DELTA }}
//             showsUserLocation={false}
//             onRegionChangeComplete={handleRegionChangeComplete}
//           >
//             {/* 🔵 CURRENT LOCATION INDICATOR */}
//             {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={userLocation.accuracy}
//                 fillColor="rgba(0,122,255,0.15)"
//                 strokeColor="rgba(0,122,255,0.4)"
//               />
//             )}
//           </MapView>

//           {/* 📍 FIXED CENTER PIN */}
//           <View pointerEvents="none" style={styles.centerPin}>
//             <Ionicons name="location-sharp" size={42} color="#FF3B30" />
//           </View>

//           {/* 🔵 CENTER BLUE DOT */}
//           <View pointerEvents="none" style={styles.centerIndicator}>
//             <View style={styles.centerDot} />
//           </View>

//           {/* 📌 USE CURRENT LOCATION */}
//           <Pressable
//             style={styles.currentLocationBtn}
//             onPress={handleCurrentLocation}
//           >
//             <MaterialIcons name="my-location" size={20} color="#FF3B30" />
//             <Text style={styles.currentLocationText}>Use current location</Text>
//           </Pressable>
//         </View>
//       </View>
//       {/* ===== BOTTOM ADDRESS CARD ===== */}

//       {/* ===== BOTTOM ADDRESS CARD ===== */}
//       <KeyboardAvoidingView style={styles.bottomCard}
//       >
//         <View style={styles.dragHandle} />

//         <ScrollView keyboardShouldPersistTaps="handled"
//       showsVerticalScrollIndicator={false}>
//           <TextInput
//           placeholder="Village / Locality"
//           placeholderTextColor="#FFFFFFE0"
//           style={styles.addressInput}
//         />

//         <TextInput
//           placeholder="Block / Tehsil"
//           placeholderTextColor="#FFFFFFE0"
//           style={styles.addressInput}
//         />

//         <TextInput
//           placeholder="District"
//           placeholderTextColor="#FFFFFFE0"
//           style={styles.addressInput}
//         />

//         <View style={styles.row}>
//           <TextInput
//             placeholder="State"
//             placeholderTextColor="#FFFFFFE0"
//             style={[styles.addressInput, styles.halfInput]}
//           />
//           <TextInput
//             placeholder="PIN Code"
//             placeholderTextColor="#FFFFFFE0"
//             keyboardType="number-pad"
//             style={[styles.addressInput, styles.halfInput]}
//           />
//         </View>

//         <Text style={styles.saveAsText}>Save address as</Text>

//         {/* <View style={styles.tagRow}>
//           <TouchableOpacity style={styles.tag}>
//             <Ionicons name="home-outline" size={16} color="#000000" />
//             <Text style={styles.tagText}>Home</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tag}>
//             <Ionicons name="briefcase-outline" size={16} color="#000000" />
//             <Text style={styles.tagText}>Work</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tag}>
//             <Ionicons name="location-outline" size={16} color="#000000" />
//             <Text style={styles.tagText}>Other</Text>
//           </TouchableOpacity>
//         </View> */}

//         <View style={styles.tagRow}>
//           <AddressTag label="Home" icon="home-outline" />
//           <AddressTag label="Work" icon="briefcase-outline" />
//           <AddressTag label="Other" icon="location-outline" />
//         </View>

//         </ScrollView>
//         <TouchableOpacity style={styles.saveBtn}>
//           <Text style={styles.saveBtnText}>Save address</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },

//   bottomSheetWrapper: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   formContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 30,
//   },
//   topSection: {
//     width: "100%",
//     paddingTop: 50,
//     paddingBottom: 10,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "red",
//   },

//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
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
//     elevation: 2, // Android shadow
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 8,
//     color: "#000",
//     fontWeight: 400,
//     fontFamily: "Poppins",
//   },

//   mapContainer: { height: "50%", backgroundColor: "red", borderWidth: 1 },

//   centerPin: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -21,
//     marginTop: -42,
//   },

//   centerIndicator: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -12,
//     marginTop: -12,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "rgba(0,122,255,0.15)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   centerDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#007AFF",
//   },

// currentLocationBtn: {
//   position: "absolute",
//   left: 16,

//   backgroundColor: "#fff",
//   padding: 10,
//   borderRadius: 25,
//   flexDirection: "row",
//   alignItems: "center",
//   elevation: 6,
// },

//   currentLocationText: {
//     marginLeft: 8,
//     color: "#FF3B30",
//     fontWeight: "600",
//   },

// bottomCard: {
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   backgroundColor: "#ffff",
//   borderTopLeftRadius: 24,
//   borderTopRightRadius: 24,
//   borderLeftWidth: 1,
//   borderRightWidth: 1,
//   paddingHorizontal: 15,
//   borderColor: "#7CF3FA",
//   borderTopWidth: 1,
//   paddingTop: 5,

//   zIndex: 10, // ⬅️ LOWER than button
//   marginBottom: 50,
// },

//   dragHandle: {
//     width: 40,
//     height: 5,
//     backgroundColor: "#4454FF",
//     alignSelf: "center",
//     borderRadius: 3,
//     marginBottom: 10,
//   },

//   addressInput: {
//     backgroundColor: "#83AAAC",
//     borderRadius: 8,
//     padding: 12,
//     color: "#000000E0",
//     marginBottom: 15,
//     fontSize: 15,
//     fontWeight: 400,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   halfInput: {
//     width: "48%",
//   },

//   saveAsText: {
//     fontSize: 12,
//     color: "#333",
//     marginBottom: 5,
//     marginTop: 0,
//     fontWeight: 400,
//   },

//   tagRow: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },

//   tag: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#7FC1C5",
//     borderWidth: 1,
//     borderColor: "#44D6FF",
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 10,
//     marginRight: 12,
//   },

//   tagActive: {
//     borderColor: "#007AFF",
//   },

//   tagText: {
//     marginLeft: 6,
//     fontSize: 14,
//     color: "#000",
//     fontWeight: "500",
//   },

//   tagTextActive: {
//     color: "#007AFF",
//     fontWeight: "600",
//   },

//   saveBtn: {
//     backgroundColor: "#528487",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },

//   saveBtnText: {
//     color: "#FFFFFFE0",
//     fontSize: 16,
//     fontWeight: 400,
//   },
// });

// /* ===== LIGHT MAP STYLE ===== */
// const LightMapStyle = [
//   { elementType: "geometry", stylers: [{ color: "#eef1f2" }] },
//   { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//   { featureType: "poi", stylers: [{ visibility: "off" }] },
//   { featureType: "transit", stylers: [{ visibility: "off" }] },
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [{ color: "#ffffff" }],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#A7DBFF" }],
//   },
// ];

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Circle, Region } from "react-native-maps";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const DEFAULT_DELTA = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function UserCurrentLocation() {
  const mapRef = useRef<MapView>(null);

  const [addressType, setAddressType] = useState<
    "Home" | "Work" | "Other" | null
  >(null);

  /** 🔵 USER GPS LOCATION */
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);

  /** 📍 SELECTED LOCATION (MAP CENTER) */
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const bottomSheetAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Add these state variables after other useState declarations
  const [addressFields, setAddressFields] = useState({
    formattedAddress: "",
    block: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [addressComponents, setAddressComponents] = useState({
    street: "",
    city: "",
    region: "",
    country: "",
    postalCode: "",
  });

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  /* ================= INIT ================= */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coord = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy ?? 50,
      };

      setUserLocation(coord);
      setSelectedLocation(coord);

      mapRef.current?.animateToRegion({ ...coord, ...DEFAULT_DELTA }, 800);

      updateAddress(coord.latitude, coord.longitude);
    })();

    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsKeyboardVisible(true);
      // Animate bottom sheet up when keyboard appears
      Animated.timing(bottomSheetAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
      // Animate bottom sheet back down when keyboard hides
      Animated.timing(bottomSheetAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const AddressTag = ({
    label,
    icon,
  }: {
    label: "Home" | "Work" | "Other";
    icon: keyof typeof Ionicons.glyphMap;
  }) => {
    const isActive = addressType === label;

    return (
      <TouchableOpacity
        onPress={() => setAddressType(label)}
        style={[
          styles.tag,
          isActive && styles.tagActive, // 👈 active style
        ]}
      >
        <Ionicons name={icon} size={16} color={isActive ? "#007AFF" : "#000"} />
        <Text style={[styles.tagText, isActive && styles.tagTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  /* ================= USE CURRENT LOCATION ================= */
  const handleCurrentLocation = async () => {
    try {
      let position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = position.coords;

      const newCoord = {
        latitude,
        longitude,
      };

      setSelectedLocation(newCoord);

      mapRef.current?.animateToRegion(
        {
          ...newCoord,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );

      await updateAddress(latitude, longitude);
    } catch (error) {
      console.log("❌ Error getting current location:", error);
    }
  };

  /* ================= MAP MOVE ================= */
  const handleRegionChangeComplete = (region: Region) => {
    const center = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    setSelectedLocation(center);
    updateAddress(center.latitude, center.longitude);
    // Reset specific fields before updating address
    setAddressFields((prev) => ({
      ...prev,
      block: "", // Reset Block/Tehsil
      landmark: "", // Reset Landmark (user input)
      // Keep other fields, they will be updated by reverse geocode
    }));
  };

  /* ================= REVERSE GEOCODE ================= */
  const updateAddress = async (lat: number, lng: number) => {
    try {
      const res = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (res.length > 0) {
        const address = res[0];
        console.log("📍 Address:", address);

        // Create formatted address
        const formattedAddr = [
          address.name,
          address.street,
          address.district,
          address.city,
          address.region,
          address.country,
          address.postalCode,
        ]
          .filter(Boolean)
          .join(", ");

        setAddressFields((prev) => ({
          ...prev,
          formattedAddress: formattedAddr,

          district: address.subregion || "",
          city: address.city || "",
          state: address.region || "",
          pincode: address.postalCode || "",
          // landmark remains empty for user input
        }));
      }
    } catch (e) {
      console.log("Reverse geocode error", e);
    }
  };

  const handleSaveAddress = () => {
    // Build a detailed formatted address
    const addressParts = [
      addressFields.formattedAddress,
      addressFields.block,
      addressFields.district,
      addressFields.city,
      addressFields.state,
      addressFields.pincode,
    ].filter(Boolean); // Remove empty parts

    // If landmark exists, add it at the beginning
    if (addressFields.landmark) {
      addressParts.unshift(`Near ${addressFields.landmark}`);
    }

    const formattedAddress = addressParts.join(", ");

    const addressData = {
      ...addressFields,
      addressType,
      coordinates: selectedLocation,
      formattedAddress: formattedAddress,
      // Add individual components for easy access
      addressComponents: {
        completeAddress: addressFields.formattedAddress,
        block: addressFields.block,
        district: addressFields.district,
        city: addressFields.city,
        state: addressFields.state,
        pincode: addressFields.pincode,
        landmark: addressFields.landmark,
      },
      // Add timestamp
      savedAt: new Date().toISOString(),
    };

    console.log("✅ Saved Address:", addressData);
    console.log("📍 Coordinates:", selectedLocation);
    console.log("🏷️ Address Type:", addressType);

    // Here you would typically send this to your backend
    // or save it in AsyncStorage
    // Example:
    // await AsyncStorage.setItem('savedAddress', JSON.stringify(addressData));
    // or
    // await saveAddressToAPI(addressData);

    // Show success message
    // Alert.alert("Success", "Address saved successfully!");

    // Optional: Reset form after saving
    // setAddressFields({
    //   formattedAddress: "",
    //   block: "",
    //   district: "",
    //   city: "",
    //   state: "",
    //   pincode: "",
    //   landmark: "",
    // });
    // setAddressType(null);
  };

  const searchPlaces = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);

      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6`
      );

      const data = await response.json();

      const results = data.features.map((item: any) => ({
        name: item.properties.name || "",
        city: item.properties.city || "",
        state: item.properties.state || "",
        lat: item.geometry.coordinates[1],
        lng: item.geometry.coordinates[0],
      }));

      setSearchResults(results);
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  if (!selectedLocation) return null;

  const BOTTOM_SHEET_RATIO = 0.38;
  const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * BOTTOM_SHEET_RATIO;

  // Calculate dynamic bottom sheet position based on keyboard
  const bottomSheetPosition = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(keyboardHeight * 0.5)], // Adjust this value for desired lift
  });

  const MAP_PADDING = {
    top: 0,
    right: 0,
    bottom: BOTTOM_SHEET_HEIGHT,
    left: 0,
  };

  return (
    <LinearGradient colors={["#70F3FA", "#FFFFFF"]} style={{ flex: 1 }}>
      {/* ===== TOP ===== */}
      <LinearGradient colors={["#FFFFFF", "#85F4FA"]} style={styles.topSection}>
        {/* Back + Title */}
        <View style={styles.headerRow}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerText}>
            Select your location to share knowledge
          </Text>
        </View>

        {/* Search Bar */}
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#003EF9" />
          <TextInput
            placeholder="Search your area, street name..."
            placeholderTextColor="#6B6B6B"
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchPlaces(text);
            }}
          />
          <TouchableOpacity>
            <Ionicons name="mic" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {searchResults.length > 0 && (
        <View style={styles.searchDropdown}>
          {searchResults.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchItem}
              onPress={() => {
                const coord = {
                  latitude: item.lat,
                  longitude: item.lng,
                };

                setSearchText(`${item.name}, ${item.city}`);
                setSearchResults([]);
                Keyboard.dismiss();

                setSelectedLocation(coord);

                mapRef.current?.animateToRegion(
                  {
                    ...coord,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  },
                  700
                );

                updateAddress(item.lat, item.lng);
              }}
            >
              <Ionicons name="location-outline" size={18} color="#007AFF" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.searchTitle}>{item.name}</Text>
                <Text style={styles.searchSubtitle}>
                  {item.city} {item.state}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ===== MAP ===== */}
      <View style={styles.mapContainer}>
        <View style={{ height: "100%" }}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            customMapStyle={LightMapStyle}
            initialRegion={{ ...selectedLocation, ...DEFAULT_DELTA }}
            showsUserLocation={false}
            onRegionChangeComplete={handleRegionChangeComplete}
          >
            {/* 🔵 CURRENT LOCATION INDICATOR */}
            {userLocation && (
              <Circle
                center={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
                radius={userLocation.accuracy}
                fillColor="rgba(0,122,255,0.15)"
                strokeColor="rgba(0,122,255,0.4)"
              />
            )}
          </MapView>

          {/* 📍 FIXED CENTER PIN */}
          <View pointerEvents="none" style={styles.centerPin}>
            <Ionicons name="location-sharp" size={42} color="#FF3B30" />
          </View>

          {/* 🔵 CENTER BLUE DOT */}
          <View pointerEvents="none" style={styles.centerIndicator}>
            <View style={styles.centerDot} />
          </View>

          {/* 📌 USE CURRENT LOCATION */}
          <Pressable
            style={styles.currentLocationBtn}
            onPress={handleCurrentLocation}
          >
            <MaterialIcons name="my-location" size={20} color="#FF3B30" />
            <Text style={styles.currentLocationText}>Use current location</Text>
          </Pressable>
        </View>
      </View>

      {/* ===== BOTTOM ADDRESS CARD ===== */}

      <Animated.View
        style={[
          styles.bottomCard,
          {
            transform: [{ translateY: bottomSheetPosition }],
          },
        ]}
      >
        <View style={styles.dragHandle} />

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          style={{ flex: 1 }}
        >
          {/* Full Formatted Address (Auto-fetched) - 100% width */}
          <Text style={styles.inputLabel}>Complete Address</Text>
          <TextInput
            placeholder="Complete Address"
            placeholderTextColor="#FFFFFFE0"
            style={[styles.addressInput, styles.fullWidthInput]}
            value={addressFields.formattedAddress}
            onChangeText={(text) =>
              setAddressFields((prev) => ({ ...prev, formattedAddress: text }))
            }
            multiline
            numberOfLines={2}
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 300);
            }}
          />

          {/* Block/District and State in 50-50 row */}
          <View style={styles.row}>
            <TextInput
              placeholder="Block / Tehsil"
              placeholderTextColor="#FFFFFFE0"
              style={[styles.addressInput, styles.halfInput]}
              value={addressFields.block}
              onChangeText={(text) =>
                setAddressFields((prev) => ({ ...prev, block: text }))
              }
            />
            <TextInput
              placeholder="District"
              placeholderTextColor="#FFFFFFE0"
              style={[styles.addressInput, styles.halfInput]}
              value={addressFields.district}
              onChangeText={(text) =>
                setAddressFields((prev) => ({ ...prev, district: text }))
              }
            />
          </View>

          {/* City and State in 50-50 row */}
          <View style={styles.row}>
            <TextInput
              placeholder="City"
              placeholderTextColor="#FFFFFFE0"
              style={[styles.addressInput, styles.halfInput]}
              value={addressFields.city}
              onChangeText={(text) =>
                setAddressFields((prev) => ({ ...prev, city: text }))
              }
            />
            <TextInput
              placeholder="State"
              placeholderTextColor="#FFFFFFE0"
              style={[styles.addressInput, styles.halfInput]}
              value={addressFields.state}
              onChangeText={(text) =>
                setAddressFields((prev) => ({ ...prev, state: text }))
              }
            />
          </View>

          {/* Pincode and Landmark in 50-50 row */}
          <View style={styles.row}>
            <TextInput
              placeholder="PIN Code"
              placeholderTextColor="#FFFFFFE0"
              keyboardType="number-pad"
              style={[styles.addressInput, styles.halfInput]}
              value={addressFields.pincode}
              onChangeText={(text) =>
                setAddressFields((prev) => ({ ...prev, pincode: text }))
              }
            />
            <TextInput
              placeholder="Landmark (Optional)"
              placeholderTextColor="#FFFFFFE0"
              style={[styles.addressInput, styles.halfInput]}
              value={addressFields.landmark}
              onChangeText={(text) =>
                setAddressFields((prev) => ({ ...prev, landmark: text }))
              }
            />
          </View>

          <Text style={styles.saveAsText}>Save address as</Text>

          <View style={styles.tagRow}>
            <AddressTag label="Home" icon="home-outline" />
            <AddressTag label="Work" icon="briefcase-outline" />
            <AddressTag label="Other" icon="location-outline" />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAddress}>
          <Text style={styles.saveBtnText}>Save address</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  bottomSheetWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  topSection: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.2,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
    marginLeft: 5,
    flexShrink: 1,
    fontFamily: "poppins",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECEBEB",
    borderRadius: 9,
    paddingHorizontal: 10,
    height: 40,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#000",
    fontWeight: "400",
    fontFamily: "Poppins",
  },

  mapContainer: {
    height: "50%",
  },

  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -21,
    marginTop: -42,
    zIndex: 2,
  },

  centerIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -12,
    marginTop: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,122,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  centerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },

  currentLocationBtn: {
    position: "absolute",
    right: 10,
    top: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
  },

  currentLocationText: {
    marginLeft: 8,
    color: "#FF3B30",
    fontWeight: "600",
    fontSize: 14,
  },

  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 15,
    borderColor: "#7CF3FA",
    borderTopWidth: 1,
    paddingTop: 5,

    zIndex: 10, // ⬅️ LOWER than button
    marginBottom: 50,
  },

  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#4454FF",
    alignSelf: "center",
    borderRadius: 3,
    marginBottom: 10,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  addressInput: {
    backgroundColor: "#83AAAC",
    borderRadius: 8,
    padding: 12,
    color: "#000000E0",
    marginBottom: 15,
    fontSize: 15,
    fontWeight: "400",
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfInput: {
    width: "48%",
  },
  fullWidthInput: {
    width: "100%",
    minHeight: 50, // For multiline input
    textAlignVertical: "top", // For better multiline alignment
  },
  saveAsText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
    marginTop: 0,
    fontWeight: "400",
  },

  tagRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7FC1C5",
    borderWidth: 1,
    borderColor: "#44D6FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 12,
  },

  tagActive: {
    borderColor: "#007AFF",
  },

  tagText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },

  tagTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },

  saveBtn: {
    backgroundColor: "#528487",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveBtnText: {
    color: "#FFFFFFE0",
    fontSize: 16,
    fontWeight: "400",
  },
  searchDropdown: {
    backgroundColor: "#fff",
    marginTop: 4,
    borderRadius: 8,
    maxHeight: 220,
    elevation: 8,
  },

  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },

  searchTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  searchSubtitle: {
    fontSize: 12,
    color: "#666",
  },
});

/* ===== LIGHT MAP STYLE ===== */
const LightMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#eef1f2" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#A7DBFF" }],
  },
];
