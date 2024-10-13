document.addEventListener('DOMContentLoaded', () => { 
  loadComponents(); 
  setupEventListeners(); 
  loadStockData(); 
  populateTankSelect(); 
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
    updateStockDisplay(); 
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
  updateStockDisplay(); 
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
 
function updateStockDisplay() { 
  const stockData = getStockData(); 
  const stockTableBody = document.querySelector('#stockDataTable tbody'); 
  stockTableBody.innerHTML = ''; 
 
  stockData.forEach(item => { 
    const row = stockTableBody.insertRow(); 
    row.innerHTML = ` 
      <td>${item.produto.trim()}</td> 
      <td>${item.tanque.trim()}</td> 
      <td>${item.disponivelEnvio.toFixed(2)}</td> 
      <td>${item.espacoRecebimento.toFixed(2)}</td> 
    `; 
  }); 
} 
 
// Função para salvar dados do estoque 
function saveStockData(stockData) { 
  const processedStockData = stockData.map(item => ({ 
    ...item, 
    disponivelEnvio: parseFloat(item.disponivelEnvio), 
    espacoRecebimento: parseFloat(item.espacoRecebimento), 
    produto: item.produto.trim(), 
    tanque: item.tanque.trim() 
  })); 
  localStorage.setItem('stockData', JSON.stringify(processedStockData)); 
  updateStockDisplay(); 
  populateTankSelect(); 
} 
 
// Função para obter dados do estoque 
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
