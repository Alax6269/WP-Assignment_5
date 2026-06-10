/*Used Quotes*/
const quotes = [
    'Homesickness became contagious in the young campers',
    'As he waited for the shower to warm, he noticed that he could hear water change temperature.',
    'If you like tuna and tomato sauce, try combining the two, its really not as bad as it sounds.',
    'The llama couldnt resist trying the lemonade.',
    'The old rusted farm equipment surrounded the house predicting its demise.',
    'He had a wall full of masks so she could wear a different face every day.',
    'He wore the surgical mask in public not to keep from catching a virus, but to keep people away from him.',
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// Fixed: Standardized to lowercase 'startTime' to match your event listeners
let startTime = Date.now(); 

// page elements
const QuoteElement = document.getElementById('Quote');
const messageElement = document.getElementById('Message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start'); // Added button selector



/*(1)The Starting Logic*/
startButton.addEventListener('click', () => {
    /*To Get a Quote from quotes*/
    const quoteIndex = Math.floor(Math.random() * quotes.length); 

    const quote = quotes[quoteIndex]; 
    words = quote.split(' '); 
    wordIndex = 0; 

    /*For UI updates*/
    const spanWords = words.map(function(word) { return `<span>${word} </span>`}); 
    QuoteElement.innerHTML = spanWords.join(''); 
    QuoteElement.childNodes[0].className = 'highlight'; 
    messageElement.innerText = ''; 

    typedValueElement.value = ''; 
    
    // HIDE BUTTON: Makes the start button disappear when clicked
    startButton.style.display = 'none'; 
    
    startTime = new Date().getTime(); 
});


/*(2)The Typing Logic*/
typedValueElement.addEventListener('input', () => { 
    const currentWord = words[wordIndex]; 
    const typedValue = typedValueElement.value; 

    if (typedValue === currentWord && wordIndex === words.length - 1) { 
        const elapsedTime = new Date().getTime() - startTime; 
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`; 
        messageElement.innerText = message; 
        
        // SHOW BUTTON: Brings the start button back so they can play again
        startButton.style.display = 'inline-block'; 
        
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) { 
        typedValueElement.value = ''; 
        wordIndex++;
        
        for (const wordElement of QuoteElement.childNodes) {
            wordElement.className = ''; 
        }
        QuoteElement.childNodes[wordIndex].className = 'highlight'; 

    } else if (currentWord.startsWith(typedValue)) { 
        typedValueElement.classList.remove('error'); 
        
    } else {
        typedValueElement.classList.add('error'); 
    }
});