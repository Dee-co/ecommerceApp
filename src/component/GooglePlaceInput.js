import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text
} from 'react-native';
import { X } from 'lucide-react-native';

const GooglePlacesInput = ({ onPlaceSelected,setClearInputRef}) => {
  const [searchText, setSearchText] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (setClearInputRef) {
      setClearInputRef(() => clearInput); // pass function, not result
    }
  }, []);

  const fetchPlaces = async (input) => {
    if (!input) {
      setAutocompleteResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${'AIzaSyB7J0p2H9PuAhzlIpTBo1qscyZsEhDj4P4'}&language=en`
      );
      const json = await response.json();
      if (json.status === 'OK') {
        setAutocompleteResults(json.predictions);
      } else {
        setAutocompleteResults([]);
      }
    } catch (error) {
      console.log('Autocomplete Error:', error);
      setAutocompleteResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (item) => {
    try {
      const detailsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${'AIzaSyB7J0p2H9PuAhzlIpTBo1qscyZsEhDj4P4'}`
      );
      const detailsJson = await detailsResponse.json();
      if (detailsJson.status === 'OK') {
        const result = detailsJson.result;
        const location = result.geometry.location;
        const formattedAddress = result.formatted_address;

        const selectedData = {
          latitude: location.lat,
          longitude: location.lng,
          address: formattedAddress,
          name: result.name,
        };

        onPlaceSelected(selectedData);

        setSearchText(result.name);
        setAutocompleteResults([]);
        Keyboard.dismiss();
      }
    } catch (e) {
      console.log('Details fetch error:', e);
    }
  };

  const clearInput = () => {
    setSearchText('');
    setAutocompleteResults([]);
  };

  return (
    <View style={{ zIndex: 9999 }}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search for a place"
          value={searchText}
          placeholderTextColor={'#000'}
          onChangeText={(text) => {
            setSearchText(text);
            fetchPlaces(text); // show suggestions immediately
          }}
        />
        {loading && <ActivityIndicator  style={styles.clearButton}/>}

        {!loading && searchText.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <X size={18} color={'black'}/>
            {/* <Text style={styles.clearButtonText}>✕</Text> */}
          </TouchableOpacity>
        )}
      </View>

      
      {autocompleteResults.length > 0 && (
        <View style={styles.suggestionList}>
          {autocompleteResults.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              onPress={() => handleSelect(item)}
              style={styles.suggestion}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height:50,
    borderWidth: 1,
    fontSize:16,
    color:'#000',
    borderColor: '#ccc',
    paddingRight: 35, // space for clear button
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 2,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#555',
  },
  suggestion: {
    padding: 10,
    zIndex: 10000,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  suggestionList: {
    maxHeight: 400,
    zIndex: 9999,
  },
});

export default GooglePlacesInput;