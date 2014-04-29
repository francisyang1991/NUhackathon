var terms;
var schools;
var subjects;
var request_term = null;
var request_subject = null;
var request_school =null;
var courses = [];
var all_courses =[];
var select_flag=0;
var url_head = 'http://vazzak2.ci.northwestern.edu/';
var search_result =[];
//var keywords;
//var tempChunkId = null;
$(document).ready(function () {

	     // $(":radio").change(function(){
	     // 	var checked = $(':radio:checked')
	     // 	console.log(checked);
	     // });
	// var callbacks = $.Callbacks();
	loadData();
	setTimeout(function(){
		select_all_courses();
	},1000);

	setTimeout(function(){
		select_all_courses();
	},1000);


	// callbacks.add(loadData);
	// callbacks.add(select_all_courses);

	// callbacks.fire();
	// $('body').on('click',select_all_courses);
	$('.menu').on('click',select_courses);

	// $('input#search').quicksearch('#body section');
	// var i = 0;
	// for (var entry in terms.responseJSON) {
	// 	i++;
	// };
	// console.log(terms.readyState);
	// $(i).on('click',function(){
	// 	$(this).parent().
	$('#clearCourses').on('click',function(){


		$('#calendar').weekCalendar('clear');  

		// $(".huge .expand .icon").each(function(){
		// 	console.log(this.find($('i')));
		// 	this.find($('i')).prop('enroll',false);
		// 	this.find($('i')).attr('class','huge expand icon');
		
		// 	})
		$('.courselist').empty();
		$('.huge.collapse.icon').prop('class','huge expand icon');
			
		});
	// });

	$('#search_btn').on('click',function(){
		var keywords=$('#search').val();
		search(keywords);
	});

	$("#search").keypress(function(e) {
	  if(e.keyCode == 13)
	     {
	         e.preventDefault();
	         var keywords=$('#search').val();
	         $(this).autocomplete('close');
			 search(keywords);	         
    	 }


    //  	else{
    //  		if (e.keyCode >=0 && e.keyCode<255)
				// {
				// var string;	
				// var c = String.fromCharCode(e.which);
				// if ($('#search').val() != ''){
				// 	string += c;
				// }
				
				
				// $('#search').attr('value',string);
				// keywords=$('#search').val();		
		  //        e.preventDefault();
		  //        console.log("search_value is "+$('#search').val());
				// console.log("The text is "+c);
		  //       // $(this).autocomplete('close');
				//  search();
			 //    }      		
    //  		}
	});
	
     //s.css('background-color','red');
	
	

})


function select_all_courses(){
	for(var i=0;i <terms.length; i++){
		
			$.ajax({
                url: "http://vazzak2.ci.northwestern.edu/courses/?term="+terms[i].term_id+'&subject=EECS',
                dataType: "json",  
                // work with the response
                success: function(response) {
                	for(var x = 0;x <response.length; x++){
                		all_courses.push(response[x]);
                	}
                   
                }
            });
	} 
	
}

function choose_term(id)
{
	//alert(id);
	request_term = id;
	//console.log('request_term'+request_term);
	var name = $('#' + id).text();
	$("#terms").html(name +'<i class="dropdown icon"></i>'+' <div class="menu" id="terms_menu" style="overflow:scroll; height:150px"></div>');
	//document.getElementById("terms").innerHTML = id;
	//$('.ui.compact.menu').dropdown('set text', id);
	handle_reponse_terms(terms);
	//alert("ddd");
}

function choose_subject(id)
{
	request_subject = id;
	//console.log('request_subject'+request_subject);
	//alert("here");
	//alert("id"+id);
	var name = $('#' + id).text();
	//alert(name);
	$("#subjects").html(name +'<i class="dropdown icon"></i>'+' <div class="menu" id="subject_menu" style="overflow:scroll; height:300px"></div>');
	//document.getElementById("terms").innerHTML = id;
	//$('.ui.compact.menu').dropdown('set text', id);
	handle_reponse_subjects(subjects);
}

function choose_school(id)
{
	request_school = id;
	//console.log('request_school'+request_school);
	//alert(id);
	var name = $('#' + id).text();
	//alert(name);
	$("#schools").html(name +'<i class="dropdown icon"></i>'+' <div class="menu" id="school_menu" style="overflow:scroll; height:150px"></div>');
	//document.getElementById("terms").innerHTML = id;
	//$('.ui.compact.menu').dropdown('set text', id);
	handle_reponse_schools(schools);
}


