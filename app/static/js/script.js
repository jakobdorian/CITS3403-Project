$.noConflict(); //Resolves conflict with Bootstrap
jQuery( document ).ready(function( $ ) {
  // Code that uses jQuery's $ can follow here.
  $(function () {
    console.log($("#myTable"))
    $("#myTable").tablesorter();
  });
});