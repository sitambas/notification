//save data into localstorage
var notificationObject = { 'image': "face.jpg", 'name': "Sitambas", 'message': "posted a photo on your wall." };
// Put the object into storage
if(typeof localStorage != "undefined")
	localStorage.setItem('notificationObject', JSON.stringify(notificationObject));
var counterValue = 0;
jQuery(document).ready(function(){// Start document 
	increaseCounter() 
	counterValue = parseInt(jQuery('.bell_number').html());
	pushData();		
	function removeAnimation(){ // Remove Animation
		setTimeout(function() {
        		jQuery('.bell_number').removeClass('animating')
			}, 1000);           
		}
	function pushData(){ 
		if(typeof localStorage != "undefined")
			{
				var notificationString  = localStorage.getItem('notificationObject');
				notificationData		=	JSON.parse(notificationString); //get notification data
			}
		//get data by ajax from server
		else
			{
				notificationData		=	notificationObject;
			}
		contentText =  jQuery(".notification-struct").clone(true);
		contentText.removeClass('notification-struct');
		contentText.find(".face-noti img").attr('src', notificationData.image);
		contentText.find(".name").html(notificationData.name);
		contentText.find(".notify-con").append(notificationData.message);
		contentText.prependTo('.append-con');
	}
	function increaseCounter(){ //counter increment function 
		setTimeout(function(){
			pushData();
	    	counterValue++; // increment	
	    	jQuery('.bell_number').addClass('animating').html(counterValue); 
			jQuery('.number').html(counterValue); // append notify box number
	    	removeAnimation(); // remove animation
	      	increaseCounter();
	      	var length = jQuery('.row-noti').length;
	      		if(length == 6){
	      			jQuery('.append-con').css('max-height','360px');
	      		}
	    	},3000);
      	};
	jQuery('.notification').on('click',function(){ //on click notification open notify pop
		jQuery('.bell_number').html(0);
  		setTimeout(function(){
  			jQuery('.number').html(0);
		},1000);
		counterValue = 0;
  		jQuery('.row-noti').animate({left:'0px', opacity:1},500);
  		jQuery('.notification-wrapper').fadeToggle(100).animate({top:'47px', opacity:1},500);
  		return false;
	});
	jQuery('.notification-wrapper').on('click', function(){
    	return false;
    });
	jQuery('body').not('.notification').click( function(){ //on click notification close notify pop
		jQuery('.row-noti').animate({left:'200px', opacity:0},500);
		jQuery('.notification-wrapper').animate({top:'34px', opacity:0},500).fadeOut(100);
		jQuery('.number').html(0);
		counterValue = 0;
	});
});