function handle_reponse_terms(response){
	terms = response;
	//alert(response.length);
	//alert(terms[0].name);
	//alert(terms[0].term_id);
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#terms_menu" ).append( $( '<div class="item"' + 'id=' + response[i].term_id + ' onclick=choose_term("'+ response[i].term_id +'")>' + response[i].name + '</div>' ) );
	}

	//console.log(terms);
}
function handle_reponse_subjects(response){
	subjects = response;
	//alert(response[0].symbol);
	//alert(terms[0].term_id);
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#subject_menu" ).append( $( '<div class="item"' + 'id=' + response[i].symbol + ' onclick=choose_subject("'+ response[i].symbol +'")>' + response[i].symbol + '</div>' ) );
	}
	//console.log(subjects);
}
function handle_reponse_schools(response){
	schools = response;
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#school_menu" ).append( $( '<div class="item"' + 'id=' + response[i].symbol + ' onclick=choose_school("'+ response[i].symbol +'")>' + response[i].symbol + '</div>' ) );
	}
	//console.log(schools);
}

function loadData(){
	 $.ajax({
                url: "http://vazzak2.ci.northwestern.edu/terms",
                dataType: "json",  
                // work with the response
                success: function(response ) {
             
                    handle_reponse_terms(response);
                }
            });


	$.ajax({
                url: "http://vazzak2.ci.northwestern.edu/schools",
                dataType: "json",  
                // work with the response
                success: function( response ) {
             
                    handle_reponse_schools(response);
                }
            });

	$.ajax({
                url: "http://vazzak2.ci.northwestern.edu/subjects",
                dataType: "json",  
                // work with the response
                success: function( response ) {
             
                    handle_reponse_subjects(response);
                }
            });
}

function select_courses(){
	var query_address ="http://vazzak2.ci.northwestern.edu/courses/?";
	var current_term;
	//var courses =[];
	var	 flag=new Array(100000);

	if(search_result.length>0){
		if (request_term && !request_subject){
			$("#body").empty();
			for(var i =0;i<search_result.length;i++){
				for( var y = 0;y<flag.length;y++){
					flag[y]= 0;
				}
			
			
				switch(request_term){
					case '4560':
						current_term = "2014 Fall";
						break;
					case '4550':
						current_term = "2014 Summer";
						break;
					case '4540':
						current_term = "2014 Spring";
						break;
					case '4530':
						current_term = "2014 Winter";
						break;
					case '4520':
						current_term = "2013 Fall";
						break;
					case '4510':
						current_term = "2013 Summer";
						break;
					case '4500':
						current_term = "2013 Spring";
						break;
					case '4490':
						current_term = "2013 Winter";
						break;
					default:
						current_term = "2014 Spring";
						break;
				}

				console.log(flag.length);
				console.log('length 0'+search_result.length);
	
				if(search_result[i].term ===current_term&&flag[search_result[i].id]===0){
						flag[search_result[i].id] =1;
						appendtobody(search_result[i]);
				}
			}
		}

		if (request_term && request_subject){
		
			$("#body").empty();
			for( var y = 0;y<flag.length;y++){
				flag[y]= 0;
			}	
			for(var i =0;i<search_result.length;i++){
				switch(request_term){
				case '4560':
					current_term = "2014 Fall";
					break;
				case '4550':
					current_term = "2014 Summer";
					break;
				case '4540':
					current_term = "2014 Spring";
					break;
				case '4530':
					current_term = "2014 Winter";
					break;
				case '4520':
					current_term = "2013 Fall";
					break;
				case '4510':
					current_term = "2013 Summer";
					break;
				case '4500':
					current_term = "2013 Spring";
					break;
				case '4490':
					current_term = "2013 Winter";
					break;
				default:
					current_term = "2014 Spring";
					break;
				}

				//console.log(flag.length);
				//console.log('length 0'+search_result.length);

				if(search_result[i].term ===current_term&&search_result[i].subject ===request_subject&&flag[search_result[i].id]===0){
					flag[search_result[i].id] =1;
					appendtobody(search_result[i]);
				}
			}
		}

		if (!request_term && request_subject){
		
			$("#body").empty();
			for( var y = 0;y<flag.length;y++){
				flag[y]= 0;
			}
			
			
			for(var i =0;i<search_result.length;i++){
				for(var i =0;i<search_result.length;i++){
					if(search_result[i].subject ===request_subject&&flag[search_result[i].id]===1){
					appendtobody(search_result[i]);
					}
				}
			}
		}
		
	}

	else if (request_term&&request_subject){
		query_address += ("term="+request_term+"&subject="+request_subject);

		$.ajax({
	                url: query_address,
	                dataType: "json",  
	                // work with the response
	                success: function( response ) {
	             
	                    courses=response;
	                    select_flag = 1;
	                    draw_courses();
	                }
	            });
	}
	else console.log("not selected!")
}



