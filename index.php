<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="CSS\stylesheet.css">
		<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"></script>
		<script type="module"src="JS\main.js"></script>
		
	</head>
	<body>
		<div class="header">
			<h1>Machine Learning Dog breed Identifier!</h1>
			<div class="navtop">
				<a href="#index">Home</a>
				<a href="#about">About</a>
			</div>
		</div>

		<div id="main">
		<div id="introExplanation">
			
		</div>
			<div id="IDwindow">
				<div id="leftPane">
					<div class="statContainer">
						<h2>Breed Statistics</h2>
						<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
					</div>
				</div>
				<div id="rightPane">
				<form method="post" action="" enctype="multipart/form-data" id="uploadForm">
					<div class="preview">
						<img src="" id="img"  width="224" height="224">
					</div>
					<div class="centered">
						<input name="userPhoto"type="file" id="upload">
						<input type="button" value="Upload Photo"id="submit">
					</div>
				</form>
				<input type="button" value="Predict breed" id="predict">
				<h3 class="centered">Our Model predicts that your dog is a :</h3>
				<h2 id="result">Yorkshire terrier!</h2>
				</div>
			</div>
			<div>
				<h2 id="resultAcc">Percentage confidence: xx%</h2>
			</div>
		
		</div>
		<div class="infoContainers">
			<div class="guideContainer">
			<h2 class="b">Please follow the following guidelines to improve your accuracy!</h2>
				<h3 class="guideline">1: Take a photo that has the dog as the main subject (preferably the only subject).</h3>
				<img class="egImg" src="Assets\sampleImg1.jpg"alt="image of golden retriever source:https://www.stanlyanimalclinics.com/services/dogs/breeds/golden-retriever"> 
				<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

			</div>

		</div>
		<div class="blogarea">
			<h2> DevNews! An early prototype model by Wlad and Matt is running on Azure! 20/02/21</h2>
			<img class="blogimg" src="Assets\screenshotmodel.png"> 
			<p>"Despite the lack of accuracy this is good progress and we are gaining familiarity with the different modules used for ML. We are using github and google collab notebooks to run our python cells."</p>
			<h2> DevNews 2! A prototype model by Deacon is up and detecting dogs! 02/03/21</h2>
			<img class="blogimg" src="Assets\screenshotmodel2.jpg"> 
			<p>"We have a working prototype model! It uses a pretrained model for face/dog detection, we then specify the breed list and split the incoming data to determine a breed that is most likely from them."</p>
			
		</div>
		</div>
		<div class="footer">
		<p>Developed by University of Lincoln TSE group 19 </p>
		
		</div>
	</body>
</html>