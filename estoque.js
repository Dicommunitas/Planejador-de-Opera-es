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
 
      // Itera sobre as linhas 11 até 15 
      for (let i = 11; i <= 15; i++) { 
        const produto = worksheet[`D${i}`] ? worksheet[`D${i}`].v : ''; 
        const tanque = worksheet[`E${i}`] ? worksheet[`E${i}`].v : ''; 
        const disponivelEnvio = worksheet[`V${i}`] ? worksheet[`V${i}`].v : ''; 
        const espacoRecebimento = worksheet[`Y${i}`] ? worksheet[`Y${i}`].v : ''; 
 
        // Cria uma nova linha na tabela 
        const row = tableBody.insertRow(); 
        row.insertCell(0).textContent = produto; 
        row.insertCell(1).textContent = tanque; 
        row.insertCell(2).textContent = disponivelEnvio; 
        row.insertCell(3).textContent = espacoRecebimento; 
      } 
    }; 
    reader.readAsArrayBuffer(file); 
  } 
}); 
