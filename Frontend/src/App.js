<<<<<<< HEAD
import { useEffect } from 'react';
import './styles/App.css';
=======
>>>>>>> development
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
<<<<<<< HEAD
=======
import { useEffect } from 'react';
>>>>>>> development

const App = () => {
  useEffect(() => {
    (async () => {
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
