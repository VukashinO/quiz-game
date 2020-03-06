var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const axios = require('axios').default;
 var admin = require("firebase-admin");

 var serviceAccount = require("./quiz-d5aff-firebase-adminsdk-rc9oa-a89ee4062d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quiz-d5aff.firebaseio.com"
});
// var firebase = require('firebase');
// firebase.initializeApp(
//   {
//     serviceAccount: './quiz-d5aff-firebase-adminsdk-rc9oa-a89ee4062d.json',
//     databaseURL: "https://quiz-d5aff.firebaseio.com"
//   }
// )




// var adaRef = usersRef.child('ada');
// var adaFirstNameRef = adaRef.child('name/first');
// var path = adaFirstNameRef.toString();
// usersRef.on('value', snapshot => {
//   console.log(snapshot.val())
// })
let users = [];
let connections = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
   const userRef = admin.database().ref("/users/")
   const user_id = userRef.push().key
   userRef.on('value', snapShot => {
    const allUsers = snapShot.val();
    socket.emit('update-users', allUsers)
  })
  socket.emit('dc-user', 'has left')
  //   id : socket.id,
  //   userName: 'dejan',
  //   age: 33
  // });
  // axios.get('https://quiz-d5aff.firebaseio.com/users/' +
  // '.json?auth=pUF1Z9D3WREHQ0APtuOcLMab4p3ok21dIdHvZPbP')
  // .then(res => console.log(res.data));
  // connections.push(socket);
  // console.log('Connected: sockets connected', connections.length);
  // console.log(socket.id);
  // console.log({
  //   name:'vukashin',
  //   id: socket.id

  socket.on('new-user',  data => {
    userRef.child(user_id).set( {...data, id: socket.id, isPlayer: false } );
      console.log(data);
      userRef.on('value', snapShot => {
        const allUsers = snapShot.val();
        console.log(allUsers);
        socket.emit('update-users', allUsers)
      })
  });

  socket.on('disconnect', () => {
    // users.splice(users.indexOf(socket.id), 1);
    // connections.splice(connections.indexOf(socket), 1);
    // console.log('Disconnected: %s sockets connected', connections.length);
    // console.log(users);
    //let u = '';
     userRef.orderByChild("id").equalTo(socket.id).on('value' , snapshot => {
       if(!snapshot.val()) {return}
      let u =  Object.keys(snapshot.val())[0];
      userRef.child(u).remove();
    })

 
    userRef.on('value', snapShot => {
      const allUsers = snapShot.val();
      socket.emit('update-users', allUsers)
      socket.emit('removed-user', 1);
    })
  });
});
    //disconnect








// function updateUserNames() {
//   axios.get('https://swapi.co/api/people/1')
//   .then(r => io.sockets.emit('get users', r.data));
// }

http.listen(3001, function(){
  console.log('listening on *:3001');
});