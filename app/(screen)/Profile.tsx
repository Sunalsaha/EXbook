import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, ShoppingCart, Truck, Star, ThumbsUp, Info, Edit, AlertCircle, Settings, LogOut, ArrowLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;
const CARD_WIDTH = width - (CARD_PADDING * 2);

const ProfileScreen = () => {
  return (
    <LinearGradient
      colors={["#70F3FA", "#FFFFFF"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} activeOpacity={1}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>

        {/* Profile Card with Background Image */}
        <View style={styles.profileCardWrapper}>
          <LinearGradient
            colors={['#67E8F9', '#E0E7FF']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.profileCard}
          >
            {/* Background Decorative Image */}
            <Image
              source={require("../../assets/images/page.png")}
              style={styles.backgroundDecoration}
              resizeMode="contain"
            />
            
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <View style={styles.profileInfo}>
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={["#6634C9", "#4e46e5"]}
                    style={styles.avatarBorder}
                  >
                    <View style={styles.avatar}>
                      <Image 
                        source={require("../../assets/images/profile.png")} 
                        style={styles.profileImage}
                        resizeMode="cover"
                      />
                    </View>
                  </LinearGradient>
                </View>
                
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>Your Name</Text>
                  <Text style={styles.userPhone}> 973302813</Text>
                  <Text style={styles.userAddress}>
                    Action Area I, I/2, Newtown, New Town, Cha...
                  </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.editProfile}>Edit profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Gold Coins Section - Connected to Profile Card */}
          <View style={styles.coinsCard}>
            <View style={styles.coinsContainer}>
              <View style={styles.coinsLeft}>
                <View style={styles.coinIcon}>
                  <Text style={styles.coinCurrency}>₹</Text>
                </View>
                <Text style={styles.goldCoinsText}>Gold Coins</Text>
              </View>
              <TouchableOpacity style={styles.savedBadge} activeOpacity={0.7}>
                <Text style={styles.savedText}>Saved ₹1,900</Text>
                <ChevronRight color="#D97706" size={20} strokeWidth={3} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButtonWrapper} activeOpacity={0.7}>
            <LinearGradient
              colors={['#22D3EE', '#06B6D4']}
              style={styles.actionButton}
            >
              <ShoppingCart color="#fff" size={24} strokeWidth={2.5} />
              <Text style={styles.actionText}>My Orders</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButtonWrapper} activeOpacity={0.7}>
            <LinearGradient
              colors={['#22D3EE', '#06B6D4']}
              style={styles.actionButton}
            >
              <Image 
                source={require("../../assets/images/Sellbook.png")} 
                style={styles.actionIcon}
                resizeMode="contain"
              />
              <Text style={styles.actionText}>Sell books</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButtonWrapper} activeOpacity={0.7}>
            <LinearGradient
              colors={['#22D3EE', '#06B6D4']}
              style={styles.actionButton}
            >
              <Truck color="#fff" size={24} strokeWidth={2.5} />
              <Text style={styles.actionText}>Deliverables</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButtonWrapper} activeOpacity={0.7}>
            <LinearGradient
              colors={['#22D3EE', '#06B6D4']}
              style={styles.actionButton}
            >
              <Image 
                source={require("../../assets/images/needhelp.png")} 
                style={styles.actionIcon}
                resizeMode="contain"
              />
              <Text style={styles.actionText}>Need help?</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<Star color="#fff" size={24} />} 
            label="Your rating" 
            badge="⭐ 453" 
          />
          <MenuItem icon={<ThumbsUp color="#fff" size={24} />} label="Your feedback" />
          <MenuItem icon={<Info color="#fff" size={24} />} label="About" />
          <MenuItem icon={<Edit color="#fff" size={24} />} label="Send feedback" />
          <MenuItem icon={<AlertCircle color="#fff" size={24} />} label="Report" />
          <MenuItem icon={<Settings color="#fff" size={24} />} label="Settings" />
          <MenuItem icon={<LogOut color="#fff" size={24} />} label="Logout" isLast />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  isLast?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, badge, isLast }) => {
  return (
    <TouchableOpacity 
      style={[styles.menuItem, !isLast && styles.menuItemBorder]}
      activeOpacity={1}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>{icon}</View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
        <ChevronRight color="#fff" size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: CARD_PADDING,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
    padding: 8,
    alignSelf: 'flex-start',
  },
  profileCardWrapper: {
    marginBottom: 16,
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
  profileCard: {
    width: '100%',
    minHeight: 180,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundDecoration: {
    position: 'absolute',
    right: -15,
    top: 0,
    bottom: 10,
    width: width * 1,
    height: '100%',
    opacity: 1,
  },
  profileHeader: {
    zIndex: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  avatarContainer: {
    marginTop: 4,
  },
  avatarBorder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E0E7FF',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userDetails: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 150,
  },
  userName: {
    fontSize: Math.min(22, width * 0.055),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: Math.min(13, width * 0.032),
    color: '#4B5563',
    marginBottom: 2,
  },
  userAddress: {
    fontSize: Math.min(12, width * 0.03),
    color: '#6B7280',
    marginBottom: 4,
  },
  editProfile: {
    fontSize: Math.min(12, width * 0.03),
    color: '#2563EB',
    fontWeight: '600',
  },
  coinsCard: {
    width: '100%',
    backgroundColor: '#9EF5F7',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: '#9ED3C9',
    marginTop: -49,
  },
  coinsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  coinsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  coinIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FCD34D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinCurrency: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  goldCoinsText: {
    fontSize: Math.min(16, width * 0.04),
    fontWeight: '600',
    color: '#D97706',
  },
  savedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  savedText: {
    fontSize: Math.min(14, width * 0.035),
    fontWeight: '700',
    color: '#D97706',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
  actionButtonWrapper: {
    flex: 1,
    minWidth: 70,
  },
 actionButton: {
  borderRadius: 16,
  padding: 16,
  alignItems: 'center',
  gap: 8,
  minHeight: 100,
  justifyContent: 'center',
},
actionIcon: {
  width: 28,
  height: 28,
},

  actionText: {
    fontSize: Math.min(11, width * 0.028),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#3DB9D4',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  menuLabel: {
    fontSize: Math.min(16, width * 0.04),
    fontWeight: '600',
    color: '#fff',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: Math.min(14, width * 0.035),
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProfileScreen;
