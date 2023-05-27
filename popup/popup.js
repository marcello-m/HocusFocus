var dottedListElement = document.getElementById("dottedList"); // Dotted list element

dottedListElement.innerHTML = "";

chrome.storage.sync.get(['blockedDomains'], function (result) {
    blockedDomains = result.blockedDomains;

    if (blockedDomains && blockedDomains.length > 0) {
        blockedDomains.forEach(domain => {
            const listItem = document.createElement('li');
            listItem.textContent = domain;
            dottedListElement.appendChild(listItem);
        });
    }
});