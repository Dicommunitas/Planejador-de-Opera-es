// importacao.js 
 
import { saveInitialStock } from '../services/storage.js'; 
import { validateTankData } from '../utils/validation.js'; 
import { updateVisualizacao } from './visualizacao.js'; 
 
// Variável global para armazenar os dados do estoque 
let globalStockData = []; 
 
/** 
 * Configura os eventos de importação para o drag and drop e seleção de arquivo 
 */ 
export function setupImportacao() { 
  const fileInput = document.getElementById('fileInput'); 
  const dropZone = document.getElementById('dropZone'); 
 
  // Adiciona classe visual quando o arquivo é arrastado sobre a zona de drop 
  dropZone.addEventListener('dragover', (e) => { 
    e.preventDefault(); 
    dropZone.classList.add('dragover'); 
  }); 
 
  // Remove a classe visual quando o arquivo sai da zona de drop 
  dropZone.addEventListener('dragleave', () => { 
    dropZone.classList.remove('dragover'); 
  }); 
 
  // Processa o arquivo quando é solto na zona de drop 
  dropZone.addEventListener('drop', (e) => { 
    e.preventDefault(); 
    dropZone.classList.remove('dragover'); 
    if (e.dataTransfer.files.length) { 
      handleFile(e.dataTransfer.files[0]); 
    } 
  }); 
 
  // Abre o diálogo de seleção de arquivo ao clicar na zona de drop 
  dropZone.addEventListener('click', () => { 
    fileInput.click(); 
  }); 
 
  // Processa o arquivo quando é selecionado via input 
  fileInput.addEventListener('change', (e) => { 
    if (e.target.files.length) { 
      handleFile(e.target.files[0]); 
    } 
  }); 
} 
 
/** 
 * Processa o arquivo Excel selecionado 
 * @param {File} file - O arquivo Excel a ser processado 
 */ 
function handleFile(file) { 
  const reader = new FileReader(); 
  reader.onload = function(e) { 
    try { 
      const data = new Uint8Array(e.target.result); 
      const workbook = XLSX.read(data, {type: 'array'}); 
      const firstSheetName = workbook.SheetNames[0]; 
      const worksheet = workbook.Sheets[firstSheetName]; 
      processExcelData(worksheet); 
    } catch (error) { 
      console.error('Erro ao processar o arquivo:', error); 
      alert('Ocorreu um erro ao processar o arquivo. Por favor, verifique se é um arquivo Excel válido.'); 
    } 
  }; 
  reader.readAsArrayBuffer(file); 
} 
 
/** 
 * Processa os dados do Excel e armazena no globalStockData 
 * @param {Object} worksheet - A planilha do Excel a ser processada 
 */ 
function processExcelData(worksheet) { 
  globalStockData = []; // Limpa os dados anteriores 
  for (let i = 11; i <= 80; i++) { 
    const produto = getCellValue(worksheet, `D${i}`); 
    const tanque = getCellValue(worksheet, `E${i}`); 
    const disponivelEnvio = parseFloat(getCellValue(worksheet, `V${i}`)); 
    const espacoRecebimento = parseFloat(getCellValue(worksheet, `Y${i}`)); 
 
    // Adiciona apenas linhas com dados válidos 
    if (tanque && tanque !== 'TOTAL' && !isNaN(disponivelEnvio) && !isNaN(espacoRecebimento)) { 
      const tankData = { produto, tanque, disponivelEnvio, espacoRecebimento }; 
      const validation = validateTankData(tankData); 
      if (validation.isValid) { 
        globalStockData.push(tankData); 
      } else { 
        console.warn(`Dados inválidos para o tanque ${tanque}:`, validation.errors); 
      } 
    } 
  } 
  updateVisualizacao(globalStockData); 
  saveInitialStock(globalStockData); 
  console.log('Dados importados:', globalStockData); 
} 
 
/** 
 * Obtém o valor de uma célula específica da planilha 
 * @param {Object} worksheet - A planilha do Excel 
 * @param {string} cellAddress - O endereço da célula (ex: 'A1') 
 * @returns {string} O valor da célula ou uma string vazia se não existir 
 */ 
function getCellValue(worksheet, cellAddress) { 
  const cell = worksheet[cellAddress]; 
  return cell ? cell.v : ''; 
} 
 
export { globalStockData }; 
