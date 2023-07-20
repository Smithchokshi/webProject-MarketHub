import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import { handleChatList } from './redux/actions/chatActions';

const App = () => {
  useEffect(() => {
    (async () => {
      console.log('facebook');
      await store.dispatch(loadUser());
    })();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
