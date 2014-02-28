var WPM = 300;
var speed = 60000/WPM;
var paused = true;
var current_word = 0;
var strings = '';

function hl_index(string)
{
	var result = 4;
	switch(true)
	{
		case (string.length <= 1):
			result = 0;
			break;
		case (string.length <= 5):
			result = 1;
			break;
		case (string.length <= 9):
			result = 2;
			break;
		case (string.length <= 13):
			result = 3;
			break;
	}
	return result;
}

function print_word(string)
{
	var index = hl_index(string);
	var start = string.substring(0, index);
	var middle = string.substring(index, index+1);
	var end = string.substring(index+1);
	$('#front').html(start);
	var compound_string = '';
	compound_string += '<span id="middle">';
	compound_string += middle;
	compound_string += '</span><span id="end">';
	compound_string += end;
	compound_string += '</span>';
	$('#back').html(compound_string);
}

function changeSpeed()
{
	speed = 60000/$('#speed').val();
	$('#speed').blur();
}

function changeSize()
{
	$('#reader').css('font-size', $('#size').val());
	$('#size').blur();
}

var repeater = function(){
	if(current_word < strings.length)
	{
		print_word(strings[current_word]);
		current_word++;
		if(!paused)
		{
			window.setTimeout(repeater, speed);
		}
	}
}

$().ready(function(){
	$('#size').on('input change keyup', function(){changeSize();});
	$('#speed').on('input change keyup', function(){changeSpeed();});
	print_word('SPACE');
	$('#front').prepend('Focus on the red letter and press ');
	$('#back').append(' to start and pause/unpause');
	$(document).keydown(function(e){
		if(e.keyCode == 32) //space
		{
			paused = !paused;
			if(!paused)
			{
				window.setTimeout(repeater, speed);
			}
		}
	});
	strings = reader_text.split(/[ (\n)]+/)
});
