import React from 'react';
import Store from './Store';
//import Layout from './components/Layout';
import LogIn from './components/LogIn';

function App() {
    return (
        <div>
            <Store>
                <LogIn />
                {/* <Layout /> */}
            </Store>
        </div>
    )
}

export default App;