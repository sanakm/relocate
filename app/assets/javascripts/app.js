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
      data.forEach(function(city) {
        $("#results").append("<p>" + city.name + "</p>");
      });
    });

  });
  
});
