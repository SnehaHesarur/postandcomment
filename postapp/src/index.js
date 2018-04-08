import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import postsAppStore from './appListingStore';

ReactDOM.render(
<Provider store={postsAppStore}>
    <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
