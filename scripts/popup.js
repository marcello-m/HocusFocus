var blockedDomainsList = document.getElementById("blockedDomainsList"); // Table element
const toggleButton = document.getElementById("toggleButton"); // Toggle switch element 

chrome.storage.sync.get(['isEnabled'], function (result) {
    const isEnabled = result.isEnabled;

    toggleButton.textContent = isEnabled ? 'ON' : 'OFF';

    toggleButton.classList.toggle('off', !isEnabled);
    toggleButton.classList.toggle('on', isEnabled);
});

chrome.storage.sync.get(['blockedDomains', 'excludedDomains'], function (result) {
    let blockedDomains = result.blockedDomains || [];
    let excludedDomains = result.excludedDomains || [];

    blockedDomainsList.innerHTML = '';

    blockedDomains.forEach(function (domain) {
        const row = document.createElement('tr');

        const domainCell = document.createElement('td');
        const checkboxCell = document.createElement('td');

        domainCell.textContent = domain;

        let checked = !excludedDomains.includes(domain);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = domain;
        checkbox.classList.add('pauseDomain');
        checkbox.checked = checked;

        checkboxCell.appendChild(checkbox);

        row.appendChild(domainCell);
        row.appendChild(checkboxCell);

        blockedDomainsList.appendChild(row);
    });

    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('.pauseDomain');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', handleCheckboxClick);
    });
});

toggleButton.addEventListener('click', function () {

    chrome.storage.sync.get(['isEnabled'], function (result) {
        const isEnabled = result.isEnabled;
        const newState = !isEnabled;

        toggleButton.textContent = newState ? 'ON' : 'OFF';
        toggleButton.classList.toggle('active', newState);
        toggleButton.classList.toggle('off', !newState);
        toggleButton.classList.toggle('on', newState);

        chrome.storage.sync.set({ isEnabled: newState });
    });
});

// Event listener for checkbox click
function handleCheckboxClick(event) {
    const checkbox = event.target;
    const domain = checkbox.id;

    chrome.storage.sync.get(['excludedDomains'], function (result) {
        let excludedDomains = result.excludedDomains || [];

        if (!checkbox.checked) {
            if (!excludedDomains.includes(domain)) {
                excludedDomains.push(domain);
            }
        } else {
            const index = excludedDomains.indexOf(domain);
            if (index !== -1) {
                excludedDomains.splice(index, 1);
            }
        }

        chrome.storage.sync.set({ excludedDomains });
    });
}