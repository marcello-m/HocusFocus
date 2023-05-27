let blockedDomains = [];

// Retrieve blocked domains from storage
chrome.storage.sync.get(['blockedDomains'], function(result) {
    const blockedDomains = result.blockedDomains;
  
    // Check if the current tab's domain is in the blocked domains list
    if (blockedDomains && blockedDomains.includes(location.hostname)) {
      // Perform actions to block distractions
      document.body.innerHTML = '<h1>Focus!</h1>';
    }
});