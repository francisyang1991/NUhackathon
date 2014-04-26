function querySchool()
{
    $.getJSON('http://vazzak2.ci.northwestern.edu/schools/', function(result) {  
      console.log(result);
    });
}

function queryTerms()
{
  $.getJSON('http://vazzak2.ci.northwestern.edu/terms/', function(result) {  
      console.log(result);
    });
}

function querySubjects()
{
  $.getJSON('http://vazzak2.ci.northwestern.edu/subjects/', function(result) {  
      console.log(result);
    });
}


