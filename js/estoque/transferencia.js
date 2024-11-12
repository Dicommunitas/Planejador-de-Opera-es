// transferencia.js 
 
import { getStockData } from '../state/stockData.js'; 
import { saveToLocalStorage } from '../services/storage.js'; 
 
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
      espacoRecebimento: parseFloat(row.cells[4].textContent) 
    }; 
  }); 
 
  if (dadosSelecionados.length === 0) { 
    alert('Por favor, selecione pelo menos um item para transferir.'); 
    return; 
  } 
 
  saveToLocalStorage('stockData', dadosSelecionados); 
   
  // Atualiza os dados do estoque global 
  const currentStockData = getStockData(); 
  const updatedStockData = currentStockData.map(item => { 
    const selectedItem = dadosSelecionados.find(selected => selected.tanque === item.tanque); 
    return selectedItem || item; 
  }); 
  saveToLocalStorage('stockData', updatedStockData); 
 
  alert('Dados transferidos com sucesso!'); 
  window.location.href = '../index.html'; 
} 
 
/** 
 * Atualiza o estado de seleção dos checkboxes 
 */ 
export function updateSelectionState() { 
  const checkboxes = document.querySelectorAll('#stockTable input[type="checkbox"]'); 
  const transferButton = document.getElementById('transferButton'); 
   
  checkboxes.forEach(checkbox => { 
    checkbox.addEventListener('change', () => { 
      const anyChecked = Array.from(checkboxes).some(cb => cb.checked); 
      transferButton.disabled = !anyChecked; 
    }); 
  }); 
 
  // Inicializa o estado do botão 
  transferButton.disabled = true; 
} 
 
export default { 
  setupTransferencia, 
  updateSelectionState 
}; 
