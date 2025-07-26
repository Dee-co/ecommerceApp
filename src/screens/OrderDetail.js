import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Check } from 'lucide-react-native'; // Lucide icons

const OrderDetails = () => {
  const navigation = useNavigation();
  const order = {
    orderId: 'MOI17535059950321',
    createdAt: '2025-07-26T04:59:57.133Z',
    cartItems: [
      {
        prdtName: 'Veg briyani',
        qnty: 1,
        price: 100,
        prdtImg:
          'https://delibo-app-storage-dev.s3.ap-south-1.amazonaws.com/org-bucket/sellers-account/DOTC50078834485/productImages/1750147733-25C446AA6D/1750147734-3E544D8578/2cb867b2-c235-4e3c-9e5b-35a9b4f97580.jpeg',
      },
      {
        prdtName: 'Veg Briyani',
        qnty: 1,
        price: 1000,
        prdtImg:
          'https://delibo-app-storage-dev.s3.ap-south-1.amazonaws.com/org-bucket/sellers-account/DOTC50078834485/productImages/1750147733-25C446AA6D/1751954888-9A4C62B8C3/b7ff66b9-4027-4e57-8bfd-38af56b1da28.png',
      },
    ],
    vehicleNo: '',
    paymentMethod: 'Netbanking',
    totalPrice: 1298,
    states: [{ s: 3 }],
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  const steps = [
    { label: 'Order Placed', status: order.states.some((s) => s.s >= 1) },
    { label: 'Restaurant Accepted', status: order.states.some((s) => s.s >= 2) },
    { label: 'Food Ready & Stored in Locker', status: order.states.some((s) => s.s >= 3) },
    { label: 'Picked at Car Park', status: order.states.some((s) => s.s >= 4) },
  ];

  return (
    <View style={styles.page}>
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.orderId}>#{order.orderId}</Text>
          <Text style={styles.orderStatus}>Order Placed</Text>
          <Text style={styles.time}>{formatDate(order.createdAt)}</Text>
        </View>

        {order.cartItems.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Image source={{ uri: item.prdtImg }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.prdtName}</Text>
              <Text style={styles.itemQty}>Qty: {item.qnty}</Text>
              <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
            </View>
          </View>
        ))}

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Vehicle Number</Text>
          <Text style={styles.value}>{order.vehicleNo || 'NA'}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{order.paymentMethod}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Grand Total</Text>
            <Text style={styles.value}>₹{order.totalPrice}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Order Tracking</Text>
        <View style={styles.trackingContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.trackingStep}>
              <View style={styles.iconWithLine}>
                <View
                  style={[
                    styles.circle,
                    { backgroundColor: step.status ? '#00C851' : '#ccc' },
                  ]}
                >
                  {step.status && <Check size={12} color="#fff" />}
                </View>
                {index !== steps.length - 1 && (
                  <View style={styles.verticalLine} />
                )}
              </View>
              <Text
                style={[
                  styles.stepText,
                  { color: step.status ? '#00C851' : '#777' },
                ]}
              >
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  stickyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
    zIndex: 1000,
    elevation: 4,
  },
  backButton: {
    marginLeft: '2%',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    paddingBottom: 50,
    marginTop: 5,
  },
  header: {
    marginBottom: 12,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderStatus: {
    color: '#00C851',
    fontWeight: '600',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  itemRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemQty: {
    fontSize: 13,
    color: '#555',
  },
  itemPrice: {
    fontSize: 13,
    color: '#555',
  },
  infoBlock: {
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    color: '#888',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 15,
  },
  trackingContainer: {
    marginTop: 10,
    paddingLeft: 4,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 1,
  },
  iconWithLine: {
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ccc',
    marginTop: 2,
  },
  stepText: {
    fontSize: 14,
    marginTop: 2,
    flex: 1,
  },
});

export default OrderDetails;
