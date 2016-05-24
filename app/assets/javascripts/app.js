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

  $jumbotron = $('.jumbotron')


  $('#submit_profession').on('click', function(e) {

    // $jumbotron.addClass('horizTranslate');
   
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
            
            $(".jumbotron").append("<p>Top 5 Cities</p>").fadeIn('slow');

            var sorted = data.sort(function(a,b){
                var a1=a.webdev_rating, b1=b.webdev_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            var top_five = sorted.slice(0,5);
            top_five.forEach(function(city) {
              $(".jumbotron").append("<a class='dev_city' data-city-id='" + city.id + "'>" + city.name + "</a><p></p>").fadeIn('slow');
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
            $(".jumbotron").append("<p>Top 5 Cities</p>")
            var sorted = data.sort(function(a,b){
                var a1=a.journalist_rating, b1=b.journalist_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;s
            });
            sorted.forEach(function(city) {
              $(".jumbotron").append("<p id='journalist_city'>" + city.name + "     Journalist  " + city.journalist_rating + "</p>");
            });
        
        } else {
            $(".jumbotron").append("<div id='database_sentence'><p>Acessing database...</p></div>");
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
            $("#city_details").append("<div class='middle_column1' id='webdev_rating_info'><p>City Details</p><p> Web Developer Rating: " + selected_city.webdev_rating + "/10"+ "</p>").delay(600).show(0);
            $("#city_details").append("<div class='middle_column'><p>" + selected_city.name + "</p></div>").show('slide', {direction: 'right'}, 600);
            $("#city_details").append("<div class='middle_column1'><p>" + selected_city.country + "</p> </div>").show('slide', {direction: 'right'}, 600);
            $("#city_details").append("<div><p>" + selected_city.name + " Average Income for Web Developer with 0 years experience holding a Non-Degree Certificate Program is " + selected_city.webdev_avg_salary + "</p></div>");
            $("#city_details").append("<div><a class='middle_column1' id='webdev_country_info'>Country Info</a></div><div></div>").show('slide', {direction: 'right'}, 600);
            $("#city_details").append("<a class='middle_column1' id='webdev_currency_info'>Currency Info</a>").show('slide', {direction: 'right'}, 600);
        }
    });

    // $('#city_details').on('click', '#webdev_rating_info', function(e) {
    //     e.preventDefault();
    //     var new_new_results = $("#map-currency");
    //     new_new_results.html("");
    //     // move webdev rating and avg income to #city details append. 10 lines above 
    // });


    $('#city_details').on('click', '#webdev_country_info', function(e) {
        e.preventDefault();
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.name + " info is " + selected_city.general_info1 + "</p></div>").delay(600).show(0);
        $("#map-currency").append("<div><p>" + selected_city.name + " geo positioning is " + selected_city.gps_coordinates + "</p></div>").delay(600).show(0);
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
            $("#map-currency").append("<div>" + String(data.quotes["USD"+selected_city.code]) + "</div>").delay(600).show(0);
            debugger
        }
        }); 
    });
});


