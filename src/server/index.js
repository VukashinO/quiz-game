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




//var ref = firebase.database().ref('users');
var usersRef = admin.database().ref("users");
// var adaRef = usersRef.child('ada');
// var adaFirstNameRef = adaRef.child('name/first');
// var path = adaFirstNameRef.toString();
usersRef.on('value', snapshot => {
  console.log(snapshot.val())
})
let users = [];
let connections = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){

  // connections.push(socket);
  // console.log('Connected: sockets connected', connections.length);
  // console.log(socket.id);
  // console.log({
  //   name:'vukashin',
  //   id: socket.id
  // });



  //disconnect
  socket.on('disconnect', (data) => {
    users.splice(users.indexOf(socket.id), 1);
  connections.splice(connections.indexOf(socket), 1);
  console.log('Disconnected: %s sockets connected', connections.length);
  console.log(users);
  updateUserNames();
  })

  socket.on('new-user', (data) => {
    users.push({
      userName: socket.userName = data.name,
      id: socket.id
    })
    updateUserNames();
  })

});

function updateUserNames() {
  axios.get('https://swapi.co/api/people/1')
  .then(r => io.sockets.emit('get users', r.data));
}

http.listen(3001, function(){
  console.log('listening on *:3001');
});