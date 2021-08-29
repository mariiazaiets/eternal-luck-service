const admin = require('firebase-admin');
const firestoreDb = admin.firestore();

module.exports.getGames = async function(req, res) {
  try {
    const arrOfGames = [];
    const gamesRef = firestoreDb.collection('games');
    const snapshot = await gamesRef.get();
    snapshot.forEach((doc) => {
      arrOfGames.push({id: doc.id, ...doc.data()});
    });
    res.send(arrOfGames);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addToLibrary = function(req, res) {
  const objOfGame = {
    userId: req.userId,
    gameId: req.body.gameId,
  };

  const docRef = firestoreDb.collection('userGames')
      .select('gameId').where('gameId',
          '==', `${objOfGame.gameId}`);

  docRef.get().then(async function(doc) {
    if (!doc.empty) {
      res.status(200).send({
        message: 'This game has already been added to your library.'
      });
    } else {
      await firestoreDb.collection('userGames').add(objOfGame);
      res.status(200).send({message: 'Game added successfully'});
    }
  }).catch((err) => console.log('Error: ', err));
};

module.exports.getUserGames = async function(req, res) {
  try {
    const arrOfGames = [];
    const gamesRef = firestoreDb.collection('games');
    const snapshotOfAllGames = await gamesRef.get();
    snapshotOfAllGames.forEach((doc) => {
      arrOfGames.push({id: doc.id, ...doc.data()});
    });

    const arrStrOfGamesId = [];
    const userGamesRef = firestoreDb.collection('userGames');
    const snapshotOfUserGames = await userGamesRef.get();
    snapshotOfUserGames.forEach((doc) => {
      if (req.userId === doc.data()['userId']) {
        const gameId = doc.data()['gameId'];
        const game = arrOfGames.filter((x) => x.id === gameId);
        arrStrOfGamesId.push(...game);
      }
    });
    console.log('User games: ', arrStrOfGamesId);
    res.status(200).send(arrStrOfGamesId);
  } catch (err) {
    console.log(err);
  }
};

