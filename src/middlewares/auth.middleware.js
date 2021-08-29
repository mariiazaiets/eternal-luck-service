const admin = require('firebase-admin');

function checkAuth(req, res, next) {
  console.log('Verify token');
  if (req.headers['user-token']) {
    admin.auth().verifyIdToken(req.headers['user-token'])
        .then((x) => {
          console.log('Verified token successfully');
          req.email = x.email;
          req.userId = x.user_id;
          next();
        }).catch((err) => {
          console.log('Token is invalid');
          res.status(401).send({status: err});
        });
  } else {
    res.status(401).send({status: 'Unauthorized'});
  }
}

module.exports = checkAuth;
