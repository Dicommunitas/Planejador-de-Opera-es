function checkOverlap() { 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
  const rows = Array.from(operationsTableBody.querySelectorAll('tr')); 
   
  rows.forEach(row => row.classList.remove('encavalado')); 
 
  for (let i = 0; i < rows.length; i++) { 
    const row = rows[i]; 
    const tank = row.cells[1].textContent; 
    const startTime = parseDate(row.cells[7].textContent); 
    const endTime = parseDate(row.cells[8].textContent); 
 
    for (let j = i + 1; j < rows.length; j++) { 
      const otherRow = rows[j]; 
      if (otherRow.cells[1].textContent === tank) { 
        const otherStartTime = parseDate(otherRow.cells[7].textContent); 
        const otherEndTime = parseDate(otherRow.cells[8].textContent); 
 
        if ( 
          (startTime < otherEndTime && endTime > otherStartTime) || 
          (otherStartTime < endTime && otherEndTime > startTime) 
        ) { 
          row.classList.add('encavalado'); 
          otherRow.classList.add('encavalado'); 
        } 
      } 
    } 
  } 
} 
 
function parseDate(dateString) { 
  // Assume o formato "dd/mm/yyyy, hh:mm:ss" 
  const [datePart, timePart] = dateString.split(', '); 
  const [day, month, year] = datePart.split('/'); 
  const [hour, minute, second] = timePart.split(':'); 
   
  // Mês em JavaScript é baseado em zero (0-11) 
  return new Date(year, month - 1, day, hour, minute, second); 
} 
