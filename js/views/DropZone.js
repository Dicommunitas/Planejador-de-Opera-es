/**
 * @fileoverview Descrição do arquivo
 * @author Seu Nome
 * @version 1.0.0
 */

// DropZone.js

import { handleFile } from '../controllers/importacao.js'; 




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
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 2rem;
            transition: all 0.3s ease;
                min-height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1em;
                color: #666;
        #dropZone::before {
            content: "⬆️ Solte seu arquivo Excel aqui";
            font-size: 1.2em;
            margin-bottom: 10px;
        }
            #dropZone::before {
                content: "📁 ";
                font-size: 1.5em;
                margin-right: 10px;
            }
          border: 2px dashed var(--border-color, #ddd); 
          border-radius: 4px; 
          padding: 20px; 
          text-align: center; 
          background-color: #f8f9fa; 
          cursor: pointer; 
          transition: background-color 0.3s; 
        } 
        #dropZone.dragover {
            background-color: #e6f7ff;
            border-color: #007bff;
            box-shadow: 0 0 15px rgba(0,123,255,0.2);
        }
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
    handleFile(file); 
    this.dispatchEvent(new CustomEvent('fileProcessed', {   
      bubbles: true,   
      composed: true,  
      detail: { success: true }  
    }));  
  } 
  
} 

customElements.define('drop-zone', DropZone);

export default DropZone;