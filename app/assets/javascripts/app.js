$(function() {

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

  setTimeout(function(){
    $('#results').delay();
  }, 5000);

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


  var cities = []; // global

  $('#submit_profession').on('click', function(e) {
    e.preventDefault();
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
            sorted.forEach(function(city) {
                console.log("city");
              $("#results").append("<p class='dev_city' data-city-id='" + city.id + "'>" + city.name + " dev_rating " + city.webdev_rating + "</p>");
            
                            
            });

        
        } else if(searchTerm === "Accounting") {
            var sorted = data.sort(function(a,b){
                var a1=a.accountant_rating, b1=b.accountant_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            sorted.forEach(function(city) {
              $("#results").append("<p id='accountant_city'>" + city.name + " accountant_rating " + city.accountant_rating + "</p>");
            });

        } else if(searchTerm === "Graphic Designer") {
            var sorted = data.sort(function(a,b){
                var a1=a.graphic_designer_rating, b1=b.graphic_designer_rating;
                if(a1==b1) return 0;
                return a1 < b1 ? 1: -1;
            });
            sorted.forEach(function(city) {
              $("#results").append("<p id='designer_city'>" + city.name + " graphic_designer_rating " + city.graphic_designer_rating + "</p>");
            });
        
        } else {
            $("#results").append("<div id='database_sentence'><p>" + "Acessing database..." + "</p>").addClass("loadinggif");
        }
    });

  });

    $('#results').on('click', '.dev_city', function(e) {
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
            $("#city_details").append("<div class='middle_column'><p>City Name: " + selected_city.name + "</p></div>");
            $("#city_details").append("<div class='middle_column1'><p>City Country: " + selected_city.country + "</p></div>");
            $("#city_details").append("<div class='middle_column1' id='webdev_rating_info'><p>Web Developer Rating: " + selected_city.webdev_rating + "</p></div>");
            $("#city_details").append("<div class='middle_column1' id='webdev_country_info'><p>Country Info</p></div>");
            $("#city_details").append("<div class='middle_column1' id='webdev_currency_info'><p>Currency Info</p></div>");
            // $(".city_details").append("<div class='middle_column1'><p>Web Developer Average Salary: " + selected_city.webdev_avg_salary + "</p></div>");
            // $(".city_details").append("<div class='middle_column1'><p>Family Safety Rating: " + selected_city.family_safety_rating + "</p></div>");
        }
    });

    $('#city_details').on('click', '#webdev_rating_info', function(e) {
        e.preventDefault();
        // var searchTerm = $("#tags").val();
        // var results = $("#results");
        // var current_city_id = $(this).data("city-id");
        // cities.forEach(function(city) {
        //     if (city.id == current_city_id) {
        //         selected_city = city;
        //     }
        // });
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.name + " WebDev Rating is " + selected_city.webdev_rating + "</p></div>");
    });

    $('#city_details').on('click', '#webdev_country_info', function(e) {
        e.preventDefault();
        // var searchTerm = $("#tags").val();
        // var results = $("#results");
        // var current_city_id = $(this).data("city-id");
        // cities.forEach(function(city) {
        //     if (city.id == current_city_id) {
        //         selected_city = city;
        //     }
        // });
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.name + " info is " + selected_city.general_info1 + "</p></div>");
        $("#map-currency").append("<div><p>" + selected_city.name + " geo positioning is " + selected_city.gps_coordinates + "</p></div>");
        $("#map-currency").append("<div><p>" + selected_city.name + " PUT GOOGLEMAPS API HERE</p></div>");

    });

    $('#city_details').on('click', '#webdev_currency_info', function(e) {
        e.preventDefault();
        // var searchTerm = $("#tags").val();
        // var results = $("#results");
        // var current_city_id = $(this).data("city-id");
        // cities.forEach(function(city) {
        //     if (city.id == current_city_id) {
        //         selected_city = city;
        //     }
        // });
        var new_new_results = $("#map-currency");
        new_new_results.html("");
        $("#map-currency").append("<div><p>" + selected_city.country + " Currency Info</p></div>");
    });
});
