Moves = new Mongo.Collection("moves");

Moves.getOrdered = function () {
  return Moves.find({}, {
    sort: {
      index: 1
    }
  });
};

if (Meteor.isServer) {
  // Meteor.startup(function () {
	//  CodeLabels.remove({});
  // });
}
