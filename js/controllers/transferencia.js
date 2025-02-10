/**
 * @fileoverview Descrição do arquivo
 * @author Seu Nome
 * @version 1.0.0
 */

// transferencia.js 
 
import { getStockData } from '../models/stockData.js'; 
import { saveToLocalStorage, getFromLocalStorage } from '../services/storage.js'; 
 
/** 
 * Configura o evento de clique para o botão de transferência 
 */ 
export function setupTransferencia() { 
  const transferButton = document.getElementById('transferButton'); 
  transferButton.addEventListener('click', transferirDadosSelecionados); 
} 
 
/** 
 * Transfere os dados selecionados para o planejador 
 */ 
function transferirDadosSelecionados() { 
  const checkboxes = document.querySelectorAll('#stockTable input[type="checkbox"]:checked'); 
  const dadosSelecionados = Array.from(checkboxes).map(checkbox => { 
      const row = checkbox.closest('tr'); 
      return { 
          produto: row.cells[1].textContent, 
          tanque: row.cells[2].textContent, 
          disponivelEnvio: parseFloat(row.cells[3].textContent), 
          espacoRecebimento: parseFloat(row.cells[4].textContent), 
          selected: true 
      }; 
  }); 

  if (dadosSelecionados.length === 0) { 
      alert('Por favor, selecione pelo menos um item para transferir.'); 
      return; 
  } 

  saveToLocalStorage('stockData', dadosSelecionados); 

  alert('Dados transferidos com sucesso!'); 
  window.location.href = '../index.html'; 
} 

 
/** 
 * Atualiza o estado de seleção dos checkboxes 
 */ 
export function updateSelectionState() { 
  const checkboxes = document.querySelectorAll('#stockTable input[type="checkbox"]'); 
  const transferButton = document.getElementById('transferButton'); 
  const stockData = getFromLocalStorage('stockData') || []; 
   
  checkboxes.forEach(checkbox => { 
    const row = checkbox.closest('tr'); 
    const tanque = row.cells[2].textContent; 
    const item = stockData.find(i => i.tanque === tanque); 
    if (item) { 
      checkbox.checked = item.selected; 
    } 
     
    checkbox.addEventListener('change', (event) => { 
      const anyChecked = Array.from(checkboxes).some(cb => cb.checked); 
      transferButton.disabled = !anyChecked; 
 
      // Atualiza o estado de seleção no localStorage 
      const updatedStockData = stockData.map(i => { 
        if (i.tanque === tanque) { 
          return { ...i, selected: event.target.checked }; 
        } 
        return i; 
      }); 
      saveToLocalStorage('stockData', updatedStockData); 
    }); 
  }); 
 
  // Inicializa o estado do botão 
  const anyChecked = Array.from(checkboxes).some(cb => cb.checked); 
  transferButton.disabled = !anyChecked; 
} 
 
export default { 
  setupTransferencia, 
  updateSelectionState 
}; 
