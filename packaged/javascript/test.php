<?php
	$json = file_get_contents('http://vazzak2.ci.northwestern.edu/schools/'); // this WILL do an http request for you
	$data = json_decode($json);
	echo "var result='$data'";
?>