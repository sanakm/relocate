// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
// $(function() {
//   function prepareResultsArea() {
//     $("#results").empty();
//     $("#results").show();
//   }

//   // function displayCity(city) {
//   //   $("<div class ='well'>").append("<strong>City Name: </strong>" + city.name + ', ' + city.country + "<br>" + city.general_info1 + "<br> <strong>Happiness Rating: </strong> " + city.happiness_rating).appendTo("#results")
//   // }

//   function listCities() {
//     prepareResultsArea();
//     $("<h3> All Cities </h3>").appendTo("#results");
//     $.getJSON("/app", function(cities) {
//       $.each(cities, function(idx, city) {
//         displayCity(city);
//       });
//     });
//     }
//     function displayControl(){
//       $("#controlArea").children().hide();
//       $("#results").hide();

//       if ($(this).data('target') === 'listFunction') {
//         listCities();
//       } else {
//         $('#' + $(this).data('target')).show();
//       }
//     }
//     $('#listCities').on('click', displayControl);
//     });

// // listCities will be arrow in html, not button
$(function() {
  function prepareResultsArea() {
    $("#results").empty();
    $("#results").show();
    
  }

  function displayContact(contact) {
    $("<div class ='well'>").append("<strong>Name: </strong>" + contact.first_name + ' ' + contact.last_name + "<br> <strong>Email: </strong> " + contact.email + "<br> <strong>Phone: </strong> " + contact.phone_number).appendTo("#results")
  }

  function listContacts() {
    prepareResultsArea();
    $('<h3 style="color:grey;"> All Cities </h3>').appendTo("#results");

    $.getJSON("/contacts", function(contacts) {
      $.each(contacts, function(idx, contact) {
        displayContact(contact);
      });
    });
    }

  function displayControl(){
    $("#controlArea").children().hide();
    $("#results").hide();

    if ($(this).data('target') === 'listFunction') {
      listContacts();

    } else {
      $('#' + $(this).data('target')).show;
    }
  }
  $('#listContacts').on('click', displayControl);


  function toggleDivs() {
      var $inner = $("#inner");

      // See which <divs> should be animated in/out.
      if ($inner.position().left == 0) {
          $inner.animate({
              left: "-500px"
          });
      }
      else {
          $inner.animate({
              left: "0px"
          });
      }
  }

  $("button").bind("click", function() {
      toggleDivs();
  });

});

