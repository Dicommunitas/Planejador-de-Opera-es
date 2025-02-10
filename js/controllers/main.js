/**
 * @fileoverview Descrição do arquivo
 * @author Seu Nome
 * @version 1.0.0
 */

// main.js 
 
import { loadOperations, sortOperations, calculateFalta, checkOverlap } from ../models/operations.js'; 
import { getInitialStockData, getCurrentStockData, updateStockDisplay } from ../models/stockData.js'; 
import { setupFaltaListeners, updateFalta } from ./updateFalta.js'; 
import { getFromLocalStorage } from './services/storage.js'; 
 
document.addEventListener('DOMContentLoaded', () => { 
    initializeComponents(); 
    loadInitialData(); 
    setupEventListeners(); 
}); 
 
function initializeComponents() { 
    const app = document.getElementById('app'); 
    app.innerHTML = ` 
        <stock-table></stock-table> 
        <div id="totals"> 
            <h2>Programação Total</h2> 
            <p>Insira os volumes totais programados. Use valores positivos para recebimento e negativos para envio.</p> 
            <label for="totalNavio">Total Programado para Navio (m³):</label> 
            <input type="number" id="totalNavio" value="0"> 
            <label for="totalOlapa">Total Programado para Olapa (m³):</label> 
            <input type="number" id="totalOlapa" value="0"> 
            <button id="recalculateButton">Recalcular Quantidades</button> 
        </div> 
        <div id="faltaDisplay"></div> 
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
 
    document.getElementById('recalculateButton').addEventListener('click', updateFalta); 
} 
 
function loadInitialData() { 
    loadOperations(); 
    const stockData = getFromLocalStorage('stockData') || []; 
    const selectedStockData = stockData.filter(item => item.selected); 
     
    document.querySelector('stock-table').updateData(selectedStockData, selectedStockData); 
    document.querySelector('operations-table').updateTable(); 
 
    updateStockDisplay(); 
    updateFalta(); 
} 
 
function handleOperationAdded() { 
    document.querySelector('operations-table').updateTable(); 
    updateFalta(); 
    updateStockDisplay(); 
  } 
   
  function handleOperationDeleted() { 
    document.querySelector('operations-table').updateTable(); 
    updateFalta(); 
    updateStockDisplay(); 
  } 
   
  function handleOperationCopied() { 
    document.querySelector('operations-table').updateTable(); 
    updateFalta(); 
    updateStockDisplay(); 
  } 
 
export { updateFalta }; 
