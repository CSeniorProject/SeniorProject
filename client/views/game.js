 Template.game.helpers({

 codes: function () {
     return CodeLabels.find({}, {sort: {createdAt: -1}});
   }
 });

Template.game.onRendered(function () {
	  
	  
	  
	  $( ".item" ).draggable({
		cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        //revert: true, // bounce back when dropped
        helper: "clone", // create "copy" with original properties, but not a true clone
        cursor: "move",
        revertDuration: 0, // immediate snap
		connectToSortable: '.droppable-part',
		
		start: function(event, ui) {
            sAlert.info("You clicked button");
        }
        
		
		/*stop: function(event,ui) { 
			$('.droppable-part>a').replaceWith('<div>' + $(this).text() + '</div>'); 
		}*/

	  });
	  
	  $(".droppable-part").sortable({
	
		  connectWith : ".droppable-part",
		  
		  change: function(event, ui) {
            assert("change");
        },
        
		update: function(event, ui) {
		
			var end_pos = ui.item.index();
            var start_pos = ui.item.data('start_pos');
			var item = {};
			item.name = "Test 2";
			item.start_pos =start_pos;
			item.end_pos = end_pos;
	    
        }
 
		//cancel: '#droppable-part>div'

	  });
	  
	  $(".droppable-part").droppable({
        accept: ".items .item",
		greedy: true,
		activeClass: 'droppable-active',
        hoverClass: 'droppable-hover',
        activeClass: "ui-state-highlight",
		
        drop: function( event, ui ) {
            // clone item to retain in original "list"
            var $item = ui.draggable.clone();
            $(this).addClass('has-drop').html($item);
			($item).addClass('dropped-item');
			
			
			//sAlert.info('dropped', configOverwrite);
	
			var text = $item.text;
			
			CodeLabels.insert({
				text: text,
				createdAt: new Date() // current time
			});
			
			console.log("inserted");
        }
    });
	
	/*("#sortable").sortable({
        
    });*/
});
	
Template.game.events({

	/*"click .item": fuction(event) {
		event.preventDefault
		var text = event.target.text.value;	
	}*/
	
    /*this.$('.item').draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        //revert: "invalid", // when not dropped, the item will revert back to its initial position
        revert: true, // bounce back when dropped
        helper: "clone", // create "copy" with original properties, but not a true clone
        cursor: "move"
        , revertDuration: 0 // immediate snap
    });*/
    
   
   /*"submit .new-task": function (event) { 
     // Prevent default browser form submit
     event.preventDefault();
     // Get value from form element
     var text = event.target.text.value;
     // Insert a task into the collection
     CodeLabels.insert({
       text: text,
       createdAt: new Date() // current time
     });
   }*/
 });

 Template.Code.events({
   "click .delete": function () {
     CodeLabels.remove(this._id);
   }
 });