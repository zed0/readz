var WPM = 300;
var speed = 60000/WPM;
var paused = true;
var current_word = 0;
var strings = '';
var in_quote = false;
var text_color = '#FFFFFF';
var focus_color = '#FF0000';
var background_color = '#000000';
var quote_color = '#87CEEB';
var regexes = [];
var colors = [];
var stylesheet = document.styleSheets[0];

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
	var index = hl_index(string);
	var start = string.substring(0, index);
	var middle = string.substring(index, index+1);
	var end = string.substring(index+1);
	var compound_string = '';
	compound_string += '<span class="focus">';
	compound_string += middle;
	compound_string += '</span>';
	compound_string += end;
	$.each(regexes, function(key, value){
		if(string.match(value))
		{
			compound_string = '<span style="color: ' + colors[key] + ';">' + compound_string + '</span>';
			start = '<span style="color: ' + colors[key] + ';">' + start + '</span>';
		}
	});
	if(in_quote)
	{
		start = '<span class="quote">' + start + '</span>';
		compound_string = '<span class="quote">' + compound_string + '</span>';
	}
	$('#front').html(start);
	$('#back').html(compound_string);
	if(string.match(/.+"/))
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
	$('.reader').css('font-size', $('#size').val());
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

function setStyle(selector, rule)
{
	if (stylesheet.insertRule) {
		stylesheet.insertRule(selector + rule, stylesheet.cssRules.length);
	} else if (stylesheet.addRule) {
		stylesheet.addRule(selector, rule, -1);
	}
}

function setTextColor(color)
{
	text_color = color;
	setStyle('body', '{color: ' + color + '}');
	$('#text-color').attr('value', color);
}

function setFocusColor(color)
{
	focus_color = color;
	setStyle('.focus', '{color: ' + color + '}');
	$('#focus-color').attr('value', color);
}

function setBackgroundColor(color)
{
	background_color = color;
	setStyle('body', '{background-color: ' + color + '}');
	$('#background-color').attr('value', color);
}

function setQuoteColor(color)
{
	quote_color = color;
	setStyle('.quote', '{color: ' + color + '}');
	$('#quote-color').attr('value', color);
}

function changeHighlight(prev)
{
	var index = $(prev).attr('data');
	if($('#' + index + '-pattern').val() != '')
	{
		regexes[index] = $('#' + index + '-pattern').val();
		colors[index] = $('#' + index + '-color').spectrum("get").toHexString();
	}
}

function addHighlight()
{
	if(typeof this.num === 'undefined')
	{
		this.num = 0;
	}
	else
	{
		this.num++;
	}
	var html = '<tr><td><input type="text" id="' + this.num + '-pattern" data="' + this.num + '" /></td><td><input type="text" id="' + this.num + '-color" data="' + this.num + '" /></td></tr>';
	$('#pattern-holder').append(html);
	var current = $('#' + this.num + '-color').spectrum({
		clickoutFiresChange: true,
		color: text_color,
		change: function(color){changeHighlight(current)},
		move: function(color){changeHighlight(current)}
	});
	$('#' + this.num + '-pattern').on('input change keyup', function(){changeHighlight(this)});
}

$().ready(function(){
	strings = reader_text.split(/[ (\n)]+/)
	
	$('#show-highlight').on('click', function(){$('#highlights').toggle();});
	$('#add-highlight').on('click', function(){addHighlight();});
	addHighlight();
	$('#size').on('input change keyup', function(){changeSize();});
	$('#speed').on('input change keyup', function(){changeSpeed();});
	if($.urlParam('text-color')!=null)
	{
		setTextColor(decodeURIComponent($.urlParam('text-color')));
	}
	if($.urlParam('focus-color')!=null)
	{
		setFocusColor(decodeURIComponent($.urlParam('focus-color')));
	}
	if($.urlParam('background-color')!=null)
	{
		setBackgroundColor(decodeURIComponent($.urlParam('background-color')));
	}
	if($.urlParam('quote-color')!=null)
	{
		setQuoteColor(decodeURIComponent($.urlParam('quote-color')));
	}
	$("#text-color").spectrum({
		clickoutFiresChange: true,
		color: text_color,
		change: setTextColor,
		move: setTextColor
	});
	$("#focus-color").spectrum({
		clickoutFiresChange: true,
		color: focus_color,
		change: setFocusColor,
		move: setFocusColor
	});
	$("#background-color").spectrum({
		clickoutFiresChange: true,
		color: background_color,
		change: setBackgroundColor,
		move: setBackgroundColor
	});
	$("#quote-color").spectrum({
		clickoutFiresChange: true,
		color: quote_color,
		change: setQuoteColor,
		move: setQuoteColor
	});

	current_word = $.urlParam('start');
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
