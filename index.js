var terms;
var schools;
var subjects;
var request_term;
var request_subject;
var request_school;

var url_head = 'http://vazzak2.ci.northwestern.edu/';
$(document).ready(function () {

	     // $(":radio").change(function(){
	     // 	var checked = $(':radio:checked')
	     // 	console.log(checked);
	     // });

	loadData();
	var i = 0;
	// for (var entry in terms.responseJSON) {
	// 	i++;
	// };
	// console.log(terms.readyState);
	console.log(terms);
	console.log(schools);
	console.log(subjects);


})

function choose_term(id)
{
	//alert(id);
	request_term = id;
	alert(request_term);
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
	alert(request_subject);
	//alert("here");
	//alert("id"+id);
	var name = $('#' + id).text();
	//alert(name);
	$("#subjects").html(name +'<i class="dropdown icon"></i>'+' <div class="menu" id="subject_menu" style="overflow:scroll; height:150px"></div>');
	//document.getElementById("terms").innerHTML = id;
	//$('.ui.compact.menu').dropdown('set text', id);
	handle_reponse_subjects(subjects);
}

function choose_school(id)
{
	request_school = id;
	alert(request_school);
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

	console.log(terms);
}
function handle_reponse_subjects(response){
	subjects = response;
	//alert(response[0].symbol);
	//alert(terms[0].term_id);
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#subject_menu" ).append( $( '<div class="item"' + 'id=' + response[i].symbol + ' onclick=choose_subject("'+ response[i].symbol +'")>' + response[i].symbol + '</div>' ) );
	}
	console.log(subjects);
}
function handle_reponse_schools(response){
	schools = response;
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#school_menu" ).append( $( '<div class="item"' + 'id=' + response[i].symbol + ' onclick=choose_school("'+ response[i].symbol +'")>' + response[i].symbol + '</div>' ) );
	}
	console.log(schools);
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

}


