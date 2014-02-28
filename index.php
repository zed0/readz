<?php
	if(isset($_GET['url']))
	{
		$text = file_get_contents($_GET['url']);
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	</head>
	<body>
		<div id="reader">
			<?php echo($text); ?>
		</div>
	</body>
</html>
