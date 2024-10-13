document.addEventListener('DOMContentLoaded', () => { 
  const fileInput = document.getElementById('fileInput'); 
  const importButton = document.getElementById('importButton'); 
  const cellValueSpan = document.getElementById('cellValue'); 
 
  importButton.addEventListener('click', () => { 
    if (fileInput.files.length > 0) { 
      handleFile(fileInput.files[0]); 
    } else { 
      alert('Por favor, selecione um arquivo antes de importar.'); 
    } 
  }); 
 
  function handleFile(file) { 
    const reader = new FileReader(); 
    reader.onload = function(e) { 
      const data = new Uint8Array(e.target.result); 
      const workbook = XLSX.read(data, {type: 'array'}); 
      const firstSheetName = workbook.SheetNames[0]; 
      const worksheet = workbook.Sheets[firstSheetName]; 
       
      // Obtém o valor da célula D11 
      const cellD11 = worksheet['D11']; 
      const cellValue = cellD11 ? cellD11.v : 'Não encontrado'; 
 
      // Exibe o valor na página 
      cellValueSpan.textContent = cellValue; 
    }; 
    reader.readAsArrayBuffer(file); 
  } 
}); 