function cancelCourse(x){
	var course = $(x).parent();

	console.log(course);
	//var day = $(x).parent().attr('days');
	var temp = course.attr("days");
	var n = temp.length/2;
	$(course).remove();
	//$(x).hide();

	for(var j = 0; j < n; j++){
		var tempChunkId = course.attr('id')+"_"+j;
		console.log("calcelCourse: "+tempChunkId);
		$("#calendar").weekCalendar('removeEvent', tempChunkId);
	}

	//var id = $(course).attr('id');
	//console.log("calcel ID  "+id);
	//$("#calendar").weekCalendar('removeEvent', id);
}

function appendtobody(crs){

	        //console.log(courses[i].title);
			var to_append = '<section class ="ui segment" enroll = "false" days = '+crs.meeting_days +' start ='
			+crs.start_time+' end ='+crs.end_time+' id ='+crs.class_num+ ' catalog_num = '+crs.catalog_num+' courseTitle = "'+crs.title+'">'
			+'<i class="huge expand icon" id = "but" onclick = "enroll(this)" style = "float:right"></i>'+'<h3>'
			+crs.catalog_num+" "+crs.title+'<h3>'+'<p>'+"Instructor: "+crs.instructor.name+'</p><p>'
			+"Seats Available: "+crs.seats+'</p><p>'+"Room: " +crs.room+'</p><p>'+crs.start_time+' to '+crs.end_time+"  "+crs.meeting_days+' </p></section>';
			$("#body").append(to_append);
			console.log(crs);
}

function draw_courses(){
	
	$("#body").empty();
		for (var i =0;i<courses.length;i++){
			// console.log(courses[i].title);
			//console.log(courses[i]);
			var to_append = '<section class ="ui segment" enroll = "false" days = '+courses[i].meeting_days +' start ='
			+courses[i].start_time+' end ='+courses[i].end_time+' id ='+courses[i].class_num+ ' catalog_num = '+courses[i].catalog_num+' courseTitle = "'+courses[i].title+'">'
			+'<i class="huge expand icon" onclick = "enroll(this)" style = "float:right"></i>'+'<h3>'
			+courses[i].catalog_num+" "+courses[i].title+'<h3>'+'<p>'+"Instructor: "+courses[i].instructor.name+'</p><p>'
			+"Seats Available: "+courses[i].seats+'</p><p>'+"Room: " +courses[i].room+'</p><p>'+courses[i].start_time+' to '+courses[i].end_time+"  "+courses[i].meeting_days+' </p></section>';
			$("#body").append(to_append);
	}

}


function changeButton(btn){
	var first_id = $(btn).parent().prop('id')
	var mothercourse = '#'+first_id.substr(12);
	$(mothercourse).prop('enroll','false');
	$(mothercourse).find('i').removeClass( "collapse" ).addClass( "expand");
	// if(course.prop('enroll')){
	// 	$(x).prop('class', 'huge collapse icon');
	// }
	// else $(x).prop('class', 'huge expand icon');
	
}

function dofordrop(x){
cancelCourse(x);
changeButton(x);
}
function addCourseDownwardsCalendar(x){
	// console.log(x.prop('id'));
	var panel = $(".courselist");
	var course = $(x).parent();
    var day = $(x).parent().attr('days');
    console.log(course.prop('enroll'));
    console.log("calendar "+day);
	if (!course.prop('enroll'))
	{
		//console.log(course.attr('catalog_num'));
		var to_append = '<div class = "preview-classes" id=previewChunk'+course.attr('id')+' days='+day+'>'+'<button id = "" style = "float:right;"' +'onclick=dofordrop(this)'+'>X</button>'
					  +'<div class = "choosenCourses" id="courses" style = "height:20px; font-size:70%;text-align:center;padding-top:5px;">'
					  +course.attr('catalog_num')+'  :'+course.attr('courseTitle')+'</div>'+'</section>';

		console.log(to_append);
		panel.append(to_append);
		//course.prop('enroll',true);

		// add preview chunk
		var test = $('#previewChunk'+course.attr('id'));
		//console.log(test);
		test.css('background-color',getRandomColor());
		test.css('color','white');
	}
	else {
		// cancelCourse(x);
		var test = $('#previewChunk'+course.attr('id'));
		test.remove();
		//course.prop('enroll',false);

	}


	
}



// $("section").each(function(){
// 	if(this.prop('enroll')) this.find($('i')).prop('class','huge collapse icon')
// 		else this.find($('i')).prop('class','huge expand icon');
// })
function getDaysInMonth(m, y) {
   //return /8|3|5|10/.test(--m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
   return new Date(y, m + 1, 0).getDate();
}

