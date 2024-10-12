document.addEventListener('DOMContentLoaded', () => { 
  const addOperationButton = document.getElementById('addOperationButton'); 
  const recalculateButton = document.getElementById('recalculateButton'); 
 
  addOperationButton.addEventListener('click', () => { 
    addOperation(); 
    sortOperations(); 
    checkOverlap(); 
    updateFalta(); 
    clearForm(); 
  }); 
 
  recalculateButton.addEventListener('click', () => { 
    updateFalta(); 
    sortOperations(); 
    checkOverlap(); 
  }); 
}); 
