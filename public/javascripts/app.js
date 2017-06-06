$(document).ready(function() {
  // Variables
  var startPage = $('#get-started');
  var uploadButton = $('#upload-button');
  // Functions

  // Event Functions
  uploadButton.on('click', function(e) {
    $('#image').trigger('click');
  });

  $('#image').on('change', function() {
    myfile= $( this ).val();
    console.log("Image name is: " + myfile);
    // startPage.addClass('hide');
    startPage.append(`<img src="` + myfile + `/>`)
  })

  // listen for messages from the processor
window.addEventListener("message", function(event){
  if (event.source != processor.contentWindow) return;

  switch (event.data){
    // "ready" = the processor is ready, so fetch the file
    case "ready":
      var xhr = new XMLHttpRequest;
      xhr.open('GET', input.getAttribute("src"), true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function(event) {
        processor.contentWindow.postMessage(this.response, "*");
      };
      xhr.send();
    break;

    // anything else = the processor has returned the text of the file
    default:
      console.log(event.data.replace(/\s+/g, " "));
    break;
  }
}, true);
})
