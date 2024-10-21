import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import EmailLayout from './components/EmailLayout';


const App = () => {
  return (
    <Provider store={store}>
      <div className='main'>
        <EmailLayout />
      </div>
    </Provider>
  );
};

export default App;
