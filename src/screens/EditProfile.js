import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ArrowLeft, RotateCw } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    UserName: 'Deepak',
    UserEmail: '',
    UserAddress: '',
    UserMobile: '+919399909989',
    UserEmailVerified: false,
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Submitted Profile:', profile);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Name */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.required}> *</Text>
        </View>
        <TextInput
          style={styles.input}
          value={profile.UserName}
          onChangeText={text => handleChange('UserName', text)}
        />

        {/* Mobile */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.required}> *</Text>
        </View>
        <TextInput
          style={[styles.input, { color: '#999' }]}
          value={profile.UserMobile}
          editable={false}
        />

        {/* Email */}
        <View style={styles.emailSection}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputWithIcon}
              value={profile.UserEmail}
              onChangeText={text => handleChange('UserEmail', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.refreshIcon}>
              <RotateCw size={18} color="orange" />
            </TouchableOpacity>
          </View>
           {!profile.UserEmailVerified && (
          <Text style={styles.unverifiedText}>Unverified</Text>
        )}
        </View>

       

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          value={profile.UserAddress}
          onChangeText={text => handleChange('UserAddress', text)}
          multiline
        />

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    padding: 15,
  },
  labelRow: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  required: {
    color: 'orange',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailSection:{
    marginTop: 10,
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputWithIcon: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingRight: 36, // space for the icon
  },
  refreshIcon: {
    position: 'absolute',
    right: 10,
    padding: 6,
  },

  unverifiedText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  button: {
    backgroundColor: '#ec8703',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
