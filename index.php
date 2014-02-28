<?php
	if(isset($_GET['url']))
	{
		if(filter_var($_GET['url'], FILTER_VALIDATE_URL))
		{
			$text = file_get_contents($_GET['url']);
		}
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="main.css" />
		<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script>
			var reader_text = <?php echo(json_encode($text)); ?>
		</script>
	</head>
	<body>
		<table id="reader">
			<tr>
				<td id="front">
				</td>
				<td id="back">
			</tr>
		</table>
		<div id="controls">
			<select name="speed" id="speed">
				<option value="100">100 WPM</option>
				<option value="200">200 WPM</option>
				<option selected="selected" value="300">300 WPM</option>
				<option value="400">400 WPM</option>
				<option value="500">500 WPM</option>
				<option value="600">600 WPM</option>
				<option value="700">700 WPM</option>
				<option value="800">800 WPM</option>
			</select>
			<select name="size" id="size">
				<option value="16px">16px</option>
				<option value="18px">18px</option>
				<option selected="selected" value="24px">24px</option>
				<option value="32px">32px</option>
				<option value="48px">48px</option>
				<option value="64px">64px</option>
				<option value="128px">128px</option>
			</select>
			<form id="chooseURL" action="index.php" method="get">
				<input type="text" name="url" placeholder="Create from URL"/>
				<input type="submit" value="submit" />
			</form>
		</div>
		<script src="main.js"></script>
	</body>
</html>
