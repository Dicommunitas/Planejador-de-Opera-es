// storage.js 
 
const INITIAL_STOCK_KEY = 'initialStockData'; 
const OPERATIONS_KEY = 'plannedOperations'; 
 
/** 
 * Salva dados no localStorage 
 * @param {string} key - A chave para armazenar os dados 
 * @param {any} data - Os dados a serem armazenados 
 */ 
export function saveToLocalStorage(key, data) { 
  try { 
    const serializedData = JSON.stringify(data); 
    localStorage.setItem(key, serializedData); 
  } catch (error) { 
    console.error('Erro ao salvar no localStorage:', error); 
  } 
} 
 
/** 
 * Recupera dados do localStorage 
 * @param {string} key - A chave dos dados a serem recuperados 
 * @returns {any} Os dados recuperados ou null se não existirem 
 */ 
export function getFromLocalStorage(key) { 
  try { 
    const serializedData = localStorage.getItem(key); 
    return serializedData ? JSON.parse(serializedData) : null; 
  } catch (error) { 
    console.error('Erro ao recuperar do localStorage:', error); 
    return null; 
  } 
} 
 
/** 
 * Salva o estoque inicial 
 * @param {Array} stockData - Os dados do estoque inicial 
 */ 
export function saveInitialStock(stockData) { 
  saveToLocalStorage(INITIAL_STOCK_KEY, stockData); 
} 
 
/** 
 * Recupera o estoque inicial 
 * @returns {Array} Os dados do estoque inicial ou um array vazio se não existirem 
 */ 
export function getInitialStock() { 
  return getFromLocalStorage(INITIAL_STOCK_KEY) || []; 
} 
 
/** 
 * Salva as operações planejadas 
 * @param {Array} operations - As operações planejadas 
 */ 
export function saveOperations(operations) { 
  saveToLocalStorage(OPERATIONS_KEY, operations); 
} 
 
/** 
 * Recupera as operações planejadas 
 * @returns {Array} As operações planejadas ou um array vazio se não existirem 
 */ 
export function getOperations() { 
  return getFromLocalStorage(OPERATIONS_KEY) || []; 
} 
 
/** 
 * Limpa todos os dados armazenados 
 */ 
export function clearAllData() { 
  localStorage.removeItem(INITIAL_STOCK_KEY); 
  localStorage.removeItem(OPERATIONS_KEY); 
} 
 
export default { 
  saveInitialStock, 
  getInitialStock, 
  saveOperations, 
  getOperations, 
  clearAllData 
}; 
