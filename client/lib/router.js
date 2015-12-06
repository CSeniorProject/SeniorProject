if(Meteor.isClient) {
  BlazeLayout.setRoot('body');
  
  Meteor.startup(function () {
	  
	 sAlert.config({
        effect: 'scale',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
    }); 
  });
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
