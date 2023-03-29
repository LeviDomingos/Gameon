
import { LoadGame } from "./ClassLoadGame.js";
import { Events } from "./ClassEvents.js";

class GameRules  {
  constructor() {
    this.myArray = [];
    this.myForDisabledBox = [];
    this.saveClcik =[];
    this.saveTwiceClick =[];
    this.newGame = true;
    this.countDownTime = this.countDownTime;
    this.fiveMinutes = this.fiveMinutes;
    this.stopFiveMinutesClock = 0;
    this.stopClock = 0;
    this.addScores = 0;
    this.perfectMatchtime = 0;
    this.levelPlaying =this.levelPlaying;
    this.saveLevelPlaying = [];
    this.allowPalyerToPlay = true;
  }

  resetAllArrays() {
    this.myArray = [];
    this.myForDisabledBox = [];
    this.saveClcik =[];
    this.saveTwiceClick =[];
    this.saveLevelPlaying = [];
    this.allowPalyerToPlay = false;
    this.fiveMinutes = 0;
    this.addScores = 0;
    const load = new LoadGame();
    load.clearBoardAfterMemorizing();
    clearInterval(this.stopClock);    
  }

  scores(id) {
    document.getElementById(id).innerHTML = this.addScores += 20;  
  }

  stopTwiceClick(index) {
    if(this.saveTwiceClick.length === 0) {
      this.saveTwiceClick.push(index);
      return true;
    }
    else {
      if(this.saveTwiceClick[0] === index) {
        return false;
      }
      else {

        this.saveTwiceClick = [];
        return true;
      }
    }
  }

  fillUpMyArrayForDisableBox(index) {
    this.myForDisabledBox.push(index);
  }

  fillMyArray(index) {
    if(this.myArray.length === 0) {
      this.myArray.push(index);
      return true;
    }
    else {
      if(this.myArray.length === 1) {
        this.myArray.push(index);
        return true;
      }
    }
  }

  allowToPlay(index) {
    if(this.saveClcik.length === 0) {
      return true;
    }
    else {
      for(let x = 0; x < this.saveClcik.length; x++) {
        if(this.saveClcik[x] === index) {
          return false;
        }
        else {
          if(x === this.saveClcik.length -1 ) {
            return true;
          }
        }
      }
    }
  }

  checkIfArrayGotTwonumber() {
    if(this.myArray.length === 2) {
      return true;
    }
  }

  checkIfMatchNumber() {
    if(this.myArray[0] === this.myArray[1]) {
      this.saveClcik.push(this.myForDisabledBox[0]);
      this.saveClcik.push(this.myForDisabledBox[1]);
      return true;
    }   
  }

  checkIfGaveIsOver() {
    const element = document.querySelectorAll(".box");
    if(this.saveClcik.length === element.length) {
      return true;
    }
  }

  wipeArrays() {   
    this.myArray = [];
    this.myForDisabledBox = [];
  }

  fiveMinutesFunctionTime(id) {
    const stopFiveMinutesClock = setInterval(() => {
      document.getElementById(id).innerText = "You have " + this.fiveMinutes + " Seconds to Memorize The board";
      this.fiveMinutes--;
      if(this.fiveMinutes === 0) {
        clearInterval(stopFiveMinutesClock);
        document.getElementById(id).innerHTML = "";
        const load = new LoadGame();
        load.clearBoardAfterMemorizing();
        this.MyGameTime("id-countdown");
      }
    },1000);
  }

  MyGameTime(id) {
    this.stopClock =  setInterval(() => {
      this.countDownTime--;
      document.getElementById(id).innerHTML = this.countDownTime;
      this.scoreResult();
    }, 1000);
  }

  checkIfslectedSameLevelAgain(level) {
    for(let x = 0; x < this.saveLevelPlaying.length; x++) {
      if(this.saveLevelPlaying[x] === level) {
        return true;
      }
    }
  }

  scoreResult() {
    if(this.countDownTime === 0 ) {
      this.disableBoxAndLeaveOnlyFailedGame(this.levelPlaying);
      this.disabledButton("id-start-time", 1);
      document.getElementById("id-info").innerHTML = "Sorry You Failed. Try Again Level: " + this.levelPlaying;
      this.resetAllArrays();
      
    } else {
        if(this.countDownTime > 10 && this.checkIfGaveIsOver()) {
          this.newGame = true;
          this.disabledButton("id-start-time", 0);
          document.getElementById("id-info").innerHTML = "Well Done. Next Level";
          this.resetAllArrays();
        } else {
        if(this.checkIfGaveIsOver()) {
          this.disableBoxAndLeaveOnlyFailedGame(this.levelPlaying);
          this.disabledButton("id-start-time", 1);
          document.getElementById("id-info").innerHTML = "Try Again Level: " + this.levelPlaying; 
          this.resetAllArrays();
        }
      }
    }
  }

  WipeInfo(id) { //after showing info then wipes it wheter wrong or right 
    document.getElementById(id).innerHTML = "";
  }

  disabledButton(id, condition) { // disables the start button
    if(condition === 0) {
      document.getElementById(id).disabled = true;
    }
    if(condition === 1) {
      document.getElementById(id).disabled = false;
    }
  }

  disableBoxAndLeaveOnlyFailedGame(level) {
    const events = new Events();
    const elements = events.loopElementWithQuerySelectorAll(".col-md-level");
    for(let x = 0; x < elements.length; x++) {
      if(elements[x].getAttribute("data-cell-index") !== level ) {
        elements[x].disabled = true;
      }
    }
  }

  resetSquareColors(id) { // when the game finished than reset the backgroundcolor back to normal again
    const events = new Events();
    const elements = events.loopElementWithQuerySelectorAll(id);
    for(let x = 0; x < elements.length; x++) {
      elements[x].style.backgroundColor = "white";
      elements[x].innerHTML = "";
    }
  }
}

export { GameRules }
