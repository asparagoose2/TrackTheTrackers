/*
    tracker foramt:
    {
        "providerName": "google",
        "url": "http://www.example.com/",
        "foundOn": ["http://www.example.com/", "http://www.example.com/"]
    }

*/




chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "getTrackers") {
        chrome.storage.local.get('trackers', (result) => {
            if(result.trackers) {
                sendResponse(result.trackers);
            } else {
                sendResponse([]);
            }
        });
    } else if (request.action == "setTrackers") {
        // chrome.storage.sync.clear();
        chrome.storage.local.get('trackers', (result) => {
            let trackers = result.trackers || {};
            request.trackers.forEach(tracker => {
                if(tracker.includes('twitter')) {
                    if(!trackers.twitter) {
                        trackers.twitter = {
                            providerName: 'twitter',
                            url: tracker,
                            foundOn: [request.url]
                        };
                        // trackers.twitter.foundOn.add(request.url);
                    } else {
                        // trackers.twitter.foundOn.add(request.url);
                        trackers.twitter.foundOn.push(request.url);
                    }
                } else if (tracker.includes('google')) {
                    if(!trackers.google) {
                        trackers.google = {
                            providerName: 'google',
                            url: tracker,
                            foundOn: [request.url]
                        };
                        // trackers.google.foundOn.add(request.url);
                    } else {
                        // trackers.google.foundOn.add(request.url);
                        trackers.google.foundOn.push(request.url);
                    }
                } else if (tracker.includes('facebook')) {
                    if(!trackers.facebook) {
                        trackers.facebook = {
                            providerName: 'facebook',
                            url: tracker,
                            foundOn: [request.url]
                        };
                        // trackers.facebook.foundOn.add(request.url);
                    } else {
                        // trackers.facebook.foundOn.add(request.url);
                        trackers.facebook.foundOn.push(request.url);
                    }
                } else if (tracker.includes('amazon')) {
                    if(!trackers.amazon) {
                        trackers.amazon = {
                            providerName: 'amazon',
                            url: tracker,
                            foundOn: [request.url]
                        };
                        // trackers.amazon.foundOn.add(request.url);
                    } else {
                        // trackers.amazon.foundOn.add(request.url);
                        trackers.amazon.foundOn.push(request.url);
                    }
                } else if (tracker.includes('yahoo')) {
                    if(!trackers.yahoo) {
                        trackers.yahoo = {
                            providerName: 'yahoo',
                            url: tracker,
                            foundOn: [request.url]
                        };
                        // trackers.yahoo.foundOn.add(request.url);
                    } else {
                        // trackers.yahoo.foundOn.add(request.url);
                        trackers.yahoo.foundOn.push(request.url);
                    }
                } else if (tracker.includes('doubleclick')) {
                    if(!trackers.doubleclick) {
                        trackers.doubleclick = {
                            providerName: 'doubleclick',
                            url: tracker,
                            foundOn: new Set()
                        };
                        trackers.doubleclick.foundOn.add(request.url);
                    } else {
                        trackers.doubleclick.foundOn.add(request.url);
                    }
                }
            });

            console.log("setTrackers");
            console.log(request.trackers);
            // const trackers = request.trackers;
            chrome.storage.local.set({ trackers }, function() {
                console.log("setTrackers done");
                sendResponse(trackers);
            }
            );

        });
    } else {
        sendResponse({});
    }
    return true;
});

// const scanPage = () => {
//     console.log("scanning page");
//     const trackers = [];
//     const scripts = document.getElementsByTagName('script');
//     console.log(scripts.length);
//     for (let i = 0; i < scripts.length; i++) {
//         const script = scripts[i];
//         const src = script.src;
//         if (src) {
//             console.log(src);
//             const hostname = new URL(src).hostname;
//             knownTrackers.forEach(tracker => {
//                 if (src.includes(tracker)) {
//                     trackers.push({
//                         url: src,
//                         providerName: hostname,
//                         foundOn: [window.location.href]
//                     });
//                 }
//             });
//         }
//     }
//     return trackers;
// }


// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status == "complete") {
//         chrome.scripting.executeScript({ target: { tabId }, function: scanPage }, (results) => {
//             const res = results[0].result;
//             console.log(res);
//             chrome.runtime.sendMessage({ action: 'addTrackers', trackers: res });
//             chrome.runtime.sendMessage({ action: 'getTrackers' }, (response) => {
//                 console.log(response);
//             });

//         });
//     }
// });