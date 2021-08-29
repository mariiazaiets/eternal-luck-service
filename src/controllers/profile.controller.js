const admin = require('firebase-admin');
const firestoreDb = admin.firestore();


module.exports.getUserData = async function(req, res) {
  try {
    const arrUserData = [];
    const usersRef = firestoreDb.collection('users');
    const snapshotOfUsers = await usersRef.get();
    snapshotOfUsers.forEach((doc) => {
      if (req.email === doc.data()['email']) {
        arrUserData.push({...doc.data()});
      }
    });
    console.log('User data: ', arrUserData);
    res.status(200).send(arrUserData);
  } catch (err) {
    console.log(err);
    res.send({message: err.message});
  }
};

module.exports.changeUserData = async function(req, res) {
  try {
    const objOfUser= {
      username: req.body.username,
      email: req.email,
      age: req.body.age,
    };
    const userRef = firestoreDb.collection('users').doc(req.email);
    await userRef.set(objOfUser);
  } catch (err) {
    console.log(err);
    res.send({message: err.message});
  }
};
