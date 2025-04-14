import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Store, { reduxPersistor } from './main/store';
import Routes from './main/routes';
import Localization from './main/localization';
import Socket from './common/socket/socket';
import ThemeProvider from './common/layout/themeProvider';
import ErrorGlobalPage from './common/ui/errorGlobalPage';

import './styles/App.scss';

require('jquery/dist/jquery.slim');
require('bootstrap/dist/js/bootstrap');

const App = () => (
  <>
    <Helmet>
      <title>this is a title</title>
      <meta name="description" content="just a practice" />
    </Helmet>
    <Provider store={Store}>
      <ErrorGlobalPage>
        <ThemeProvider />
        <PersistGate
          persistor={reduxPersistor}
        >
          <Localization>
            <ToastContainer
              hideProgressBar
              position="bottom-right"
              draggable={false}
            />
            <Socket />
            <Routes />
          </Localization>
        </PersistGate>
      </ErrorGlobalPage>
    </Provider>
  </>
);

export default App;
