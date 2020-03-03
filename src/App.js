import React from 'react';
import Store from './Store';
import Layout from './components/Layout';

function App() {
    return (
        <div>
            <Store>
                <Layout />
            </Store>
        </div>
    )
}

export default App;