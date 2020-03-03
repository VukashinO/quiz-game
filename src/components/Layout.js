import React from 'react';
import {CTX} from '../Store';

const Layout = () => {
    const {allChats, sendChatAction} = React.useContext(CTX);
    console.log(allChats);
    return <div>
        Hello
        <button onClick={() => sendChatAction('testiranje budalo')}>Test</button>
    </div>
}

export default Layout;