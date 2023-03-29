import { Emoji } from "./ClassEmoji.js";
import { Events } from "./ClassEvents.js";
//import { GameRules } from "./ClassRules.js";

class LoadGame {
  constructor() {
    this.gameType = this.gameType;
    this.populateArrayWithEmoji = this.populateArrayWithEmoji;
    this.newBox = this.newBox;
    this.finalArray = this.finalArray;
    this.whatGameToPlay = this.whatGameToPlay;
  }

  genarateRndNumbers() {
    return Math.floor((Math.random() * 25) + 1);
  }

  populateArrayWithNumber(howManyNumber) {
    this.populateArrayWithEmoji = [];
    while (this.populateArrayWithEmoji.length < howManyNumber) {
      let RndNumber = this.genarateRndNumbers();
      if(this.populateArrayWithEmoji.length === 0) {
        this.populateArrayWithEmoji.push(this.genarateRndNumbers());
      }
      else {
        for(let x = 0; x < this.populateArrayWithEmoji.length; x++) {
          if(this.populateArrayWithEmoji[x] === RndNumber) {
            break;
          }
          else {
            if(x === this.populateArrayWithEmoji.length - 1) {
              this.populateArrayWithEmoji.push(RndNumber);
            }
          }
        }
      }
    }
    this.fillFinalArray();
  }

  fillFinalArray() {
  this.finalArray = [];
    for(let j= 0;  j < this.populateArrayWithEmoji.length; j++) {
      this.finalArray.push(this.populateArrayWithEmoji[j]);
    }
    for(let v = 0;  v < this.populateArrayWithEmoji.length; v++) {
      this.finalArray.push(this.populateArrayWithEmoji.sort()[v]);
    }
  }

  populateBoardWithArrayNumber(cssClassName) {
    const events = new Events();
    const emoji = new Emoji();
    const listOfSquareBoxes =  events.loopElementWithQuerySelectorAll(cssClassName);

      if(this.gameType === 1 || this.gameType === 6 || this.gameType === 11 || this.gameType === 16) {
        for(let x = 0; x < listOfSquareBoxes.length; x++) {
          listOfSquareBoxes[x].innerHTML = emoji.game.emoji[this.finalArray[x]];
        }
      }
      if(this.gameType === 2 || this.gameType === 7 || this.gameType === 12 || this.gameType === 17) {
        for(let x = 0; x < listOfSquareBoxes.length; x++) {
          listOfSquareBoxes[x].innerHTML = emoji.game.alphabLetters[this.finalArray[x]];
        }
      }
      if(this.gameType === 3 || this.gameType === 8 || this.gameType === 13 || this.gameType === 18) {
        for(let x = 0; x < listOfSquareBoxes.length; x++) {
          listOfSquareBoxes[x].innerHTML = emoji.game.alphaNumbers[this.finalArray[x]];
        }
      }
      if(this.gameType === 4 || this.gameType === 9 || this.gameType === 14 || this.gameType === 19) {
        for(let x = 0; x < listOfSquareBoxes.length; x++) {
          listOfSquareBoxes[x].innerHTML = emoji.game.mixedArrays[this.finalArray[x]];
        }
      }
      if(this.gameType === 5 || this.gameType === 10 || this.gameType === 15 || this.gameType === 20) {
        for(let x = 0; x < listOfSquareBoxes.length; x++) {  
          listOfSquareBoxes[x].innerHTML = emoji.game.arrayOfNumbers[this.finalArray[x]];
        }
      }
  }

  revealClickedSquare(cssCLassName, index) {
    const emoji = new Emoji();
    const events = new Events();
    const listOfSquareBoxes = events.loopElementWithQuerySelectorAll(cssCLassName);

    if(this.gameType === 1 || this.gameType === 6 || this.gameType === 11 || this.gameType === 16) {
      listOfSquareBoxes[index].innerHTML = emoji.game.emoji[this.finalArray[index]];
    }
    if(this.gameType === 2 || this.gameType === 7 || this.gameType === 12 || this.gameType === 17) {
      listOfSquareBoxes[index].innerHTML = emoji.game.alphabLetters[this.finalArray[index]];
    }
    if(this.gameType === 3 || this.gameType === 8 || this.gameType === 13 || this.gameType === 18) {
      istOfSquareBoxes[index].innerHTML = emoji.game.alphaNumbers[this.finalArray[index]];
    }
    if(this.gameType === 4 || this.gameType === 9 || this.gameType === 14 || this.gameType === 19) {
      listOfSquareBoxes[index].innerHTML = emoji.game.mixedArrays[this.finalArray[index]];
    }
    if(this.gameType === 5 || this.gameType === 10 || this.gameType === 15 || this.gameType === 20) {
      listOfSquareBoxes[index].innerHTML = emoji.game.arrayOfNumbers[this.finalArray[index]];
    }
  }

  disableElementWhenMatches(cssClassName, indexOne, indexTwo) {
    const events =  new Events();
    const listOfSquareBoxes = events.loopElementWithQuerySelectorAll(cssClassName);
    const myTime = setInterval(() => {
      listOfSquareBoxes[indexOne].innerHTML = "";
      listOfSquareBoxes[indexOne].style.backgroundColor = "gray";
      listOfSquareBoxes[indexOne].style.disabled;
      listOfSquareBoxes[indexTwo].innerHTML = "";
      listOfSquareBoxes[indexTwo].style.backgroundColor = "gray";
      clearInterval(myTime);
    },200);
  }

  wipeElementWhenNoMatch(cssClassName) {
    const events = new Events();
    const listOfSquareBoxes = events.loopElementWithQuerySelectorAll(cssClassName);
    const myTime = setInterval(() => {
      for(let x = 0; x < listOfSquareBoxes.length; x++) {
        listOfSquareBoxes[x].innerHTML = "";
      }
      clearInterval(myTime);
    }, 200);
  }

  clearBoardAfterMemorizing() {
    const events = new Events();
    const listOfSquareBoxes = events.loopElementWithQuerySelectorAll(".box");
    for(let x = 0; x < listOfSquareBoxes.length; x++) {
      listOfSquareBoxes[x].innerHTML = "";
    }
  }

}

export { LoadGame }