Template.game.helpers({

 codes: function () {
     return CodeLabels.find({}, {sort: {createdAt: -1}});
   }
 });


Template.game.events({
   "submit .new-task": function (event) {
     // Prevent default browser form submit
     event.preventDefault();

     // Get value from form element
     var text = event.target.text.value;

     // Insert a task into the collection
     CodeLabels.insert({
       text: text,
       createdAt: new Date() // current time
     });
   }
 });

 Template.Code.events({
   "click .delete": function () {
     CodeLabels.remove(this._id);
   }
 });
