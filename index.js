var terms;
var schools;
var subjects;
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

function handle_reponse_terms(response){
	terms = response;
	console.log(terms);
}
function handle_reponse_subjects(response){
	subjects = response;
	console.log(subjects);
}
function handle_reponse_schools(response){
	schools = response;
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


