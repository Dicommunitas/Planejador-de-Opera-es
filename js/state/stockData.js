// stockData.js 
 
import { getOperations } from './operations.js'; 
 
// Chave para armazenamento no localStorage 
const INITIAL_STOCK_KEY = 'initialStockData'; 
 
// Função para salvar o estoque inicial 
export function saveInitialStockData(stockData) { 
  localStorage.setItem(INITIAL_STOCK_KEY, JSON.stringify(stockData)); 
} 
 
// Função para obter o estoque inicial 
export function getInitialStockData() { 
  const data = localStorage.getItem(INITIAL_STOCK_KEY); 
  return data ? JSON.parse(data) : []; 
} 

export function getStockData() {
  getCurrentStockData();
}
 
// Função para calcular o estoque final com base nas operações 
export function getCurrentStockData() { 
  const initialStock = getInitialStockData(); 
  const operations = getOperations(); 
 
  // Cria uma cópia profunda do estoque inicial 
  const currentStock = JSON.parse(JSON.stringify(initialStock)); 
 
  // Aplica todas as operações ao estoque atual 
  operations.forEach(operation => { 
    const tankIndex = currentStock.findIndex(item => item.tanque === operation.tanque); 
    if (tankIndex !== -1) { 
      if (operation.direction === 'receber') { 
        currentStock[tankIndex].disponivelEnvio += operation.volume; 
        currentStock[tankIndex].espacoRecebimento -= operation.volume; 
      } else { 
        currentStock[tankIndex].disponivelEnvio -= operation.volume; 
        currentStock[tankIndex].espacoRecebimento += operation.volume; 
      } 
    } 
  }); 
 
  return currentStock; 
} 

export function saveStockData() {
  updateStockDisplay()
}

export function updateCurrentStockDisplay() {
  updateStockDisplay()
}
 
// Função para atualizar o estoque exibido 
export function updateStockDisplay() { 
  const currentStock = getCurrentStockData(); 
  // Aqui você pode disparar um evento ou chamar uma função para atualizar a UI 
  document.dispatchEvent(new CustomEvent('stockUpdated', { detail: currentStock })); 
} 
 
// Função para obter dados de um tanque específico 
export function getTankData(tankName) { 
  const currentStock = getCurrentStockData(); 
  return currentStock.find(item => item.tanque === tankName); 
} 
 
// Função para validar se uma operação é possível 
export function validateOperation(tankName, volume, direction) { 
  const tankData = getTankData(tankName); 
  if (!tankData) return false; 
 
  if (direction === 'receber') { 
    return tankData.espacoRecebimento >= volume; 
  } else { 
    return tankData.disponivelEnvio >= volume; 
  } 
} 
