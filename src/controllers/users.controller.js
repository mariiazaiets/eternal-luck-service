const admin = require('firebase-admin');
const firestoreDb = admin.firestore();

module.exports.getUsersData = async function(req, res) {
  try {
    const arrUsersData = [];
    const usersRef = firestoreDb.collection('users');
    const snapshotOfUsers = await usersRef.get();
    snapshotOfUsers.forEach((doc) => {
      arrUsersData.push({...doc.data()});
    });
    console.log('User data: ', arrUsersData);
    res.status(200).send(arrUsersData);
  } catch (err) {
    console.log(err);
    res.send({message: err.message});
  }
};

module.exports.addToFriends = function(req, res) {
  const objOfFriend = {
    userEmail: req.email,
    friendEmail: req.body.email,
  };

  const docRef = firestoreDb.collection('userFriends')
      .select('friendEmail').where('friendEmail',
          '==', `${objOfFriend.friendEmail}`);

  docRef.get().then(async function(doc) {
    if (!doc.empty) {
      res.status(200).send({
        message: 'This friend has already been added to your friends.',
      });
    } else {
      await firestoreDb.collection('userFriends').add(objOfFriend);
      res.status(200).send({message: 'Friend added successfully'});
    }
  }).catch((err) => console.log('Error: ', err));
};

module.exports.getUserFriends = async function(req, res) {
  try {
    const arrOfUsers = [];
    const usersRef = firestoreDb.collection('users');
    const snapshotOfAllUsers = await usersRef.get();
    snapshotOfAllUsers.forEach((doc) => {
      arrOfUsers.push({...doc.data()});
    });

    const arrStrOfFriendsId = [];
    const userFriendsRef = firestoreDb.collection('userFriends');
    const snapshotOfUserFriends = await userFriendsRef.get();
    snapshotOfUserFriends.forEach((doc) => {
      if (req.email === doc.data()['userEmail']) {
        const friendEmail = doc.data()['friendEmail'];
        const friend = arrOfUsers.filter((x) => x.email === friendEmail);
        arrStrOfFriendsId.push(...friend);
      }
    });
    console.log('User games: ', arrStrOfFriendsId);
    res.status(200).send(arrStrOfFriendsId);
  } catch (err) {
    console.log(err);
  }
};

