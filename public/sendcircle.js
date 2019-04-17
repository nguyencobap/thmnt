$( document ).ready(function() {
  
 function scrolltodiv(){
    var testDiv = document.getElementById("display");
    var scrollDis = testDiv.offsetTop;
    console.log(scrollDis);
    $(this).scrollTop(365);
    // window.scrollTo(0,scrollDis);
    console.log("scroll thong so");
  };

  socket.on("send", function(sendcircle) {
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    newdate = day + "/" + month + "/" + year;
    $("#ngayt").html(newdate);
    $("#mint").html(sendcircle.mint);
    $("#maxt").html(sendcircle.maxt);
    $("#ngayh").html(newdate);
    $("#minh").html(sendcircle.minh);
    $("#maxh").html(sendcircle.maxh);
    $("#ngayp").html(newdate);
    $("#minp").html(sendcircle.minp);
    $("#maxp").html(sendcircle.maxp);


//send data cirle of temperature
    $("#t1").each(function() {
      var $bart = $(this).find("#t3");
      var $valt = $(this).find("span");
      var perct = parseInt(sendcircle.temp, 10);

      $({
        p: perct
      }).animate({
        p: sendcircle.temp
      }, {
        easing: "swing",
        step: function(p) {
          $bart.css({
            transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
          });
          $valt.text(p | 0);
        }
      });
    });

//send data cirle of humidity
    $("#humi1").each(function() {
      var $barh = $(this).find("#humi3");
      var $valh = $(this).find("span");
      var perch = parseInt(sendcircle.humi, 10);

      $({
        p: perch
      }).animate({
        p: sendcircle.humi
      }, {
        easing: "swing",
        step: function(p) {
          $barh.css({
            transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
          });
          $valh.text(p | 0);
        }
      });
    });

    //send data cirle of ppm
    $("#ppm1").each(function() {
      var $barp = $(this).find("#ppm3");
      var $valp = $(this).find("span");
      var percp = parseInt(sendcircle.ppm, 10);

      $({
        p: percp
      }).animate({
        p: sendcircle.ppm
      }, {
        easing: "swing",
        step: function(p) {
          $barp.css({
            transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
          });
          $valp.text(p | 0);
        }
      });
    });

  });

//auto scroll to circle
  scrolltodiv();

//if there is no connection, the circle is 0%
  $("#t1").each(function() {
      var $bart = $(this).find("#t3");
      var $valt = $(this).find("span");
      var perct = parseInt(1, 10);

      $({
        p: perct
      }).animate({
        p: 1
      }, {
        easing: "swing",
        step: function(p) {
          $bart.css({
            transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
          });
          $valt.text(0);
        }
      });
    });

    $("#humi1").each(function() {
      var $barh = $(this).find("#humi3");
      var $valh = $(this).find("span");
      var perch = parseInt(1, 10);

      $({
        p: perch
      }).animate({
        p: 1
      }, {
        easing: "swing",
        step: function(p) {
          $barh.css({
            transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
          });
          $valh.text(0);
        }
      });
    });

    $("#ppm1").each(function() {
      var $barp = $(this).find("#ppm3");
      var $valp = $(this).find("span");
      var percp = parseInt(1, 10);

      $({
        p: percp
      }).animate({
        p: 1
      }, {
        easing: "swing",
        step: function(p) {
          $barp.css({
            transform: "rotate(" + (45 + (p * 1.8)) + "deg)",
          });
          $valp.text(0);
        }
      });
    });

});
