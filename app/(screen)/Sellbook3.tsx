import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, useWindowDimensions, Alert } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// Custom ChevronLeft component for React Native
const ChevronLeft = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" stroke="#1f2937" />
  </Svg>
);

// Upload Icon
const UploadIcon = () => (
  <Svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <Path d="M17 8l-5-5-5 5" />
    <Path d="M12 3v12" />
  </Svg>
);

// Location Pin Icon
const LocationIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Path d="M12 7 A3 3 0 0 1 12 13 A3 3 0 0 1 12 7" fill="#000" />
  </Svg>
);

const SellBook3: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width, height), [width, height]);

  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState('Action Area I 1/2, Newtown, New Town, Cha  DG Black(Newtown) uttar 24 pargana West Bengal 74.....');
  const [isLocationSaved, setIsLocationSaved] = useState(false);

  // Request camera and gallery permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera and gallery permissions to upload photos.');
      return false;
    }
    return true;
  };

  // Pick image from gallery
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 10,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map(asset => asset.uri);
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 10)); // Max 10 photos
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets) {
      setPhotos(prev => [...prev, result.assets[0].uri].slice(0, 10));
    }
  };

  // Remove photo
  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Show options to pick or take photo
  const handleUploadPress = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Handle location save
  const handleLocationSave = () => {
    if (location.trim() === '') {
      Alert.alert('Error', 'Please enter a location');
      return;
    }
    setIsLocationSaved(true);
  };

  // Handle change location
  const handleChangeLocation = () => {
    setIsLocationSaved(false);
  };

  // Check if form is valid
  const isFormValid = photos.length >= 3 && isLocationSaved;

  const handleNext = () => {
    if (isFormValid) {
      console.log('Photos:', photos);
      console.log('Location:', location);
      // Navigate to next screen
    }
  };

  return (
    <LinearGradient
      colors={["#67E8F9", "#E0E7FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft />
            <Text style={styles.headerTitle}>Shear Books</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Image Card */}
        <View style={styles.heroCard}>
          <Image
            source={require('../../assets/images/donate-book.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Upload Photos Section */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>D. Upload Photos</Text>
          
          <Text style={styles.noteText}>
            <Text style={styles.noteBold}>Note:</Text> Please upload photos of the front cover, back cover, and index page. If there are any torn or damaged pages, upload clear photos of the defects.
          </Text>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Upload Area */}
          <TouchableOpacity 
            style={styles.uploadArea}
            onPress={handleUploadPress}
            activeOpacity={0.7}
          >
            <UploadIcon />
            <Text style={styles.uploadText}>Choose a file or take a picture</Text>
            <Text style={styles.uploadSubtext}>
              JPG, PNG, PDF, and MP4 formats, up to 50MB
            </Text>
            <TouchableOpacity style={styles.browseButton} onPress={handleUploadPress}>
              <Text style={styles.browseButtonText}>Browse File</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Photo Counter */}
          <Text style={styles.photoCounter}>
            {photos.length} / 3 photos uploaded (minimum 3 required)
          </Text>
        </View>

        {/* Pickup Location Section - Redesigned to match image */}
        <View style={styles.locationCard}>
          <View style={styles.locationContent}>
            <Text style={styles.formTitle}>E. Pickup Location</Text>
            
            {/* Location display with icon */}
            <View style={styles.locationDisplayBox}>
              <View style={styles.locationIconWrapper}>
                <LocationIcon />
              </View>
              <Text style={styles.locationText} numberOfLines={3}>
                {location}
              </Text>
            </View>
          </View>

          <View style={styles.dividerLine} />

          {/* Button Section - Full width at bottom */}
          {!isLocationSaved ? (
            <View style={styles.locationButtons}>
              <TouchableOpacity 
                style={styles.changeLocationButton}
                onPress={handleChangeLocation}
                activeOpacity={0.7}
              >
                <Text style={styles.changeLocationText}>
                  Change Location
                </Text>
              </TouchableOpacity>
              
              <View style={styles.verticalDivider} />
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleLocationSave}
                activeOpacity={0.7}
              >
                <Text style={styles.saveButtonText}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.savedButton}
              onPress={handleChangeLocation}
              activeOpacity={0.8}
            >
              <Text style={styles.savedButtonText}>
                Saved
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Next Button - Enabled only when form is valid */}
        <TouchableOpacity 
          style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={[styles.nextButtonText, !isFormValid && styles.nextButtonTextDisabled]}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const makeStyles = (width: number, height: number) => {
  const s = (n: number) => (width / 375) * n;
  const topPad = clamp(s(45), 24, 60);
  const sidePad = clamp(s(16), 12, 24);

  return StyleSheet.create({
    container: { 
      flex: 1 
    },
    
    scrollContent: {
      paddingHorizontal: sidePad,
      paddingTop: topPad,
      paddingBottom: clamp(s(30), 20, 50),
    },
    
    header: { 
      marginBottom: clamp(s(16), 12, 24) 
    },
    
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: clamp(s(8), 6, 10),
    },
    
    headerTitle: {
      fontSize: clamp(s(18), 16, 22),
      fontWeight: '800',
      color: '#000',
      marginLeft: clamp(s(6), 4, 10),
    },
    
    heroCard: {
      height: clamp(s(180), 140, 240),
      borderRadius: clamp(s(16), 12, 20),
      overflow: 'hidden',
      marginBottom: clamp(s(20), 16, 28),
      backgroundColor: '#fff',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    
    heroImage: {
      width: '100%',
      height: '100%',
    },
    
    formCard: {
      backgroundColor: 'rgba(165, 243, 252, 0.6)',
      borderRadius: clamp(s(16), 12, 20),
      padding: clamp(s(20), 16, 28),
      marginBottom: clamp(s(16), 12, 24),
    },
    
    // Updated Location Card - No padding on bottom to let buttons flush
    locationCard: {
      backgroundColor: 'rgba(165, 243, 252, 0.6)',
      borderRadius: clamp(s(16), 12, 20),
      marginBottom: clamp(s(16), 12, 24),
      overflow: 'hidden',
    },
    
    locationContent: {
      padding: clamp(s(20), 16, 28),
      paddingBottom: clamp(s(10), 8, 12),
    },
    
    formTitle: {
      fontSize: clamp(s(18), 16, 22),
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: clamp(s(12), 10, 16),
    },
    
    noteText: {
      fontSize: clamp(s(11), 10, 13),
      color: '#4b5563',
      lineHeight: clamp(s(16), 14, 18),
      marginBottom: clamp(s(16), 14, 20),
    },
    
    noteBold: {
      fontWeight: '700',
    },
    
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: clamp(s(10), 8, 12),
      marginBottom: clamp(s(16), 14, 20),
    },
    
    photoContainer: {
      position: 'relative',
      width: clamp(s(100), 80, 120),
      height: clamp(s(100), 80, 120),
    },
    
    photoThumbnail: {
      width: '100%',
      height: '100%',
      borderRadius: clamp(s(10), 8, 12),
      backgroundColor: '#f3f4f6',
    },
    
    removePhotoButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: '#fff',
      borderRadius: 12,
    },
    
    uploadArea: {
      borderWidth: 2,
      borderColor: '#44D6FF',
      borderStyle: 'dashed',
      borderRadius: clamp(s(12), 10, 14),
      padding: clamp(s(24), 20, 30),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginBottom: clamp(s(12), 10, 16),
    },
    
    uploadText: {
      fontSize: clamp(s(14), 13, 16),
      color: '#374151',
      fontWeight: '600',
      marginTop: clamp(s(12), 10, 14),
      marginBottom: clamp(s(4), 3, 6),
    },
    
    uploadSubtext: {
      fontSize: clamp(s(11), 10, 13),
      color: '#6b7280',
      marginBottom: clamp(s(16), 14, 20),
      textAlign: 'center',
    },
    
    browseButton: {
      backgroundColor: 'rgba(68, 214, 255, 0.5)',
      paddingHorizontal: clamp(s(20), 18, 24),
      paddingVertical: clamp(s(8), 7, 10),
      borderRadius: clamp(s(8), 7, 10),
      borderWidth: 1,
      borderColor: '#44D6FF',
    },
    
    browseButtonText: {
      fontSize: clamp(s(13), 12, 15),
      color: '#1f2937',
      fontWeight: '600',
    },
    
    photoCounter: {
      fontSize: clamp(s(12), 11, 14),
      color: '#374151',
      fontWeight: '600',
      textAlign: 'center',
    },
    
    locationDisplayBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    
    locationIconWrapper: {
      marginRight: clamp(s(10), 8, 12),
      marginTop: clamp(s(2), 1, 3),
    },
    
    locationText: {
      flex: 1,
      fontSize: clamp(s(13), 12, 15),
      color: '#1f2937',
      lineHeight: clamp(s(18), 16, 20),
      fontWeight: '500',
    },
    
    dividerLine: {
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.1)',
      width: '100%',
    },
    
    locationButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      height: clamp(s(56), 50, 60),
      backgroundColor: 'rgba(255,255,255,0.4)', // Slightly lighter to distinguish area
    },
    
    changeLocationButton: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    changeLocationText: {
      fontSize: clamp(s(14), 13, 16),
      color: '#003EF9',
      fontWeight: '600',
    },
    
    verticalDivider: {
      width: 1,
      height: '60%',
      backgroundColor: '#9CA3AF',
    },
    
    saveButton: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    saveButtonText: {
      fontSize: clamp(s(14), 13, 16),
      color: '#16A34A',
      fontWeight: '600',
    },
    
    savedButton: {
      width: '100%',
      height: clamp(s(56), 50, 60),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#16A34A', // Green full background
    },
    
    savedButtonText: {
      fontSize: clamp(s(16), 15, 18),
      color: '#FFFFFF',
      fontWeight: '700',
    },
    
    nextButton: {
      height: clamp(s(50), 46, 58),
      borderRadius: clamp(s(12), 10, 14),
      backgroundColor: 'rgba(20, 218, 232, 0.9)',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.08)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: clamp(s(20), 16, 28),
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.07,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
    },
    
    nextButtonText: {
      fontSize: clamp(s(16), 15, 18),
      fontWeight: '700',
      color: 'rgba(255,255,255,0.78)',
    },
    
    nextButtonDisabled: {
      backgroundColor: 'rgba(156, 163, 175, 0.5)',
      elevation: 0,
      shadowOpacity: 0,
    },
    
    nextButtonTextDisabled: {
      color: 'rgba(107, 114, 128, 0.7)',
    },
  });
};

export default SellBook3;
