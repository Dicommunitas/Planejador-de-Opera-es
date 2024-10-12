function sortOperations() { 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
  const rows = Array.from(operationsTableBody.querySelectorAll('tr')); 
   
  rows.sort((a, b) => { 
    const aStartTime = new Date(a.cells[5].textContent); 
    const bStartTime = new Date(b.cells[5].textContent); 
    return aStartTime - bStartTime; 
  }); 
   
  operationsTableBody.innerHTML = ''; 
  rows.forEach(row => operationsTableBody.appendChild(row)); 
} 
