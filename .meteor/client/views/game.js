

Template.allMoves.helpers({
  moves: Moves.getOrdered
});

Template.game.events({
  'click .btn-start-stop': function () {
    var playState = Game.playState.get();
    if(playState === 'ready') {
      Game.start();
    } else if(playState === 'playing') {
      Game.stop();
    } else if(playState === 'finished') {
      Game.resetState();
    }
  }
});

Template.game.helpers({
  startButtonText: function () {
    var playState = Game.playState.get();
    if(playState === 'ready') {
      return 'Start';
    } else if(playState === 'playing') {
      return 'Stop';
    } else if(playState === 'finished') {
      return 'Reset';
    }
  },

  moveTypes: function() {
    return [{
      _id: "move",
      label: "MOVE"
    }, {
      _id: "turn-left",
      label: "TURN LEFT"
    }, {
      _id: "turn-right",
      label: "TURN RIGHT"
    }];
  },

  moves: Moves.getOrdered
});

Template.moveTypeItem.onRendered(function() {
  this.$(".draggable-item").draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    //revert: true, // bounce back when dropped
    helper: "clone", // create "copy" with original properties, but not a true clone
    cursor: "move",
    revertDuration: 0, // immediate snap
    connectToSortable: '.droppable-part'

  });
});

Template.game.onRendered(function() {
  var self = this;
  var $sortable = self.$('.sortable');
  $sortable.sortable({
    connectWith: ".sortable",
    update: function(event, ui) {
      var itemsToUpdate = [];
      $sortable.find('.move-item').each(function () {
        itemsToUpdate.push({
          _id: $(this).data('id'),
          index: $(this).index()
        });
      });

      Meteor.defer(function () {
        _.each(itemsToUpdate, function (item) {
          Moves.update(item._id, {
            $set: {
              index: item.index
            }
          });
        });
      });
    }
  });

  this.$(".droppable").droppable({
    accept: ".draggable-item",
    activeClass: 'droppable-active',
    hoverClass: 'droppable-hover',
    activeClass: "ui-state-highlight",

    drop: function (event, ui) {
      var id = ui.draggable.data('id');
      var label = ui.draggable.data('label');

      var newMove = {
        type: id,
        label: label,
        createdAt: new Date()
      };

      var latestItem = Moves.findOne({

      }, {
        sort: {
          index: -1
        }
      });

      if(latestItem) {
        newMove.index = latestItem.index + 1;
      } else {
        newMove.index = 0;
      }

      newMove._id = Moves.insert(newMove);

      console.log('added:', newMove);
    }
  });
  
  this.$('#target').tooltip({
    items: 'a.target',
    content: 'Drag the blocks',
    show: null, // show immediately
    open: function(event, ui)
    {
        if (typeof(event.originalEvent) === 'undefined')
        {
            return false;
        }
        
        var $id = $(ui.tooltip).attr('id');
        
        // close any lingering tooltips
        $('div.ui-tooltip').not('#' + $id).remove();
        
        // ajax function to pull in data and add it to the tooltip goes here
    },
    close: function(event, ui)
    {
        ui.tooltip.hover(function()
        {
            $(this).stop(true).fadeTo(400, 1); 
        },
        function()
        {
            $(this).fadeOut('400', function()
            {
                $(this).remove();
            });
        });
    }
});

this.$('.player').tooltip({
    items: '.player',
    content: 'Elsa wants to go to the diamond',
    show: null, // show immediately
    open: function(event, ui)
    {
        if (typeof(event.originalEvent) === 'undefined')
        {
            return false;
        }
        
        var $id = $(ui.tooltip).attr('id');
        
        // close any lingering tooltips
        $('div.ui-tooltip').not('#' + $id).remove();
        
        // ajax function to pull in data and add it to the tooltip goes here
    },
    close: function(event, ui)
    {
        ui.tooltip.hover(function()
        {
            $(this).stop(true).fadeTo(400, 1); 
        },
        function()
        {
            $(this).fadeOut('400', function()
            {
                $(this).remove();
            });
        });
    }
});

this.$('#workspace').tooltip({
    items: 'a.target',
    content: 'Drop the blocks',
    show: null, // show immediately
    open: function(event, ui)
    {
        if (typeof(event.originalEvent) === 'undefined')
        {
            return false;
        }
        
        var $id = $(ui.tooltip).attr('id');
        
        // close any lingering tooltips
        $('div.ui-tooltip').not('#' + $id).remove();
        
        // ajax function to pull in data and add it to the tooltip goes here
    },
    close: function(event, ui)
    {
        ui.tooltip.hover(function()
        {
            $(this).stop(true).fadeTo(400, 1); 
        },
        function()
        {
            $(this).fadeOut('400', function()
            {
                $(this).remove();
            });
        });
    }
});

var tooltipArgs =[
  {
	id : "action_move",
	label : "MOVE  me in one step.",
  },
  {
	id : "action_turn-left",
	label : "Turn Left me in one step.",
  },
  {
	id : "action_turn-right",
	label : "Turn right me in one step.",
  }
];

for(var i=0; i<tooltipArgs.length; i++) {
	$("#"+tooltipArgs[i].id).tooltip({
		items: "#"+tooltipArgs[i].id,
		content: tooltipArgs[i].label,
		show: null, // show immediately
		open: function(event, ui)
		{
			if (typeof(event.originalEvent) === 'undefined')
			{
				return false;
			}
			
			var $id = $(ui.tooltip).attr('id');
			
			// close any lingering tooltips
			$('div.ui-tooltip').not('#' + $id).remove();
			
			// ajax function to pull in data and add it to the tooltip goes here
		},
		close: function(event, ui)
		{
			ui.tooltip.hover(function()
			{
				$(this).stop(true).fadeTo(400, 1); 
			},
			function()
			{
				$(this).fadeOut('400', function()
				{
					$(this).remove();
				});
			});
		}
	});
}
 
for(var i=0; i<Game.images.length; i++) {
	$("#playScene").append(Game.images[i]);
}

  // this.$('.droppable').on('drop', function () {
  //   debugger
  // });
});

Template.moveItem.events({
  "click .delete": function() {
    Moves.remove(this._id);
  }
});

Template.moveItem.helpers({
  'maybeCurrentMove': function () {
    var currentMoveId = Game.currentMoveId.get();
    if(currentMoveId && currentMoveId === this._id) {
      return 'current-move';
    }
  }
});

