// visualizacao.js 
 
import { getStockData } from '../state/stockData.js'; 
 
/** 
 * Atualiza a visualização da tabela de estoque 
 * @param {Array} stockData - Os dados do estoque a serem exibidos 
 */ 
export function updateVisualizacao(stockData = null) { 
  const tableBody = document.querySelector('#stockTable tbody'); 
  tableBody.innerHTML = ''; 
 
  // Se não for fornecido stockData, busca os dados do estado 
  const dataToDisplay = stockData || getStockData(); 
 
  dataToDisplay.forEach((item, index) => { 
    const row = tableBody.insertRow(); 
    row.innerHTML = ` 
      <td><input type="checkbox" id="select-${index}" data-index="${index}"></td> 
      <td>${item.produto}</td> 
      <td>${item.tanque}</td> 
      <td>${parseFloat(item.disponivelEnvio).toFixed(2)}</td> 
      <td>${parseFloat(item.espacoRecebimento).toFixed(2)}</td> 
    `; 
  }); 
} 
 
/** 
 * Configura os eventos de seleção na tabela de estoque 
 */ 
export function setupSelecao() { 
  const stockTable = document.getElementById('stockTable'); 
  stockTable.addEventListener('change', (event) => { 
    if (event.target.type === 'checkbox') { 
      updateSelecaoTotal(); 
    } 
  }); 
} 
 
/** 
 * Atualiza o total de itens selecionados 
 */ 
function updateSelecaoTotal() { 
  const checkboxes = document.querySelectorAll('#stockTable input[type="checkbox"]'); 
  const totalSelecionado = Array.from(checkboxes).filter(cb => cb.checked).length; 
  const totalItens = checkboxes.length; 
 
  const selecaoInfo = document.getElementById('selecaoInfo'); 
  if (selecaoInfo) { 
    selecaoInfo.textContent = `${totalSelecionado} de ${totalItens} itens selecionados`; 
  } 
} 
 
/** 
 * Inicializa a visualização do estoque 
 */ 
export function initVisualizacao() { 
  updateVisualizacao(); 
  setupSelecao(); 
 
  // Adiciona um elemento para mostrar informações sobre a seleção 
  const app = document.getElementById('app'); 
  const selecaoInfo = document.createElement('div'); 
  selecaoInfo.id = 'selecaoInfo'; 
  app.insertBefore(selecaoInfo, document.getElementById('transferButton')); 
 
  updateSelecaoTotal(); 
} 
 
export default { 
  updateVisualizacao, 
  setupSelecao, 
  initVisualizacao 
}; 
