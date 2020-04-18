import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import * as commonFncs from './components/common/functions';
//import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS } from './components/common/privateConsts';
import { checkAppVersion } from './components/common/functions';

checkAppVersion();
ReactGA.initialize(GOOGLE_ANALYTICS);

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

history.listen(({ pathname }) => {
  setTimeout(() => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
    commonFncs.sendClientOpeLog("change page");
  }, 1000);
});

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window["initialReduxState"];
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement);

//registerServiceWorker();
unregister();