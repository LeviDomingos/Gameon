class BoardGame {
  constructor() { 
    this.increment = 0;
  }

  buildBoard(id, cssSquareBox, row, col) {
    this.increment = 0;
    for(let x = 0; x < row; x++) {
      for(let i = 0; i < col; i++) {
        const element = document.createElement("div");
        element.setAttribute("cell-index", this.squareIndex());
        element.classList.add(cssSquareBox);
        document.getElementById(id).append(element);
      }
    }
  }
  
  findIfThereIsClass(id, cssGridClassName) {
    const child = document.getElementById(id);
    if(child.className === "") {
      this.removeChildrenElement("id-board-game");
      child.classList.add(cssGridClassName);
    }
    else {
      this.removeChildrenElement("id-board-game");
      child.className = "";
      child.classList.add(cssGridClassName);
    }
  }

  removeChildrenElement(id) {
    const list = document.getElementById(id);
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  } 

  squareIndex = () => this.increment++;
}

export { BoardGame }