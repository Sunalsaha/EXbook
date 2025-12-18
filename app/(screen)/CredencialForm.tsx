import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
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
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const CredencialForm = () => {
  const [name, setName] = useState("");
  const registeredMobileNo = "9733019100";

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
                <TouchableOpacity activeOpacity={0.85} onPress={()=>{router.push('/(screen)/UserCurrentLocation')}}>
                  <View style={[styles.actionRow, styles.locationRow]}>
                    <View style={styles.rowLeft}>
                      <Ionicons name="locate-outline" size={18} color="#1E6BFF" />
                      <Text style={styles.locationText}>
                        Use current Location
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#1E6BFF" />
                  </View>
                </TouchableOpacity>

                {/* ADD ADDRESS */}
                <TouchableOpacity activeOpacity={0.85} onPress={()=>{router.push('/(screen)/UserManualLocation')}}>
                  <View style={[styles.actionRow, styles.addRow]}>
                    <View style={styles.rowLeft}>
                      <MaterialIcons name="add" size={18} color="#FF6A00" />
                      <Text style={styles.addText}>Add Address</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#FF6A00" />
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

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 30,
  },

  centerSection: {
    height: height * 0.33,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: width * 0.7,
    height: 155,
  },

  slogan: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: -10,
    color: "#000",
    fontFamily: "Potta One",
  },

  cardStack: {
    width: "100%",
    alignItems: "center",
    marginTop: "6%",
  },

  character: {
    width: width * 0.28,
    height: 85,
    position: "absolute",
    top: -82,
    zIndex: 10,
  },

  card: {
    width: "90%",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,

    borderWidth: 0.5,
    borderColor: "#7CF3FA",

    borderTopLeftRadius: 27,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 27,
    borderBottomLeftRadius: 10,

    elevation: 1,
    overflow: "hidden",
  },

  label: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 6,
    color: "#000",
  },

  input: {
    backgroundColor: "#83AAAC",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#000",
    marginBottom: 9,
  },

  disabledInput: {
    backgroundColor: "#8FD7DB",
    borderWidth:1,
    borderColor:'#44D6FF'
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  locationRow: {
    borderWidth: 1,
    borderColor: "#0047F9",
    backgroundColor: "#0047F900",
  },

  locationText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1E6BFF",
  },

  addRow: {
    borderWidth: 1,
    borderColor: "#FF4444",
    backgroundColor: "#8FD7DB00",
  },

  addText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#F95700E0",
  },

  paper: {
    width: "100%",
    height: "30%",
  },
});
