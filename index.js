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

	schools = $.getJSON(url_head+'schools', function(data) {
	             schools=data;
	          });
	console.log(schools);

	subjects = $.getJSON(url_head+'subjects', function(data) {
             subjects=data;
          });
	console.log(subjects);
})





