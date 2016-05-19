$(function() {

  var selected_city;
  var map;
    initMap = function () {
  };

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
    "Journalist"

  ];

  $( "#tags" ).autocomplete({
    source: availableTags
  });


  var cities = []; // global

  $('#submit_profession').on('click', function(e) {
    e.preventDefault();
    $("#city_details").html("");
    $("#map-currency").html("");

    var searchTerm = $("#tags").val();
    var results = $("#results");

    // clear existing results
    results.html("");

    $.ajax({
      url: "/cities",
      type: "GET"
    }).done(function(data) {
        cities = data; // set cities as global
        if (searchTerm === "Web Developer") {
            var sorted = data.sort(function(a,b){
                var a1=a.webdev_rating, b1=b.webdev_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            var top_five = sorted.slice(0,5);
            top_five.forEach(function(city) {
              $("#results").append("<a class='dev_city' data-city-id='" + city.id + "'>" + city.name + "</a><p>(Rating:  " + city.webdev_rating + ")</p>");
            });
        
        } else if(searchTerm === "Accounting") {
            var sorted = data.sort(function(a,b){
                var a1=a.accountant_rating, b1=b.accountant_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            sorted.forEach(function(city) {
              $("#results").append("<a id='accountant_city'>" + city.name + "     Accountant Rating:  " + city.accountant_rating + "</p>");
            });

        } else if(searchTerm === "Graphic Designer") {
            var sorted = data.sort(function(a,b){
                var a1=a.graphic_designer_rating, b1=b.graphic_designer_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            sorted.forEach(function(city) {
              $("#results").append("<p id='designer_city'>" + city.name + "     Graphic Designer Rating:  " + city.graphic_designer_rating + "</p>");
            });
        
        } else if(searchTerm === "Journalist") {
            var sorted = data.sort(function(a,b){
                var a1=a.journalist_rating, b1=b.journalist_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;s
            });
            sorted.forEach(function(city) {
              $("#results").append("<p id='journalist_city'>" + city.name + "     Journalist  " + city.journalist_rating + "</p>");
            });
        
        } else {
            $("#results").append("<div id='database_sentence'><p>Acessing database...</p></div>");
        }
     });
  });

    $('#results').on('click', '.dev_city', function(e) {
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
            $("#city_details").append("<div class='middle_column1' id='webdev_rating_info'><a> Web Developer Rating:</a><p id='big_number'> " + selected_city.webdev_rating + "</p></div><p>Out of 10</p>");
            $("#city_details").append("<div class='middle_column'><p>City Name: " + selected_city.name + "</p></div>");
            $("#city_details").append("<div class='middle_column1'><p>City Country: " + selected_city.country + "</p></div>");
            $("#city_details").append("<div><a class='middle_column1' id='webdev_country_info'>Country Info</a></div><div></div>");
            $("#city_details").append("<a class='middle_column1' id='webdev_currency_info'>Currency Info</a>");
        }
    });

    $('#city_details').on('click', '#webdev_rating_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.name + " WebDev Rating is " + selected_city.webdev_rating + "</p></div>");
        $("#map-currency").append("<div><p>" + selected_city.name + " Average Income for Web Developer with 0 years experience holding a Non-Degree Certificate Program</p><p id='big_number'>" + selected_city.webdev_avg_salary + "</p></div>");
    });


    $('#city_details').on('click', '#webdev_country_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.name + " info is " + selected_city.general_info1 + "</p></div>");
        $("#map-currency").append("<div><p>" + selected_city.name + " geo positioning is " + selected_city.gps_coordinates + "</p></div>");
        $("#map-currency").append("<div id='map'></div>");

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: +selected_city.lat, lng: +selected_city.lng},
            zoom: 7
        });
    });

    $('#city_details').on('click', '#webdev_currency_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        // $("#map-currency").append("<div><p>" + selected_city.country + " Currency Info</p></div>");
        // currency api
        endpoint = 'live'
        access_key = '2079b00422e43c763090dfd1c6588aa1';

        // get the most recent exchange rates via the "live" endpoint:
        $.ajax({
            url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&currencies=' + selected_city.code,   
            dataType: 'jsonp',
            success:    function(data){
            $("#map-currency").append("<div>" + String(data.quotes["USD"+selected_city.code]) + "</div>");
            debugger
        }
        }); 
    });


});


// sorted.forEach(function(city) {
//     console.log("city");
//   $("#results").append("<p class='dev_city' data-city-id='" + city.id + "'>" + city.name + " dev_rating " + city.webdev_rating + "</p>");



