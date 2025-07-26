import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import Toast from 'react-native-toast-message';
import Mystore from './src/redux/MyStore';
import { MenuProvider } from 'react-native-popup-menu';
const App = () => {
  return (
    <>
      <Provider store={Mystore}>
        <MenuProvider skipInstanceCheck>
          <MainNavigator />
          <Toast />
        </MenuProvider>
      </Provider>
    </>
  );
};

export default App;
