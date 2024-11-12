document.addEventListener('DOMContentLoaded', () => { 
  setupEventListeners(); 
  loadStockData(); 
  populateTankSelect(); 
}); 
  
function setupEventListeners() { 
  const addOperationButton = document.getElementById('addOperationButton'); 
  const recalculateButton = document.getElementById('recalculateButton'); 
 
  addOperationButton.addEventListener('click', () => { 
    addOperation(); 
    sortOperations(); 
    checkOverlap(); 
    updateFalta(); 
    updateCurrentStockDisplay(); 
    clearForm(); 
  }); 
 
  recalculateButton.addEventListener('click', () => { 
    updateFalta(); 
    sortOperations(); 
    checkOverlap(); 
  }); 
} 
 
function loadStockData() { 
  const stockData = getStockData(); 
  updateInitialStockDisplay(stockData); 
  updateCurrentStockDisplay(stockData); 
  console.log('Dados do estoque carregados:', stockData); 
} 
 
function populateTankSelect() { 
  const tankSelect = document.getElementById('tank'); 
  const stockData = getStockData(); 
    
  tankSelect.innerHTML = '<option value="">Selecione um tanque</option>'; 
  stockData.forEach(item => { 
    const option = document.createElement('option'); 
    option.value = item.tanque.trim(); 
    option.textContent = `${item.tanque.trim()} - ${item.produto.trim()}`; 
    tankSelect.appendChild(option); 
  }); 
} 
 
function updateInitialStockDisplay(stockData) { 
  updateStockTable('#initialStockDataTable', stockData); 
} 
 
function updateCurrentStockDisplay() { 
  const currentStockData = getStockData(); 
  updateStockTable('#currentStockDataTable', currentStockData); 
} 
 
function updateStockTable(tableSelector, stockData) { 
  const stockTableBody = document.querySelector(`${tableSelector} tbody`); 
  stockTableBody.innerHTML = ''; 
 
  stockData.forEach(item => { 
    const row = stockTableBody.insertRow(); 
    row.innerHTML = ` 
      <td>${item.produto.trim()}</td> 
      <td>${item.tanque.trim()}</td> 
      <td>${parseFloat(item.disponivelEnvio).toFixed(2)}</td> 
      <td>${parseFloat(item.espacoRecebimento).toFixed(2)}</td> 
    `; 
  }); 
} 
 
function saveStockData(stockData) { 
  const processedStockData = stockData.map(item => ({ 
    ...item, 
    disponivelEnvio: parseFloat(item.disponivelEnvio), 
    espacoRecebimento: parseFloat(item.espacoRecebimento), 
    produto: item.produto.trim(), 
    tanque: item.tanque.trim() 
  })); 
  localStorage.setItem('stockData', JSON.stringify(processedStockData)); 
  updateCurrentStockDisplay(); 
  populateTankSelect(); 
} 
 
function getStockData() { 
  const stockData = JSON.parse(localStorage.getItem('stockData') || '[]'); 
  return stockData.map(item => ({ 
    ...item, 
    disponivelEnvio: parseFloat(item.disponivelEnvio), 
    espacoRecebimento: parseFloat(item.espacoRecebimento), 
    produto: item.produto.trim(), 
    tanque: item.tanque.trim() 
  })); 
} 
 
function saveInitialStockData(stockData) { 
  localStorage.setItem('initialStockData', JSON.stringify(stockData)); 
} 
 
function getInitialStockData() { 
  return JSON.parse(localStorage.getItem('initialStockData') || '[]'); 
} 
