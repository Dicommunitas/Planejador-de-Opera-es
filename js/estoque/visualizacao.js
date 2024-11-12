function updateVisualizacao(stockData) {  
  const tableBody = document.querySelector('#stockTable tbody');  
  tableBody.innerHTML = '';  
  
  stockData.forEach((item, index) => {  
    const row = tableBody.insertRow();  
    row.innerHTML = `  
      <td><input type="checkbox" id="select-${index}" data-index="${index}"></td>  
      <td>${item.produto}</td>  
      <td>${item.tanque}</td>  
      <td>${item.disponivelEnvio}</td>  
      <td>${item.espacoRecebimento}</td>  
    `;  
  });  
}  
 