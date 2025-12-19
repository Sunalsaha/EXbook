// import { BlurView } from "expo-blur";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState } from "react";
// import {
//   Dimensions,
//   Image,
//   Keyboard,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// const { width, height } = Dimensions.get("window");

// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const isValid = mobile.length === 10;

//   return (
//     <LinearGradient colors={["#70F3FA", "#FFFFFF"]} style={styles.gradient}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container}>
//           {/* Logo + Slogan Section */}
//           <View style={styles.topSection}>
//             <Image
//               source={require("../../assets/images/ExBookLogo.png")}
//               style={styles.logo}
//               resizeMode="contain"
//             />

//             <Text style={styles.slogan}>“Pass the book Forward”</Text>

//             <Image
//               source={require("../../assets/images/character.gif")}
//               style={styles.character}
//               resizeMode="contain"
//             />
//           </View>

//           {/* Login Card */}

//           <BlurView style={styles.card} intensity={36}>
//             <Text style={styles.label}>Mobile Number</Text>

//             <TextInput
//               placeholder="Enter your Mobile Number"
//               placeholderTextColor="#FFFFFFE0"
//               keyboardType="phone-pad"
//               maxLength={10}
//               value={mobile}
//               onChangeText={setMobile}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//               style={[styles.input, isFocused && styles.inputFocused]}
//             />

//             <TouchableOpacity
//               activeOpacity={0.85}
//               disabled={!isValid}
//               onPress={Keyboard.dismiss}
//             >
//               <View style={[styles.button, isValid && styles.buttonActive]}>
//                 <Text
//                   style={[
//                     styles.buttonText,
//                     !isValid && styles.buttonTextDisabled,
//                   ]}
//                 >
//                   Get verification code
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </BlurView>

//           {/* Bottom Paper Image */}
//           <Image
//             source={require("../../assets/images/LoginPagePaperImage.png")}
//             style={styles.paper}
//             resizeMode="contain"
//           />
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </LinearGradient>
//   );
// };

// export default Login;
// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },

//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   topSection: {
//     alignItems: "center",
//     marginTop: height * 0.04,
//   },

//   logo: {
//     height: height * 0.22,
//     width: width * 0.7,
//   },

//   slogan: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginTop: -10,
//     color: "#000000",
//     fontFamily: 'Potta One'
//   },

//   character: {
//     height: height * 0.12,
//     width: width * 0.3,
//     marginTop: 0,

//     transform: [{ scaleX: -1 }],
//     left: "15%",
//   },

//   card: {
//     width: "90%",
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     paddingBottom: 70,

//     borderWidth: 0.5,
//     borderColor: "#7CF3FA",

//     borderTopLeftRadius: 27,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 27,
//     borderBottomLeftRadius: 10,
//     elevation: 0.5,
//     overflow: "hidden", // 🔥 REQUIRED
//   },

//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#000",
//   },

//   input: {
//     backgroundColor: "#83AAAC",
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     fontSize: 18,
//     color: "#000",
//     marginBottom: 14,
//     borderWidth: 0, // default
//   },

//   inputFocused: {
//     borderWidth: 1,
//     borderColor: "#44D6FF", // focus border
//   },

//   button: {
//     backgroundColor: "#52848780", // disabled
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: "center",
//   },

//   buttonActive: {
//     backgroundColor: "#528487", // enabled
//   },

//   buttonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },
//   buttonTextDisabled: {
//     opacity: 0.6,
//   },
//   paper: {
//     height: "30%",
//     width: "100%",
//   },
// });

// import { BlurView } from "expo-blur";
// import { LinearGradient } from "expo-linear-gradient";
// import { Redirect, router } from "expo-router";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";

// const { width, height } = Dimensions.get("window");
// const OTP_LENGTH = 6;

// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);

//   const otpRefs = useRef<Array<React.RefObject<TextInput | null>>>(
//     Array.from({ length: OTP_LENGTH }, () => React.createRef<TextInput>())
//   );

//   const isMobileValid = mobile.length === 10;
//   const isOtpValid = otp.join("").length === OTP_LENGTH;

//   /* ===== TIMER ===== */
//   useEffect(() => {
//     if (!showOtp) return;

//     setTimer(30);
//     setCanResend(false);

//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setCanResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [showOtp]);

