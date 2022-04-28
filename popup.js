const currentTrackers = [];



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
                    trackers.push({
                        url: src,
                        providerName: hostname,
                        foundOn: [window.location.href]
                    });
                }
            });
            
            
        }
    }
    chrome.runtime.sendMessage({action: "setTrackers", trackers}, (result) => {
        console.log(result);
    });
}

window.onload =  async () => {
    console.log('zibiiiiiii');
    const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabId = currentTab[0].id;
    chrome.scripting.executeScript({ target: {tabId}, function: scanPage }, (results) => {
        console.log(results);
        chrome.runtime.sendMessage({action: "getTrackers"}, (result) => {
            console.log(result);
            });
    });
}





