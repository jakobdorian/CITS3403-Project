$.noConflict(); //Resolves conflict with Bootstrap

jQuery(document).ready(function( $ ) {
    $("table").tablesorter(); //Enables user to sort the table based on header clicks
});

//If user is logged in, highlight all their scores within the leaderboard
jQuery(document).ready(function () {
  $("#myTable").each(function () { //For each element in myTable
    //If contains current users name, add class for css use
    $('tr:contains("' + user_name + '")').addClass('highlighter') 
  });
});
