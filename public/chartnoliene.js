

$( document ).ready(function() {


  function scrolltodiv(){
    var testDiv = document.getElementById("display");
    var scrollDis = testDiv.offsetTop;
    console.log(scrollDis);
    $(this).scrollTop(365);
    // window.scrollTo(0,scrollDis);
    console.log("scroll do thi");

  };
  var x = 0;
  var ctx = $('#myChart');
  var btnChart = $('#btnChart');
  var sttChart = true;
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['.'],
      datasets: [{
        label: 'Nhiệt độ',
        data: [12,12,1,1,1,1,1,1,1,1],
        backgroundColor: ['rgba(255, 0, 0, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 3

      },
      {
        label: 'Độ ẩm',
        data: [60,1,2,1,2,1,2,1,2,1],
        backgroundColor: ['rgba(0, 160, 255, 0.2)'],
        borderColor: ['rgba(132, 99, 255, 1)'],
        borderWidth: 3

      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      hoverMode: 'index',
      stacked: true,
      title: {
        display: true,
        text: 'Đồ thị giám sát thông số môi trường',
        fontSize: 15
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks : {
            beginAtZero : true
          }
        }],
      }
    }



  });

  btnChart.click(function(){
    sttChart = !sttChart;


    if (sttChart) {
      btnChart.text("Dừng lấy dữ liệu");
    } else{
      btnChart.text("Tiếp tục lấy dữ liệu");
    }
  });


  var i =0;
//   setInterval(function(){
// if (sttChart) {
//   var d = new Date();
//   var h = d.getHours();
//   var m = d.getMinutes();
//   var s = d.getSeconds();
//   if (i<=10) {
//     myChart.data.datasets[0].data[i] = Math.floor(Math.random()*100);
//     myChart.data.datasets[1].data[i] = Math.floor(Math.random()*100);
//     myChart.data.labels[i] = h+":"+m+":"+s;
//     myChart.update();
//     i++;
//   } else{
//     for (var x = 1; x < 11; x++) {
//       myChart.data.datasets[0].data[x-1] = myChart.data.datasets[0].data[x];
//       myChart.data.datasets[1].data[x-1] = myChart.data.datasets[1].data[x];
//       myChart.data.labels[x-1] = myChart.data.labels[x];
//       myChart.update();
//       if (x==10) {
//         myChart.data.datasets[0].data[10] = Math.floor(Math.random()*100);
//         myChart.data.datasets[1].data[10] = Math.floor(Math.random()*100);
//         myChart.data.labels[10] = h+":"+m+":"+s;
//         myChart.update();
//       }
//     }
//   }
// }
// },1000);



socket.on("send", function(dulieu){
  if (sttChart) {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    if (i<10) {
      myChart.data.datasets[0].data[i] = dulieu.temp;
      myChart.data.datasets[1].data[i] = dulieu.humi;
      myChart.data.labels[i] = h+":"+m+":"+s;
      myChart.update();
      i++;
    } else{
      for (var x = 0; x < 10; x++) {
        myChart.data.datasets[0].data[x-1] = myChart.data.datasets[0].data[x];
        myChart.data.datasets[1].data[x-1] = myChart.data.datasets[1].data[x];
        myChart.data.labels[x-1] = myChart.data.labels[x];
        myChart.update();
        if (x==9) {
          myChart.data.datasets[0].data[9] = dulieu.temp;
          myChart.data.datasets[1].data[9] = dulieu.humi;
          myChart.data.labels[9] = h+":"+m+":"+s;
          myChart.update();
        }
      }
    }
  } });



  //Keo den element <div id="display"></div>
  scrolltodiv();


});





















    // window.scrollTo(0,document.body.scrollHeight);
