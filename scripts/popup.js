var dottedListElement = document.getElementById("dottedList"); // Dotted list element
const toggleButton = document.getElementById("toggleButton"); // Toggle switch element 

chrome.storage.sync.get(['blockedDomains'], function (result) {
    blockedDomains = result.blockedDomains || [];
    
    blockedDomainsList.innerHTML = '';

    blockedDomains.forEach(function (domain) {
        const row = document.createElement('tr');

        // Domain column
        const domainCell = document.createElement('td');
        const checkboxCell = document.createElement('td');
        domainCell.textContent = domain;
        checkboxCell.innerHTML = '<td><input type="checkbox" checked class="pauseDomain"/></td>'
        row.appendChild(domainCell);
        row.appendChild(checkboxCell);

        blockedDomainsList.appendChild(row);
    });
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