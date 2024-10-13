document.addEventListener('DOMContentLoaded', () => { 
  loadComponents(); 
  setupEventListeners(); 
  loadStockData(); 
}); 
 
function loadComponents() { 
  fetch('components/header.html') 
    .then(response => response.text()) 
    .then(data => { 
      document.getElementById('header').innerHTML = data; 
    }); 
 
  fetch('components/footer.html') 
    .then(response => response.text()) 
    .then(data => { 
      document.getElementById('footer').innerHTML = data; 
    }); 
} 
 
function setupEventListeners() { 
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
} 
 
function loadStockData() { 
  const stockData = JSON.parse(localStorage.getItem('stockData') || '[]'); 
  const stockTableBody = document.querySelector('#stockDataTable tbody'); 
 
  stockData.forEach(item => { 
    const row = stockTableBody.insertRow(); 
    row.insertCell(0).textContent = item.produto; 
    row.insertCell(1).textContent = item.tanque; 
    row.insertCell(2).textContent = item.disponivelEnvio; 
    row.insertCell(3).textContent = item.espacoRecebimento; 
  }); 
 
  localStorage.removeItem('stockData'); 
} 
