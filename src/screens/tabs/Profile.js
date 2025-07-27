import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Pencil, LogOut, Camera, CheckCircle, MapPinHouse } from 'lucide-react-native';
import { BG, BG1 } from '../../utils/Colors';
import Loader from '../../component/Loader';
const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const isFocused = useIsFocused();
  const profileData = {
    id: '22ef904e-6d53-45c4-b86e-69efb14a423f',
    UserName: 'Deepak',
    UserEmail: 'deepak.delibo@gmail.com',
    UserAddress: '',
    UserMobile: '+919399909989',
    UserEmailVerified: true,
    NotificationsOpted: [],
    createdAt: '2025-06-24T11:18:21.207Z',
    privateDelibo: false,
    m_pin_req: false,
    vehicleNo: [],
  };

  useEffect(() => {
    setUserDetails({
      userName: profileData.UserName,
      email: profileData.UserEmail,
      mobile: profileData.UserMobile,
    });
  }, [isFocused]);
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
    // navigation.navigate('Address');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Initial */}
      <View style={styles.profileWrapper}>
        <LinearGradient colors={[BG, BG1]} style={styles.profileView}>
          <Text style={styles.profileInitial}>
            {userDetails?.userName?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </LinearGradient>
      </View>

      {/* Info */}
      <Text style={styles.userName}>{userDetails?.userName}</Text>
      <Text style={styles.mobile}>{userDetails?.mobile}</Text>
      <View style={styles.emailSection}>
        <Text style={styles.email}>{userDetails?.email}</Text>
        <CheckCircle size={15} color={'green'} />
      </View>

      {/* Edit Profile Button */}
      <LinearGradient colors={['#e7eaee','#f3f4f6']} style={styles.btn}>
        <TouchableOpacity
          style={[styles.btn, styles.editBtn]}
          onPress={handleEditProfile}
        >
          <Pencil color="black" size={16} style={{ marginRight: 6 }} />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Logout Button */}
      <LinearGradient colors={['#e7eaee','#f3f4f6']} style={styles.btn}>
        <TouchableOpacity style={[styles.btn, styles.editBtn]}>
          <MapPinHouse color="black" size={16} style={{ marginRight: 6 }} />
          <Text style={styles.editText}>Address</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Logout Button */}
      <LinearGradient colors={['#fef1f2','#fddad9']} style={styles.btn}>
        <TouchableOpacity style={[styles.btn, styles.logoutBtn]}>
          <LogOut color="#f04e4d" size={16} style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileView: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
  },
  mobile: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 3,
  },
  emailSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 3,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
  btn: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  editBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:5,
    marginTop: 0,
    backgroundColor:"#e7eaee"
  },
  logoutBtn:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:5,
    marginTop: 0,
    backgroundColor:"#fef1f2"
  },
  editText: {
    color: '#404955',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutText: {
    color: '#f04e4d',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
