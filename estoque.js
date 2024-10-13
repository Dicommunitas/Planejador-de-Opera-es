document.addEventListener('DOMContentLoaded', () => { 
  const fileInput = document.getElementById('fileInput'); 
  const importButton = document.getElementById('importButton'); 
 
  importButton.addEventListener('click', () => { 
    fileInput.click(); 
  }); 
 
  fileInput.addEventListener('change', importExcelData); 
}); 
 
function importExcelData(event) { 
  const file = event.target.files[0]; 
  const reader = new FileReader(); 
  reader.onload = function(e) { 
    const data = new Uint8Array(e.target.result); 
    const workbook = XLSX.read(data, {type: 'array'}); 
    const firstSheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[firstSheetName]; 
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1}); 
    processExcelData(jsonData); 
  }; 
  reader.readAsArrayBuffer(file); 
} 
 
function processExcelData(data) { 
  const stockData = []; 
  for (let i = 7; i < data.length; i++) { 
    const row = data[i]; 
    if (row[0] && row[1] && row[2]) { 
      stockData.push({ 
        tipoProduto: row[0], 
        produto: row[1], 
        tanque: row[2], 
        volTotalAmbiente: row[10], 
        volEspacoOper: row[16] 
      }); 
    } 
  } 
  updateStockVisualization(stockData); 
} 
 
function updateStockVisualization(stockData) { 
  const tableBody = document.querySelector('#stockTable tbody'); 
  tableBody.innerHTML = ''; 
  stockData.forEach(item => { 
    const row = document.createElement('tr'); 
    row.innerHTML = ` 
      <td>${item.tipoProduto}</td> 
      <td>${item.produto}</td> 
      <td>${item.tanque}</td> 
      <td>${item.volTotalAmbiente}</td> 
      <td>${item.volEspacoOper}</td> 
    `; 
    tableBody.appendChild(row); 
  }); 
} 
