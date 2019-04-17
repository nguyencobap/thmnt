
var button = {state: false};
document.getElementById("mButtonLED").addEventListener("change", (event)=>{
  if (event.target.checked) {
    button = {state: true};
    socket.emit('button', button);
    console.log(button);
  } else {
    button = {state: false};
    socket.emit('button', button);
    console.log(button);
  }

});

// socket.on('toggle', function(data){
//   console.log(data);
  // if (data.ledState) {
  //   $("#ledstate").text("ON");
  //   document.getElementById("mButtonLED").checked = true;
  // } else {
  //   $("#ledstate").text("OFF");
  //   document.getElementById("mButtonLED").checked = false;
  // }
// });