function enroll(x){
	// console.log($(x).parent());
	addCourseDownwardsCalendar(x);

	
	var course = $(x).parent();
	// console.log(course.prop('id')+"__"+course.attr('enroll'));
	var status = course.prop('enroll');
	course.prop('enroll',!status);
	if(course.prop('enroll')){
		$(x).prop('class', 'huge collapse icon');
	}
	else $(x).prop('class', 'huge expand icon');
	// var course = $('#'+$(x).parent().id);
	// console.log($(x).parent().attr('id'));
	
	//console.log("x is "+x);
	
	var day = $(x).parent().attr('days');
	console.log("enroll : "+day);
	var starttime = $(x).parent().attr('start');
	var endtime = $(x).parent().attr('end');
	console.log(starttime);
	console.log(starttime[0]+starttime[1]);
	console.log(endtime);
	var	year = new Date().getFullYear();
	var	month = new Date().getMonth();
	var	day1 = new Date().getDate();
	var a = new Date();
	console.log(a);
	console.log(year);
	console.log(month);
	console.log(day1);
	console.log(a.getDay());

	var daysInMonth = getDaysInMonth(month,year);
	console.log("daysInMonth is "+daysInMonth);
	var n = day.length/2;
	console.log(day);
	var date = new Array(n);
	var monthlist = new Array(n);

	var mondayDate = 0;
	var xx = day1 - a.getDay() + 1;
	mondayDate =  (xx < 1) ? (xx+daysInMonth):xx;
	console.log("monday is "+mondayDate);
	daysInMonth = daysInMonth +1;
	for(var j = 0; j < n; j++){
		monthlist[j] = month;
		switch(day[2*j+1]){
			case "o": 
				date[j] = mondayDate;
				break;
			case "u": 
				date[j] = getRightDate((mondayDate+1),daysInMonth);
				break;
			case "e": 
				date[j] = getRightDate((mondayDate+2),daysInMonth);
				break;
			case "h": 
				date[j] = getRightDate((mondayDate+3),daysInMonth);
				break;
			case "r": 
				date[j] = getRightDate((mondayDate+4),daysInMonth);
				break;
			case "a": 
				date[j] = getRightDate((mondayDate+5),daysInMonth);
				break;
			default: 
				date[j] = getRightDate((mondayDate+6),daysInMonth);
				break;
		}		
	}
	//console.log(date);
	//console.log("catalog_num :" +course.attr('catalog_num'));
	
	
	for(var j = 0; j < n; j++){
		var tempChunkId = 'previewChunk'+course.attr('id')+"_"+j;
		if($(x).parent().prop('enroll')){
			if (j>0 && date[j-1]> date[j])
				monthlist[j]++;;
			NewEvent = {
	              // "id":$(x).parent().prop('id')*(j+1),
	              	"id":tempChunkId,
	               "start": new Date(year, monthlist[j], date[j], starttime[0]+starttime[1],starttime[3]+starttime[4]),
	               "end": new Date(year, monthlist[j], date[j], endtime[0]+endtime[1],endtime[3]+endtime[4]),
	               "title":course.attr('catalog_num'),
	            };
	         //console.log(tempChunkId);  
			$("#calendar").weekCalendar('updateEvent',  NewEvent);	
		}
		else{
			$("#calendar").weekCalendar('removeEvent', tempChunkId);
	
		}
	}
}


function getRightDate(date,totalDays){
	if (date <= totalDays) {
		return date;
	}
	else{
		return (date-totalDays+1);
	}

}


function search(keywords){
/* 	alert(keywords); */
	search_result.length=0;
	$('#body').empty();

	var patt = new RegExp(keywords+'+',"i");

	//alert(patt.test("Data"));
	//keywords = patt;
	var flag=new Array(100000);
	for( var y = 0;y<flag.length;y++){
		flag[y]= 0;
	}

	//console.log(flag.length);
	//console.log('length 0'+search_result.length);
	if(1){
		for( var i =0;i<all_courses.length;i++){
			if(patt.test(all_courses[i].title)&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				continue;
			}
			if(patt.test(all_courses[i].instructor.name)&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
			if(patt.test(all_courses[i].subject)&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
			if(patt.test(all_courses[i].catalog_num)&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
			if(patt.test(all_courses[i].room)&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
		}
	}
	else{
		console.log("not all course");
		for( var i =0;i<courses.length;i++){
			if(patt.test(all_courses[i].title)&&flag[all_courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				continue;
			}
			if(patt.test(all_courses[i].instructor.name)&&flag[all_courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
			if(patt.test(all_courses[i].subject)&&flag[all_courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
			if(patt.test(all_courses[i].catalog_num)&&flag[all_courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
			if(patt.test(all_courses[i].room)&&flag[all_courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
		}		
		
	}
	
	for (var i =0;i<search_result.length;i++){			
			appendtobody(search_result[i]);
		}

		
}


function getRandomColor() {
    var letters = '0123456789'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
}









