const newDomainTextInput = document.getElementById("newDomainInput"); // Input field for new domain
const addDomainButton = document.getElementById("addDomain"); // Button to add new domain
const clearListButton = document.getElementById("clearList"); // Button to clear the blocked domains list

const blockedDomainsTable = document.getElementById("blockedDomainsTable");
const blockedDomainsList = document.getElementById("blockedDomainsList");

let blockedDomains = [];

// Call the updateBlockedDomainsList function when the page loads
document.addEventListener('DOMContentLoaded', updateBlockedDomainsTableList);

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

        updateBlockedDomainsTableList();
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

            updateBlockedDomainsTableList();
        }
    }
});

// Event listener for the clear list button, clears the blocked domains list from the chrome storage API and updates the dotted list
clearListButton.addEventListener("click", () => {
    blockedDomains = [];

    chrome.storage.sync.set({ blockedDomains: blockedDomains });

    console.log("Blocked domains list cleared.", blockedDomains);

    updateBlockedDomainsTableList();
});

// Function to update the blocked domains list
function updateBlockedDomainsTableList() {
    // Retrieve the blocked domains from chrome.storage
    chrome.storage.sync.get(['blockedDomains'], function (result) {
        blockedDomains = result.blockedDomains || [];
        
        blockedDomainsList.innerHTML = '';

        blockedDomains.forEach(function (domain) {
            const row = document.createElement('tr');

            // Domain column
            const domainCell = document.createElement('td');
            domainCell.textContent = domain;
            row.appendChild(domainCell);

            // Action column
            const actionCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', function () {
                    const updatedBlockedDomains = blockedDomains.filter(function (blockedDomain) {
                        return blockedDomain !== domain;
                    });

                    chrome.storage.sync.set({ blockedDomains: updatedBlockedDomains }, function () {
                        updateBlockedDomainsTableList();
                    });
            });
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);

            blockedDomainsList.appendChild(row);
        });
    });
}