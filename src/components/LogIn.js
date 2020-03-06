import React, { Component } from "react";
import * as firebase from "firebase";
import io from 'socket.io-client';

const firebaseConfig = {
    apiKey: "AIzaSyBVeLoQK4L7A1SlP15fbQwZ29ca2zmwSX0",
    authDomain: "quiz-d5aff.firebaseapp.com",
    databaseURL: "https://quiz-d5aff.firebaseio.com",
    projectId: "quiz-d5aff",
    storageBucket: "quiz-d5aff.appspot.com",
    messagingSenderId: "441441350704",
    appId: "1:441441350704:web:9c0e6ebf9545705af6e9f5",
    measurementId: "G-VLYG14F1W0"
  };

  firebase.initializeApp(firebaseConfig);
  const dataBase = firebase.database().ref("/users/");
  const socket = io(':3001');
class Login extends Component {
    state = {
        logIn: '',
        users: []
    }
    componentDidMount() {
        socket.on('rem-test', data => {
            console.log(data);
        })
    }
componentWillMount() {
    socket.on('rem-test', data => {
        console.log(data);
    })
}
    handleInput = event => {
       const { name, value } = event.target;
       this.setState({ [name] : value });
    }

    handleLogIn = event => {
        event.preventDefault();
        dataBase.orderByChild("userName").equalTo(this.state.logIn).on('value' , snapshot => {
                if(snapshot.val()) {
                    console.log('ima takov');
                    return;
                }
                //let string = Object.values(snapshot.val()).map(u => u.userName)[0];
                socket.emit('new-user', { name: this.state.logIn });
                socket.on('update-users', data => {
                let users = [];
                for (const key in data) {
                    users.push(data[key])
                }
                    this.setState({ users });
                    console.log(data);
                })
            })
       
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleLogIn}>
                    <input type="text" 
                        name='logIn' 
                        onChange={this.handleInput}
                        value={this.state.logIn}
                    />

                    <button>Log In</button>
                </form>

                {
                    this.state.users.map(u => <li>{u.name} is in the house</li>)
                }
            </div>
        )
    }
}

export default Login;