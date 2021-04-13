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
		};https://www.dndbeyond.com/
		
		//console.log(fd);
		xhttp.send(fd);
	});
	async function predictImage() {
		
		const model = await tf.loadGraphModel('Model/tfjs/model.json');
		//load converted model+weights
		var input = tf.browser.fromPixels(document.getElementById("img")); //image
		//take input from the html element uploaded to
		input = input.reshape([-1,224,224,3]);
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
	var class_names =['affenpinscher', 'afghan_hound', 'african_hunting_dog', 'airedale', 'american_staffordshire_terrier', 'appenzeller', 'australian_terrier', 'basenji', 'basset', 'beagle', 'bedlington_terrier', 'bernese_mountain_dog', 'black-and-tan_coonhound', 'blenheim_spaniel', 'bloodhound', 'bluetick', 'border_collie', 'border_terrier', 'borzoi', 'boston_bull', 'bouvier_des_flandres', 'boxer', 'brabancon_griffon', 'briard', 'brittany_spaniel', 'bull_mastiff', 'cairn', 'cardigan', 'chesapeake_bay_retriever', 'chihuahua', 'chow', 'clumber', 'cocker_spaniel', 'collie', 'curly-coated_retriever', 'dandie_dinmont', 'dhole', 'dingo', 'doberman', 'english_foxhound', 'english_setter', 'english_springer', 'entlebucher', 'eskimo_dog', 'flat-coated_retriever', 'french_bulldog', 'german_shepherd', 'german_short-haired_pointer', 'giant_schnauzer', 'golden_retriever', 'gordon_setter', 'great_dane', 'great_pyrenees', 'greater_swiss_mountain_dog', 'groenendael', 'ibizan_hound', 'irish_setter', 'irish_terrier', 'irish_water_spaniel', 'irish_wolfhound', 'italian_greyhound', 'japanese_spaniel', 'keeshond',
'kelpie', 'kerry_blue_terrier', 'komondor', 'kuvasz', 'labrador_retriever', 'lakeland_terrier', 'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese_dog', 'mexican_hairless', 'miniature_pinscher', 'miniature_poodle', 'miniature_schnauzer', 'newfoundland', 'norfolk_terrier', 'norwegian_elkhound', 'norwich_terrier', 'old_english_sheepdog', 'otterhound', 'papillon', 'pekinese', 'pembroke', 'pomeranian', 'pug', 'redbone', 'rhodesian_ridgeback', 'rottweiler', 'saint_bernard', 'saluki', 'samoyed', 'schipperke', 'scotch_terrier', 'scottish_deerhound', 'sealyham_terrier', 'shetland_sheepdog', 'shih-tzu', 'siberian_husky', 'silky_terrier', 'soft-coated_wheaten_terrier', 'staffordshire_bullterrier', 'standard_poodle', 'standard_schnauzer', 'sussex_spaniel', 'tibetan_mastiff', 'tibetan_terrier', 'toy_poodle', 'toy_terrier', 'vizsla', 'walker_hound', 'weimaraner', 'welsh_springer_spaniel', 'west_highland_white_terrier', 'whippet', 'wire-haired_fox_terrier', 'yorkshire_terrier'];
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
	console.log(class_names); 
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