$(document).ready(function() {
  $("#display").load("thongso.ejs");
  $("#thongso").click(function() {
    $("#display").load("thongso.ejs");
    $("#home").removeClass("active");
    $("#thongke").removeClass("active");
    $("#dieukhien").removeClass("active");
    $("#thongso").addClass("active");
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  })
  $("#thongke").click(function() {
    $("#display").load("showchart.ejs");
    $("#home").removeClass("active");
    $("#thongso").removeClass("active");
    $("#dieukhien").removeClass("active");
    $("#thongke").addClass("active");
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  })
  $("#dieukhien").click(function(){
    $("#display").load("dieukhien.ejs");
    $("#home").removeClass("active");
    $("#thongso").removeClass("active");
    $("#thongke").removeClass("active");
    $("#dieukhien").addClass("active");
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  })
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  })
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  })
});
