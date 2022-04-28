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
        chrome.storage.sync.get('trackers', (result) => {
            if(result.trackers) {
                sendResponse(result.trackers);
            } else {
                sendResponse([]);
            }
        });
    } else if (request.action == "setTrackers") {
        chrome.storage.sync.get('trackers', (result) => {
            // console.log(result);
            // let trackers = [];
            // if(result) {
            //     trackers = result.trackers;
            // }
            // trackers.push(...request.trackers);
            console.log("setTrackers");
            console.log(request.trackers);
            const trackers = request.trackers;
            chrome.storage.sync.set({ trackers }, () => {
                console.log("setTrackers done");
                sendResponse(trackers);
            }
            );

        });
    } else {
        sendResponse({});
    }
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