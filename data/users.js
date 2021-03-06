const User = require("../models/User");
const {removeMember} = require("./rooms")

let users = [];

//model:
// {
//   id: String,
//   username: String,
//   roomId: String,
//   creator: boolean,
//   rsaKeys: Objec{
//      privateKey: base64String,
//      publicKey: base64String,
//      ...
//   }
// }


function getUsers() {
  return users;
}

/**
  * @param {User} user this require a user object
*/

function addUser(user) {
  users.push(user);
}

function updateUser(user) {
  if (!getUserByUsername(user.username)) return null;
  let newUser;
  users = users.map((usr) => {
    if (usr.username === user.username && usr.roomId === user.roomId) {
      newUser = { ...usr, id: user.id };
      return newUser;
    } 
    else return usr;
  });
  return newUser;
}

function removeUser(id) {
 
  return (users = users.filter((user) => {
    if(user.id === id){
      removeMember(user.roomId)
      return false
    }
    return true
    
  }));
}

function getUserById(id) {

  return users.find((user) => user.id === id);
}

/**
 * 
 * @param {string} username
 * @param {string} roomId
 * @returns {User} returns user object
 */

function getUserByUsername(username,roomId) {
  return users.find((user) => user.username === username && user.roomId === roomId)
}

function userPOSTED({ username, roomId }) {
  return users.find(
    (user) =>
    user.roomId === roomId && user.id === null && user.username === username 
  );
}

function userExist({ username, roomId }) {
  return users.find(
    (user) =>
      user.username === username && user.id !== null && user.roomId === roomId
  );
}
function userInRoom(username,roomId){
    return users.find(
        (user) =>
          user.username === username && user.roomId === roomId
      );
}

function getUsersByRoomId(roomId){
  return users.filter(user=>user.roomId === roomId)
  
}

function removeUsersInRoom(roomId){
  users = users.filter(user=>user.roomId !== roomId)
  // console.log("users after fitering:")
  // for(let user of users){
  //   console.log("username: " + user.username + " | roomId: "+user.roomId)
  // }

}

function getUserPrivateKey(username,roomId){
  let user = users.find(user=>user.username == username && user.roomId === roomId)
  if(user) return user.rsaKeys.privateKey
    return null;
}

function isCreator(username,roomId){
  return users.find(user=>user.username === username && roomId === roomId).creator
}


function getCreator(roomId){
  return users.find(user=>user.roomId === roomId && user.creator === true)
} 

function removeUserByUsername(username,roomId){
  users = users.filter(user=>user.username !== username && user.roomId !== roomId)
}

function clearInexistUsers(){
  users = users.filter(user=>user.id !== null)
}

module.exports = {
  addUser,
  updateUser,
  getUserById,
  getUserByUsername,
  userPOSTED,
  userExist,
  removeUser,
  getUsers,
  userInRoom,
  getUsersByRoomId,
  removeUsersInRoom,
  getUserPrivateKey,
  getCreator,
  isCreator,
  removeUserByUsername,
  clearInexistUsers
};
