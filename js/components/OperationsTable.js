// OperationsTable.js 
 
import { getOperations, deleteOperation, copyOperation } from '../state/operations.js'; 
import { updateFalta } from '../planejador/updateFalta.js'; 
import { sortOperations } from '../planejador/sortOperations.js'; 
import { checkOverlap } from '../planejador/checkOverlap.js'; 
import { updateCurrentStockDisplay } from '../state/stockData.js'; 
 
class OperationsTable extends HTMLElement { 
  constructor() { 
    super(); 
    this.attachShadow({ mode: 'open' }); 
  } 
 
  connectedCallback() { 
    this.render(); 
    this.loadOperations(); 
    this.setupEventListeners(); 
  } 
 
  render() { 
    this.shadowRoot.innerHTML = ` 
      <style> 
        :host { 
          display: block; 
          margin-bottom: 30px; 
        } 
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-bottom: 20px; 
        } 
        th, td { 
          border: 1px solid var(--border-color, #ddd); 
          padding: 8px; 
          text-align: left; 
        } 
        th { 
          background-color: var(--background-color, #f0f0f0); 
          font-weight: bold; 
        } 
        tr:nth-child(even) { 
          background-color: #f2f2f2; 
        } 
        tr:hover { 
          background-color: var(--hover-color, #e9ecef); 
        } 
        tr.navio { 
          background-color: var(--navio-color, #d1ecf1); 
        } 
        tr.olapa { 
          background-color: var(--olapa-color, #d4edda); 
        } 
        tr.encavalado { 
          background-color: var(--encavalado-color, #ffcccc) !important; 
        } 
        .copyOperation, .deleteOperation { 
          margin: 2px; 
          padding: 5px 10px; 
          font-size: 0.9em; 
          border: none; 
          border-radius: 3px; 
          cursor: pointer; 
        } 
        .copyOperation { 
          background-color: #4CAF50; 
          color: white; 
        } 
        .deleteOperation { 
          background-color: #f44336; 
          color: white; 
        } 
        .copyOperation:hover { 
          background-color: #45a049; 
        } 
        .deleteOperation:hover { 
          background-color: #da190b; 
        } 
      </style> 
      <div id="optimization-results"> 
        <h2>Operações Planejadas</h2> 
        <table id="operationsTable"> 
          <thead> 
            <tr> 
              <th>Produto</th> 
              <th>Tanque</th> 
              <th>Disponível para Envio (m³)</th> 
              <th>Espaço para Recebimento (m³)</th> 
              <th>Vazão (m3/h)</th> 
              <th>Direção</th> 
              <th>Tipo de Operação</th> 
              <th>Início</th> 
              <th>Término</th> 
              <th>Volume Operado (m³)</th> 
              <th>Falta para Navio</th> 
              <th>Falta para Olapa</th> 
              <th>Ações</th> 
            </tr> 
          </thead> 
          <tbody></tbody> 
        </table> 
      </div> 
    `; 
  } 
 
  loadOperations() { 
    const operations = getOperations(); 
    const tableBody = this.shadowRoot.querySelector('#operationsTable tbody'); 
    tableBody.innerHTML = ''; 
 
    operations.forEach((operation, index) => { 
      const row = tableBody.insertRow(); 
      row.innerHTML = ` 
        <td>${operation.produto}</td> 
        <td>${operation.tanque}</td> 
        <td>${operation.disponivelEnvio.toFixed(2)}</td> 
        <td>${operation.espacoRecebimento.toFixed(2)}</td> 
        <td>${operation.flowRate.toFixed(2)}</td> 
        <td>${operation.direction}</td> 
        <td>${operation.operationType}</td> 
        <td>${new Date(operation.startTime).toLocaleString('pt-BR', { hour12: false })}</td> 
        <td>${new Date(operation.endTime).toLocaleString('pt-BR', { hour12: false })}</td> 
        <td>${operation.volumeOperado.toFixed(2)}</td> 
        <td>${operation.faltaNavio.toFixed(2)}</td> 
        <td>${operation.faltaOlapa.toFixed(2)}</td> 
        <td> 
          <button class="copyOperation" data-index="${index}">Copiar</button> 
          <button class="deleteOperation" data-index="${index}">Deletar</button> 
        </td> 
      `; 
      row.classList.add(operation.operationType); 
    }); 
 
    sortOperations(); 
    checkOverlap(); 
    updateFalta(); 
  } 
 
  setupEventListeners() { 
    this.shadowRoot.addEventListener('click', (event) => { 
      if (event.target.classList.contains('copyOperation')) { 
        const index = event.target.dataset.index; 
        this.handleCopyOperation(index); 
      } else if (event.target.classList.contains('deleteOperation')) { 
        const index = event.target.dataset.index; 
        this.handleDeleteOperation(index); 
      } 
    }); 
  } 
 
  handleCopyOperation(index) { 
    copyOperation(index); 
    this.dispatchEvent(new CustomEvent('operationCopied', { bubbles: true, composed: true })); 
  } 
 
  handleDeleteOperation(index) { 
    deleteOperation(index); 
    this.loadOperations(); 
    updateCurrentStockDisplay(); 
    this.dispatchEvent(new CustomEvent('operationDeleted', { bubbles: true, composed: true })); 
  } 
 
  // Método público para atualizar a tabela 
  updateTable() { 
    this.loadOperations(); 
  } 
} 
 
customElements.define('operations-table', OperationsTable); 
 
export default OperationsTable; 
