$.noConflict(); //Resolves conflict with Bootstrap

//Enables user to sort the table based on header clicks
jQuery(document).ready(function( $ ) {
    $("table").tablesorter(); 
});

//If user is logged in, highlight all their scores within the leaderboard
jQuery(document).ready(function () {
  $("#myTable").each(function () { //For each element in myTable
    if (user_name !== "") {
      $('tr:contains("' + user_name + '")').addClass('highlighter') 
    }
  });
});
