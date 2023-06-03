// Retrieve blocked domains from storage
chrome.storage.sync.get(['blockedDomains', 'isEnabled'], function (result) {
  const blockedDomains = result.blockedDomains;
  const isEnabled = result.isEnabled;

  if (isEnabled) {
    // Check if the current tab's domain is in the blocked domains list
    if (blockedDomains && (blockedDomains.includes(normalizeDomain(location.hostname)) || blockedDomains.includes(location.hostname))) {

      fetch(chrome.runtime.getURL('../resources/json/quotes.json'))
        .then(response => response.json())
        .then(data => {
          const quotesData = data;
          const cssAnimation = `
          .animation-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
          }
          
          .animation {
            width: 100px;
            height: 100px;
            background-color: violet;
            border-radius: 50%;
            animation: pulse 1s infinite alternate;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(0.8);
            }
            100% {
              transform: scale(1.2);
            }
          }         
          
          .quote-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #3f2242;
            color: #f1f1f1;
          }

          .quote-element {
            text-align: center;
          }

          .author-element {
            text-align: center;
            font-size: 16px;
            font-style: italic;
          }
          `;

          const randomIndex = Math.floor(Math.random() * quotesData.length);
          const randomQuote = quotesData[randomIndex].quote;
          const randomAuthor = quotesData[randomIndex].author;

          const styleElement = document.createElement('style');
          styleElement.textContent = cssAnimation;

          const animationContainer = document.createElement('div');
          animationContainer.classList.add('animation-container');
          const animationElement = document.createElement('div');
          animationElement.classList.add('animation');

          const quoteContainer = document.createElement('div');
          quoteContainer.classList.add('quote-container');

          const quoteElement = document.createElement('h1');
          quoteElement.textContent = randomQuote;
          quoteElement.classList.add('quote-element');

          const authorElement = document.createElement('p');
          authorElement.textContent = `— ${randomAuthor}`;
          authorElement.classList.add('author-element');

          document.head.appendChild(styleElement);
          quoteContainer.appendChild(animationContainer);
          animationContainer.appendChild(animationElement);
          quoteContainer.appendChild(quoteElement);
          quoteContainer.appendChild(authorElement);

          document.body.innerHTML = '';
          document.body.appendChild(quoteContainer);
        })
        .catch(error => {
          console.error('Failed to load quotes:', error);
        });
    }
  }
});

// Function to normalize the domain by removing leading "www."
function normalizeDomain(domain) {
  return domain.replace(/^www\./i, '');
}