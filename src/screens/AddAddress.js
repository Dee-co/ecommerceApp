import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import 'react-native-get-random-values';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, HomeIcon, Briefcase, MapPin } from 'lucide-react-native';
import CustomInput from '../component/CustomInput';
import LinearGradient from 'react-native-linear-gradient';
import { BG, BG1 } from '../utils/Colors';

const GOOGLE_API_KEY = 'AIzaSyB7J0p2H9PuAhzlIpTBo1qscyZsEhDj4P4';
const { width, height } = Dimensions.get('window');

const addressTypes = [
  {
    label: 'Home',
    icon: <HomeIcon color="#555" size={16} />,
  },
  {
    label: 'Office',
    icon: <Briefcase color="#555" size={16} />,
  },
  {
    label: 'Other',
    icon: <MapPin color="#555" size={16} />,
  },
];

const AddAddress = () => {
  const [region, setRegion] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [addressType, setAddressType] = useState('Home');
  const [flat, setFlat] = useState('');
  const [floor, setFloor] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const mapRef = useRef(null);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const getLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await getLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const regionData = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(regionData);
        setMarkerPosition({ latitude, longitude });
        mapRef.current?.animateToRegion(regionData, 1000);
      },
      error => {
        console.warn(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handlePlaceSelect = place => {
    console.log('Selected place:', place);
  };

  const scrollToInput = y => {
    scrollViewRef.current?.scrollTo({ y, animated: true });
  };
  const submitAddress = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add New Address</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView
              ref={scrollViewRef}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Map Section */}
              <View style={styles.mapContainer}>
                <View style={styles.searchContainer}>
                  <GooglePlacesTextInput
                    apiKey={GOOGLE_API_KEY}
                    onPlaceSelect={handlePlaceSelect}
                    placeHolderText="Search your delivery address"
                  />
                </View>
                <MapView
                  ref={mapRef}
                  style={styles.mapSection}
                  region={region}
                  showsUserLocation={true}
                  onPress={e => setMarkerPosition(e.nativeEvent.coordinate)}
                >
                  {markerPosition && (
                    <Marker coordinate={markerPosition} draggable />
                  )}
                </MapView>
                <TouchableOpacity
                  style={styles.currentButton}
                  onPress={getCurrentLocation}
                >
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    📍 Use Current Location
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Address Form Section */}
              <View style={styles.addressFormContainer}>
                {/* Address Type */}
                <View style={styles.addressTypeRow}>
                  {addressTypes.map(item => {
                    const isSelected = addressType === item.label;
                    return (
                      <TouchableOpacity
                        key={item.label}
                        onPress={() => setAddressType(item.label)}
                        style={[
                          styles.typeButton,
                          {
                            backgroundColor: isSelected ? 'orange' : '#f0f0f0',
                          },
                        ]}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          {item.icon}
                          <Text
                            style={{
                              color: isSelected ? 'white' : '#555',
                              fontWeight: '600',
                              fontSize: 13,
                            }}
                          >
                            {item.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Inputs */}
                <CustomInput
                  value={flat}
                  onChangeText={txt => setFlat(txt)}
                  placeholder="Flat / House no / Building name *"
                  isValid={true}
                  style={styles.customInputs}
                  onFocus={() => scrollToInput(700)}
                />
                <CustomInput
                  value={floor}
                  onChangeText={txt => setFloor(txt)}
                  placeholder="Floor (optional)"
                  isValid={true}
                  style={styles.customInputs}
                  onFocus={() => scrollToInput(550)}
                />
                <CustomInput
                  value={locality}
                  onChangeText={txt => setLocality(txt)}
                  placeholder="Area / Sector / Locality *"
                  isValid={true}
                  editable={false}
                  style={styles.customInputs}
                  onFocus={() => scrollToInput(600)}
                />
                <CustomInput
                  value={landmark}
                  onChangeText={txt => setLandmark(txt)}
                  placeholder="Landmark (optional)"
                  isValid={true}
                  style={styles.customInputs}
                  onFocus={() => scrollToInput(650)}
                />
                <LinearGradient colors={[BG, BG1]} style={styles.btn}>
                  <TouchableOpacity
                    onPress={() => {
                      submitAddress();
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
                    <Text style={styles.btnText}>Submit Address</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 35,
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
  mapContainer: {
    position: 'relative',
    height: height * 0.46,
    minHeight: 300,
  },
  mapSection: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingHorizontal: 10,
  },
  currentButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 5,
  },
  addressFormContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  addressTypeRow: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  customInputs: {
    marginBottom: 20,
    height: 35,
  },
  btn: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddAddress;
