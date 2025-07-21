import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import countries from '../config/Countries.json';

export default function PhoneInput({ defaultCounty, value, onChange }) {
  const [selectedCountry, setSelectedCountry] = useState(
    defaultCounty ? countries.find(c => c?.id === defaultCounty) : countries[0],
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    if (value) {
      setSelectedCountry(value.country);
      setPhoneNumber(value.phoneNumber);
    }
  }, [value]);
  const onSelectCountry = country => {
    setSelectedCountry(country);
    setShowModal(false);
    setSearchText('');
    if (onChange) {
      onChange({ country, phoneNumber });
    }
  };
  const onChangePhone = value => {
    setPhoneNumber(value);
    if (onChange) {
      onChange({ country: selectedCountry, phoneNumber: value });
    }
  };

  const filteredCountries = countries.filter(c =>
    c.country.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Left: Country Code */}
      <TouchableOpacity
        style={styles.countryCode}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.flag}>{selectedCountry?.flag}</Text>
        <Text style={styles.countryCodeText}>{selectedCountry?.code}</Text>
      </TouchableOpacity>

      {/* Right: Phone Number */}
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={selectedCountry?.valid_digits}
        placeholder={`Enter ${selectedCountry?.valid_digits}-digit number`}
        placeholderTextColor="#9e9e9e"
        value={phoneNumber}
        onChangeText={onChangePhone}
      />

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
            Keyboard.dismiss();
          }}
        >
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.modalContent}
              >
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search country..."
                  placeholderTextColor={'#9e9e9e'}
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <FlatList
                  data={filteredCountries}
                  keyExtractor={item => item.id}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => onSelectCountry(item)}
                      style={styles.countryItem}
                    >
                      <Text style={styles.flag}>{item.flag}</Text>
                      <Text>
                        {item.country} ({item.code})
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingBlock: 2,
    paddingHorizontal:10
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000',
  },
  flag: {
    fontSize: 20,
    marginRight: 4,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '70%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
