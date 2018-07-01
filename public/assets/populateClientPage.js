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

    var getAndListComponents = function(event) {
		var contName = "" + event.data.p1;
		var routeString = "/getComponents?id=" + contName;
		//console.log(cont);
		console.log("Call get components route -- " + routeString);		
        $.getJSON(routeString, insertComponentsIntoDOM);
    }
	
    var insertContractsIntoDOM = function(contracts) {
		
		console.log('insert projects into dom');
		console.log(contracts);
		$(".projectsArea").replaceWith('<div class="projectsArea">Available projects: </div>');
		
		var i;
		for (i=0; i < contracts.length; i++){
			console.log("Adding contract " + contracts[i].ContractNumber + " -- " + contracts[i].Description);
			
            $("#projectsArea").append('<li class="comp"> <div>' + 
                                   contracts[i].ContractNumber + " : " + contracts[i].Description + " -- " + 
                                   '<button type="button"' +
				   'id="edit' + i + '">' + 'View Report</button>' + "</li>");
			console.log("Adding listener " + contracts[i].ContractNumber);				   
            $("#edit" + i).click({p1: contracts[i].ContractNumber}, getAndListComponents);
		}
		
    }

    var getAndListContracts = function() {
        $.getJSON("/getContracts", insertContractsIntoDOM);
    }

    getAndListContracts();
});
