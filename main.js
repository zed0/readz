var WPM = 300;
var speed = 60000/WPM;
var paused = true;
var current_word = 0;
var strings = '';
var in_quote = false;

$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}
	else{
		return results[1] || 0;
	}
}

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
	if(string.slice(0,1) == '"')
	{
		in_quote = true;
	}
	if(in_quote)
	{
		$('#reader').css('color', 'skyblue');
	}
	else
	{
		$('#reader').css('color', 'white');
	}
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
	if(string.slice(-1) == '"')
	{
		in_quote = false;
	}
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
		$('#start').val(current_word);
		if(!paused)
		{
			window.setTimeout(repeater, speed);
		}
	}
}

$().ready(function(){
	strings = reader_text.split(/[ (\n)]+/)

	$('#size').on('input change keyup', function(){changeSize();});
	$('#speed').on('input change keyup', function(){changeSpeed();});

	if($.urlParam('start')>0)
	{
		current_word = $.urlParam('start');
		print_word(strings[current_word]);
	}
	else
	{
		print_word('SPACE');
		$('#front').prepend('Focus on the red letter and press ');
		$('#back').append(' to start and pause/unpause');
	}
	if($.urlParam('url'))
	{
		$('#url').val(decodeURIComponent($.urlParam('url')));
	}
	if($.urlParam('start'))
	{
		$('#start').val($.urlParam('start'));
	}

	$(document).keydown(function(e){
		if(e.keyCode == 32) //space
		{
			paused = !paused;
			if(!paused)
			{
				window.setTimeout(repeater, speed);
			}
		}
		if(e.keyCode == 37) //left
		{
			current_word-=2;
			while(
				current_word >= 0
				&& strings[current_word].slice(-1).match(/[\.\?\!]/) === null
			)
			{
				current_word--;
			}
			if(current_word > 1)
			{
				current_word++;
			}
			else
			{
				current_word = 0;
			}
			print_word(strings[current_word]);
		}
		if(e.keyCode == 39) //right
		{
			current_word++;
			while(
				current_word < strings.length
				&& strings[current_word].slice(-1).match(/[\.\?\!]/) === null
			)
			{
				console.log(current_word);
				current_word++;
			}
			if(current_word < strings.length-1)
			{
				current_word++;
			}
			print_word(strings[current_word]);
		}
	});
});
