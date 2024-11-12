// DropZone.js

import { processExcelData } from '../estoque/importacao.js';

class DropZone extends HTMLElement {
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
          margin-bottom: 30px; 
        } 
        #dropZone { 
          border: 2px dashed var(--border-color, #ddd); 
          border-radius: 4px; 
          padding: 20px; 
          text-align: center; 
          background-color: #f8f9fa; 
          cursor: pointer; 
          transition: background-color 0.3s; 
        } 
        #dropZone.dragover { 
          background-color: var(--hover-color, #e9ecef); 
        } 
        #fileInput { 
          display: none; 
        } 
      </style> 
      <div id="dropZone"> 
        Arraste e solte o arquivo Excel aqui ou clique para selecionar 
        <input type="file" id="fileInput" accept=".xls,.xlsx"> 
      </div> 
    `;
  }

  setupEventListeners() {
    const dropZone = this.shadowRoot.getElementById('dropZone');
    const fileInput = this.shadowRoot.getElementById('fileInput');

    dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
    dropZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
    dropZone.addEventListener('drop', this.handleDrop.bind(this));
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', this.handleFileSelect.bind(this));
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.shadowRoot.getElementById('dropZone').classList.add('dragover');
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.shadowRoot.getElementById('dropZone').classList.remove('dragover');
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.shadowRoot.getElementById('dropZone').classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length) {
      this.handleFile(files[0]);
    }
  }

  handleFileSelect(e) {
    const files = e.target.files;
    if (files.length) {
      this.handleFile(files[0]);
    }
  }

  handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        processExcelData(worksheet);
        this.dispatchEvent(new CustomEvent('fileProcessed', {  
          bubbles: true,  
          composed: true, 
          detail: { success: true } 
        })); 
      } catch (error) { 
        console.error('Erro ao processar o arquivo:', error); 
        this.dispatchEvent(new CustomEvent('fileProcessed', {  
          bubbles: true,  
          composed: true, 
          detail: { success: false, error: error.message } 
        })); 
      } 
    }; 
    reader.readAsArrayBuffer(file); 
  } 
} 

customElements.define('dropZone', DropZone);

export default DropZone;