$(function() {
    var insertComponentsIntoDOM = function(components) {
		
		console.log('getComponents');
		console.log(components);
		
		$(".componentsArea").replaceWith('<div class="componentsArea">Components: </div>');
		

    //}

		

		for (i=0; i < components.length; i++){
			console.log("Adding components " + components[i].MPN + " -- " + components[i].Description);
			
			$(".componentsArea").append('<li>' + components[i].MPN + " -- " + components[i].Description + '</li>');
			
		}
		
    }

    var getAndListComponents = function(cont) {
		var routeString = "/getComponents?" + cont; 
        $.getJSON(routeString, insertComponentsIntoDOM);
    }

    //getAndListComponents();
});