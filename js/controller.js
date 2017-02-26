'use strict'
const $ = require('jquery')

let model = require('./model');
// brewery.addToList()
// brewery.addToFav()

// googleMaps.addEventListener()
// googleMaps.addMarker()
// googleMaps.addInfoWindow()

// loader.showLoader()
// loader.hideLoader()   $('.list-container').fadeIn('slow');

let brewery = {


	init : function(){
		this.addEventListener();
	},


	addEventListener : function(){
		console.log(this.get)
		$('.full-page').on('click', '.full-submit', brewery.get); 
	},
    
    hideLanding : $('.full-page').addClass('hidden'),
    
    fadeInMain : $('.full-page').fadeIn('slow'),
    
    query : $('.js-postalcode').val(),

    get: function(e){
		console.log('logged brewery.get')
		// e.preventDefault();
		this.hideLanding;
		this.fadeInMain;
		this.getDataFromApi(this.query, brewery.storeData)
		//displaySearchData(); //how do I render into HTML from the view.js?
    },

    getDataFromApi : function(searchTerm, storeData) {
	    let query = {
		    key: '8ea35ba681e47e9437e67134692a65b5',
		    postalCode: searchTerm,    
	    };
	    let call = model.data.postal_search;
	    $('.spinner').show();  //When page is loading and AJAX is gathering info, loading screen is present
	    $.getJSON(call, query, this.storeData);
	},

	storeData : function(arrayResults){
		//model.data.location.push(arrayResults);
	},


}


function addMarkerToMap(lat, long, htmlMarkupForInfoWindow){
  let infowindow = new google.maps.InfoWindow();
  let myLatLng = new google.maps.LatLng(lat, long);
  let marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
    
  //Gives each marker an Id for the on click
  markerCount++;

  // Triggers click listener for infoWindow in results list
  $('.list-container').on('click', '.list-name', function(){
    let numString = $(this).attr('id');
    let num = parseInt(numString)
    google.maps.event.trigger(markers[num], 'click');

  })

    $('.favs').on('click', '.list-name', function(){
    let numString = $(this).attr('id');
    let num = parseInt(numString)
    google.maps.event.trigger(markers[num], 'click');

  })

  //Creates the event listener for clicking the marker
  //and places the marker on the map 
  google.maps.event.addListener(marker, 'click', (function(marker, markerCount) {

    return function() {
      infowindow.setContent(htmlMarkupForInfoWindow);
      infowindow.open(map, marker);
    }
  })(marker, markerCount)); 

  //Pans map to the new location of the marker
  map.panTo(myLatLng)   

}



function displaySearchData(data) {
	$('.js-list').remove(); //clearview()
	$('.sorry').remove();
	if (data === undefined){
	$('.spinner').fadeOut('slow');
	$('.list-container').fadeIn('slow');
	emptyList();
	} else {

		/******************************
		vars for renderHtmlList()
		******************************/
		addMarkerToMap(lat, lng, info);    //Adds a marker for each returned object

		$('.spinner').fadeOut('slow');           //Removes loading screen right before adding markers to make

		renderHtmlList(title, website, index)
	}
}






var button = function(clicked){
    this.onClick = clicked,
    this.click = function() {

        if (this.onClick) {
            this.onClick();
        }
    }
};



$(document).ready(function(){
	brewery.init();
  // Listener for map view 'More!' button
  $('.js-search-form').on('click', '.submit', function(e) {
    e.preventDefault(); 
    deleteMarkers();
    var query = $(this).siblings().val();
    getDataFromApi(query, displaySearchData);
  });

  // Listener for adding to list of interest
  $('.list-container').on('click', '.add', function(event){
    event.preventDefault();
    $('.favs').fadeIn('slow');
    var clone = $(this).closest('.js-list').clone().removeClass('js-list').addClass('added');;

    $('.favs').after().append(clone);
    $('.favs').find('.add').replaceWith('<button class="delete">Delete</button>')
  })

  //listener for deleting item from interest list
  $('.favs').on('click', '.delete', function(event){
    event.preventDefault();

    if ($('.favs').children().length !== 2) {
      $(this).closest('.added').detach();
      event.stopPropagation();
    } else {
      $(this).closest('.added').detach();
      event.stopPropagation();
      $('.favs').fadeOut('slow');
    }
  })

  // $(window).on('load', loading());
  $('.spinner').hide();

});




