import {
  View,
  StyleSheet,
  Text,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Locate } from 'lucide-react-native';
import { BG } from '../utils/Colors';
import GooglePlacesInput from '../component/GooglePlaceInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

const Maps = () => {
  const mapRef = useRef(null);
  const [regionData, setRegionData] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 1.015,
    longitudeDelta: 1.0121,
  });
  const insets = useSafeAreaInsets();
  const [clearSearchInput, setClearSearchInput] = useState(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [address, setAddress] = useState('');
  const checkLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted) {
          setLocationGranted(true);
          await getCurrentLocation();
        } else {
          requestLocationPermission();
        }
      } else {
        Geolocation.requestAuthorization(
          () => {
            setLocationGranted(true);
            getCurrentLocation();
          },
          () => {
            setShowPermissionDialog(true);
            requestLocationPermission();
          },
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    console.log('calling getCurrentLocation');
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        setRegionData(newRegion);
        setCurrentPosition(newRegion);

       
          mapRef.current.animateToRegion(newRegion, 1000);
        console.log('getting current location', latitude, longitude);

        await getAddressFromCoordinates(latitude, longitude);
      },
      error => {
        console.log('❌ Location error:', error);
        openSettings();
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to provide better service.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Deny',
            buttonPositive: 'Allow',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationGranted(true);
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission Required',
            'Location permission is required to use this app. Please enable it in settings.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      } else {
        Geolocation.requestAuthorization(
          () => {
            setLocationGranted(true);
            getCurrentLocation();
          },
          () => {
            Alert.alert(
              'Permission Required',
              'Location permission is required to use this app. Please enable it in settings.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Open Settings',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
          },
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    console.log('getting location permission');
    checkLocationPermission();
  }, []);

  const handleRegionChangeComplete = async(region) => {
    // Update the current position to the center of the map
    const newPosition = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
    setCurrentPosition(newPosition);
    await getAddressFromCoordinates(region.latitude, region.longitude);
    console.log('Fixed Pin Marker Position:', newPosition);
  };
  const getGeocodingData = async (latitude, longitude) => {
    return new Promise(async (resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${'AIzaSyB7J0p2H9PuAhzlIpTBo1qscyZsEhDj4P4'}`;
      try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
          const results = data.results;
          let city = '';
          let pincode = '';
          let state = '';
          let country = '';
          let address = '';
          let area = '';

          for (let i = 0; i < results.length; i++) {
            const addressComponents = results[i].address_components;

            for (let j = 0; j < addressComponents.length; j++) {
              const types = addressComponents[j].types;
              if (types.includes('sublocality_level_1') && !area) {
                area = addressComponents[j].long_name;
              }
              if (types.includes('locality') && !city) {
                city = addressComponents[j].long_name;
              }
              if (types.includes('postal_code') && !pincode) {
                pincode = addressComponents[j].long_name;
              }
              if (types.includes('administrative_area_level_1') && !state) {
                state = addressComponents[j].long_name;
              }
              if (types.includes('country') && !country) {
                country = addressComponents[j].long_name;
              }
            }

            if (!address && city && pincode && state && country && area) {
              address = results[i].formatted_address;
              break;
            }
          }

          if (city && pincode && state && country) {
            resolve({
              city,
              pincode,
              state,
              country,
              address,
              latitude,
              longitude,
              area,
            });
          } else {
            console.log('Location details not found');
            reject('Incomplete address data');
          }
        } else {
          console.log('Google Geocoding API error:', data.status);
          reject(`API status error: ${data.status}`);
        }
      } catch (error) {
        console.log('Geocoding error:', error);
        reject(error);
      }
    });
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {

    if (!latitude || !longitude || latitude === 0 || longitude === 0) {
      return;
    }
    const threshold = 0.0001;
    console.log('getting latitude and longitude', latitude, longitude);

    console.log('Checking if coordinates have changed');

    try {
      const response = await getGeocodingData(latitude, longitude);
      setAddress(response.address);
      console.log('Address fetched:', response);
    } catch (error) {
      console.log('getting location error', error);
    }
  };
  return (
    <SafeAreaView
      style={[{ flex: 1, paddingTop: insets.top }, styles.container]}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesInput
            onPlaceSelected={({ latitude, longitude, address }) => {
              const regionData = {
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegionData(regionData);
              setCurrentPosition(regionData);
              mapRef.current.animateToRegion(regionData, 1000);
            }}
          />
        </View>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={regionData}
          mapType="standard"
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onRegionChangeComplete={handleRegionChangeComplete}
        />
        <View style={styles.markerFixed}>
          <Text style={styles.pin}>📍</Text>
        </View>
        
        <View style={[styles.addressContainer, { bottom: 10 + insets.bottom }]}>
            <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}
        >
          <Locate color={BG} size="20" />
        </TouchableOpacity>
          <Text style={styles.addressText}>{address}</Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {}}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -30,
    zIndex: 999,
  },
  pin: {
    fontSize: 40,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1000,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  currentLocationButton: {
    position: 'absolute',
    top: -50,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addressContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: BG,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Maps;
