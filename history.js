console.log(window.location.search.split('=')[1]);
const serviceProvider = window.location.search.split('=')[1];

document.getElementById("title").innerText = serviceProvider;

chrome.storage.local.get(["trackers"], (res) => {
    console.log(res.trackers);
    const trackers = new Set(res.trackers[serviceProvider].foundOn);
    console.log(trackers);
    const list = document.getElementById("trackers");
    trackers.forEach(tracker => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = tracker;
        list.appendChild(li);
    })
})