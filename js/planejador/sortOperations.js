function sortOperations() { 
  console.log('Iniciando ordenação das operações'); 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
  if (!operationsTableBody) { 
    console.error('Tabela de operações não encontrada'); 
    return; 
  } 
 
  const rows = Array.from(operationsTableBody.querySelectorAll('tr')); 
  console.log(`Número de operações encontradas: ${rows.length}`); 
 
  rows.sort((a, b) => { 
    const aStartTimeStr = a.cells[7].textContent; 
    const bStartTimeStr = b.cells[7].textContent; 
     
    // Converte as strings de data para objetos Date 
    const aStartTime = parseDate(aStartTimeStr); 
    const bStartTime = parseDate(bStartTimeStr); 
 
    console.log(`Comparando: ${aStartTime} e ${bStartTime}`); 
    return aStartTime - bStartTime; 
  }); 
 
  operationsTableBody.innerHTML = ''; 
  rows.forEach(row => operationsTableBody.appendChild(row)); 
  console.log('Ordenação concluída'); 
} 
 
function parseDate(dateString) { 
  // Assume o formato "dd/mm/yyyy, hh:mm:ss" 
  const [datePart, timePart] = dateString.split(', '); 
  const [day, month, year] = datePart.split('/'); 
  const [hour, minute, second] = timePart.split(':'); 
   
  // Mês em JavaScript é baseado em zero (0-11) 
  return new Date(year, month - 1, day, hour, minute, second); 
} 
