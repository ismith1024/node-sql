$(function() {
	
	    var insertComponentsIntoDOM = function(components) {
		
		console.log('getComponents');
		console.log(components);
		
		$("#componentsArea").replaceWith('<div class="bom" id="componentsArea"> </div>');
		

    //}

		var i;
		var k;
		for (i=0; i < components.length; i++){
			for(k = 0; k < components[i].length; k++){
				console.log("Adding components " + components[i][k].MPN + " -- " + components[i][k].Description);
			
				$("#componentsArea").append('<li>' + components[i][k].MPN + " -- " + components[i][k].Description + '</li>');
			
			}
		}		
    }

    var getAndListComponents = function(event) {
		var contName = "" + event.data.p1;
		$("#BOMTitle").replaceWith('<div class="message_div" id="BOMTitle"><h4>Interactive BOM Viewer for '+ contName +'</h4><p></div>');
		
		var routeString = "/getComponents?id=" + contName;
		console.log("Call get components route -- " + routeString);		
        $.getJSON(routeString, insertComponentsIntoDOM);
    }
	
	var j;
	var setMenuItems = function(txt, j) {
        $("#dropDownButton").append( '<li a href="#" id="edit' + j + '">' + txt + '</li>' );
		console.log("List item edit " + j + " listener added");

    };
	
    var insertContractsIntoDOM = function(contracts) {
		
		console.log('insert projects into dom');
		console.log(contracts);
		
		$("#dropDownButton").replaceWith('<ul class="dropdown-menu" id = "dropDownButton"> </ul>' );

		var i;
		for (i=0; i < contracts.length; i++){
			console.log("Adding contract " + contracts[i].ContractNumber + " -- " + contracts[i].Description);
			setMenuItems(contracts[i].ContractNumber + " -- " + contracts[i].Description, i);
			$("#edit" + i).click({p1: contracts[i].ContractNumber}, getAndListComponents);
		//setMenuItems("this is the second change");
		}
		
		/*
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
		} */
		
    }

    var getAndListContracts = function() {
        $.getJSON("/getContracts", insertContractsIntoDOM);
    }


    getAndListContracts();
});


