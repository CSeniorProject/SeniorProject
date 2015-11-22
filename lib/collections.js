CodeLabels = new Mongo.Collection("codes");

if (Meteor.isServer) {
  Meteor.startup(function () {
	 CodeLabels.remove({});
	
  });
}
