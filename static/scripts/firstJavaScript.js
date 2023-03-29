"use strict";
import { BoardGame } from "../Module/ClassBoardGame.js";
import { Emoji } from "../Module/ClassEmoji.js";
import { Events } from "../Module/ClassEvents.js";
import { LoadGame } from "../Module/ClassLoadGame.js";
import { GameRules } from "../Module/ClassRules.js";

const events = new Events();
const loadNow = new LoadGame();
const board = new BoardGame();
const emoji = new Emoji();
const rules = new GameRules();

rules.countDownTime = 0;

events.createEventsByTargetingAllClass(".col-md-level", "click", loadMyGame, false);
rules.disabledButton("id-start-time", 0);

function startTimeNow() {
    rules.resetSquareColors(".box");
    rules.newGame = false;
    if(rules.fiveMinutes === 0 && rules.levelPlaying < 11) {
        events.createEventsByTargetingAllClass(".box", "click", getclickedElement, false);
        rules.countDownTime = 30;
        rules.WipeInfo("id-info");
        rules.disabledButton("id-start-time", 0);
        rules.MyGameTime("id-countdown");
        rules.saveLevelPlaying.push(rules.levelPlaying);
        rules.allowPalyerToPlay = true;
    }
    else {
        rules.fiveMinutes = 7;
        rules.allowPalyerToPlay = true;
        rules.fiveMinutesFunctionTime("id-info");
        events.createEventsByTargetingAllClass(".box", "click", getclickedElement, false);
        rules.countDownTime = 60;
        rules.WipeInfo("id-info");
        rules.disabledButton("id-start-time", 0);
        loadNow.populateBoardWithArrayNumber(".box");
        rules.saveLevelPlaying.push(rules.levelPlaying);
    }
}

function getclickedElement(clickedCell) {

    if(rules.fiveMinutes === 0 && rules.allowPalyerToPlay === true) {
        rules.WipeInfo("id-info");
        const cellValue = clickedCell.target;
        const cellIndex = parseInt(cellValue.getAttribute('cell-index'));
        if(rules.stopTwiceClick(cellIndex)) {
            if(rules.allowToPlay(cellIndex)) {
                if(rules.fillMyArray(loadNow.finalArray[cellIndex])) {
                    loadNow.revealClickedSquare(".box", cellIndex);
                    rules.fillUpMyArrayForDisableBox(cellIndex);
                    if(rules.checkIfArrayGotTwonumber()) {
                        if(rules.checkIfMatchNumber()) {
                            loadNow.disableElementWhenMatches(".box",rules.myForDisabledBox[0], rules.myForDisabledBox[1]);
                            document.getElementById("id-info").innerHTML = "Perfect Match";
                            rules.scores("id-scores");
                            rules.wipeArrays();
                        }   else {
                            loadNow.wipeElementWhenNoMatch(".box");
                            document.getElementById("id-info").innerHTML = "Wrong Match";
                            rules.wipeArrays();
                        }
                    }  
                }
            }
        }
    }
}

function loadMyGame(clickedCell) {
    if(rules.newGame === true) {
        document.getElementById("id-scores").innerHTML = "00";
        events.createEventByTargetingId("id-start-time", "click", startTimeNow, false);
        const cellValue = clickedCell.target;
        const cellIndex = parseInt(cellValue.getAttribute('data-cell-index'));
        loadNow.gameType = cellIndex;
        rules.disabledButton("id-start-time",1);
        rules.levelPlaying = cellIndex;

        if(cellIndex > 0 && cellIndex <= 5) {
            rules.fiveMinutes = 0;
            board.findIfThereIsClass("id-board-game", "board-game-one");
            board.buildBoard("id-board-game", "box", 4, 4);
            loadNow.populateArrayWithNumber(8);  
        }
        if(cellIndex > 5 && cellIndex <= 10) {
            rules.fiveMinutes = 0;
            board.findIfThereIsClass("id-board-game", "board-game-two");
            board.buildBoard("id-board-game", "box", 5, 4);
            loadNow.populateArrayWithNumber(10);
        }
        if(cellIndex > 10 && cellIndex <= 15) {
            board.findIfThereIsClass("id-board-game", "board-game-three");
            board.buildBoard("id-board-game", "box", 5, 6);
            loadNow.populateArrayWithNumber(15);
        }
        if(cellIndex > 15 && cellIndex <= 20) {
            board.findIfThereIsClass("id-board-game", "board-game-four");
            board.buildBoard("id-board-game", "box", 7, 6);
            loadNow.populateArrayWithNumber(21);
        }
    }
}
