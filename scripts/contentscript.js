// get blacklist
chrome.runtime.sendMessage({id:"get-blacklist"}, blacklist => {
    
    // if the page is loaded we can continue directly
    if (document.getElementById("related") 
        && document.getElementById("related").children[1]
        && document.getElementById("related").children[1].children[1]) {
            prepareObserver(blacklist);
    } else {
        // Not ready yet, set up first observer and wait.
        new MutationObserver(function(mutationsList, observer) {
            if (mutationsList.find(a => a.target.id === "items")) { 
                observer.disconnect();
                prepareObserver(blacklist);
            }
        }).observe(document.getElementById("related"), {childList: true, subtree: true});
    }
});
             
function prepareObserver(blacklist) {
    // handles every recommendation already present
    Array.from(document.getElementById("related").children[1].children[1].children).forEach(v => checkVideo(v, blacklist));
    
    // this observer triggers whenever a new recommendation is added    
    new MutationObserver( (mutationsList, observer) => {
        if (mutationsList[0].addedNodes.length > 0) {
            mutationsList[0].addedNodes.forEach(v => checkVideo(v, blacklist));
        }
    }).observe(document.getElementById("related").children[1].children[1], {childList: true});
}

function checkVideo(element, blacklist) {
    if (element.tagname === "ytd-compact-autoplay-renderer") {
        element = element.getElementsByTagName("ytd-compact-video-renderer")[0];
    }
    const text = element.getElementsByTagName("h3")[0].innerText.toLowerCase();
    console.log(text, ...blacklist, blacklist.some( word => text.includes(word)));
    if (blacklist.some( word => text.includes(word))) { 
        element.setAttribute("style", "display: none !important;");
    }
}