<?php

$origLink = $_GET['Link'];

if ($origLink) {
$path = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22$origLink%22%20AND%20xpath%3D%22%2F%2Fdiv%5B%40class%3D'Center'%5D%22";
//$feed = file_get_contents($path);
$userAgent = 'Googlebot/2.1 (http://www.googlebot.com/bot.html)';

// make the cURL request to 

$ch = curl_init();
curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
curl_setopt($ch, CURLOPT_URL,$path);
curl_setopt($ch, CURLOPT_FAILONERROR, true);
curl_setopt($ch, CURLOPT_AUTOREFERER, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$feed= curl_exec($ch);
// Strip Links
$feed = str_replace('</a>', '', $feed);
$feed = str_replace('<br class="clear"/>', '', $feed);
$feed = str_replace('<br/>', '', $feed);
$feed = str_replace('<p>Back to Drug Shortage Product Bulletins</p>', '', $feed);
$feed = preg_replace('/<a[^>]+href[^>]+>/', '', $feed);
$feed = str_replace('<p>Back to Drug Shortage', '', $feed);
$feed = str_replace('Product Bulletins</p>', '', $feed);
function replace_content_inside_delimiters($start, $end, $new, $source) {
return preg_replace('#('.preg_quote($start).')(.*)('.preg_quote($end).')#si', '$1'.$new.'$3', $source);
}
$feed = replace_content_inside_delimiters('<!-- Begin Related Shortages -->', '<!-- End Related Shortages -->', '', $feed);
$feed = replace_content_inside_delimiters('<!-- Begin References -->', '<!-- End References -->', '', $feed);
}

else{
$feed = "ERROR";
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
	<style type="text/css">
		body { font-family: sans-serif; }
		h1 {font-size: 1.5em;}
	</style>
	<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-capable" content="yes">
</head>
<body> 
<?php echo $feed; ?>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-3312121-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>