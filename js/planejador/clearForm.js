// clearForm.js 
 
/** 
 * Limpa todos os campos do formulário de adição de operação 
 */ 
export function clearForm() { 
    document.getElementById('tank').value = ''; 
    document.getElementById('volume').value = ''; 
    document.getElementById('flowRate').value = ''; 
    document.getElementById('direction').value = 'receber'; 
    document.getElementById('operationType').value = 'navio'; 
    document.getElementById('startTime').value = ''; 
  } 
   
  /** 
   * Reseta o formulário para seu estado inicial 
   */ 
  export function resetForm() { 
    clearForm(); 
    // Adicione aqui qualquer lógica adicional para resetar o estado do formulário 
    console.log('Formulário resetado'); 
  } 
   
  export default { 
    clearForm, 
    resetForm 
  }; 
  