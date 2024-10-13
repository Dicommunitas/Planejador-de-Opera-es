function updateFalta() { 
  const totalNavioInput = document.getElementById('totalNavio'); 
  const totalOlapaInput = document.getElementById('totalOlapa'); 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
 
  let faltaNavio = parseFloat(totalNavioInput.value) || 0; 
  let faltaOlapa = parseFloat(totalOlapaInput.value) || 0; 
 
  operationsTableBody.querySelectorAll('tr').forEach(row => { 
    row.classList.remove('navio', 'olapa'); 
     
    const volume = parseFloat(row.cells[1].textContent); 
    const direction = row.cells[3].textContent; 
    const operationType = row.cells[4].textContent; 
 
    if (operationType === 'navio') { 
      faltaNavio += (direction === 'receber' ? -volume : volume); 
      row.classList.add('navio'); 
    } else if (operationType === 'olapa') { 
      faltaOlapa += (direction === 'receber' ? -volume : volume); 
      row.classList.add('olapa'); 
    } 
 
    row.cells[7].textContent = faltaNavio.toFixed(2); 
    row.cells[8].textContent = faltaOlapa.toFixed(2); 
  }); 
} 
