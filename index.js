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
		keywords=$('#search').val();
		search();
	});

	$("#search").keypress(function(e) {
	  if(e.keyCode == 13)
	     {
	         e.preventDefault();
	         keywords=$('#search').val();
	         $(this).autocomplete('close');
			 search();
	         
    	 }


     	else{
     		if (e.keyCode >=0 && e.keyCode<255)
				{
				var string;	
				var c = String.fromCharCode(e.which);
				if ($('#search').val() != ''){
					string += c;
				}
				
				
				$('#search').attr('value',string);
				keywords=$('#search').val();		
		         e.preventDefault();
		         console.log("search_value is "+$('#search').val());
				console.log("The text is "+c);
		        // $(this).autocomplete('close');
				 search();
			    }      		
     		}
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
	$(course).remove();
	//$(x).hide();
	var id = $(course).attr('id');
	console.log("calcel ID  "+id);
	$("#calendar").weekCalendar('removeEvent', id);
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

function addCourseDownwardsCalendar(x){
	var panel = $(".courselist");
	var course = $(x).parent();

	if (!course.prop('enroll'))
	{
		//console.log(course.attr('catalog_num'));
		var to_append = '<div class = "preview-classes" id=previewChunk'+course.attr('id')+'>'+'<button style = "float:right;" onclick = "cancelCourse(this)">X</button>'
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

function enroll(x){

	addCourseDownwardsCalendar(x);
	
	var course = $(x).parent();
	var status = course.prop('enroll');
	course.prop('enroll',!status);
	if(course.prop('enroll')){
		$(x).prop('class', 'huge collapse icon');
	}
	else $(x).prop('class', 'huge expand icon');
	// var course = $('#'+$(x).parent().id);
	// console.log($(x).parent().attr('id'));
	
	console.log("x is "+x);
	
	var day = $(x).parent().attr('days');
	var starttime = $(x).parent().attr('start');
	var endtime = $(x).parent().attr('end');
	console.log(starttime);
	console.log(starttime[0]+starttime[1]);
	console.log(endtime);

	var n = day.length/2;
	console.log(day);
	var date = new Array(n);
	for(var j = 0; j < n; j++){
		switch(day[2*j+1]){
			case "o": 
				date[j] = 21;
				break;
			case "u": 
				date[j] = 22;
				break;
			case "e": 
				date[j] = 23;
				break;
			case "h": 
				date[j] = 24;
				break;
			case "r": 
				date[j] = 25;
				break;
			case "a": 
				date[j] = 26;
				break;
			default: 
				date[j] = 27;
				break;
		}		
	}
	//console.log(date);
	//console.log("catalog_num :" +course.attr('catalog_num'));
	var tempChunkId = 'previewChunk'+course.attr('id');
	for(var j = 0; j < n; j++){
		if($(x).parent().prop('enroll')){
			
			NewEvent = {
	              // "id":$(x).parent().prop('id')*(j+1),
	              	"id":tempChunkId,
	               "start": new Date(2014, 3, date[j], starttime[0]+starttime[1],starttime[3]+starttime[4]),
	               "end": new Date(2014, 3, date[j], endtime[0]+endtime[1],endtime[3]+endtime[4]),
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

var search_result =[];
var keywords;
function search(){
/* 	alert(keywords); */
	search_result.length=0;
	$('#body').empty();
	var flag=new Array(100000);
	for( var y = 0;y<flag.length;y++){
		flag[y]= 0;
	}
	//console.log(flag.length);
	//console.log('length 0'+search_result.length);
	if(1){
		for( var i =0;i<all_courses.length;i++){
			if(all_courses[i].title.indexOf(keywords)!==-1&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				continue;
			}
			if(all_courses[i].instructor.name.indexOf(keywords)!==-1&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
			if(all_courses[i].subject.indexOf(keywords)!==-1&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
			if(all_courses[i].catalog_num.indexOf(keywords)!==-1&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
			if(all_courses[i].room.indexOf(keywords)!==-1&&flag[all_courses[i].id]===0){
				flag[all_courses[i].id] =1;
				search_result.push(all_courses[i]);
				
				continue;
			}
		}
	}
	else{
		console.log("not all course");
		for( var i =0;i<courses.length;i++){
			if(courses[i].title.indexOf(keywords)!==-1&&flag[courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				continue;
			}
			if(courses[i].instructor.name.indexOf(keywords)!==-1&&flag[courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
			if(courses[i].subject.indexOf(keywords)!==-1&&flag[courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
			if(courses[i].catalog_num.indexOf(keywords)!==-1&&flag[courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
			if(courses[i].room.indexOf(keywords)!==-1&&flag[courses[i].id]===0){
				flag[courses[i].id] =1;
				search_result.push(courses[i]);
				
				continue;
			}
		}		
		
	}
	//console.log('length'+search_result.length);

	for (var i =0;i<search_result.length;i++){
			// var to_append = '<section class ="ui segment" enroll = "false" days = '+search_result[i].meeting_days +' start ='
			// +search_result[i].start_time+' end ='+search_result[i].end_time+' id ='+search_result[i].class_num+ ' catalog_num = '+search_result[i].catalog_num+'>'
			// +'<i class="huge expand icon" onclick = "enroll(this)" style = "float:right"></i>'+'<h3>'
			// +search_result[i].catalog_num+" "+search_result[i].title+'<h3>'+'<p>'+"Instructor: "+search_result[i].instructor.name+'</p><p>'
			// +"Seats Available: "+search_result[i].seats+'</p><p>'+"Room: " +search_result[i].room+'</p><p>'+search_result[i].start_time+' to '+search_result[i].end_time+"  "+search_result[i].meeting_days+' </p></section>';
			// $("#body").append(to_append);
			appendtobody(search_result[i]);
		}

		//console.log('go!');

	// return search_result;
}


function getRandomColor() {
    var letters = '0123456789'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
}









