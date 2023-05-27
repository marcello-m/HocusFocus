var newDomainTextInput = document.getElementById("newDomainInput"); // Input field for new domain
var addDomainButton = document.getElementById("addDomain"); // Button to add new domain
var dottedListElement = document.getElementById("dottedList"); // Dotted list element
var clearListButton = document.getElementById("clearList"); // Button to clear the blocked domains list

let blockedDomains = [];

// Call the updateBlockedDomainsList function when the page loads
document.addEventListener('DOMContentLoaded', updateBlockedDomainsDottedList);

// Event listener for the add domain button, adds the domain to the blocked domains list from the chrome storage API and updates the dotted list
addDomainButton.addEventListener("click", () => {
    const domain = newDomainTextInput.value.trim();

    if (domain) {
        newDomainTextInput.value = ""; // Clear the input field

        chrome.storage.sync.get(['blockedDomains'], function (result) {
            blockedDomains = result.blockedDomains || [];
        });

        blockedDomains.push(domain);

        chrome.storage.sync.set({ blockedDomains: blockedDomains });

        console.log("Blocked domains list updated.", blockedDomains);

        updateBlockedDomainsDottedList();
    }
});

// Event listener for the new domain text input, adds the domain to the blocked domains list from the chrome storage API and updates the dotted list
newDomainTextInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const domain = newDomainTextInput.value.trim();

        if (domain) {
            newDomainTextInput.value = ""; // Clear the input field

            chrome.storage.sync.get(['blockedDomains'], function (result) {
                blockedDomains = result.blockedDomains || [];
            });

            blockedDomains.push(domain);

            chrome.storage.sync.set({ blockedDomains: blockedDomains });

            console.log("Blocked domains list updated.", blockedDomains);

            updateBlockedDomainsDottedList();
        }
    }
});

// Event listener for the clear list button, clears the blocked domains list from the chrome storage API and updates the dotted list
clearListButton.addEventListener("click", () => {
    blockedDomains = [];

    chrome.storage.sync.set({ blockedDomains: blockedDomains });

    console.log("Blocked domains list cleared.", blockedDomains);

    updateBlockedDomainsDottedList();
});

// Function to update the blocked domains dotted list
function updateBlockedDomainsDottedList() {
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
}