import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'flex-start',  // (correct prop, not 'start')
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    width: '95%',
    alignSelf: 'center',
  },
});

export default GlobalStyles;
