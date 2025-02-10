/**
 * @fileoverview Descrição do arquivo
 * @author Seu Nome
 * @version 1.0.0
 */

// addOperation.js 
 
import { getStockData, saveStockData } from '../models/stockData.js'; 
import { addOperation as addOperationToState } from '../models/operations.js'; 
import { validateOperation } from '../utils/validation.js'; 
import { formatDateBR } from '../utils/dateUtils.js'; 
import { updateFalta } from './updateFalta.js'; 
import { sortOperations } from './sortOperations.js'; 
import { checkOverlap } from './checkOverlap.js'; 
 
export function addOperation() { 
  console.log('Função addOperation iniciada'); 
 
  const formData = getFormData(); 
  console.log('Dados coletados:', formData); 
 
  const validationResult = validateOperation(formData); 
  if (!validationResult.isValid) { 
    alert(validationResult.errors.join('\n')); 
    return; 
  } 
 
  const stockData = getStockData(); 
  console.log('Dados do estoque recuperados:', stockData); 
 
  const tankData = stockData.find(item => item.tanque.trim() === formData.tank.trim()); 
  if (!tankData) { 
    alert('Dados do tanque não encontrados.'); 
    return; 
  } 
 
  const result = addOperationToState(formData); 
  if (!result.success) { 
    alert(result.error); 
    return; 
  } 
 
  updateUI(result.operation, tankData); 
  updateStockData(tankData, formData); 
  updateFalta(); 
  sortOperations(); 
  checkOverlap(); 
 
  console.log('Função addOperation concluída'); 
} 
 
 
function getFormData() { 
  const operationForm = document.querySelector('operation-form'); 
  if (!operationForm) { 
    console.error('Componente operation-form não encontrado'); 
    return null; 
  } 
  return operationForm.getFormData(); 
} 
 
function checkTankCapacity(tankData, formData) { 
  if (formData.direction === 'enviar' && formData.volume > tankData.disponivelEnvio) { 
    alert(`Volume excede a capacidade disponível para envio (${tankData.disponivelEnvio.toFixed(2)} m³).`); 
    return false; 
  } 
 
  if (formData.direction === 'receber' && formData.volume > tankData.espacoRecebimento) { 
    alert(`Volume excede o espaço disponível para recebimento (${tankData.espacoRecebimento.toFixed(2)} m³).`); 
    return false; 
  } 
 
  return true; 
} 
 
function calculateEndTime(formData) { 
  const startTime = new Date(formData.startTime); 
  return new Date(startTime.getTime() + (formData.volume / formData.flowRate) * 60 * 60 * 1000); 
} 
 
function updateUI(newOperation, tankData) { 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
  if (operationsTableBody) { 
    const newRow = createOperationRow(newOperation, tankData); 
    operationsTableBody.appendChild(newRow); 
    console.log('Nova linha adicionada à tabela'); 
    console.log('Conteúdo da nova linha:', newRow.innerHTML); 
  } else { 
    console.error('Elemento #operationsTable tbody não encontrado'); 
  } 
} 
 
function createOperationRow(operation, tankData) { 
  const row = document.createElement('tr'); 
  row.innerHTML = ` 
    <td>${tankData.produto}</td> 
    <td>${operation.tank}</td> 
    <td>${tankData.disponivelEnvio.toFixed(2)}</td> 
    <td>${tankData.espacoRecebimento.toFixed(2)}</td> 
    <td>${operation.flowRate.toFixed(2)}</td> 
    <td>${operation.direction}</td> 
    <td>${operation.operationType}</td> 
    <td>${formatDateBR(operation.startTime)}</td> 
    <td>${formatDateBR(operation.endTime)}</td> 
    <td>${operation.volumeOperado.toFixed(2)}</td> 
    <td>0</td> 
    <td>0</td> 
    <td> 
      <button class="copyOperation" data-id="${operation.id}">Copiar</button> 
      <button class="deleteOperation" data-id="${operation.id}">Deletar</button> 
    </td> 
  `; 
  return row; 
} 
 
function updateStockData(tankData, formData) { 
  if (formData.direction === 'enviar') { 
    tankData.disponivelEnvio -= formData.volume; 
    tankData.espacoRecebimento += formData.volume; 
  } else { 
    tankData.disponivelEnvio += formData.volume; 
    tankData.espacoRecebimento -= formData.volume; 
  } 
  saveStockData(getStockData()); 
} 
 

export default addOperation; 
