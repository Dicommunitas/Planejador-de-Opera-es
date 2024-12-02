// updateFalta.js 
 
import { getOperations } from '../state/operations.js'; 
import { formatNumber } from '../utils/numberUtils.js'; 
 
export function updateFalta() { 
  const totalNavio = parseFloat(document.getElementById('totalNavio').value) || 0; 
  const totalOlapa = parseFloat(document.getElementById('totalOlapa').value) || 0; 
  const operations = getOperations(); 
  const operationsTable = document.querySelector('operations-table'); 
 
  if (!operationsTable) { 
    console.error('Componente operations-table não encontrado'); 
    return; 
  } 
 
  let faltaNavio = totalNavio; 
  let faltaOlapa = totalOlapa; 
 
  operations.forEach((operation, index) => { 
    const row = operationsTable.shadowRoot.querySelector(`#operationsTable tbody tr:nth-child(${index + 1})`); 
    if (!row) { 
      console.error(`Linha ${index + 1} não encontrada na tabela de operações`); 
      return; 
    } 
 
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

 
function updateTotalRestante(faltaNavio, faltaOlapa) { 
    const faltaElement = document.getElementById('faltaDisplay'); 
    if (faltaElement) { 
        faltaElement.textContent = `Falta para Navio: ${formatNumber(faltaNavio)} m³, Falta para Olapa: ${formatNumber(faltaOlapa)} m³`; 
    } 
} 
 
export function setupFaltaListeners() { 
    const totalNavioInput = document.getElementById('totalNavio'); 
    const totalOlapaInput = document.getElementById('totalOlapa'); 
 
    if (totalNavioInput && totalOlapaInput) { 
        [totalNavioInput, totalOlapaInput].forEach(input => { 
            input.addEventListener('change', updateFalta); 
        }); 
    } else { 
        console.error('Elementos de input para totais não encontrados'); 
    } 
} 
 
export default { 
    updateFalta, 
    setupFaltaListeners 
}; 
