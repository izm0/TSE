var mainPage;
(function(mainPage) {

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
	async function predictImage() {
		
		const model = await tf.loadGraphModel('Model/tfjs/model.json');
		//load converted model+weights
		var input = tf.browser.fromPixels(document.getElementById("img")); //image
		//take input from the html element uploaded to
		input = input.reshape([-1,299,299,3]);
		input = input.toFloat();
		//resizing/changing the image data for input
		var prediction = model.predict(input);
		return prediction.data();
    };
    mainPage.predictImage = predictImage;
    
})(mainPage || (mainPage = {}));

$("#predict").click(async function(){
	console.log(mainPage);
	var prOutput = await mainPage.predictImage();
	console.log(prOutput);
	var class_names =['boston bull', 'dingo', 'pekinese', 'bluetick', 'golden retriever', 'bedlington terrier', 'borzoi',
               'basenji', 'scottish deerhound', 'shetland sheepdog', 'walker hound', 'maltese dog', 'norfolk terrier',
               'african hunting dog', 'wire-haired fox terrier', 'redbone', 'lakeland terrier', 'boxer', 'doberman',
               'otterhound', 'standard schnauzer', 'irish water spaniel', 'black-and-tan coonhound', 'cairn',
               'affenpinscher', 'labrador retriever', 'ibizan hound', 'english setter', 'weimaraner', 'giant schnauzer',
               'groenendael', 'dhole', 'toy poodle', 'border terrier', 'tibetan terrier', 'norwegian elkhound',
               'shih-tzu', 'irish terrier', 'kuvasz', 'german shepherd', 'greater swiss mountain dog', 'basset',
               'australian terrier', 'schipperke', 'rhodesian ridgeback', 'irish setter', 'appenzeller', 'bloodhound',
               'samoyed', 'miniature schnauzer', 'brittany spaniel', 'kelpie', 'papillon', 'border collie',
               'entlebucher', 'collie', 'malamute', 'welsh springer spaniel', 'chihuahua', 'saluki', 'pug', 'malinois',
               'komondor', 'airedale', 'leonberg', 'mexican hairless', 'bull mastiff', 'bernese mountain dog',
               'american staffordshire terrier', 'lhasa', 'cardigan', 'italian greyhound', 'clumber', 'scotch terrier',
               'afghan hound', 'old english sheepdog', 'saint bernard', 'miniature pinscher', 'eskimo dog',
               'irish wolfhound', 'brabancon griffon', 'toy terrier', 'chow', 'flat-coated retriever',
               'norwich terrier', 'soft-coated wheaten terrier', 'staffordshire bullterrier', 'english foxhound',
               'gordon setter', 'siberian husky', 'newfoundland', 'briard', 'chesapeake bay retriever',
               'dandie dinmont', 'great pyrenees', 'beagle', 'vizsla', 'west highland white terrier',
               'kerry blue terrier', 'whippet', 'sealyham terrier', 'standard poodle', 'keeshond', 'japanese spaniel',
               'miniature poodle', 'pomeranian', 'curly-coated retriever', 'yorkshire terrier', 'pembroke',
               'great dane', 'blenheim spaniel', 'silky terrier', 'sussex spaniel', 'german short-haired pointer',
               'french bulldog', 'bouvier des flandres', 'tibetan mastiff', 'english springer', 'cocker spaniel',
               'rottweiler'];
	var parsedData = new Array();
	prOutput.forEach(function(item, index) {
		parsedData.push({"idx":index, "item":item})
	});
	//console.log(parsedData); //unsorted results
	parsedData.sort(function(a,b) {
		if(a.item < b.item) {
			return 1;
		}			
		else if (b.item < a.item) {
			return -1;
		}
		else{
			return 0;
		}
	});
	
	console.log(parsedData); //sorted results 	
	console.log("BEST DOG");
	console.log(parsedData[0]); //top result (our best guess)
	var bestDog = class_names[parsedData[0].idx];
	var confidence = parsedData[0].item;
	$("#result").html(bestDog);
	confidence = confidence*100;
	$("#resultAcc").html("Percentage confidence = "+confidence+"%");
	console.log(bestDog);
});
$(document).ready(function(){
	console.log("ready"); 
	
});