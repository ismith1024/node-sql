function findClickTarget(e) {
	var target;
	if( window.event && window.event.srcElement ) {
		target = window.event.srcElement;
	} else if( e && e.target ) {
		target = e.target;
	}

	if( !target ) return null;

	while( target != document.body && target.nodeName.toLowerCase() != 'li' ) {
		target = target.parentNode;
	}

	if( target.nodeName.toLowerCase() != 'li' ) return null;

	return target;
}
function click(e) {
	if( window.event ) {
		window.event.cancelBubble = true;
	}
	if( e && e.stopPropagation ) {
		e.stopPropagation();
	}
	
	var target = findClickTarget(e);
	
	if( !target ) return;
	
	for( var i = 0; i < target.childNodes.length; i++ ) {
		if( target.childNodes[i].nodeName.toLowerCase() == 'ul' 
				&& (' ' + target.className + ' ').indexOf(' product ') != -1) {
			collapseNavMenu();
			target.childNodes[i].style.display = 'block';
		} else if( target.childNodes[i].nodeName.toLowerCase() == 'ul' 
				&& ( (' ' + target.childNodes[i].style.display + ' ').indexOf(' none ') != -1 ) 
				&& ( (' ' + target.className + ' ').indexOf(' bottom ') == -1 ) ) {
			expandElement( target.childNodes[i] );
		} else if( target.childNodes[i].nodeName.toLowerCase() == 'ul' 
				&& (' ' + target.className + ' ').indexOf(' bottom ') == -1 ) {
			collapseElement( target.childNodes[i] );
		}
	}
	return;
}
function expandElement( node ) {
	if( node.style.display == 'block' ) return;
	clearInterval( node.intervalID );
	node.percent = 0;
	node.style.display = 'block';
	node.savedOH = node.offsetHeight;
	node.style.display = 'none';
	node.intervalID = setInterval( function() { expandElement2(node); }, 50 );
	return;
}
function expandElement2( element ) {
	element.percent += .10;
	if( element.percent >= 1 ) {
		element.percent = 1;
		element.style.marginBottom = 0;
		element.style.opacity = 1;
		clearInterval( element.intervalID );
		return;
	}
	element.style.marginBottom = element.percent * element.savedOH - element.savedOH;
	element.style.opacity = element.percent;
	element.style.display = 'block';
}
function collapseElement( node ) {
	if( node.style.display == 'none' ) return;
	clearInterval( node.intervalID );
	node.percent = 1;
	node.savedOH = node.offsetHeight;
	node.intervalID = setInterval( function() { collapseElement2(node); }, 25 );
}
function collapseElement2( element ) {
	element.percent -= .10;
	if( element.percent <= 0 ) {
		element.percent = 0;
		element.style.marginBottom = 0;
		element.style.opacity = 1;
		element.style.display = 'none';
		clearInterval( element.intervalID );
		return;
	}
	element.style.marginBottom = element.percent * element.savedOH - element.offsetHeight;
	element.style.opacity = element.percent;
	element.style.display = 'block';
}
function expandAll() {
	if( !document.getElementsByTagName ) return;
	var all_list_items = document.getElementsByTagName( 'li' );
	for( var i = 0; i < all_list_items.length; i++ ) {
		var list_item = all_list_items[i];
		if( list_item.className && (' ' + list_item.className + ' ').indexOf(' expandable ') != -1 ) {
			for( var j = 0; j < list_item.childNodes.length; j++ ) {	
				if ( list_item.childNodes[j].nodeName.toLowerCase() == 'ul' ) {
					//expandElement( list_item.childNodes[j] );
					list_item.childNodes[j].style.display = 'block';
				}	
			}	
		}
	}
}
function collapseAll() {
	if( !document.getElementsByTagName ) return;
	var all_list_items = document.getElementsByTagName( 'li' );
	for (var i = 0; i < all_list_items.length; i++) {
		var list_item = all_list_items[i];
		if( list_item.className && (' ' + list_item.className + ' ').indexOf(' expandable ') >= 0 ) {
			for( var j = 0; j < list_item.childNodes.length; j++ ) {	
				if( list_item.childNodes[j].nodeName.toLowerCase() == 'ul' ) {
					//collapseElement( list_item.childNodes[j] );
					list_item.childNodes[j].style.display = 'none';
				}	
			}	
		}
	}
}
function setupClicks() {
	if( !document.getElementsByTagName ) return;
	var all_list_items = document.getElementsByTagName( 'li' );
	for( var i = 0; i < all_list_items.length; i++ ) {
		var list_item = all_list_items[i];
		if( list_item.className && (' ' + list_item.className + ' ').indexOf(' expandable ') != -1) {
			list_item.onclick = click;
			for( var j = 0; j < list_item.childNodes.length; j++ ) {	
				if ( list_item.childNodes[j].nodeName.toLowerCase() == 'ul' ) {
					list_item.childNodes[j].style.display = 'none';
				}	
			}	
		} else if( list_item.className && (' ' + list_item.className + ' ').indexOf(' product ') != -1 ) {
			list_item.onclick = click;
			for( var j = 0; j < list_item.childNodes.length; j++ ) {	
				if( list_item.childNodes[j].nodeName.toLowerCase() == 'ul' ) {
					var report_list = list_item.childNodes[j]
					for( var k=0; k < report_list.childNodes.length; k++ ) {
						if( report_list.childNodes[k].nodeName.toLowerCase() == 'li' ) {
							var report_item = report_list.childNodes[k];
							for( var m=0; m < report_item.childNodes.length; m++ ) {
								if( report_item.childNodes[m].nodeName.toLowerCase() == 'a' ) {
									var link = report_item.childNodes[m].getAttribute("href");
									var page = location.href;
									if( page.indexOf(link) != -1 || link == page ) {
										list_item.childNodes[j].style.display = 'block';
									}
								}
							}
						}
					}					
				}	
			}	
		}
	}
}
function collapseNavMenu() {
        if( !document.getElementsByTagName ) return;
        var all_list_items = document.getElementsByTagName('li');

        for( var i = 0; i < all_list_items.length; i++ ) {
                var list_item = all_list_items[i];
                if( list_item.className 
				&& (' ' + list_item.className + ' ').indexOf(' product ') != -1 
				&& (' ' + list_item.className + ' ').indexOf(' bom ') == -1 ) {
                        for( var j = 0; j < list_item.childNodes.length; j++ ) {
                                if( list_item.childNodes[j].nodeName.toLowerCase() == 'ul' ) {
                                        list_item.childNodes[j].style.display = 'none';
                                }
                        }
                }
        }
}
