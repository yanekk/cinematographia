function move_blind(blind, left, top, width, height) {
	var element = blind[0];
	element.style.left   = left + 'px';
	element.style.top    = top + 'px';
	element.style.height = height + 'px';
	element.style.width  = width + 'px';
}

function blind(left, top, width, height) {
	var element   = $("<div>").attr("class", "_y_blind_cover").css({display : "none", background : default_color});
    move_blind(element, left, top, width, height);
	return element;
}

function compute_new_pos(original_x, original_y, event_x, event_y) {
	ret = {width : undefined, height : undefined, left : undefined, top : undefined};

	ret.left  = (event_x > original_x) ? original_x : event_x;
	ret.top   = (event_y > original_y) ? original_y : event_y;

	ret.width  = (event_x > original_x) ? (event_x - original_x) : (original_x - event_x);
	ret.height = (event_y > original_y) ? (event_y - original_y) : (original_y - event_y);

	return ret;
}

function update_items(data) {

	  move_blind(left_item, 0, data.top, data.left, data.height); // left
      move_blind(top_item, 0, 0, doc_width, data.top);  // top
      move_blind(right_item, data.left + data.width, data.top, doc_width - (data.left + data.width), data.height); // right
      move_blind(bottom_item, 0, data.top + data.height, doc_width, doc_height - (data.top + data.height)); // bottom

}

var default_color;
var top_item, left_item, right_item, bottom_item;
var body, doc, doc_width, doc_height;

function addBlinds(opacity, color) {
  opacity = parseFloat(opacity) > 1.0 ? 1.0 : parseFloat(opacity);
  default_color = color;
  var body = $('body');
  var doc  = $(document);

  doc_width  = doc.width();
  doc_height = doc.height();

	var item = $("<div>").attr({id : '_y_blind_cover'}).css(
	{
		height: doc_height,
		width: doc_width,
	});

  top_item    = blind(0,0,0,0).prependTo('body');
  left_item   = blind(0,0,0,0).prependTo('body');
  right_item  = blind(0,0,0,0).prependTo('body');
  bottom_item = blind(0, 0, doc_width, doc_height).prependTo('body'); // covers whole screen at the beggining
  $('._y_blind_cover').fadeTo("fast", opacity).click(removeBlinds);

	var blindIsActive  = false;

	var original_x = undefined;
	var original_y = undefined;

	item.mousedown(function(event){
		blindIsActive = true;
		original_x = event.pageX;
		original_y = event.pageY;

		new_pos = compute_new_pos(original_x, original_y, event.pageX, event.pageY);
		update_items(new_pos);
	});

	item.mousemove(function(event){
		  if (blindIsActive)
		  {
	      new_pos = compute_new_pos(original_x, original_y, event.pageX, event.pageY);
  	    update_items(new_pos);
		  }
	});
	item.mouseup(function(event){
		blindIsActive = false;
		item.remove();
		new_pos = compute_new_pos(original_x, original_y, event.pageX, event.pageY);
		if(!(new_pos.width + new_pos.height)) {
		  removeBlinds();
		}
	});
  $('body').prepend(item);
}
function removeBlinds() {


	$("#_y_blind_cover").fadeTo('fast', 0.0, function(){$(this).remove()});
	$('._y_blind_cover').fadeTo('fast', 0.0, function(){$(this).remove()});

}

function toggleBlinds(opacity, color) {
	if(!$("._y_blind_cover").length) {
		addBlinds(opacity, color);
	} else {
		removeBlinds();
	}

}

function initBlinds(shortcut) {
  $(document).bind('keydown', shortcut, function() {
  		chrome.extension.sendRequest({action : "toggleBlinds"});
  });
}

jQuery(function(){
  chrome.extension.sendRequest({action: "initShortcut"});
});

