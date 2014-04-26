var terms;
var schools;
var subjects;
var url_head = 'http://vazzak2.ci.northwestern.edu/';

$(document).ready(function () {

	     // $(":radio").change(function(){
	     // 	var checked = $(':radio:checked')
	     // 	console.log(checked);
	     // });

	terms = $.getJSON(url_head+'terms', function(data) {
	             terms=data;
	          });
	console.log(terms);
	//alert(terms.)

	schools = $.getJSON(url_head+'schools', function(data) {
	             schools=data;
	          });
	//alert(schools.responseJSON[0].name);
	
	//alert(schools[0]);
	//alert(schools[0]);
	console.log(schools);

	subjects = $.getJSON(url_head+'subjects', function(data) {
             subjects=data;
          });
	console.log(subjects);
})





