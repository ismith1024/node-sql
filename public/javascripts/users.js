$(function() {
    var insertUsersIntoDOM = function(users) {
		
		console.log('insert users into dom');
		console.log(users);
		$(".usersArea").replaceWith('<div class="usersArea">Available users: </div>');
		
		var i;
		for (i=0; i < users.length; i++){
			console.log("Adding user " + users[i].Client);
			console.log(users[i]);
            $(".usersArea").append('<li>' + users[i].Client + '</li>');
		}
		
    }

    var getAndListUsers = function() {
        $.getJSON("/getUsers", insertUsersIntoDOM);
    }

    getAndListUsers();
});