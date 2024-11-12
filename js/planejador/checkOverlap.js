// checkOverlap.js 
 
import { getOperations } from '../state/operations.js'; 
import { isOverlapping } from '../utils/dateUtils.js'; 
 
/** 
 * Verifica sobreposições entre operações no mesmo tanque 
 * @returns {Array} Array de objetos representando as sobreposições encontradas 
 */ 
export function checkOverlap() { 
  const operations = getOperations(); 
  const overlaps = []; 
 
  for (let i = 0; i < operations.length; i++) { 
    for (let j = i + 1; j < operations.length; j++) { 
      if (operations[i].tank === operations[j].tank) { 
        if (isOverlapping( 
          operations[i].startTime, operations[i].endTime, 
          operations[j].startTime, operations[j].endTime 
        )) { 
          overlaps.push({ 
            operation1: operations[i], 
            operation2: operations[j] 
          }); 
        } 
      } 
    } 
  } 
 
  return overlaps; 
} 
 
/** 
 * Atualiza a UI para destacar operações sobrepostas 
 */ 
export function updateOverlapUI() { 
  const overlaps = checkOverlap(); 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
 
  // Remove todas as classes de sobreposição existentes 
  operationsTableBody.querySelectorAll('tr').forEach(row => { 
    row.classList.remove('encavalado'); 
  }); 
 
  // Adiciona a classe 'encavalado' às operações sobrepostas 
  overlaps.forEach(overlap => { 
    const row1 = operationsTableBody.querySelector(`tr[data-id="${overlap.operation1.id}"]`); 
    const row2 = operationsTableBody.querySelector(`tr[data-id="${overlap.operation2.id}"]`); 
    if (row1) row1.classList.add('encavalado'); 
    if (row2) row2.classList.add('encavalado'); 
  }); 
 
  // Exibe um alerta se houver sobreposições 
  if (overlaps.length > 0) { 
    alert(`Atenção: Foram detectadas ${overlaps.length} sobreposições de operações.`); 
  } 
} 
 
/** 
 * Inicializa os listeners para verificação de sobreposição 
 */ 
export function setupOverlapListeners() { 
  const addOperationButton = document.getElementById('addOperationButton'); 
  addOperationButton.addEventListener('click', updateOverlapUI); 
 
  // Adicione outros listeners conforme necessário, por exemplo, para edição de operações 
} 
 
export default { 
  checkOverlap, 
  updateOverlapUI, 
  setupOverlapListeners 
}; 
