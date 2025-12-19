import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Responsive scaling utilities
const scale = (size: number, width: number) => (width / 375) * size;
const verticalScale = (size: number, height: number) => (height / 812) * size;
const moderateScale = (size: number, factor: number = 0.5, width: number) =>
  size + (scale(size, width) - size) * factor;

const CredencialForm = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const registeredMobileNo = "9733019100";

  const styles = createStyles(width, height, insets);

  return (
    <LinearGradient colors={["#70F3FA", "#FFFFFF"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ===== LOGO ===== */}
            <View style={styles.centerSection}>
              <Image
                source={require("../../assets/images/ExBookLogo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.slogan}>Find Books Near You</Text>
            </View>

            {/* ===== CARD STACK ===== */}
            <View style={styles.cardStack}>
              {/* Character */}
              <Image
                source={require("../../assets/images/CredencialFormGif.gif")}
                style={styles.character}
                resizeMode="contain"
              />

              {/* CARD */}
              <BlurView
                intensity={Platform.OS === "android" ? 25 : 36}
                tint="light"
                style={styles.card}
              >
                {/* NAME */}
                <Text style={styles.label}>Your Name</Text>
                <TextInput
                  placeholder="May I know your Name"
                  placeholderTextColor="#FFFFFFE0"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />

                {/* MOBILE */}
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  value={registeredMobileNo}
                  editable={false}
                  style={[styles.input, styles.disabledInput]}
                />

                {/* ADDRESS */}
                <Text style={styles.label}>Address</Text>

                {/* USE LOCATION */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    router.push("/(screen)/UserCurrentLocation");
                  }}
                >
                  <View style={[styles.actionRow, styles.locationRow]}>
                    <View style={styles.rowLeft}>
                      <Ionicons
                        name="locate-outline"
                        size={scale(18, width)}
                        color="#1E6BFF"
                      />
                      <Text style={styles.locationText}>
                        Use current Location
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={scale(18, width)}
                      color="#1E6BFF"
                    />
                  </View>
                </TouchableOpacity>

                {/* ADD ADDRESS */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    router.push("/(screen)/UserManualLocation");
                  }}
                >
                  <View style={[styles.actionRow, styles.addRow]}>
                    <View style={styles.rowLeft}>
                      <MaterialIcons
                        name="add"
                        size={scale(18, width)}
                        color="#FF6A00"
                      />
                      <Text style={styles.addText}>Add Address</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={scale(18, width)}
                      color="#FF6A00"
                    />
                  </View>
                </TouchableOpacity>
              </BlurView>
            </View>

            {/* PAPER */}
            <Image
              source={require("../../assets/images/LoginPagePaperImage.png")}
              style={styles.paper}
              resizeMode="contain"
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default CredencialForm;

/* ================= RESPONSIVE STYLES ================= */

const createStyles = (width: number, height: number, insets: any) => {
  const s = (size: number) => scale(size, width);
  const vs = (size: number) => verticalScale(size, height);
  const ms = (size: number, factor?: number) =>
    moderateScale(size, factor, width);

  return StyleSheet.create({
    scroll: {
      flexGrow: 1,
      alignItems: "center",
      paddingTop: Math.max(insets.top, vs(20)),
      paddingBottom: Math.max(insets.bottom, vs(30)),
      paddingHorizontal: s(10),
    },

    centerSection: {
      minHeight: vs(200),
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: vs(20),
      marginBottom: vs(15), // Extra space after slogan
    },

    logo: {
      width: width * 0.7,
      height: vs(155),
      maxWidth: s(280),
    },

    slogan: {
      fontSize: ms(20),
      fontWeight: "700",
      marginTop: vs(-10),
      color: "#000",
      fontFamily: "Potta One",
    },

    cardStack: {
      width: "100%",
      alignItems: "center",
      marginTop: vs(70), // Increased from vs(50) to vs(70)
      marginBottom: vs(20),
    },

    character: {
      width: width * 0.28,
      height: vs(85),
      maxWidth: s(110),
      position: "absolute",
      top: vs(-60), // Adjusted from vs(-70) to vs(-60) for better positioning
      zIndex: 10,
    },

    card: {
      width: "90%",
      maxWidth: s(420),
      paddingTop: vs(30), // Increased from vs(20) to vs(30) for more top padding
      paddingHorizontal: s(20),
      paddingBottom: vs(20),

      borderWidth: 0.5,
      borderColor: "#7CF3FA",

      borderTopLeftRadius: ms(27),
      borderTopRightRadius: ms(10),
      borderBottomRightRadius: ms(27),
      borderBottomLeftRadius: ms(10),

      elevation: 1,
      overflow: "hidden",
    },

    label: {
      fontSize: ms(15),
      fontWeight: "400",
      marginBottom: vs(6),
      color: "#000",
    },

    input: {
      backgroundColor: "#83AAAC",
      borderRadius: ms(8),
      paddingVertical: vs(10),
      paddingHorizontal: s(14),
      fontSize: ms(16),
      color: "#000",
      marginBottom: vs(9),
      minHeight: vs(44),
    },

    disabledInput: {
      backgroundColor: "#8FD7DB",
      borderWidth: 1,
      borderColor: "#44D6FF",
    },

    actionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: ms(8),
      paddingVertical: vs(12),
      paddingHorizontal: s(14),
      marginBottom: vs(12),
      minHeight: vs(44),
    },

    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: s(8),
    },

    locationRow: {
      borderWidth: 1,
      borderColor: "#0047F9",
      backgroundColor: "#0047F900",
    },

    locationText: {
      fontSize: ms(16),
      fontWeight: "400",
      color: "#1E6BFF",
    },

    addRow: {
      borderWidth: 1,
      borderColor: "#FF4444",
      backgroundColor: "#8FD7DB00",
    },

    addText: {
      fontSize: ms(16),
      fontWeight: "400",
      color: "#F95700E0",
    },

    paper: {
      width: "100%",
      height: vs(200),
      maxWidth: s(500),
      marginTop: vs(10),
    },
  });
};
