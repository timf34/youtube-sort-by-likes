console.log('Popup script loaded.');

// Get the current tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var tab = tabs[0];
  console.log('Current URL:', tab.url);
});
