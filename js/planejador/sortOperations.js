// sortOperations.js  
  
import { saveOperations } from '../state/operations.js';
import { getOperations } from '../state/operations.js';
import { parseDateBR } from '../utils/dateUtils.js';  
  
/**  
 * Ordena as operações por data de início  
 */  
export function sortOperations() {  
  console.log('Iniciando ordenação das operações');  
  const operations = getOperations();  

  
  operations.sort((a, b) => {  
    const aStartTime = new Date(a.startTime);  
    const bStartTime = new Date(b.startTime);  
    return aStartTime - bStartTime;  
  });  
  
  saveOperations(operations);  
  updateOperationsTable(operations);  
  console.log('Ordenação concluída');  
}  
  
/**  
 * Atualiza a tabela de operações com as operações ordenadas  
 * @param {Array} operations - Array de operações ordenadas  
 */  
function updateOperationsTable(operations) {  
  const operationsTableBody = document.querySelector('#operationsTable tbody');  
  if (!operationsTableBody) {  
    console.error('Tabela de operações não encontrada');  
    return;  
  }  
  
  operationsTableBody.innerHTML = '';  
  operations.forEach(operation => {  
    const row = createOperationRow(operation);  
    operationsTableBody.appendChild(row);  
  });  
}  
  
/**  
 * Cria uma linha da tabela para uma operação  
 * @param {Object} operation - Dados da operação  
 * @returns {HTMLTableRowElement} Elemento TR com os dados da operação  
 */  
function createOperationRow(operation) {  
  const row = document.createElement('tr');  
  row.innerHTML = `  
    <td>${operation.produto}</td>  
    <td>${operation.tank}</td>  
    <td>${operation.disponivelEnvio.toFixed(2)}</td>  
    <td>${operation.espacoRecebimento.toFixed(2)}</td>  
    <td>${operation.flowRate.toFixed(2)}</td>  
    <td>${operation.direction}</td>  
    <td>${operation.operationType}</td>  
    <td>${formatDateForDisplay(operation.startTime)}</td>  
    <td>${formatDateForDisplay(operation.endTime)}</td>  
    <td>${operation.volumeOperado.toFixed(2)}</td>  
    <td>${operation.faltaNavio.toFixed(2)}</td>  
    <td>${operation.faltaOlapa.toFixed(2)}</td>  
    <td>  
      <button class="copyOperation" data-id="${operation.id}">Copiar</button>  
      <button class="deleteOperation" data-id="${operation.id}">Deletar</button>  
    </td>  
  `;  
  return row;  
}  
  
/**  
 * Formata uma data para exibição  
 * @param {Date|string} date - A data a ser formatada  
 * @returns {string} A data formatada como string  
 */  
function formatDateForDisplay(date) {  
  const dateObj = date instanceof Date ? date : new Date(date);  
  return dateObj.toLocaleString('pt-BR', {  
    year: 'numeric',  
    month: '2-digit',  
    day: '2-digit',  
    hour: '2-digit',  
    minute: '2-digit',  
    hour12: false  
  });  
}  
  
export default sortOperations;  
 