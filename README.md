AmbiGallery : A jQuery ambilight image gallery
===========

About: AmbiGallery jQuery image gallery is used to create interactive image gallery with the Ambilight effect ( like the Philips ambilight TV )

===========
Current version: ```0.0.1a ```

===========
Usage:

Target your gallery element simply with the ``$("#div")`` jQuery selector and add the ``.AmbiGallery();`` to it. From here, the plugin will take over everything and will create the nice effect for you.

===========

AmbiGallery current options ( with their default values ) :

- ``speed: 3000`` - The images transaction speed
- ``debug: false`` - Show or hide debug messages
- ``fadeSpeed: 1000`` - Image change fading speed
- ``topmask:true`` - Show top Ambilgiht effect
- ``bottommask:true``- Show bottom Ambilgiht effect
- ``leftmask:true``- Show leftside Ambilgiht effect
- ``rightmask:true``- Show rightside Ambilgiht effect


----------
Examples
==========

Here is some ``html`` code:

	<div id="ambigallery">
		<img src="gallery/image1.jpg">
		<img src="gallery/image2.jpg">
		<img src="gallery/image3.jpg">
	</div>


and here is the corresponding javascript code:

	$("#ambigallery").AmbiGallery();
	
If you want to set options to this, you can simply add them like this:

	$("#ambigallery").AmbiGallery({speed:3000,fadeSpeed:1500,debug:true});
	

----------------
TO DO LIST
----------------
+ Change image element to canvas
+ Create the photoshop masks
+ Add the proper gradient to the masks
+ Check browser versions compatibility
+ Drink a beer.
