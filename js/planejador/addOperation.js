function addOperation() { 
  console.log('Função addOperation iniciada'); 
 
  // 1. Coleta os dados do formulário 
  const tankSelect = document.getElementById('tank'); 
  const tank = tankSelect.value; 
  const volume = parseFloat(document.getElementById('volume').value); 
  const flowRate = parseFloat(document.getElementById('flowRate').value); 
  const direction = document.getElementById('direction').value; 
  const operationType = document.getElementById('operationType').value; 
  const startTimeStr = document.getElementById('startTime').value; 
 
  console.log('Dados coletados:', { tank, volume, flowRate, direction, operationType, startTimeStr }); 
 
  // 2. Valida os dados 
  if (!tank || isNaN(volume) || isNaN(flowRate) || !startTimeStr) { 
    alert('Preencha todos os campos corretamente.'); 
    return; 
  } 
 
  // 3. Verifica a capacidade do tanque 
  const stockData = getStockData(); 
  console.log('Dados do estoque recuperados:', stockData); 
 
  const tankData = stockData.find(item => item.tanque.trim() === tank.trim()); 
  if (!tankData) { 
    alert('Dados do tanque não encontrados.'); 
    return; 
  } 
 
  if (direction === 'enviar' && volume > tankData.disponivelEnvio) { 
    alert(`Volume excede a capacidade disponível para envio (${tankData.disponivelEnvio.toFixed(2)} m³).`); 
    return; 
  } 
 
  if (direction === 'receber' && volume > tankData.espacoRecebimento) { 
    alert(`Volume excede o espaço disponível para recebimento (${tankData.espacoRecebimento.toFixed(2)} m³).`); 
    return; 
  } 
 
  // 4. Calcula o horário de término 
  const startTime = new Date(startTimeStr); 
  const endTime = new Date(startTime.getTime() + (volume / flowRate) * 60 * 60 * 1000); 
 
  // 5. Cria uma nova linha na tabela 
  const newRow = document.createElement('tr'); 
  const volumeOperado = direction === 'receber' ? volume : -volume; 
  newRow.innerHTML = ` 
    <td>${tankData.produto}</td> 
    <td>${tank}</td> 
    <td>${tankData.disponivelEnvio.toFixed(2)}</td> 
    <td>${tankData.espacoRecebimento.toFixed(2)}</td> 
    <td>${flowRate.toFixed(2)}</td> 
    <td>${direction}</td> 
    <td>${operationType}</td> 
    <td>${startTime.toLocaleString('pt-BR', { hour12: false })}</td> 
    <td>${endTime.toLocaleString('pt-BR', { hour12: false })}</td> 
    <td>${volumeOperado.toFixed(2)}</td> 
    <td>0</td> 
    <td>0</td> 
    <td> 
      <button class="copyOperation">Copiar</button> 
      <button class="deleteOperation">Deletar</button> 
    </td> 
  `; 
 
  // 6. Adiciona a nova linha à tabela 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
  if (operationsTableBody) { 
    operationsTableBody.appendChild(newRow); 
    console.log('Nova linha adicionada à tabela'); 
    console.log('Conteúdo da nova linha:', newRow.innerHTML); 
  } else { 
    console.error('Elemento #operationsTable tbody não encontrado'); 
  } 
 
  // 7. Atualiza os dados de estoque 
  if (direction === 'enviar') { 
    tankData.disponivelEnvio -= volume; 
    tankData.espacoRecebimento += volume; 
  } else { 
    tankData.disponivelEnvio += volume; 
    tankData.espacoRecebimento -= volume; 
  } 
  saveStockData(stockData); 
 
  // 8. Configura os eventos dos botões 
  newRow.querySelector('.deleteOperation').addEventListener('click', () => { 
    // Restaura o volume ao estoque quando a operação é deletada 
    if (direction === 'enviar') { 
      tankData.disponivelEnvio += volume; 
      tankData.espacoRecebimento -= volume; 
    } else { 
      tankData.disponivelEnvio -= volume; 
      tankData.espacoRecebimento += volume; 
    } 
    saveStockData(stockData); 
 
    newRow.remove(); 
    updateFalta(); 
    checkOverlap(); 
    updateCurrentStockDisplay(); 
  }); 
 
  newRow.querySelector('.copyOperation').addEventListener('click', () => { 
    document.getElementById('tank').value = tank; 
    document.getElementById('volume').value = volume; 
    document.getElementById('flowRate').value = flowRate; 
    document.getElementById('direction').value = direction; 
    document.getElementById('operationType').value = operationType; 
    document.getElementById('startTime').value = startTimeStr; 
  }); 
 
  // 9. Atualiza cálculos e exibições 
  updateFalta(); 
  sortOperations(); 
  checkOverlap(); 
  updateCurrentStockDisplay(); 
  clearForm(); 
 
  console.log('Função addOperation concluída'); 
} 
