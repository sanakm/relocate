$(function() {
  'use strict';
  var selected_city;
  var map;
  var marker;
  window.initMap = function () {
  };

  //   $app_page = $('.app-page')

  //   $('.enter').on('click', function(e) {
  //     $app_page.addClass('load');
  // });

  var availableTags = [
    "Accounting",
    "Actuary",
    "Advertising",
    "Budget Analyst",
    "Claims Adjusters",
    "Financial Analyst/Advisor",
    "Financial Manager",
    "Financial Sales",
    "HR Manager",
    "InsuranceAgent",
    "Insurance Underwriter",
    "Real Estate Broker/Agent",
    "Comp/Info Research Scientist",
    "Computer Network Architect",
    "Computer-Control",
    "Computer Programmer",
    "Computer Science",
    "Web Developer",
    "Database Administrator",
    "Mathematician",
    "Graphic Designer",
    "Statistican",
    "Architect",
    "Carpenter",
    "Construction Worker",
    "Construction Operator",
    "Electrician",
    "Roofer",
    "Education Administrators",
    "Teacher Assistant",
    "Teacher",
    "Journalist",
    "Geographic Information System"

  ];

  $( "#tags" ).autocomplete({
    source: availableTags
  });

  var cities = []; // global

  var $jumbotron = $('.jumbotron')


  $('#submit_profession').on('click', function(e) {
   
    e.preventDefault();
    $("#city_details").html("");
    $("#map-currency").html("");

    

    var searchTerm = $("#tags").val();
    var results = $("#results");

    // clear existing results
    results.html("");
    // setTimeout(function () {
    $.ajax({
      url: "/cities",
      type: "GET"
    }).done(function(data) {
        cities = data; // set cities as global
        if (searchTerm === "Web Developer") {
            
            $(".clear").html("");
            $(".clear").append('<br></br>').fadeIn('slow');

            var sorted = data.sort(function(a,b){
                var a1=a.webdev_rating, b1=b.webdev_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            var top_five = sorted.slice(0,5);
            top_five.forEach(function(city) {

              $(".clear").append("<a class='dev_city' data-city-id='" + city.id + "'>" + city.name + "</a><p></p>").fadeIn('slow');

            });
        
        } else if(searchTerm === "Accounting") {
            $("#results").append("<p>Top 5 Cities</p>")
            var sorted = data.sort(function(a,b){
                var a1=a.accountant_rating, b1=b.accountant_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            sorted.forEach(function(city) {

              $(".jumbotron").append("<a id='accountant_city'>" + city.name + "     Accountant Rating:  " + city.accountant_rating + "</p>");
            });

        } else if(searchTerm === "Graphic Designer") {
            $(".jumbotron").append("<p>Top 5 Cities</p>")

            var sorted = data.sort(function(a,b){
                var a1=a.graphic_designer_rating, b1=b.graphic_designer_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            sorted.forEach(function(city) {
              $(".jumbotron").append("<p id='designer_city'>" + city.name + "     Graphic Designer Rating:  " + city.graphic_designer_rating + "</p>");
            });
        
        } else if(searchTerm === "Journalist") {
            $(".clear").html("");
            $(".clear").append("<p>Top 5 Cities</p>")

            var sorted = data.sort(function(a,b){
                var a1=a.journalist_rating, b1=b.journalist_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });

            var top_six = sorted.slice(0,5);

            top_six.forEach(function(city) {

            $(".clear").append("<a class='dev_city' data-city-id='" + city.id + "'>" + city.name + "</a><p></p>").fadeIn('slow');
            });
        
        } else {
            $(".clear").html("");
            $(".clear").append("<div id='database_sentence'><p>Accessing database...</p><img src='ajaxloader.gif'></div>").show('slide', {direction: 'right'}, 600);
        }
 
     });
  });

    $('.jumbotron').on('click', '.dev_city', function(e) {

        $jumbotron.addClass('horizTranslate');
        $("#map-currency").html("");
        e.preventDefault();
        var searchTerm = $("#tags").val();
        var results = $("#results");
        var current_city_id = $(this).data("city-id");
        cities.forEach(function(city) {
            if (city.id == current_city_id) {
                selected_city = city;
            }
        });
        var new_results = $("#city_details");
        new_results.html("");
        if (searchTerm === "Web Developer") {
            $("#city_details").append("<div class='middle_column'><p>" + '<p style="font-size:25px; border-bottom: 1px solid #ffdd00;">' + selected_city.name + ", " + selected_city.country +'</p>' + "</p></div>").show('slide', {direction: 'right'}, 600);
            $("#city_details").append("<div class='middle_column1' id='webdev_rating_info'><p> Web Developer Rating: " + selected_city.webdev_rating + "/10"+ "</p>").delay(600).show(0);
            $("#city_details").append("<div><p>" + selected_city.name + " Average Income for Web Developer with 0 years experience holding a Non-Degree Certificate Program is " + selected_city.webdev_avg_salary + "</p></div>");
            $("#city_details").append("<div><p>" + selected_city.general_info1 + "</p></div>").delay(600).show(0);
            $("#city_details").append("<div><a class='middle_column1' id='webdev_country_info'>Country Info</a></div><div></div>").show('slide', {direction: 'right'}, 600);
            $("#city_details").append("<a class='middle_column1' id='webdev_currency_info'>Currency Info</a><br></br>").show('slide', {direction: 'right'}, 600);
        }

        if (searchTerm === "Journalist") {
            $("#city_details").append("<div class='middle_column'><p>" + '<p style="font-size:25px; border-bottom: 1px solid #ffdd00;">' + selected_city.name + ", " + selected_city.country +'</p>' + "</p></div>").show('slide', {direction: 'right'}, 600);
            $("#city_details").append("<div class='middle_column1' id='webdev_rating_info'><p> Journalist Rating: " + selected_city.journalist_rating + "/10"+ "</p>").delay(600).show(0);
            $("#city_details").append("<div><p>" + selected_city.name + " Average Income for Journalist with 0 years experience is " + selected_city.journalist_avg_salary + "</p></div>");
            $("#city_details").append("<div><p>" + selected_city.general_info1 + "</p></div>").delay(600).show(0);
            $("#city_details").append("<div><a class='middle_column1' id='webdev_country_info'>Country Info</a></div><div></div>").show('slide', {direction: 'right'}, 600);
            $("#city_details").append("<a class='middle_column1' id='webdev_currency_info'>Currency Info</a><br></br>").show('slide', {direction: 'right'}, 600);
   }
    });


    // $('#city_details').on('click', '#webdev_rating_info', function(e) {
    //     e.preventDefault();
    //     var new_new_results = $("#map-currency");
    //     new_new_results.html("");
    //     // move webdev rating and avg income to #city details append. 10 lines above 
    // });

    $('#city_details').on('click', '#webdev_rating_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.country + " has a happines rating of " + selected_city.happiness_rating + " and " + selected_city.name + " has a family safety rating of " + selected_city.family_safety_rating + ".  " + selected_city.name + " has a cost of living rating of " + selected_city.cost_of_living + ", which, together with the city's shortage rating for your profession (" + selected_city.web_dev_shortage + "), and the city's average income of " + selected_city.webdev_average_salary + ", affects the city's " + selected_city.salary_vs_col + " and generates the city's overall rating of </p><p id='big_number'>" + selected_city.webdev_rating + "</p><p> for your profession.</p></div>");


    });

    $('#city_details').on('click', '#journalist_rating_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.name + " Average Income for Journalist with 0 years experience</p><p id='big_number'>$" + selected_city.journalist_avg_salary + "</p></div>").show('slide', {direction: 'right'}, 600);
        $("#map-currency").append("<div><p>" + selected_city.country + " has a happines rating of " + selected_city.happiness_rating + " and " + selected_city.name + " has a family safety rating of " + selected_city.family_safety_rating + ".  " + selected_city.name + " has a cost of living rating of " + selected_city.cost_of_living + ", which, together with the city's shortage rating for your profession (" + selected_city.journalist_shortage + "), and the city's average income of " + selected_city.journalist_average_salary + ", affects the city's " + selected_city.salary_vs_col + " and generates the city's overall rating of </p><p id='big_number'>" + selected_city.journalist_rating + "</p><p> for your profession.</p></div>");

    });

    $('#city_details').on('click', '#webdev_country_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + "Position: " + selected_city.gps_coordinates + "</p></div>").delay(600).show(0);
        $("#map-currency").append("<div id='map'></div>").show(0);

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: +selected_city.lat, lng: +selected_city.lng},
            zoom: 7
        });

        marker = new google.maps.Marker({
          map: map,
          position: {lat: +selected_city.lat, lng: +selected_city.lng},
          title: selected_city.name
        });
    });

    $('#city_details').on('click', '#webdev_currency_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        // $("#map-currency").append("<div><p>" + selected_city.country + " Currency Info</p></div>");
        // currency api
        var endpoint = 'live'
        var access_key = '2079b00422e43c763090dfd1c6588aa1';

        // get the most recent exchange rates via the "live" endpoint:
        $.ajax({
            url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&currencies=' + selected_city.code,   
            dataType: 'jsonp',
            success:    function(data){

            $("#map-currency").append("<div>" + String(data.quotes["USD"+selected_city.code]) + "</div>");

        }
        }); 
    });
});


