// text replacer
// infinite chill 2017

// load options from storage
function save_options() {
  // load user input
  var replacethis = document.getElementById('replacetext').value;
  var replacement = document.getElementById('replacewith').value;
  // put results in array and save to local storage
  var resultsArray = {replacethis, replacement};
  // set key
  key = 'replacetextkey'.key;
    // save array and display status
    chrome.storage.local.set({key : resultsArray}, function(){
        // update status
        var status = document.getElementById('status');
        var outputstring = 'updated!';
        status.textContent = outputstring;
        // after 2 seconds update status back to blank
        setTimeout(function() {
        status.textContent = '';
        }, 2000);
    });
}

// Restore words stored in chrome.storage
function restore_options() {
  // set default values
  chrome.storage.sync.get({
    replaceText: 'Trump',
    replaceWith: 'Drumpf'
  }, function(items) {
    // update values
    document.getElementById('replacetext').value = items.replaceText;
    document.getElementById('replacewith').value = items.replaceWith;
  });
}

// recall current settings to html
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);