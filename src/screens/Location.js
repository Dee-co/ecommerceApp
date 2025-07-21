import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../component/GlobalStyles';
import CustomInput from '../component/CustomInput';
import { LocateIcon, MapPin } from 'lucide-react-native';
import Geolocation from '@react-native-community/geolocation';
import { BG, BG1, SECONDARY, THEME_COLOR, THEME_COLOR2 } from '../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { check, PERMISSIONS } from 'react-native-permissions';
import Locations from '../config/Locations.json';
import {
  setSelectedLocation,
  setCurrentLocation,
} from '../redux/LocationSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const Location = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = React.useState('');
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    checkAndRequestLocationPermission();
  }, []);
  const checkAndRequestLocationPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    const status = await check(permission);
    switch (status) {
      case RESULTS.GRANTED:
        console.log('✅ Location permission already granted');
        getCurrentLocation();
        break;

      case RESULTS.DENIED: {
        console.log('⏳ Location permission denied, requesting...');
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          console.log('✅ Location permission granted after request');
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'You denied location permission. Enable it to continue.',
          );
        }
        break;
      }

      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          'Location permission is blocked. Please enable it from Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
            },
          ],
        );
        break;

      default:
        console.log('Unhandled permission status:', status);
    }
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('📍 Location:', position.coords);
        Alert.alert(
          'Your Location',
          `Lat: ${position.coords.latitude}\nLng: ${position.coords.longitude}`,
        );
      },
      error => {
        console.log('❌ Error getting location:', error);
        Alert.alert('Error', 'Unable to fetch location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setLocation(item)}
      style={[
        styles.locationItem,
        location?.LocationId === item.LocationId && styles.selectedItem,
      ]}
    >
      <Text style={styles.locationName}>{item.societyName}</Text>
      <Text style={styles.locationAddress}>{item.address}</Text>
    </TouchableOpacity>
  );
  const handleConfirm = () => {
    if (!location) {
      Alert.alert(
        'Select Location',
        'Please select a location before confirming.',
      );
      return;
    }
    dispatch(setSelectedLocation(location));
    navigation.navigate('Main');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.innerContainer}>
          <CustomInput
            value={searchValue}
            onChangeText={txt => setSearchValue(txt)}
            placeholder={'search location'}
            isValid={true}
            lucideIcon={<MapPin size={24} color="#9e9e9e" />}
          />
          <TouchableOpacity
            onPress={() => {
              getCurrentLocation();
            }}
            style={styles.btn}
          >
            <LocateIcon size={24} color="#9e9e9e" />
            <Text style={styles.btnText}>Use Current Location</Text>
          </TouchableOpacity>

          {Locations.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, color: '#333', marginTop: 10 }}>
                Available Locations{' '}
              </Text>
              <FlatList
                style={styles.locationList}
                data={Locations}
                keyExtractor={(item, index) => `${item.LocationId}_${index}`}
                renderItem={renderItem}
                contentContainerStyle={{ marginTop: 10 }}
              />
              <LinearGradient colors={[BG, BG1]} style={styles.confirmBtn}>
                <TouchableOpacity
                  style={[
                    styles.confirmBtn,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 0,
                    },
                  ]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmBtnText}>Confirm</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.noLocationsAvailable}>
              <Text>No locations available</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    gap: 10,
  },
  btnText: {
    color: BG,
    fontSize: 16,
    fontWeight: '600',
  },
  locationItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedItem: {
    borderColor: THEME_COLOR,
    backgroundColor: SECONDARY,
  },
  locationName: {
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  locationAddress: {
    color: '#777',
    fontSize: 12,
  },
  locationList: {
    width: '100%',
    maxHeight: height - 270,
    overflow: 'scroll',
    marginTop: 0,
  },
  confirmBtn: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  noLocationsAvailable: {
    height: height - 250,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Location;
