// operations.js 
 
import { validateOperation, getTankData, updateStockDisplay } from './stockData.js'; 
import { saveToLocalStorage, getFromLocalStorage } from '../services/storage.js'; 
 
const OPERATIONS_KEY = 'plannedOperations'; 
 
let operations = []; 
 
// Carregar operações do localStorage 
export function loadOperations() { 
  operations = getFromLocalStorage(OPERATIONS_KEY) || []; 
} 
 
// Salvar operações no localStorage 
function saveOperations() { 
  saveToLocalStorage(OPERATIONS_KEY, operations); 
} 
 
// Obter todas as operações 
export function getOperations() { 
  return [...operations]; 
} 
 
// Adicionar uma nova operação 
export function addOperation(operationData) { 
  const { tank, volume, flowRate, direction, operationType, startTime } = operationData; 
   
  if (!validateOperation(tank, volume, direction)) { 
    throw new Error('Operação inválida: volume excede a capacidade do tanque'); 
  } 
 
  const tankData = getTankData(tank); 
  const startDateTime = new Date(startTime); 
  const endDateTime = new Date(startDateTime.getTime() + (volume / flowRate) * 60 * 60 * 1000); 
 
  const newOperation = { 
    id: Date.now(), // Identificador único 
    tank, 
    produto: tankData.produto, 
    volume, 
    flowRate, 
    direction, 
    operationType, 
    startTime: startDateTime, 
    endTime: endDateTime, 
    volumeOperado: direction === 'receber' ? volume : -volume 
  }; 
 
  operations.push(newOperation); 
  saveOperations(); 
  updateStockDisplay(); 
 
  return newOperation; 
} 
 
// Remover uma operação 
export function deleteOperation(operationId) { 
  operations = operations.filter(op => op.id !== operationId); 
  saveOperations(); 
  updateStockDisplay(); 
} 
 
// Atualizar uma operação existente 
export function updateOperation(operationId, updatedData) { 
  const index = operations.findIndex(op => op.id === operationId); 
  if (index !== -1) { 
    operations[index] = { ...operations[index], ...updatedData }; 
    saveOperations(); 
    updateStockDisplay(); 
  } 
} 
 
// Copiar uma operação 
export function copyOperation(operationId) { 
  const operationToCopy = operations.find(op => op.id === operationId); 
  if (operationToCopy) { 
    const newOperation = { ...operationToCopy, id: Date.now() }; 
    operations.push(newOperation); 
    saveOperations(); 
    updateStockDisplay(); 
    return newOperation; 
  } 
  return null; 
} 
 
// Ordenar operações por data de início 
export function sortOperations() { 
  operations.sort((a, b) => a.startTime - b.startTime); 
  saveOperations(); 
} 
 
// Calcular falta para navio e olapa 
export function calculateFalta(totalNavio, totalOlapa) { 
  let faltaNavio = totalNavio; 
  let faltaOlapa = totalOlapa; 
 
  operations.forEach(op => { 
    if (op.operationType === 'navio') { 
      faltaNavio -= op.volumeOperado; 
    } else if (op.operationType === 'olapa') { 
      faltaOlapa -= op.volumeOperado; 
    } 
  }); 
 
  return { faltaNavio, faltaOlapa }; 
} 
 
// Verificar sobreposição de operações 
export function checkOverlap() { 
  const overlaps = []; 
  for (let i = 0; i < operations.length; i++) { 
    for (let j = i + 1; j < operations.length; j++) { 
      if (operations[i].tank === operations[j].tank) { 
        if ( 
          (operations[i].startTime <= operations[j].endTime && operations[i].endTime >= operations[j].startTime) || 
          (operations[j].startTime <= operations[i].endTime && operations[j].endTime >= operations[i].startTime) 
        ) { 
          overlaps.push([operations[i].id, operations[j].id]); 
        } 
      } 
    } 
  } 
  return overlaps; 
} 
 
// Inicializar o módulo 
loadOperations(); 
 
export default { 
  getOperations, 
  addOperation, 
  deleteOperation, 
  updateOperation, 
  copyOperation, 
  sortOperations, 
  calculateFalta, 
  checkOverlap 
}; 
