document.addEventListener('DOMContentLoaded', () => { 
  const fileInput = document.getElementById('fileInput'); 
  const importButton = document.getElementById('importButton'); 
  const tableBody = document.querySelector('#stockTable tbody'); 
 
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
       
      // Limpa a tabela antes de adicionar novos dados 
      tableBody.innerHTML = ''; 
 
      // Itera sobre as linhas 11 até 80 
      for (let i = 11; i <= 80; i++) { 
        const produto = getCellValue(worksheet, `D${i}`); 
        const tanque = getCellValue(worksheet, `E${i}`); 
        const disponivelEnvio = getCellValue(worksheet, `V${i}`); 
        const espacoRecebimento = getCellValue(worksheet, `Y${i}`); 
 
        // Verifica se a linha tem um tanque válido 
        if (tanque && tanque !== 'TOTAL' && !isNaN(disponivelEnvio) && !isNaN(espacoRecebimento)) { 
          const row = tableBody.insertRow(); 
          row.insertCell(0).textContent = produto; 
          row.insertCell(1).textContent = tanque; 
          row.insertCell(2).textContent = disponivelEnvio; 
          row.insertCell(3).textContent = espacoRecebimento; 
        } 
      } 
    }; 
    reader.readAsArrayBuffer(file); 
  } 
 
  function getCellValue(worksheet, cellAddress) { 
    const cell = worksheet[cellAddress]; 
    return cell ? cell.v : ''; 
  } 
}); 
