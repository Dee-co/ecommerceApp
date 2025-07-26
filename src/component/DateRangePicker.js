import React from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { BG } from '../utils/Colors';
const DateRangePicker = ({
  visible,
  onClose,
  onApply,
  startDate,
  endDate,
  onDateChange,
}) => {
  const handleApply = () => {
    if (startDate && endDate) {
      onApply();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.calendarBox}>
          <CalendarPicker
            allowRangeSelection
            selectedStartDate={startDate}
            selectedEndDate={endDate}
            onDateChange={onDateChange}
            todayBackgroundColor="#f0e6ff"
            selectedDayColor={BG}
            selectedDayTextColor="#fff"
            previousTitle="‹"
            nextTitle="›"
            textStyle={styles.textStyle}
            width={320}
            scaleFactor={375}
            monthTitleStyle={styles.monthTitle}
            yearTitleStyle={styles.yearTitle}
            previousTitleStyle={styles.navButton}
            nextTitleStyle={styles.navButton}
             maxDate={new Date()} 
          />

          <View style={styles.footer}>
            <Pressable onPress={onClose} style={[styles.btn, styles.cancelBtn]}>
              <Text style={[styles.btnText, { color: '#333' }]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleApply}
              disabled={!(startDate && endDate)}
              style={[
                styles.btn,
                !(startDate && endDate) && styles.disabledBtn,
              ]}
            >
              <Text style={styles.btnText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateRangePicker;

const { width } = Dimensions.get('window');
const CAL_WIDTH = 360;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000070',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarBox: {
    width: CAL_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 10,
    alignItems: 'center',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: BG,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: '#e0e0e0',
  },
  disabledBtn: {
    opacity: 0.4,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  textStyle: {
    color: '#333',
    fontSize: 16,
  },
  navButton: {
    fontSize: 26,
    color: BG,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 30,
    overflow: 'hidden',
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BG,
  },
  yearTitle: {
    fontSize: 16,
    color: '#666',
  },
});
