import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';
import Mystore from './src/redux/MyStore';

const App = () => {
  return (
    <>
    <Provider store={Mystore}>
      <MainNavigator />
      <Toast />
      </Provider>
    </>
  );
};

export default App;