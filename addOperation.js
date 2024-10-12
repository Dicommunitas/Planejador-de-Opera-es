function addOperation() { 
  // 1. Coleta os dados do formulário 
  const tank = document.getElementById('tank').value; 
  const volume = parseFloat(document.getElementById('volume').value); 
  const flowRate = parseFloat(document.getElementById('flowRate').value); 
  const direction = document.getElementById('direction').value; 
  const operationType = document.getElementById('operationType').value; 
  const startTimeStr = document.getElementById('startTime').value; 
 
  // 2. Valida os dados 
  if (!tank || isNaN(volume) || isNaN(flowRate) || !startTimeStr) { 
    alert('Preencha todos os campos corretamente.'); 
    return; 
  } 
 
  // 3. Calcula o horário de término 
  const startTime = new Date(startTimeStr); 
  const endTime = new Date(startTime.getTime() + (volume / flowRate) * 60 * 60 * 1000); 
 
  // 4. Cria uma nova linha na tabela 
  const newRow = document.createElement('tr'); 
  newRow.innerHTML = ` 
    <td>${tank}</td> 
    <td>${volume.toFixed(2)}</td> 
    <td>${flowRate.toFixed(2)}</td> 
    <td>${direction}</td> 
    <td>${operationType}</td> 
    <td>${startTime.toLocaleString('pt-BR', { hour12: false })}</td> 
    <td>${endTime.toLocaleString('pt-BR', { hour12: false })}</td> 
    <td>0</td> 
    <td>0</td> 
    <td> 
      <button class="copyOperation">Copiar</button> 
      <button class="deleteOperation">Deletar</button> 
    </td> 
  `; 
 
  // 5. Adiciona a nova linha à tabela 
  const operationsTableBody = document.querySelector('#operationsTable tbody'); 
  operationsTableBody.appendChild(newRow); 
 
  // 6. Configura os eventos dos botões 
  newRow.querySelector('.deleteOperation').addEventListener('click', () => { 
    newRow.remove(); 
    updateFalta(); 
    checkOverlap(); 
  }); 
 
  newRow.querySelector('.copyOperation').addEventListener('click', () => { 
    document.getElementById('tank').value = tank; 
    document.getElementById('volume').value = volume; 
    document.getElementById('flowRate').value = flowRate; 
    document.getElementById('direction').value = direction; 
    document.getElementById('operationType').value = operationType; 
    document.getElementById('startTime').value = startTimeStr; 
  }); 
} 
