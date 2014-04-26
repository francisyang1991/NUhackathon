
function getSchool(result)
{
  alert(result);
}

function querySchool()
{
  alert("querySchool");
  var JSONP=document.createElement("script");  
  JSONP.type="text/javascript";  
  JSONP.src="http://vazzak2.ci.northwestern.edu/schools";  
  document.getElementsByTagName("head")[0].appendChild(JSONP);  
  alert(JSONP[0].symbol);
  alert(JSONP[0].name);

}

function queryTerms()
{
  alert("queryTerms11111");
  var JSONP=document.createElement("script");  
  JSONP.type="text/javascript";  
  JSONP.src="http://vazzak2.ci.northwestern.edu/terms";  
  document.getElementsByTagName("head")[0].appendChild(JSONP);  
  //alert(JSONP[0].symbol);
  alert(JSONP[0].name);
  //console.log(JSONP[0].symbol);
  //console.log(JSONP[0].name);
  alert("finish");
}

