// import React, { Component } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import * as firebase from "firebase";

// const firebaseConfig = {
//     apiKey: "AIzaSyBVeLoQK4L7A1SlP15fbQwZ29ca2zmwSX0",
//     authDomain: "quiz-d5aff.firebaseapp.com",
//     databaseURL: "https://quiz-d5aff.firebaseio.com",
//     projectId: "quiz-d5aff",
//     storageBucket: "quiz-d5aff.appspot.com",
//     messagingSenderId: "441441350704",
//     appId: "1:441441350704:web:9c0e6ebf9545705af6e9f5",
//     measurementId: "G-VLYG14F1W0"
//   };

  //firebase.initializeApp(firebaseConfig);
//const userRef = admin.database().ref("/users/")
// const dataBase = firebase.database().ref("/users/");
// var socket;

// class Layout extends Component{
//     state = {
//         users: [],
//         userName: ''
//     }
//     componentDidMount() {
        // axios.get('https://quiz-d5aff.firebaseio.com/users/' +
        // '.json?auth=pUF1Z9D3WREHQ0APtuOcLMab4p3ok21dIdHvZPbP')
        // .then(res => {
        //     let arr = []
        //     for (const key in res.data) {
        //         arr.push(res.data[key])
        //     }
        //     this.setState({users: arr})
        // });
        // dataBase.limitToFirst(2).on('value' , snapshot => {
        //     console.log(snapshot.val())
        // })
    //     dataBase.orderByChild("userName").equalTo('dejan').on('value' , snapshot => {
    //         if(!snapshot.val()) return;
    //         let string = Object.values(snapshot.val()).map(u => u.userName)[0];
    //         this.setState({userName : string})
    //     })
    // }
    // render() {
    //     if(!socket) {
    //         socket = io(':3001')
    //     }

    //     return(
    //     <div>
    //     Hello
    //     <button onClick={() => {
    //         socket.emit('new-user', {name:'vuks'});
    //         socket.on('get users', (data) => {
    //             this.setState({users: data})
    //         })
    //     }}>Submit</button>
    //         {
                // this.state.users.map(u => <li>{u.userName}{u.id} Has joined the chat</li>)
//             }
//             <h1>Hello {this.state.userName}</h1>
//         </div>
//         )
//     }
// }

// export default Layout;