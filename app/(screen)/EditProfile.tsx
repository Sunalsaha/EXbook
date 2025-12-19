import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  Alert,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

interface ProfileData {
  name: string;
  mobile: string;
  email: string;
  dob: string;
  address: string;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const ProfileScreen: React.FC = () => {
  const { width, height } = useWindowDimensions(); // preferred responsive API [web:57]
  const styles = useMemo(() => makeStyles(width, height), [width, height]);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Soham Biswas",
    mobile: "9700919162",
    email: "Email@gmail.com",
    dob: "30/08/2000",
    address: "Action Area 1 1/2, 2, Newtown, N...",
  });

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // ✅ Email: allow typing, but commit only on Update profile
  const [pendingEmail, setPendingEmail] = useState(profileData.email);

  const [editingField, setEditingField] = useState<keyof ProfileData | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const inputRefs = useRef<Record<string, TextInput | null>>({});

  const handleChange = (field: keyof ProfileData) => {
    setEditingField(field);
    setTimeout(() => inputRefs.current[field]?.focus(), 0);
  };

  const stopEditing = () => setEditingField(null);

  const onPressCamera = () => {
    Alert.alert("Profile photo", "Choose an option", [
      { text: "Take photo", onPress: takePhoto },
      { text: "Choose from gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      setIsDirty(true);
    }
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      setIsDirty(true);
    }
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const updateProfile = () => {
    if (pendingEmail.trim() !== profileData.email.trim()) {
      if (!isValidEmail(pendingEmail)) {
        Alert.alert("Invalid email", "Please enter a valid email address.");
        return;
      }
    }

    const committedEmail = pendingEmail.trim();
    const nextProfile = { ...profileData, email: committedEmail };

    setProfileData(nextProfile);
    console.log("Update profile", nextProfile, avatarUri);

    setIsDirty(false);
    setEditingField(null);
  };

  const isEditing = useMemo(() => editingField !== null, [editingField]);

  return (
    <LinearGradient
  colors={["#67E8F9", "#E0E7FF"]}
  start={{ x: 0,y: 0}}
  end={{ x: 1, y: 1}}
  style={styles.container}
>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="black" />
            <Text style={styles.headerText}>Your profile</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.hero}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarRing}>
                <Image
                  source={
                    avatarUri
                      ? { uri: avatarUri }
                      : require("../../assets/images/profile.png")
                  }
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>

              <TouchableOpacity
                style={styles.editBadge}
                onPress={onPressCamera}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={14} color="#11a7ecff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Card Background */}
        <ImageBackground
          source={require("../../assets/images/Editprofile.png")}
          style={styles.formCard}
          imageStyle={styles.formCardImage}
          resizeMode="stretch"
        >
          <View style={styles.formContent}>
            <Field
              styles={styles}
              label="Name"
              value={profileData.name}
              editable={editingField === "name"}
              disabledAction={isEditing && editingField !== "name"}
              onPressChange={() => handleChange("name")}
              onChangeText={(t) => {
                setProfileData((p) => ({ ...p, name: t }));
                setIsDirty(true);
              }}
              inputRef={(r) => (inputRefs.current["name"] = r)}
              onBlur={stopEditing}
            />

            <Field
              styles={styles}
              label="Mobile"
              value={profileData.mobile}
              editable={editingField === "mobile"}
              disabledAction={isEditing && editingField !== "mobile"}
              onPressChange={() => handleChange("mobile")}
              onChangeText={(t) => {
                setProfileData((p) => ({ ...p, mobile: t }));
                setIsDirty(true);
              }}
              inputRef={(r) => (inputRefs.current["mobile"] = r)}
              keyboardType="phone-pad"
              onBlur={stopEditing}
            />

            <Field
              styles={styles}
              label="Email"
              value={editingField === "email" ? pendingEmail : profileData.email}
              editable={editingField === "email"}
              disabledAction={isEditing && editingField !== "email"}
              onPressChange={() => handleChange("email")}
              onChangeText={(t) => {
                setPendingEmail(t);
                setIsDirty(true);
              }}
              inputRef={(r) => (inputRefs.current["email"] = r)}
              keyboardType="email-address"
              onBlur={stopEditing}
            />

            <Field
              styles={styles}
              label="Date of birth"
              value={profileData.dob}
              editable={editingField === "dob"}
              disabledAction={isEditing && editingField !== "dob"}
              onPressChange={() => handleChange("dob")}
              onChangeText={(t) => {
                setProfileData((p) => ({ ...p, dob: t }));
                setIsDirty(true);
              }}
              inputRef={(r) => (inputRefs.current["dob"] = r)}
              onBlur={stopEditing}
            />

            <Field
              styles={styles}
              label="Address"
              value={profileData.address}
              editable={editingField === "address"}
              disabledAction={isEditing && editingField !== "address"}
              onPressChange={() => handleChange("address")}
              onChangeText={(t) => {
                setProfileData((p) => ({ ...p, address: t }));
                setIsDirty(true);
              }}
              inputRef={(r) => (inputRefs.current["address"] = r)}
              onBlur={stopEditing}
            />
          </View>
        </ImageBackground>

        {/* Update Profile Button */}
        <TouchableOpacity
          style={[styles.updateButton, !isDirty && styles.updateButtonDisabled]}
          activeOpacity={0.85}
          disabled={!isDirty}
          onPress={updateProfile}
        >
          <Text style={styles.updateButtonText}>Update profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

function Field({
  styles,
  label,
  value,
  disabled,
  editable,
  onPressChange,
  onChangeText,
  inputRef,
  onBlur,
  disabledAction,
  keyboardType,
}: {
  styles: ReturnType<typeof makeStyles>;
  label: string;
  value: string;
  disabled?: boolean;
  editable?: boolean;
  onPressChange?: () => void;
  onChangeText?: (t: string) => void;
  inputRef?: (r: TextInput | null) => void;
  onBlur?: () => void;
  disabledAction?: boolean;
  keyboardType?: "default" | "phone-pad" | "email-address";
}) {
  return (
    <View style={styles.fieldWrap}>
      <View style={styles.floatingLabel}>
        <Text style={styles.floatingLabelText}>{label}</Text>
      </View>

      <View style={[styles.boxRow, disabled && styles.boxRowDisabled]}>
        {editable && !disabled ? (
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            style={styles.boxInput}
            onBlur={onBlur}
            keyboardType={keyboardType || "default"}
            returnKeyType="done"
            autoCapitalize="none"
          />
        ) : (
          <Text
            style={[styles.boxValue, disabled && styles.boxValueDisabled]}
            numberOfLines={1}
          >
            {value}
          </Text>
        )}

        {!disabled && (
          <TouchableOpacity
            onPress={onPressChange}
            hitSlop={10}
            disabled={!!disabledAction}
            style={disabledAction ? styles.changeDisabledWrap : undefined}
          >
            <Text style={styles.changeButton}>CHANGE</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const makeStyles = (width: number, height: number) => {
  // simple scaling based on width (stable across devices)
  const s = (n: number) => (width / 375) * n; // 375 = iPhone base width
  const r = (n: number) => Math.round(n);

  const topPad = clamp(s(45), 24, 60);
  const sidePad = clamp(s(16), 12, 22);

  const avatarSize = clamp(s(110), 92, 124);
  const avatarRadius = avatarSize / 2;

  const heroHeight = clamp(s(150), 120, 170);

  // how much avatar overlaps card area (removes your hard-coded marginTop: 180)
  const avatarOverlap = clamp(s(55), 42, 70);

  return StyleSheet.create({
    container: { flex: 1 },

    scrollContent: {
      paddingHorizontal: sidePad,
      paddingTop: topPad,
      paddingBottom: clamp(s(30), 18, 40),
    },

    header: { marginBottom: clamp(s(8), 6, 12) },

    backButton: { flexDirection: "row", alignItems: "center" },

    headerText: {
      fontSize: clamp(s(18), 16, 20),
      fontWeight: "800",
      color: "#000",
      marginLeft: clamp(s(6), 4, 10),
    },

    hero: {
      height: heroHeight,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      marginBottom: clamp(s(8), 6, 12),
      marginTop: clamp(s(20), 10, 26),
    },

    avatarContainer: {
      alignItems: "center",
      justifyContent: "center",
      zIndex: 20,
      // ✅ responsive overlap instead of marginTop: 180
      transform: [{ translateY: avatarOverlap }],
    },

    avatarWrapper: { position: "relative" },

    avatarRing: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarRadius,
      borderWidth: 2,
      borderColor: "rgba(102, 52, 201, 0.55)",
      backgroundColor: "rgba(255,255,255,0.65)",
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },

    profileImage: { width: "100%", height: "100%" },

    editBadge: {
      position: "absolute",
      right: clamp(s(2), 0, 6),
      bottom: clamp(s(6), 4, 10),
      width: clamp(s(26), 22, 30),
      height: clamp(s(26), 22, 30),
      borderRadius: clamp(s(26), 22, 30) / 2,
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.25)",
      alignItems: "center",
      justifyContent: "center",
    },

    formCard: {
      minHeight: clamp(s(360), 320, 420),
      marginBottom: clamp(s(16), 12, 20),
      overflow: "hidden",
    },

    formCardImage: { borderRadius: 14 },

    formContent: {
      flex: 1,
      paddingHorizontal: clamp(s(18), 14, 22),
      // keep the “image header space” but scale it
      paddingTop: clamp(s(92), 76, 110),
      paddingBottom: clamp(s(14), 10, 18),
    },

    fieldWrap: {
      marginBottom: clamp(s(10), 8, 12),
      marginTop: clamp(s(6), 4, 8),
      position: "relative",
    },

    floatingLabel: {
      position: "absolute",
      left: clamp(s(14), 10, 18),
      top: -7,
      paddingHorizontal: clamp(s(6), 4, 8),
      backgroundColor: "#FFFFFFFF",
      borderRadius: 6,
      zIndex: 2,
      borderWidth: 1, // border needs borderWidth to render [web:37]
      borderColor: "#44D6FF",
    },

    floatingLabelText: {
      fontSize: clamp(s(10), 9, 11),
      fontWeight: "700",
      color: "rgba(0,0,0,0.65)",
    },

    boxRow: {
      minHeight: clamp(s(44), 42, 48),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#44D6FF",
      backgroundColor: "rgba(255, 255, 255, 0.36)",
      paddingHorizontal: clamp(s(14), 12, 16),
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    boxRowDisabled: {
      borderColor: "rgba(120,120,120,0.35)",
      backgroundColor: "rgba(120,120,120,0.42)",
    },

    boxValue: {
      flex: 1,
      marginRight: clamp(s(10), 8, 12),
      fontSize: clamp(s(16), 14, 17),
      fontWeight: "400",
      color: "#0B0B0B",
    },

    boxValueDisabled: { color: "rgba(255,255,255,0.88)" },

    boxInput: {
      flex: 1,
      marginRight: clamp(s(10), 8, 12),
      fontSize: clamp(s(16), 14, 17),
      fontWeight: "400",
      color: "#0B0B0B",
      paddingVertical: 0,
    },

    changeButton: {
      fontSize: clamp(s(11), 10, 12),
      color: "#EF4444",
      fontWeight: "800",
      letterSpacing: 0.6,
    },

    changeDisabledWrap: { opacity: 0.35 },

    updateButton: {
      height: clamp(s(50), 46, 54),
      borderRadius: 12,
      backgroundColor: "rgba(20, 218, 232, 0.9)",
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.08)",
      alignItems: "center",
      justifyContent: "center",
      ...Platform.select({
        android: { elevation: 2 },
        ios: {
          shadowColor: "#000",
          shadowOpacity: 0.07,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
        },
      }),
    },

    updateButtonDisabled: { opacity: 0.45 },

    updateButtonText: {
      fontSize: clamp(s(16), 14, 17),
      fontWeight: "700",
      color: "rgba(255,255,255,0.78)",
    },
  });
};

export default ProfileScreen;
