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
// the starting time
let startTime = Date.now(); /*Timer*/
// page elements
const QuoteElement = document.getElementById('Quote');
const messageElement = document.getElementById('Message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');



/*(1)The Starting Logic*/
document.getElementById('start').addEventListener('click', () => {
 /*To Get a Quote from quotes*/
  const quoteIndex = Math.floor(Math.random() * quotes.length); /*Randomly Choose 1 Of The Quotes From quotes*/

  const quote = quotes[quoteIndex]; /*Only The Randomly Choosen Quote From quotes Will Be in quote*/
  words = quote.split(' '); /*quote Are Seperated Into 1 individual Words In 1 Long Line*/
  wordIndex = 0; /*Resets The wordIndex Value For Tracking*/

  /*For UI updates*/
  const spanWords = words.map(function(word) { return `<span>${word} </span>`}); /*Loops Through Every Words So We can Apply <span> Class To Each Words*/
  QuoteElement.innerHTML = spanWords.join(''); /*Reformatting the QuoteElemnt Content By Adding Our New Edited Content Into <p id="Quote"></p> */
  QuoteElement.childNodes[0].className = 'highlight'; /*Higlights The First Element In quote using <span>*/
  messageElement.innerText = ''; /*Clears Out Old <p id="Message"></p>*/

  typedValueElement.value = ''; /*Clears Out Old typed-value aka The Text In The Input Box*/
  startButton.style.display = 'none'; /*Hides The Stat Button*/
  resetButton.style.display = 'inline-block'; /*Shows The Reset Button*/
  startTime = new Date().getTime(); /*Start Timer For Calculating Word Per Minute Later*/
});


/*(2)The Typing Logic*/
typedValueElement.addEventListener('input', () => { /*For <input type="text"*/
  const currentWord = words[wordIndex]; /*Chooses The Current First Word in words*/
  // get the current value
  const typedValue = typedValueElement.value; /*Assigngs typedValue The Stuff That User Inputed Into typedValueElement By Typing Into The Input Box */

  if (typedValue === currentWord && wordIndex === words.length - 1) { /*[Only Execute if User Typed The Final Word Correctly While At The Final Word Of The quote]*/
  
    const elapsedTime = new Date().getTime() - startTime; /*Calculate Elapsed Time Using startTime*/
    const message =`CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`; /*To Tell User Their Spent Time seconds*/
    messageElement.innerText = message; /*inserts The Time Score From message into The messageElement.innerText*/
    startButton.style.display = 'inline-block'; /*Shows The Start Button*/
    resetButton.style.display = 'none';
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) { /*[Only Execute If The Currently Typed Text In The Word In Input Box Have a Space Bar At The End And The Cleaned Up Word Using The typedValue.trim() is Equal To The Current Word Using Index Number in wordindex*/
     typedValueElement.value = ''; /*Resets The Typed Word Inside The Input Box As Soon We Completed Typing The Word Correctly According To the Else If Statement*/
    wordIndex++;
    
    for (const wordElement of QuoteElement.childNodes) {
      wordElement.className = ''; /*Resets Class Name For All wordElement In quote In a Loop*/
    }
    // highlight the new word
    QuoteElement.childNodes[wordIndex].className = 'highlight'; /*It Highlights The Current Word By Using The wordIndex To Tell Which Word To Highlight*/

    } else if (currentWord.startsWith(typedValue)) { /*[Only Execute If The Currently Typed Word Start With a Space Bar]*/
       typedValueElement.classList.remove('error'); /*Resets The Typed Words Class Name*/

    } else {
         typedValueElement.classList.add('error'); /*[Only execute If There Is Error And It Assigns It With An error class So We Can Style The error Later]*/
        }
});


resetButton.addEventListener('click', () => {
    // Clear out game state variables
    words = [];
    wordIndex = 0;
    
    // Clear out visual UI elements
    QuoteElement.innerHTML = '';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.classList.remove('error');
    
    // BUTTON TOGGLE: Bring back Start button, hide Reset button
    startButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
});