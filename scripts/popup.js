var dottedListElement = document.getElementById("dottedList"); // Dotted list element
const toggleButton = document.getElementById("toggleButton"); // Toggle switch element 

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

chrome.storage.sync.get(['isEnabled'], function (result) {
    const isEnabled = result.isEnabled;

    // Set the initial text and appearance of the button based on the isEnabled value
    toggleButton.textContent = isEnabled ? 'ON' : 'OFF';
    toggleButton.classList.toggle('active', isEnabled);
});

toggleButton.addEventListener('click', function () {

    chrome.storage.sync.get(['isEnabled'], function (result) {
        const isEnabled = result.isEnabled;

        const newState = !isEnabled;

        // Update the text and appearance of the button based on the new state
        toggleButton.textContent = newState ? 'ON' : 'OFF';
        toggleButton.classList.toggle('active', newState);

        chrome.storage.sync.set({ isEnabled: newState });
    });
});