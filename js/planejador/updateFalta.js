// updateFalta.js 
 
import { getOperations } from '../state/operations.js'; 
import { formatNumber } from '../utils/numberUtils.js'; 
 
/** 
 * Atualiza os valores de falta para navio e olapa na tabela de operações 
 * @param {number} totalNavio - Total programado para navio 
 * @param {number} totalOlapa - Total programado para olapa 
 */ 
export function updateFalta(totalNavio, totalOlapa) { 
  const operations = getOperations(); 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
 
  let faltaNavio = totalNavio; 
  let faltaOlapa = totalOlapa; 
 
  operations.forEach((operation, index) => { 
    const row = operationsTableBody.rows[index]; 
    row.classList.remove('navio', 'olapa'); 
     
    const volumeOperado = operation.volumeOperado; 
 
    if (operation.operationType === 'navio') { 
      faltaNavio -= volumeOperado; 
      row.classList.add('navio'); 
    } else if (operation.operationType === 'olapa') { 
      faltaOlapa -= volumeOperado; 
      row.classList.add('olapa'); 
    } 
 
    // Atualiza as células de falta na linha 
    row.cells[10].textContent = formatNumber(faltaNavio); 
    row.cells[11].textContent = formatNumber(faltaOlapa); 
  }); 
 
  // Atualiza o total restante 
  updateTotalRestante(faltaNavio, faltaOlapa); 
} 
 
/** 
 * Atualiza o display do total restante 
 * @param {number} faltaNavio - Falta restante para navio 
 * @param {number} faltaOlapa - Falta restante para olapa 
 */ 
function updateTotalRestante(faltaNavio, faltaOlapa) { 
  const totalRestanteElement = document.getElementById('totalRestante'); 
  if (totalRestanteElement) { 
    totalRestanteElement.textContent = `Restante: Navio ${formatNumber(faltaNavio)} m³, Olapa ${formatNumber(faltaOlapa)} m³`; 
  } 
} 
 
/** 
 * Configura os listeners para os inputs de total programado 
 */ 
export function setupFaltaListeners() { 
  const totalNavioInput = document.getElementById('totalNavio'); 
  const totalOlapaInput = document.getElementById('totalOlapa'); 
 
  [totalNavioInput, totalOlapaInput].forEach(input => { 
    input.addEventListener('change', () => { 
      const totalNavio = parseFloat(totalNavioInput.value) || 0; 
      const totalOlapa = parseFloat(totalOlapaInput.value) || 0; 
      updateFalta(totalNavio, totalOlapa); 
    }); 
  }); 
} 
 
export default { 
  updateFalta, 
  setupFaltaListeners 
}; 
