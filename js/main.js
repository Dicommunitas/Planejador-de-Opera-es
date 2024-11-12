// main.js 
 
import { loadOperations, sortOperations, calculateFalta, checkOverlap } from './state/operations.js'; 
import { getInitialStockData, getCurrentStockData, updateStockDisplay } from './state/stockData.js'; 
import { setupFaltaListeners } from './planejador/updateFalta.js'; 
 
document.addEventListener('DOMContentLoaded', () => { 
    initializeComponents(); 
    setupEventListeners(); 
    loadInitialData(); 
}); 
 
function initializeComponents() { 
     
    const app = document.getElementById('app'); 
    app.innerHTML = ` 
        <stock-table></stock-table> 
        <operation-form></operation-form> 
        <operations-table></operations-table> 
    `; 
} 
 
function setupEventListeners() { 
    const operationForm = document.querySelector('operation-form'); 
    const operationsTable = document.querySelector('operations-table'); 
    const stockTable = document.querySelector('stock-table'); 
 
    operationForm.addEventListener('operationAdded', handleOperationAdded); 
    operationsTable.addEventListener('operationDeleted', handleOperationDeleted); 
    operationsTable.addEventListener('operationCopied', handleOperationCopied); 
 
    setupFaltaListeners(); 
 
    document.addEventListener('stockUpdated', () => { 
        stockTable.updateData(); 
        operationsTable.updateTable(); 
    }); 
} 
 
function loadInitialData() { 
    loadOperations(); 
    const initialStock = getInitialStockData(); 
    const currentStock = getCurrentStockData(); 
     
    document.querySelector('stock-table').updateData(initialStock, currentStock); 
    document.querySelector('operations-table').updateTable(); 
 
    updateStockDisplay(); 
} 
 
function handleOperationAdded() { 
    sortOperations(); 
    checkOverlap(); 
    updateFalta(); 
    updateStockDisplay(); 
    document.querySelector('operations-table').updateTable(); 
} 
 
function handleOperationDeleted() { 
    updateFalta(); 
    updateStockDisplay(); 
    document.querySelector('operations-table').updateTable(); 
} 
 
function handleOperationCopied() { 
    sortOperations(); 
    checkOverlap(); 
    updateFalta(); 
    updateStockDisplay(); 
    document.querySelector('operations-table').updateTable(); 
} 
 
function updateFalta() { 
    const totalNavio = parseFloat(document.getElementById('totalNavio').value) || 0; 
    const totalOlapa = parseFloat(document.getElementById('totalOlapa').value) || 0; 
    const { faltaNavio, faltaOlapa } = calculateFalta(totalNavio, totalOlapa); 
     
    // Atualizar a exibição da falta (você pode adicionar elementos HTML para mostrar isso) 
    console.log(`Falta para Navio: ${faltaNavio}, Falta para Olapa: ${faltaOlapa}`); 
} 
 
export { updateFalta }; 
