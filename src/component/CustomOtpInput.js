import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomOtpInput = forwardRef(({ length = 6, onChange }, ref) => {
  const [otpValues, setOtpValues] = useState(Array(length).fill(''));
  const refs = useRef([]);

  useImperativeHandle(ref, () => ({
    setValue: (value) => {
      const digits = value.split('').slice(0, length);
      const filled = Array(length).fill('');
      digits.forEach((d, i) => filled[i] = d);
      setOtpValues(filled);

      const firstEmpty = filled.findIndex(v => v === '');
      if (firstEmpty !== -1) {
        refs.current[firstEmpty]?.focus();
      } else {
        refs.current[length - 1]?.blur();
      }

      onChange?.(filled.join(''));
    }
  }));

  const handleChange = (text, index) => {
    if (!/^\d*$/.test(text)) return;
    if (text.length > 1) text = text.slice(-1);

    const nextOtp = [...otpValues];
    nextOtp[index] = text;
    setOtpValues(nextOtp);

    onChange?.(nextOtp.join(''));

    if (text && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace') {
      const lastFilledIndex = [...otpValues].reverse().findIndex(v => v !== '');
      if (lastFilledIndex !== -1) {
        const indexToClear = length - 1 - lastFilledIndex;
        const nextOtp = [...otpValues];
        nextOtp[indexToClear] = '';
        setOtpValues(nextOtp);
        onChange?.(nextOtp.join(''));
        refs.current[indexToClear]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          caretHidden={true}
          ref={ref => (refs.current[index] = ref)}
          value={otpValues[index]}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={handleKeyPress}
          onFocus={() => {
            const firstEmpty = otpValues.findIndex(val => val === '');
            if (firstEmpty !== -1 && firstEmpty !== index) {
              refs.current[firstEmpty]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  input: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default CustomOtpInput;
