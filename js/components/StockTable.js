// StockTable.js 
 

import { getInitialStockData, getCurrentStockData } from '../state/stockData.js';
 
class StockTable extends HTMLElement { 
  constructor() { 
    super(); 
    this.attachShadow({ mode: 'open' }); 
  } 
 
  connectedCallback() { 
    this.render(); 
    this.loadData(); 
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
      </style> 
      <div id="stockDataDisplay"> 
        <h2>Dados do Estoque Inicial</h2> 
        <table id="initialStockDataTable"> 
          <thead> 
            <tr> 
              <th>Produto</th> 
              <th>Tanque</th> 
              <th>Disponível para Envio (m³)</th> 
              <th>Espaço para Recebimento (m³)</th> 
            </tr> 
          </thead> 
          <tbody></tbody> 
        </table> 
 
        <h2>Dados do Estoque Final</h2> 
        <table id="currentStockDataTable"> 
          <thead> 
            <tr> 
              <th>Produto</th> 
              <th>Tanque</th> 
              <th>Disponível para Envio (m³)</th> 
              <th>Espaço para Recebimento (m³)</th> 
            </tr> 
          </thead> 
          <tbody></tbody> 
        </table> 
      </div> 
    `; 
  } 
 
  loadData() { 
    const initialStockData = getInitialStockData(); 
    const currentStockData = getInitialStockData(); 
 
    this.updateStockTable('#initialStockDataTable', initialStockData); 
    this.updateStockTable('#currentStockDataTable', currentStockData); 
  } 
 
  updateStockTable(tableSelector, stockData) { 
    const stockTableBody = this.shadowRoot.querySelector(`${tableSelector} tbody`); 
    stockTableBody.innerHTML = ''; 
 
    stockData.forEach(item => { 
      const row = stockTableBody.insertRow(); 
      row.innerHTML = ` 
        <td>${item.produto.trim()}</td> 
        <td>${item.tanque.trim()}</td> 
        <td>${parseFloat(item.disponivelEnvio).toFixed(2)}</td> 
        <td>${parseFloat(item.espacoRecebimento).toFixed(2)}</td> 
      `; 
    }); 
  } 
 
  // Método público para atualizar os dados 
  updateData() { 
    this.loadData(); 
  } 
} 
 
customElements.define('stock-table', StockTable); 
 
export default StockTable; 
