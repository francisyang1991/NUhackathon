year = new Date().getFullYear();
month = new Date().getMonth();
day = new Date().getDate();
      
$(document).ready(function() {


   var $calendar = $('#calendar');
   var id = 10;

   $calendar.weekCalendar({
      displayOddEven:true,
      timeslotsPerHour : 1,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
      firstDayOfWeek : 1,
      businessHours :{start: 7, end: 22, limitDisplay: true },
      daysToShow : 6,
      switchDisplay: {'1 day': 1, '3 next days': 3, 'work week': 5, 'full week': 7},
      title: function(daysToShow) {
			return daysToShow == 1 ? '%date%' : '%start% - %end%';
      },
      height : function($calendar) {
         return ($(window).height() - $("h1").outerHeight() - 1)/1;
      },
      eventRender : function(calEvent, $event) {
         

            $event.css("backgroundColor", $('#'+calEvent.id).css('background-color'));
            console.log("In Demo: "+calEvent.id);
            $event.find(".wc-time").css({
               "backgroundColor" : "blue",
               "border" : "1px solid #888"
            });
         
      },
      draggable : function(calEvent, $event) {
         return 0;
      },
      resizable : function(calEvent, $event) {
         return 0;
      },
      eventNew : function(calEvent, $event) {
      },
      eventDrop : function(calEvent, $event) {
        
      },
      eventResize : function(calEvent, $event) {
      },
      eventClick : function(calEvent, $event) {
		  return;
         if (calEvent.readOnly) {
            return;
         }

         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']").val(calEvent.title);
         var bodyField = $dialogContent.find("textarea[name='body']");
         bodyField.val(calEvent.body);

         $dialogContent.dialog({
            modal: true,
            title: "Edit - " + calEvent.title,
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               save : function() {

                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
               },
               delete : function() {
                  $calendar.weekCalendar("removeEvent", calEvent.id);
                  $dialogContent.dialog("close");
               },
               cancel : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
         $(window).resize().resize(); //fixes a bug in modal overlay size ??

      },
      eventMouseover : function(calEvent, $event) {
      },
      eventMouseout : function(calEvent, $event) {
      },
      noEvents : function() {

      },
      data : function(start, end, callback) {
         callback(getEventData());
      }
   });

   function resetForm($dialogContent) {
/*       $dialogContent.find("input").val(""); */
/*       $dialogContent.find("textarea").val(""); */
   }

   function getEventData() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth();
      var day = new Date().getDate();

      return {
      	
          events : [
            
         ]
      };
   }	
});
function getRandomColor() {
    var letters = '0123456789'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
}

