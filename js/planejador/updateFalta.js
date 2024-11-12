function updateFalta() { 
  const totalNavioInput = document.getElementById('totalNavio'); 
  const totalOlapaInput = document.getElementById('totalOlapa'); 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
 
  let faltaNavio = parseFloat(totalNavioInput.value) || 0; 
  let faltaOlapa = parseFloat(totalOlapaInput.value) || 0; 
 
  operationsTableBody.querySelectorAll('tr').forEach(row => { 
    row.classList.remove('navio', 'olapa'); 
     
    const volumeOperado = parseFloat(row.cells[9].textContent); 
    const operationType = row.cells[6].textContent; 
 
    if (operationType === 'navio') { 
      faltaNavio -= volumeOperado; 
      row.classList.add('navio'); 
    } else if (operationType === 'olapa') { 
      faltaOlapa -= volumeOperado; 
      row.classList.add('olapa'); 
    } 
 
    row.cells[10].textContent = faltaNavio.toFixed(2); 
    row.cells[11].textContent = faltaOlapa.toFixed(2); 
  }); 
} 
