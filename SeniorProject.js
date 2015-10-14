if (Meteor.isClient) {
  Template.hello.onRendered(function () {
	  $( "#draggable_1" ).draggable();
	  $( "#draggable_2" ).draggable();
	  $( "#draggable_3" ).draggable();
	  $("#panel2").droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
	  
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
