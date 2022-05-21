$.noConflict(); //Resolves conflict with Bootstrap

jQuery(document).ready(function( $ ) {
  // Code that uses jQuery's $ can follow here.
    $("#myTable").tablesorter();
    $('#myTable tbody tr').each(function() {
    var username = ($(this).find("td:eq(0)").html());
    console.log(username);
  


    });
});
