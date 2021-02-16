import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

//?引入localstorage模块
import storageUtils from './utils/storageUtils'
//?引入内存模块
import memoryUtils from './utils/memoryUtils'

memoryUtils.user = storageUtils.getUser();

ReactDOM.render(
    <BrowserRouter>
    {/* <React.StrictMode> */}
        <App/>
    {/* </React.StrictMode> */}
    </BrowserRouter>,
    document.getElementById('root')
)


