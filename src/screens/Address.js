import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Building2, Home, MapPin, Phone } from 'lucide-react-native';
import addressData from '../config/Addresses.json';
import { useNavigation } from '@react-navigation/native';
import { BG } from '../utils/Colors';

const AddressItem = ({ item }) => (
  <TouchableOpacity>
    <View style={styles.addressCard}>
      <Text style={styles.name}>{item.userName}</Text>
      <View style={styles.row}>
        {item?.type === 'Home' ? (
          <Home size={18} color={BG} />
        ) : item?.type === 'Office' ? (
          <Building2 size={18} color={BG} />
        ) : (
          <MapPin size={18} color={BG} />
        )}

        <Text style={styles.addressText}>
          {item.flat},{item.floor}, {item.address}
        </Text>
      </View>
      <View style={styles.row}>
        <Phone size={14} color="#555" />
        <Text style={styles.phoneText}>{item.phoneNumber}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Address = () => {
  const navigation = useNavigation();
  const renderHeader = () => (
    <View style={styles.stickyHeader}>
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Address</Text>
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddAddress')}
        >
          <Text style={styles.addText}>+ Add New Address</Text>
        </TouchableOpacity>
        <Text style={styles.selectTitle}>Select your Delivery Address</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={addressData}
        renderItem={({ item }) => <AddressItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]} // Freeze header
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stickyHeader: {
    backgroundColor: '#fff',
    zIndex: 1,
  },
  headerSection: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlignVertical: 'center',
  },
  header: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  addButton: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BG,
  },
  addText: {
    color: BG,
    fontWeight: '600',
    fontSize: 16,
  },
  selectTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  addressCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // elevation: 2,
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  addressText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#444',
    flexShrink: 1,
  },
  phoneText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#444',
  },
});

export default Address;
