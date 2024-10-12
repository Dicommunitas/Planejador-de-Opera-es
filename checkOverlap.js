function checkOverlap() { 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
  const rows = Array.from(operationsTableBody.querySelectorAll('tr')); 
   
  rows.forEach(row => row.classList.remove('encavalado')); 
 
  for (let i = 0; i < rows.length; i++) { 
    const row = rows[i]; 
    const tank = row.cells[0].textContent; 
    const startTime = new Date(row.cells[5].textContent); 
    const endTime = new Date(row.cells[6].textContent); 
 
    for (let j = 0; j < rows.length; j++) { 
      if (i !== j) { 
        const otherRow = rows[j]; 
        if (otherRow.cells[0].textContent === tank) { 
          const otherStartTime = new Date(otherRow.cells[5].textContent); 
          const otherEndTime = new Date(otherRow.cells[6].textContent); 
 
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
} 
