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
		<link rel="stylesheet" href="spectrum.css" />
		<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="spectrum.js"></script>
		<script>
			var reader_text = <?php echo(json_encode($text)); ?>
		</script>
	</head>
	<body>
		<table class="reader">
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
				<option value="24px">24px</option>
				<option selected="selected" value="32px">32px</option>
				<option value="48px">48px</option>
				<option value="64px">64px</option>
				<option value="128px">128px</option>
			</select>
			<form id="chooseURL" action="index.php" method="get">
				<input type="text" name="url" id="url" placeholder="Create from URL" />
				<input type="text" name="start" id="start" value="0" />
				<input type="submit" value="Save" />
			</form>
			<input type="button" name="show-highlight" id="show-highlight" value="Colors..." />
		</div>
		<div id="highlights">
			<table id="pattern-holder">
				<tr>
					<td>Background</td>
					<td>
						<input type="text" name="background-color" id="background-color" value="0" />
					</td>
				</tr>
				<tr>
					<td>Main text</td>
					<td>
						<input type="text" name="text-color" id="text-color" value="0" />
					</td>
				</tr>
				<tr>
					<td>Focused text</td>
					<td>
						<input type="text" name="focus-color" id="focus-color" value="0" />
					</td>
				</tr>
				<tr>
					<td>Quoted text</td>
					<td>
						<input type="text" name="quote-color" id="quote-color" value="0" />
					</td>
				</tr>
				<tr>
					<th>Add Pattern</th>
					<th>Color</th>
				</tr>
			</table>
			<input type="button" name="add-highlight" id="add-highlight" value='+'/>
		</div>
		<script src="main.js"></script>
	</body>
</html>
