import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import GlobalStyles from '../component/GlobalStyles';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomOtpInput from '../component/CustomOtpInput';
import { ArrowLeft } from 'lucide-react-native';
import { BG } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
const Otp = ({ route }) => {
  const navigation = useNavigation();
  const { phoneData } = route.params || {};
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpRef = useRef(null);
  const handleOnComplete = () => {
    Keyboard.dismiss();
    navigation.replace('Location');
    console.log('OTP submitted:', otp);
  };
  useEffect(() => {
    if (otp.length === 6) {
      handleOnComplete(otp);
    }
  }, [otp]);
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);
  const handleOtpChange = val => {
    setOtp(val);
  };
  const resendOtp = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
  };
  const handlePaste = async () => {
    navigation.navigate('Login', { editPhone: phoneData });
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.innerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <ArrowLeft size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.otpHeading}>Please enter 6-digit code</Text>
        <Text style={styles.otpLabel}>We've sent you a 6-digit code at</Text>
        <Text style={styles.otpLabel}>
          on ({phoneData?.country?.code}) {phoneData?.phoneNumber}
        </Text>
        <View style={styles.phoneNumberEditContainer}>
          <Text style={styles.editNumber}>
            ({phoneData?.country?.code}) {phoneData?.phoneNumber}
          </Text>
          <TouchableOpacity onPress={handlePaste}>
            <Text style={styles.editBtn}>Edit</Text>
          </TouchableOpacity>
        </View>
        <CustomOtpInput ref={otpRef} onChange={handleOtpChange} />
        <View style={styles.resendContainer}>
          <Text style={styles.otpLabel}>
            {canResend
              ? 'You can now resend the code'
              : `Resend code in ${timer}s`}
          </Text>
          <TouchableOpacity
            style={[
              styles.resendButton,
              !canResend && styles.resendButtonDisabled,
            ]}
            disabled={!canResend}
            onPress={() => resendOtp()}
          >
            <Text
              style={[styles.editBtn, !canResend && styles.editBtnDisabled]}
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 55,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  otpHeading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
  },
  otpLabel: {
    fontSize: 14,
    color: 'gray',
  },
  phoneNumberEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
  },
  editBtn: {
    color: BG,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  editNumber: {
    fontSize: 14,
    color: '#000',
  },
  backButton: {
    position: 'relative',
    top: 0,
    left: -5,
    zIndex: 1,
    marginBottom: 10,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  editBtnDisabled: {
    opacity: 0.5,
  },
});
export default Otp;
