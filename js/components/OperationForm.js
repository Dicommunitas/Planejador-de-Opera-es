// OperationForm.js 
 
import { addOperation } from '../planejador/addOperation.js'; 
import { getStockData, saveStockData } from '../state/stockData.js'; 
import { clearForm } from '../planejador/clearForm.js'; 
import { updateFalta } from '../planejador/updateFalta.js'; 
import { sortOperations } from '../planejador/sortOperations.js'; 
import { checkOverlap } from '../planejador/checkOverlap.js'; 
 
class OperationForm extends HTMLElement { 
  constructor() { 
    super(); 
    this.attachShadow({ mode: 'open' }); 
  } 
 
  connectedCallback() { 
    this.render(); 
    this.setupEventListeners(); 
  } 
 
  render() { 
    this.shadowRoot.innerHTML = ` 
      <style> 
        :host { 
          display: block; 
          background-color: #f8f9fa; 
          padding: 20px; 
          border-radius: 4px; 
          margin-bottom: 30px; 
        } 
        h2 { 
          margin-top: 0; 
        } 
        select, input, button { 
          margin-bottom: 1em; 
          padding: 0.5em; 
          border: 1px solid var(--border-color, #ddd); 
          border-radius: 4px; 
          width: 100%; 
          box-sizing: border-box; 
        } 
        button { 
          cursor: pointer; 
          background-color: var(--primary-color, #007bff); 
          color: white; 
          border: none; 
          transition: background-color 0.3s; 
        } 
        button:hover { 
          background-color: var(--secondary-color, #0056b3); 
        } 
      </style> 
      <div id="data-entry"> 
        <h2>Adicionar Operação</h2> 
        <select id="tank"></select> 
        <input type="number" id="volume" placeholder="Volume (m3)"> 
        <input type="number" id="flowRate" placeholder="Vazão (m3/h)"> 
        <select id="direction"> 
          <option value="receber">Receber</option> 
          <option value="enviar">Enviar</option> 
        </select> 
        <select id="operationType"> 
          <option value="navio">Navio</option> 
          <option value="olapa">Olapa</option> 
        </select> 
        <input type="datetime-local" id="startTime"> 
        <button id="addOperationButton">Adicionar Operação</button> 
      </div> 
    `; 
  } 
 
  setupEventListeners() { 
    const addOperationButton = this.shadowRoot.getElementById('addOperationButton'); 
    addOperationButton.addEventListener('click', this.handleAddOperation.bind(this)); 
 
    this.populateTankSelect(); 
  } 
 
  handleAddOperation() { 
    const formData = this.getFormData(); 
    if (this.validateFormData(formData)) { 
      addOperation(formData); 
      sortOperations(); 
      checkOverlap(); 
      updateFalta(); 
      this.updateCurrentStockDisplay(); 
      clearForm(); 
    } 
  } 
 
  getFormData() { 
    return { 
      tank: this.shadowRoot.getElementById('tank').value, 
      volume: parseFloat(this.shadowRoot.getElementById('volume').value), 
      flowRate: parseFloat(this.shadowRoot.getElementById('flowRate').value), 
      direction: this.shadowRoot.getElementById('direction').value, 
      operationType: this.shadowRoot.getElementById('operationType').value, 
      startTime: this.shadowRoot.getElementById('startTime').value 
    }; 
  } 
 
  validateFormData(formData) { 
    if (!formData.tank || isNaN(formData.volume) || isNaN(formData.flowRate) || !formData.startTime) { 
      alert('Preencha todos os campos corretamente.'); 
      return false; 
    } 
    return true; 
  } 
 
  populateTankSelect() { 
    const tankSelect = this.shadowRoot.getElementById('tank'); 
    const stockData = getStockData(); 
     
    tankSelect.innerHTML = '<option value="">Selecione um tanque</option>'; 
    stockData.forEach(item => { 
      const option = document.createElement('option'); 
      option.value = item.tanque.trim(); 
      option.textContent = `${item.tanque.trim()} - ${item.produto.trim()}`; 
      tankSelect.appendChild(option); 
    }); 
  } 
 
  updateCurrentStockDisplay() { 
    // Dispatch a custom event to notify that the stock data has changed 
    const event = new CustomEvent('stockDataUpdated', { bubbles: true, composed: true }); 
    this.dispatchEvent(event); 
  } 
} 
 
customElements.define('operation-form', OperationForm); 
 
export default OperationForm; 
