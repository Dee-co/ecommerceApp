import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import orderData from '../../config/OrderedData.json';
import { Calendar, CircleX, Filter } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { BG } from '../../utils/Colors';
import DateRangePicker from '../../component/DateRangePicker';
import { useNavigation } from '@react-navigation/native';

const formatDateTime = timestamp => {
  const date = new Date(timestamp);
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };
  return date.toLocaleString('en-GB', options).replace(',', '');
};

const Order = () => {
  const navigation = useNavigation();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRangeSelected, setDateRangeSelected] = useState(false);
  const [appliedDate, setAppliedDate] = useState(false);
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
      setDateRangeSelected(true); // both dates selected
    } else {
      setAppliedDate(false);
      setStartDate(date);
      setEndDate(null);
      setDateRangeSelected(false); // reset end and flag
    }
  };
  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRangeSelected(false);
    setAppliedDate(false);
    setCalendarVisible(false);
  };
  const handleApply = () => {
    if (startDate && endDate) {
      setAppliedDate(true);
      setCalendarVisible(false);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
    }
  };
  const handleDetails = data => {
    console.log('data', data);
    navigation.navigate('OrderDetails', { data });
  };
  const filters = ['All', 'Pending', 'Delivered'];
  const [selectedFilter, setSelectedFilter] = useState('All');
  const insets = useSafeAreaInsets();
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetails(item)}>
      <View style={[styles.orderCard]}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderStatus}>🟢 Order Placed</Text>
          <Text style={styles.dateText}>{formatDateTime(item.createdAt)}</Text>
        </View>
        <Text style={styles.orderId}>{item.orderId}</Text>
        {item.cartItems.map((product, index) => (
          <View key={index} style={styles.productRow}>
            <Image
              source={{ uri: product.prdtImg }}
              style={styles.productImage}
            />
            <View>
              <Text style={styles.productName}>{product.prdtName}</Text>
              <Text style={styles.productDetails}>
                {product.qnty} × ₹{product.price}/{product.unit.label}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{selectedFilter} Orders</Text>
        {appliedDate && (
          <View style={styles.dateRangeContainer}>
            <Text style={styles.selectedDateText}>
              {startDate?.toLocaleDateString()} -{' '}
              {endDate?.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={clearDateRange}>
              <CircleX size={15} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.headerIcons}>
        <Menu>
          <MenuTrigger>
            <Filter size={24} color={'black'} />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
            {filters.map(option => (
              <MenuOption
                key={option}
                onSelect={() => setSelectedFilter(option)}
              >
                <Text
                  style={[
                    styles.optionStyle,
                    option === selectedFilter && styles.activeOption,
                  ]}
                >
                  {option}
                </Text>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
        <TouchableOpacity onPress={() => setCalendarVisible(true)}>
          <Calendar size={24} color={'black'} />
        </TouchableOpacity>
        <DateRangePicker
          visible={calendarVisible}
          onClose={() => {
            setCalendarVisible(false);
            setDateRangeSelected(false);
          }}
          onApply={handleApply}
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />
      </View>
    </View>
  );

  const NoDataComponent = () => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No Orders Found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={orderData}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={NoDataComponent}
        contentContainerStyle={{
          paddingBottom: 65 + insets.bottom,
          flexGrow: orderData.length === 0 ? 1 : 0,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: `100%`,
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    fontSize: 20,
  },
  listContent: {
    padding: 1,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    marginBlock: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderStatus: {
    fontWeight: '700',
    fontSize: 14,
  },
  dateText: {
    fontSize: 13,
    color: 'gray',
  },
  orderId: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  productName: {
    fontWeight: '600',
    fontSize: 15,
  },
  productDetails: {
    color: '#555',
    fontSize: 13,
  },
  noDataContainer: {
    paddingTop: 80,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#999',
  },
  optionStyle: {
    paddingLeft: 5,
    fontSize: 16,
    paddingBlock: 5,
  },
  activeOption: {
    color: BG,
    fontWeight: 'bold',
  },
  menuOptions: {
    width: 150,
    paddingVertical: 5,
    borderRadius: 8,
  },
  selectedDateText: {
    fontSize: 12,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});

export default Order;
