import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
// import * as API from './Utils/api';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
