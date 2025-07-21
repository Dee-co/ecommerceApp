import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { brandName } from '../utils/Client';
import { Search, MapPin } from 'lucide-react-native';
import { BG, SECONDARY } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
const LocationHeader = () => {
    const navigation = useNavigation();
  const selectedLocation = useSelector(
    state => state.location.selectedLocation,
  );
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={()=> navigation.navigate('Location')}>
        <Text style={styles.brandName}>{brandName}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#9e9e9e" />
          <Text
            style={styles.locationText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedLocation?.address}
          </Text>
          <Text style={styles.changeText}>Change</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  brandName: {
    fontSize: 20,
    marginBottom: 1,
    padding: 0,
    fontWeight: 600,
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: 400,
    textTransform: 'capitalize',
    maxWidth: '80%',
  },
  changeText: {
    color: BG,
    textDecorationLine: 'underline',
    fontWeight: 600,
  },
});
export default LocationHeader;
