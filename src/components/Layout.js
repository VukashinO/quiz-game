import React, { Component } from 'react';
import {CTX} from '../Store';
import io from 'socket.io-client';

var socket;

class Layout extends Component{
    state = {
        users: []
    }
    render() {
        if(!socket) {
            socket = io(':3001')
        }
        console.log(this.users);

        return(
        <div>
        Hello
        <button onClick={() => {
            socket.emit('new-user', {name:'vuks'});
            socket.on('get users', (data) => {
                this.setState({users: data})
            })
        }}>Submit</button>
            {
                 this.state.users.map(u => <li>{u.userName}{u.id} Has joined the chat</li>)
            }
        </div>
        )
    }
}

export default Layout;