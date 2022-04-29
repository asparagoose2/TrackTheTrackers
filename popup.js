

const scanPage = () => {
    console.log("scanning page");
    const knownTrackers = [
        "google-analytics.com",
        "googletagmanager.com",
        "googletagservices.com",
        "adservice.google.com",
        "analytics.yahoo.com",
        "ad.doubleclick.net",
        "amazon-adsystem.com",
        "facebook",
        "twitter",
        "static.ads-twitter.com"
    ];
    const trackers = [];
    const scripts = document.getElementsByTagName('script');
    console.log(scripts.length);
    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        const src = script.src;
        if (src) {
            console.log(src);
            const hostname = new URL(src).hostname;
            knownTrackers.forEach(tracker => {
                if(src.includes(tracker)) {
                    trackers.push(src);
                    // trackers.push({
                    //     url: src,
                    //     providerName: hostname,
                    //     foundOn: [window.location.href]
                    // });
                }
            });
            
            
        }
    }
    const currentURL = new URL(window.location.href).hostname;
    
    chrome.runtime.sendMessage({action: "setTrackers", trackers, url: currentURL}, (result) => {
        console.log("setTrackers");
        console.log(result);
       
    });
    return currentURL;
}

window.onload =  async () => {
    console.log('zibiiiiiii');
    const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabId = currentTab[0].id;
    chrome.scripting.executeScript({ target: {tabId}, function: scanPage }, (results) => {
        console.log("scanPage done");
        console.log(results);
        chrome.storage.local.get(['trackers'], (res) => {
            const result = res.trackers;
            console.log("result");
            console.log(result);
            const currentTrackers = [];
            const currentURL = results[0].result;
            console.log("currentURL");
            console.log(currentURL);
            for(const tracker in result) {
                if(result[tracker].foundOn.includes(currentURL)) {
                    currentTrackers.push(result[tracker].providerName);
                }   
            }
            console.log("currentTrackers");
            console.log(currentTrackers);
            const list = document.getElementById('trackers');
            currentTrackers.forEach(tracker => {
                console.log("tracker ",tracker);
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerText = tracker;
                list.appendChild(li);
            });
        });
        chrome.runtime.sendMessage({action: "getTrackers"}, (result) => {
                console.log("getTrackers");
                console.log(result);
                
        });

        });
}





