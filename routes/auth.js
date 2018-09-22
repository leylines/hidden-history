var authController = require('../controllers/authcontroller.js');

module.exports = function(app, auth, passport, nodes, nodetypes, edges, edgetypes) {

  app.get('/dashboard', auth.isLoggedIn, async function(req, res) {
    try {
      Nodes = await nodes.findAll({
        limit: 10,
        include: [{
          model: nodetypes,
          required: true
        }],
        order: [
          ['updatedAt', 'DESC']
        ]
      });
      Edges = await edges.findAll({
        limit: 10,
        include: [
          { model: edgetypes, required: true},
          { model: nodes, as: 'sourceId', required: true, include: [{ model: nodetypes, required: true }] },
          { model: nodes, as: 'destinationId', required: true, include: [{ model: nodetypes, required: true }] }
        ],
        order: [
          ['updatedAt', 'DESC']
        ]
      });
      authController.dashboard(req, res, Nodes, Edges);
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true
    })
  );

  app.get('/signup', authController.signup);
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup',
      failureFlash: true
    })
  );

  app.get('/', authController.index);
  app.get('/logout', authController.logout);
  app.get('/impressum', authController.impressum);
  app.get('/gallery', authController.gallery);

  // Facebook
  app.get('/auth/facebook', passport.authenticate('facebook', {
      scope:"email"
    })
  );

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true
    })
  );

  // Google
  app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
  	    'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    })
  );

  app.get( '/auth/google/callback', passport.authenticate( 'google', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true
    })
  );

}
