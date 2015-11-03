if(Meteor.isClient) {
  BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
  name: "homepage",
  title: "Anasayfa",
  action: function function_name() {
    BlazeLayout.render('master', {
      main: 'homepage'
    });
  }
});

FlowRouter.route('/game', {
  name: "game",
  title: "Oyun",
  action: function function_name() {
    BlazeLayout.render('master', {
      main: 'game'
    });
  }
});
