$(document).ready(function(){
	console.log("ready"); 
	var Nav = $(".navtop");
	var NavHeight = Nav.position().top; //used for applying sticky to navbar
	var collapsed = false; //used for button to collapse footer
	$(window).scroll(function stick() {
		//this is called when the window is scrolled and checks the position of the navbar height
		//vs the top of the screen

			if ($(this).scrollTop() > NavHeight){
				console.log("Applying class");
				Nav.addClass("sticky");
			} else {
				Nav.removeClass("sticky");
				console.log("Removing class");
			}

		
	});
	$("#upload").click(function(){
		console.log("upload button clicked");
		
	});
	$( "#submit" ).click(function uploadImage(){
		console.log("submitted clicked");
		//form submitted with upload photo button
		var form = document.getElementById("uploadForm");
		//console.log(form);
		var fd = new FormData(form); //this is the variable that holds the current state of the form when the button is clicked.
		var xhttp = new XMLHttpRequest(); //this is how we send the request to the server with our formData(the user image)
		xhttp.open("POST","upload.php",true); //calling by POST is more secure (alternative is GET and puts binary information in the URL, yuck!)
		xhttp.onreadystatechange = function(){
		//console.log(this.readyState);
			if(this.readyState ==4 &&this.status==200){ //if the php loads successfully, giving us our destination filename etc. in responsetext
					$('#img').attr('src',xhttp.responseText); //this and innerhtml can be changed based on this data
					$('.preview img').show();
					console.log("here");
					//console.log(xhttp);
				
			};
		};
		
		//console.log(fd);
		xhttp.send(fd);
	});
});