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
			topmask:true,
			bottommask:true,
			leftmask:true,
			rightmask:true
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

		//Get the gallery length
		galleryLength = imageChildrens.length;

		/* ------------- DEBUG LINE -------------- */
		if(settings.debug){ console.log('Gallery Length: '+galleryLength+' images'); }

		//Iterate trough the images and show only the first one
		//First check if the gallery length is more than 0;
		if(galleryLength >=1){
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
			ambilightGallery(currentImage,imageChildrens,counter,settings.speed,settings.fadeSpeed);

		},settings.speed);

		function ambilightGallery(current,images,item,delay,fadeSpeed){
			//Fade out the current element
			$(current).fadeOut(fadeSpeed);
			$(images[item]).fadeIn(fadeSpeed);
		}

	}
}(jQuery));

