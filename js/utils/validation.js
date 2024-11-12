// validation.js 
 
/** 
 * Valida se um valor é um número positivo 
 * @param {number} value - O valor a ser validado 
 * @returns {boolean} Verdadeiro se for um número positivo, falso caso contrário 
 */ 
export function isPositiveNumber(value) { 
    return typeof value === 'number' && !isNaN(value) && value > 0; 
  } 
   
  /** 
   * Valida se uma string não está vazia 
   * @param {string} value - A string a ser validada 
   * @returns {boolean} Verdadeiro se a string não estiver vazia, falso caso contrário 
   */ 
  export function isNonEmptyString(value) { 
    return typeof value === 'string' && value.trim().length > 0; 
  } 
   
  /** 
   * Valida se um valor é uma data válida 
   * @param {Date|string} value - O valor da data a ser validado 
   * @returns {boolean} Verdadeiro se for uma data válida, falso caso contrário 
   */ 
  export function isValidDate(value) { 
    if (value instanceof Date) { 
      return !isNaN(value.getTime()); 
    } 
    if (typeof value === 'string') { 
      const date = new Date(value); 
      return !isNaN(date.getTime()); 
    } 
    return false; 
  } 
   
  /** 
   * Valida os dados de uma operação 
   * @param {Object} operation - Os dados da operação a serem validados 
   * @returns {Object} Um objeto com um campo 'isValid' e um campo 'errors' contendo mensagens de erro 
   */ 
  export function validateOperation(operation) { 
    const errors = []; 
   
    if (!isNonEmptyString(operation.tank)) { 
      errors.push('Tanque inválido'); 
    } 
   
    if (!isPositiveNumber(operation.volume)) { 
      errors.push('Volume inválido'); 
    } 
   
    if (!isPositiveNumber(operation.flowRate)) { 
      errors.push('Vazão inválida'); 
    } 
   
    if (!['receber', 'enviar'].includes(operation.direction)) { 
      errors.push('Direção inválida'); 
    } 
   
    if (!['navio', 'olapa'].includes(operation.operationType)) { 
      errors.push('Tipo de operação inválido'); 
    } 
   
    if (!isValidDate(operation.startTime)) { 
      errors.push('Data de início inválida'); 
    } 
   
    return { 
      isValid: errors.length === 0, 
      errors 
    }; 
  } 
   
  /** 
   * Valida os dados de estoque de um tanque 
   * @param {Object} tankData - Os dados do tanque a serem validados 
   * @returns {Object} Um objeto com um campo 'isValid' e um campo 'errors' contendo mensagens de erro 
   */ 
  export function validateTankData(tankData) { 
    const errors = []; 
   
    if (!isNonEmptyString(tankData.produto)) { 
      errors.push('Produto inválido'); 
    } 
   
    if (!isNonEmptyString(tankData.tanque)) { 
      errors.push('Tanque inválido'); 
    } 
   
    if (!isPositiveNumber(tankData.disponivelEnvio)) { 
      errors.push('Volume disponível para envio inválido'); 
    } 
   
    if (!isPositiveNumber(tankData.espacoRecebimento)) { 
      errors.push('Espaço para recebimento inválido'); 
    } 
   
    return { 
      isValid: errors.length === 0, 
      errors 
    }; 
  } 
   
  export default { 
    isPositiveNumber, 
    isNonEmptyString, 
    isValidDate, 
    validateOperation, 
    validateTankData 
  }; 
  