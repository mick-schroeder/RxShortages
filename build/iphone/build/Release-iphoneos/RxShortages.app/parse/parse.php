<?php

$target_url = $_GET['Link'];

//$target_url = "http://www.ashp.org/Import/PRACTICEANDPOLICY/PracticeResourceCenters/DrugShortages/GettingStarted/CurrentShortages/Bulletin.aspx?id=573";

$userAgent = 'Googlebot/2.1 (http://www.googlebot.com/bot.html)';

// make the cURL request to 

$ch = curl_init();curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
curl_setopt($ch, CURLOPT_URL,$target_url);
curl_setopt($ch, CURLOPT_FAILONERROR, true);
curl_setopt($ch, CURLOPT_AUTOREFERER, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$html= curl_exec($ch);
if (!$html) {	echo "cURL error number:" .curl_errno($ch);	echo "cURL error:" . curl_error($ch);	exit;}

$dom = new DOMDocument();
@$dom->loadHTML($html);
$xpath = new DOMXPath($dom);
$result = $xpath->query('//div[@class="Center"]');

foreach($result as $node) { 
	$feed .= $dom->saveXML($node);
}

// Strip Links
function replace_content_inside_delimiters($start, $end, $new, $source) { return preg_replace('#('.preg_quote($start).')(.*)('.preg_quote($end).')#si', '$1'.$new.'$3', $source); }
$feed = replace_content_inside_delimiters('<!-- Begin Related Shortages -->', '<!-- End Related Shortages -->', '', $feed);
$feed = replace_content_inside_delimiters('<!-- Begin References -->', '<!-- End References -->', '', $feed);
$feed = str_replace('</a>', '', $feed);
$feed = str_replace('<br class="clear" />', '', $feed);
$feed = str_replace('<br/>', '', $feed);
$feed = preg_replace('/<a[^>]+href[^>]+>/', '', $feed);
$feed = str_replace('Back to Drug Shortage', '', $feed);
$feed = str_replace('Product Bulletins</p>', '', $feed);
$feed = str_replace("&#13;", '', $feed);
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
