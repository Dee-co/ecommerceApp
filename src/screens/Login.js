import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import PhoneInput from '../component/PhoneInput';
import { BG, BG1, THEME_COLOR, THEME_COLOR2 } from '../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../component/GlobalStyles';
const Login = ({ route }) => {
  const { editPhone } = route.params || {};
  const navigation = useNavigation();
  const [phoneData, setPhoneData] = useState(editPhone || null);
  const [error, setError] = useState(null);
  const validatePhone = phoneData => {
    if (!phoneData || !phoneData.country || !phoneData.phoneNumber) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (phoneData.phoneNumber.length !== phoneData.country.valid_digits) {
      setError(`Phone number must be ${phoneData.country.valid_digits} digits`);
      return false;
    }
    setError(null);
    return true;
  };
  const submitPhone = () => {
    Keyboard.dismiss();
    if (!validatePhone(phoneData)) {
      return;
    }
    navigation.navigate('Otp', { phoneData });
    setPhoneData({ country: 'IN', phoneNumber: '' });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.innerContainer}>
          <Image
            source={require('../images/cafeLogo.jpg')}
            style={styles.logoImage}
          />
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={[styles.welcomeText, { marginBottom: 20 }]}>
            to <Text style={styles.brandName}>Cafe</Text>
          </Text>
          <PhoneInput
            defaultCounty={editPhone?.country?.code || 'IN'}
            value={editPhone || undefined}
            onChange={value => setPhoneData(value)}
          />
          {error && <Text style={styles.errorMsg}>{error}</Text>}
          <LinearGradient colors={[BG, BG1]} style={styles.btn}>
            <TouchableOpacity
              onPress={() => {
                submitPhone();
              }}
              style={[
                styles.btn,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 0,
                },
              ]}
            >
              <Text style={styles.btnText}>Get OTP</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
const styles = StyleSheet.create({
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brandName: {
    color: BG, // Tomato color
  },
  btn: {
   width: '100%',
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorMsg: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
  },
});
