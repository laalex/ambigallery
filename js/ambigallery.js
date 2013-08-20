/* AmbiGallery -- Jquery Ambilight image gallery
** ---------------------------------------------
** DEVELOPMENT PLUGIN FILE =====================
** ---------------------------------------------
** Plugin Name: AmbiGallery
** Author: @AlexandruLamba
** Author URL: www.alexandru-lamba.com
** Plugin version: 0.0.1a
*/
(function ($) {
	//Plugin Start
	$.fn.AmbiGallery = function( options ){
		//Vars
		var currentImage; 
		var galleryLength;
		var counter = 0;

		//Default options
		var settings = $.extend({
			speed: 3000, //Gallery Transaction Speed
			debug: false,
			fadeSpeed: 1000,
			topmask:false,
			bottommask:false,
			leftmask:false,
			rightmask:false,
			strength: .7
		} , options);

		
		//Get the gallery images
		imageChildrens = this.children();


		//Wrap the images into a special container
		this.append('<div id="ambilight-images-wrapper"></div>');
		$("#ambilight-images-wrapper").append(imageChildrens);

		//Append the ambilight masks
		if(settings.topmask){this.append('<div id="ambilight-topmask"></div>');}
		if(settings.bottommask){this.append('<div id="ambilight-bottommask"></div>');}
		if(settings.leftmask){this.append('<div id="ambilight-leftmask"></div>');}
		if(settings.rightmask){this.append('<div id="ambilight-rightmask"></div>');}

		this.append('<canvas id="ambilight-bgdmask"></canvas>');


		//Append the canvas processor
		this.append('<canvas style="display:none;width:800px;height:400px;position:absolute;top:420px;left:0;" id="ambilight-canvas-processor"></canvas>');

		//Get the gallery length
		galleryLength = imageChildrens.length;

		/* ------------- DEBUG LINE -------------- */
		if(settings.debug){ console.log('Gallery Length: '+galleryLength+' images'); }

		//Iterate trough the images and show only the first one
		//First check if the gallery length is more than 0;
		if(galleryLength >=1){
			processAmbilight(imageChildrens[0]);
			//Iterate trough the array and hide the gallery images, without the first one
			for(i=1;i<galleryLength;i++){
				$(imageChildrens[i]).hide();
			}
		} else 
		//Show error message if the gallery is empty
		{alert('AmbiGalery cannot run if no images are set into the DIV element');}

		
		//Run the gallery
		window.setInterval(function(){
			//Set the current image
			currentImage = imageChildrens[counter];

			//Increase the counter
			counter++;

			//Reset the counter if it get's over the scope
			if(counter == galleryLength){ counter = 0; }

			//Run the gallery
			changeImages(currentImage,imageChildrens,counter,settings.speed,settings.fadeSpeed);

		},settings.speed);

		//This function swaps the images
		function changeImages(current,images,item,delay,fadeSpeed){
			//Process the ambilight sequence
			processAmbilight(images[item]);
			//Fade out the current element
			$(current).fadeOut(fadeSpeed);
			$(images[item]).fadeIn(fadeSpeed);
		}

		//Process the ambilight sequence for current image
		function processAmbilight(image){

			//We have the image object -> Put it into the canvas element and get the details.
			var canvas = document.getElementById('ambilight-canvas-processor');
			var context = canvas.getContext('2d');
			var imgObject = new Image();
		    imgObject.onload = function() {
		        context.drawImage(imgObject, 0, 0,800,400,0,0,800,400);
		    };
		    imgObject.src = $(image).attr('src');

		    //Wait for the image to be loaded to canvas
		    setTimeout(function(){
		    	//Image was added to the canvas element -> Get image data
			    imgData = context.getImageData(100,100,1,1);
			    imgData = imgData.data;
			    //We have the colors, fill the mask
			    var cvs = document.getElementById('ambilight-bgdmask');
			    var ctx = cvs.getContext('2d');

			    //Create the background ambilight effect
			    var img = new Image();
			    img.onload = function(){
			    	var w = img.width;
			    	var h = img.height;
			    	cvs.width = w;
			    	cvs.height = h;
			    	//Draw the mask
			    	ctx.drawImage(img,0,0,w,h);
			    	//Cange composite
			    	ctx.globalCompositeOperation = 'source-in';
			    	//Set the ambilight strength
			    	ctx.globalAlpha = settings.strength;
			    	//Create the gradient that get's us the ambilight effect
					var gradient = ctx.createLinearGradient(0,0,1200,800);
					//Add gradient stops
					gradient.addColorStop(0, 'rgb('+imgData[0]+','+imgData[1]+','+imgData[2]+')');
					//Set the fill style to gradient
					ctx.fillStyle = gradient;
					//Fill the entire mask
					ctx.fillRect(0, 0, 1200, 800);

			    };
			    img.src = 'css/mask2.png';


				console.log('rgb('+imgData[0]+','+imgData[1]+','+imgData[2]+',.5)');

		    },75);
		    
			
		}

	}
}(jQuery));

