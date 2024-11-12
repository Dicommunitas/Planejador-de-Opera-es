// addOperation.js 
 
import { getStockData, saveStockData } from '../state/stockData.js'; 
import { addOperation as addOperationToState } from '../state/operations.js'; 
import { validateOperation } from '../utils/validation.js'; 
import { formatDateBR } from '../utils/dateUtils.js'; 
import { updateFalta } from './updateFalta.js'; 
import { sortOperations } from './sortOperations.js'; 
import { checkOverlap } from './checkOverlap.js'; 
 
export function addOperation() { 
  console.log('Função addOperation iniciada'); 
 
  // 1. Coleta os dados do formulário 
  const formData = getFormData(); 
 
  console.log('Dados coletados:', formData); 
 
  // 2. Valida os dados 
  const validationResult = validateOperation(formData); 
  if (!validationResult.isValid) { 
    alert(validationResult.errors.join('\n')); 
    return; 
  } 
 
  // 3. Verifica a capacidade do tanque 
  const stockData = getStockData(); 
  console.log('Dados do estoque recuperados:', stockData); 
 
  const tankData = stockData.find(item => item.tanque.trim() === formData.tank.trim()); 
  if (!tankData) { 
    alert('Dados do tanque não encontrados.'); 
    return; 
  } 
 
  if (!checkTankCapacity(tankData, formData)) { 
    return; 
  } 
 
  // 4. Calcula o horário de término 
  const endTime = calculateEndTime(formData); 
 
  // 5. Adiciona a operação ao estado 
  const newOperation = addOperationToState({ 
    ...formData, 
    produto: tankData.produto, 
    endTime, 
    volumeOperado: formData.direction === 'receber' ? formData.volume : -formData.volume 
  }); 
 
  // 6. Atualiza a UI 
  updateUI(newOperation, tankData); 
 
  // 7. Atualiza os dados de estoque 
  updateStockData(tankData, formData); 
 
  // 8. Atualiza cálculos e exibições 
  updateFalta(); 
  sortOperations(); 
  checkOverlap(); 
 
  console.log('Função addOperation concluída'); 
} 
 
function getFormData() { 
  return { 
    tank: document.getElementById('tank').value, 
    volume: parseFloat(document.getElementById('volume').value), 
    flowRate: parseFloat(document.getElementById('flowRate').value), 
    direction: document.getElementById('direction').value, 
    operationType: document.getElementById('operationType').value, 
    startTime: new Date(document.getElementById('startTime').value) 
  }; 
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
  return new Date(formData.startTime.getTime() + (formData.volume / formData.flowRate) * 60 * 60 * 1000); 
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
