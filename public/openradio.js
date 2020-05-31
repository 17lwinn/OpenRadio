const socket = io();
var curItem = "Unknown";
socket.on("itemchange", function(data){
  curItem = data.item;
  $("#item-name-display").text(curItem);
})
function controllerclick(event) {
  console.log("Clicked");
  console.log(event);
  if (event.ctrlKey) {
    $("#streamelem").toggle();
  } else {
    let streamelem = document.getElementById("streamelem");
    streamelem.muted = !streamelem.muted;
    $("#controller-icon").toggleClass("fa-play fa-pause");
  }
}
$(function() {
  $("#streamelem").hide();
  let controller = document.getElementById("controller");
  controller.addEventListener("click", controllerclick);
  document.body.onkeyup = window.KeyPress;
});
function play(dest, elem) {
  let audioelem = document.getElementById("streamelem");
  audioelem.src = dest;
  audioelem.play();
  //console.log(elem);
  //console.log(elem.parentElement.children[0]);
  let name = elem.parentElement.innerText;
  socket.emit("movetoplaylist",{name: name});
  socket.emit("getcurrentitem",{});
  $("#station-name-display").text(name);
  console.log("Station Name is " + name);
}