//   /* ===== OTP HANDLERS ===== */
//   const handleOtpChange = (value: any, index: any) => {
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < OTP_LENGTH - 1) {
//       const nextRef = otpRefs.current[index + 1].current;
//       if (nextRef && typeof nextRef.focus === "function") {
//         nextRef.focus();
//       }
//     }
//   };

//   interface OtpKeyPressEvent {
//     nativeEvent: {
//       key: string;
//     };
//   }

//   const handleOtpKeyPress = (e: OtpKeyPressEvent, index: number) => {
//     if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
//       const prevRef = otpRefs.current[index - 1].current;
//       if (prevRef && typeof prevRef.focus === "function") {
//         prevRef.focus();
//       }
//     }
//   };

//   return (
//     <LinearGradient colors={["#70F3FA", "#FFFFFF"]} style={{ flex: 1 }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             contentContainerStyle={styles.scroll}
//             keyboardShouldPersistTaps="handled"
//           >
//             {/* ===== LOGO + SLOGAN (CENTER) ===== */}
//             <View style={styles.centerSection}>
//               <Image
//                 source={require("../../assets/images/ExBookLogo.png")}
//                 style={styles.logo}
//                 resizeMode="contain"
//               />
//               <Text style={styles.slogan} allowFontScaling={false}>
//                 “Pass the book Forward”
//               </Text>
//             </View>

//             {/* ===== CARD STACK ===== */}
//             <View style={styles.cardStack}>
//               {/* Character */}
//               <Image
//                 source={require("../../assets/images/character.gif")}
//                 style={styles.character}
//                 resizeMode="contain"
//               />

//               {/* CARD */}
//               <BlurView
//                 intensity={Platform.OS === "android" ? 25 : 36}
//                 tint="light"
//                 style={styles.card}
//               >
//                 {/* MOBILE */}
//                 <Text style={styles.label}>Mobile Number</Text>
//                 <TextInput
//                   placeholder="Enter your Mobile Number"
//                   placeholderTextColor="#FFFFFFE0"
//                   keyboardType="phone-pad"
//                   maxLength={10}
//                   value={mobile}
//                   onChangeText={setMobile}
//                   style={styles.input}
//                 />

//                 <TouchableOpacity
//                   disabled={!isMobileValid}
//                   activeOpacity={0.85}
//                   onPress={() => {
//                     Keyboard.dismiss();
//                     setShowOtp(true);
//                     setTimeout(() => otpRefs.current[0].current?.focus(), 300);
//                   }}
//                 >
//                   <View
//                     style={[
//                       styles.button,
//                       isMobileValid && styles.buttonActive,
//                     ]}
//                   >
//                     <Text style={styles.buttonText}>Get verification code</Text>
//                   </View>
//                 </TouchableOpacity>

//                 {/* OTP SECTION */}
//                 {showOtp && (
//                   <>
//                     <View style={styles.otpHeader}>
//                       <Text style={styles.label}>Enter OTP</Text>

//                       {!canResend ? (
//                         <Text style={styles.timer}>
//                           00:{timer < 10 ? `0${timer}` : timer}
//                         </Text>
//                       ) : (
//                         <TouchableOpacity onPress={() => setShowOtp(true)}>
//                           <Text style={styles.resend}>Resend</Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>

//                     <View style={styles.otpRow}>
//                       {otp.map((digit, index) => (
//                         <TextInput
//                           key={index}
//                           ref={otpRefs.current[index]}
//                           value={digit}
//                           keyboardType="number-pad"
//                           maxLength={1}
//                           style={styles.otpBox}
//                           onChangeText={(v) => handleOtpChange(v, index)}
//                           onKeyPress={(e) => handleOtpKeyPress(e, index)}
//                         />
//                       ))}
//                     </View>

//                     <TouchableOpacity
//                       disabled={!isOtpValid}
//                       activeOpacity={0.85}
//                       onPress={() => {
//                         // Use router.push for navigation in event handlers
//                         // Import router from 'expo-router' at the top if not already
//                         // import { router } from "expo-router";
//                         router.push('/(screen)/CredencialForm');
//                       }}
//                     >
//                       <View
//                         style={[
//                           styles.button,
//                           isOtpValid && styles.buttonActive,
//                         ]}
//                       >
//                         <Text style={styles.buttonText}>Verify</Text>
//                       </View>
//                     </TouchableOpacity>
//                   </>
//                 )}
//               </BlurView>
//             </View>

//             {/* PAPER */}
//             <Image
//               source={require("../../assets/images/LoginPagePaperImage.png")}
//               style={styles.paper}
//               resizeMode="contain"
//             />
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// };

// export default Login;

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   scroll: {
//     flexGrow: 1,
//     alignItems: "center",
//     paddingBottom: 30,
//   },

//   centerSection: {
//     height: height * 0.35,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   logo: {
//     width: width * 0.7,
//     height: 155,
//   },

//   slogan: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginTop: -10,
//     color: "#000",
//     fontFamily: "Potta One",
//   },

//   cardStack: {
//     width: "100%",
//     alignItems: "center",
//     marginTop: "6%",
//   },

//   character: {
//     width: width * 0.3,
//     height: 90,
//     position: "absolute",
//     top: -82,
//     right: "18%",
//     zIndex: 10,
//     transform: [{ scaleX: -1 }],
//   },

//   card: {
//     width: "90%",
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     paddingBottom: 50,
//     borderWidth: 0.5,
//     borderColor: "#7CF3FA",
//     borderTopLeftRadius: 27,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 27,
//     borderBottomLeftRadius: 10,
//     elevation: 1,
//     overflow: "hidden",
//   },

//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#000",
//   },

//   input: {
//     backgroundColor: "#83AAAC",
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     fontSize: 18,
//     color: "#000",
//     marginBottom: 14,
//   },

//   button: {
//     backgroundColor: "#52848780",
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: "center",
//   },

//   buttonActive: {
//     backgroundColor: "#528487",
//   },

//   buttonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },

//   otpHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//   },

//   timer: {
//     fontSize: 15,
//     fontWeight: "400",
//     color: "#000",
//   },

//   resend: {
//     fontSize: 15,
//     fontWeight: "400",
//     color: "#FF4E4E",
//     textDecorationLine: "underline",
//     textDecorationColor: "#FF4E4E",
//   },

//   otpRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 12,
//   },

//   otpBox: {
//     width: 44,
//     height: 44,
//     backgroundColor: "#83AAAC",
//     borderRadius: 8,
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "400",
//     color: "#000",
//   },

//   paper: {
//     width: "100%",
//     height: "30%",
//   },
// });



import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

const OTP_LENGTH = 6;

// Scaling utilities for responsive design
const scale = (size: number, width: number) => (width / 375) * size;
const verticalScale = (size: number, height: number) => (height / 812) * size;
const moderateScale = (size: number, factor: number = 0.5, width: number) =>
  size + (scale(size, width) - size) * factor;

const Login = () => {
  const { width, height } = useWindowDimensions();
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const otpRefs = useRef<Array<React.RefObject<TextInput | null>>>(
    Array.from({ length: OTP_LENGTH }, () => React.createRef<TextInput>())
  );

  const isMobileValid = mobile.length === 10;
  const isOtpValid = otp.join("").length === OTP_LENGTH;

  /* ===== TIMER ===== */
  useEffect(() => {
    if (!showOtp) return;

    setTimer(30);
    setCanResend(false);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtp]);

  /* ===== OTP HANDLERS ===== */
  const handleOtpChange = (value: any, index: any) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      const nextRef = otpRefs.current[index + 1].current;
      if (nextRef && typeof nextRef.focus === "function") {
        nextRef.focus();
      }
    }
  };

  interface OtpKeyPressEvent {
    nativeEvent: {
      key: string;
    };
  }

  const handleOtpKeyPress = (e: OtpKeyPressEvent, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const prevRef = otpRefs.current[index - 1].current;
      if (prevRef && typeof prevRef.focus === "function") {
        prevRef.focus();
      }
    }
  };

  // Dynamic styles
  const styles = createStyles(width, height);

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
            {/* ===== LOGO + SLOGAN (CENTER) ===== */}
            <View style={styles.centerSection}>
              <Image
                source={require("../../assets/images/ExBookLogo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.slogan} allowFontScaling={false}>
                "Pass the book Forward"
              </Text>
            </View>

            {/* ===== CARD STACK ===== */}
            <View style={styles.cardStack}>
              {/* Character */}
              <Image
                source={require("../../assets/images/character.gif")}
                style={styles.character}
                resizeMode="contain"
              />

              {/* CARD */}
              <BlurView
                intensity={Platform.OS === "android" ? 25 : 36}
                tint="light"
                style={styles.card}
              >
                {/* MOBILE */}
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  placeholder="Enter your Mobile Number"
                  placeholderTextColor="#FFFFFFE0"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                  style={styles.input}
                />

                <TouchableOpacity
                  disabled={!isMobileValid}
                  activeOpacity={0.85}
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowOtp(true);
                    setTimeout(() => otpRefs.current[0].current?.focus(), 300);
                  }}
                >
                  <View
                    style={[
                      styles.button,
                      isMobileValid && styles.buttonActive,
                    ]}
                  >
                    <Text style={styles.buttonText}>Get verification code</Text>
                  </View>
                </TouchableOpacity>

                {/* OTP SECTION */}
                {showOtp && (
                  <>
                    <View style={styles.otpHeader}>
                      <Text style={styles.label}>Enter OTP</Text>

                      {!canResend ? (
                        <Text style={styles.timer}>
                          00:{timer < 10 ? `0${timer}` : timer}
                        </Text>
                      ) : (
                        <TouchableOpacity onPress={() => setShowOtp(true)}>
                          <Text style={styles.resend}>Resend</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.otpRow}>
                      {otp.map((digit, index) => (
                        <TextInput
                          key={index}
                          ref={otpRefs.current[index]}
                          value={digit}
                          keyboardType="number-pad"
                          maxLength={1}
                          style={styles.otpBox}
                          onChangeText={(v) => handleOtpChange(v, index)}
                          onKeyPress={(e) => handleOtpKeyPress(e, index)}
                        />
                      ))}
                    </View>

                    <TouchableOpacity
                      disabled={!isOtpValid}
                      activeOpacity={0.85}
                      onPress={() => {
                        router.push("/(screen)/CredencialForm");
                      }}
                    >
                      <View
                        style={[
                          styles.button,
                          isOtpValid && styles.buttonActive,
                        ]}
                      >
                        <Text style={styles.buttonText}>Verify</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
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

export default Login;

/* ================= RESPONSIVE STYLES ================= */

const createStyles = (width: number, height: number) => {
  const s = (size: number) => scale(size, width);
  const vs = (size: number) => verticalScale(size, height);
  const ms = (size: number, factor?: number) => moderateScale(size, factor, width);

  return StyleSheet.create({
    scroll: {
      flexGrow: 1,
      alignItems: "center",
      paddingBottom: vs(30),
    },

    centerSection: {
      height: height * 0.35,
      justifyContent: "center",
      alignItems: "center",
    },

    logo: {
      width: width * 0.7,
      height: vs(155),
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
      marginTop: vs(20),
    },

    character: {
      width: s(110),
      height: vs(90),
      position: "absolute",
      top: vs(-82),
      right: width * 0.18,
      zIndex: 10,
      transform: [{ scaleX: -1 }],
    },

    card: {
      width: width * 0.9,
      paddingTop: vs(50),
      paddingHorizontal: s(20),
      paddingBottom: vs(50),
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
      fontSize: ms(16),
      fontWeight: "600",
      marginBottom: vs(8),
      color: "#000",
    },

    input: {
      backgroundColor: "#83AAAC",
      borderRadius: ms(8),
      paddingVertical: vs(12),
      paddingHorizontal: s(14),
      fontSize: ms(18),
      color: "#000",
      marginBottom: vs(14),
    },

    button: {
      backgroundColor: "#52848780",
      borderRadius: ms(8),
      paddingVertical: vs(14),
      alignItems: "center",
    },

    buttonActive: {
      backgroundColor: "#528487",
    },

    buttonText: {
      fontSize: ms(16),
      fontWeight: "600",
      color: "#FFFFFF",
    },

    otpHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: vs(10),
    },

    timer: {
      fontSize: ms(15),
      fontWeight: "400",
      color: "#000",
    },

    resend: {
      fontSize: ms(15),
      fontWeight: "400",
      color: "#FF4E4E",
      textDecorationLine: "underline",
      textDecorationColor: "#FF4E4E",
    },

    otpRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: vs(12),
    },

    otpBox: {
      width: s(44),
      height: vs(44),
      backgroundColor: "#83AAAC",
      borderRadius: ms(8),
      textAlign: "center",
      fontSize: ms(18),
      fontWeight: "400",
      color: "#000",
    },

    paper: {
      width: "100%",
      height: height * 0.28,
      marginTop: vs(10),
    },
  });
};
