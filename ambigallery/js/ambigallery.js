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
			strength: .7
		} , options);

		
		//Get the gallery images
		imageChildrens = this.children();

		//Wrap the images into a special container
		this.append('<div id="ambilight-images-wrapper"></div>');
		$("#ambilight-images-wrapper").append(imageChildrens);

		//Append the background mask
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
			window.setTimeout(function(){ 
				//Fade out the current element
				$(current).fadeOut(fadeSpeed);
				$(images[item]).fadeIn(fadeSpeed);
			},100);
		}

		
		//Add ambilight effect to the background mask
		function processAmbilight(image,gradients){
			$("#ambilight-bgdmask").hide();
			var imgName = $(image).attr('src');
			var imgWidth = $(image).width();
			var imgHeight = $(image).height();
			//Get the background canvas context
			var canvas = document.getElementById('ambilight-bgdmask');
			canvas.width = 1200;
			canvas.height = 800;
			var context = canvas.getContext('2d');
			//Set the Global Composite Operation
			context.globalCompositeOperation = 'destination-atop';
			//Add the background image to the canvas
			var img = new Image();
			img.onload = function(){
				context.drawImage(img,0,0,1200,800);
			}
			img.src = 'css/mask2.png';
			//Set the gradient

			var left = getPicGradient(image,'vertical','left');
			context.fillStyle = left;
			context.rect(0,0,200,800);//left
			context.fill();

			var right = getPicGradient(image,'vertical','right');
			context.fillStyle = right;
			context.rect(1000,0,200,800);//right
			context.fill();

			var top = getPicGradient(image,'horizontal','top');
			context.fillStyle = top;
			context.rect(0,0,1200,200);//top
			context.fill();

			var bottom = getPicGradient(image,'horizontal','bottom');
			context.fillStyle = bottom;
			context.rect(0,600,1200,200);//bottom
			context.fill();

			canvas.style.webkitFilter = "blur(20px)";
			$("#ambilight-bgdmask").fadeIn();
		}



		//Function used to get the gradient of an image within the desired direction.
		function getPicGradient(image,direction,part){
			var canvas = document.getElementById('ambilight-canvas-processor');
			//Get the width and height of the image and set it to the canvas
			var width = $(image).width();
			var height = $(image).height();
			//Set it to the canvas
			$(canvas).width = width;
			$(canvas).height = height;
			//Append the image to the canvas -> Within the context
			var context = canvas.getContext('2d');
			var img = new Image();
			img.onload = function (){
				canvas.width = width;
				canvas.height = height;
				context.drawImage(img,0,0,width,height);
			}
			img.src = $(image).attr('src');
			//Image is appended, Create a gradient object and return it. Check to see if we are going vertical or horizontal
			if(direction === 'vertical'){
				var gradient = context.createLinearGradient(0,0,0,height);
			} else {
				var gradient = context.createLinearGradient(0,0,width,0);
			}
			var offset;
			if(part === 'left'){ offset = 10; } 
			else if(part === 'right') { offset = width - 10; }
			else if(part === 'top') { offset = 10;  }
			else if(part === 'bottom') { offset = height - 10;}
			//Set the number of stops to 10
			var multiplier = height / 10;
			var step = multiplier / 2;
			for(i=1;i<11;i++){
				//Get the image data from the canvas pic and create the gradient
				if(part === 'left' || part === 'right'){
					var imgData = context.getImageData(offset,step,1,1);
				} else {
					var imgData = context.getImageData(step,offset,1,1);
				}
				
				imgData = imgData.data;
				//Add the gradient stop
				gradient.addColorStop(i/10, 'rgb('+imgData[0]+','+imgData[1]+','+imgData[2]+')');
				step += multiplier;
			}
			//Return the gradient information
			if(gradient){
				return gradient;
			} else {
				return false;
			}
		}

	}
}(jQuery));

