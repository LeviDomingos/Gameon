
class Events {
  constructor() {
  }

  createEventByTargetingId(targetId, typeOfEvent, methodoOrFunction) {
    document.getElementById(targetId).addEventListener(typeOfEvent, methodoOrFunction);   
  }
  
  createEventsByTargetingAllClass(targetAllClass, typeOfEvent, methodoOrFunction) { 
    document.querySelectorAll(targetAllClass).forEach(cell=> cell.addEventListener(typeOfEvent, methodoOrFunction))
  }  

  loopElementWithQuerySelectorAll(cssClass) {
    return document.querySelectorAll(cssClass);
  }
  
  addEventToanyElement(type, selector, callback) {
    document.addEventListener(type, e => {
      if(e.target.matches(selector)) { 
        callback(e);
      }
   });
  }
}

export { Events }