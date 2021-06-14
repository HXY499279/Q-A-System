import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import App from './App';

// import 'common/styles/reset.css'
//?引入localstorage模块
import storageUtils from './utils/storageUtils'
//?引入内存模块
import memoryUtils from './utils/memoryUtils'


memoryUtils.user = storageUtils.getUser();

ReactDOM.render(
    <HashRouter>
    {/* <React.StrictMode> */}
        <App/>
    {/* </React.StrictMode> */}
    </HashRouter>,
    document.getElementById('root')
)


