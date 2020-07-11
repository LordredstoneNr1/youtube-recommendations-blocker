// get blacklist and save it to window object

var blacklist = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", chrome.runtime.getURL("blacklist.txt"));
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        
        // file is not empty
        if (xhr.response !== "") {
            // construct array and save
            blacklist = xhr.response.split("\n").map(entry => entry.trim().toLowerCase());
        }
    } else {
        console.error(xhr.statusText);
    }
}
xhr.onerror = function() {
    console.error(xhr.statusText);
}
xhr.send();

// send back blacklist array if requested
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.id === "get-blacklist") {
        sendResponse(blacklist);
    }
});