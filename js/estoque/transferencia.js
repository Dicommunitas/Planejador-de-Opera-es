function setupTransferencia() {  
  const transferButton = document.getElementById('transferButton');  
  transferButton.addEventListener('click', transferirDadosSelecionados);  
}  
  
function transferirDadosSelecionados() {  
  const checkboxes = document.querySelectorAll('#stockTable input[type="checkbox"]:checked');  
  const dadosSelecionados = Array.from(checkboxes).map(checkbox => {  
    const index = checkbox.dataset.index;  
    const row = checkbox.closest('tr');  
    return {  
      produto: row.cells[1].textContent,  
      tanque: row.cells[2].textContent,  
      disponivelEnvio: row.cells[3].textContent,  
      espacoRecebimento: row.cells[4].textContent  
    };  
  });  
  
  localStorage.setItem('stockData', JSON.stringify(dadosSelecionados));  
  window.location.href = '../index.html';  
}  
 