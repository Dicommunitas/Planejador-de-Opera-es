// dateUtils.js 
 
/** 
 * Formata uma data para o formato local brasileiro 
 * @param {Date} date - A data a ser formatada 
 * @returns {string} A data formatada como string (dd/mm/yyyy, HH:MM:ss) 
 */ 
export function formatDateBR(date) { 
    return date.toLocaleString('pt-BR', {  
      year: 'numeric',  
      month: '2-digit',  
      day: '2-digit',  
      hour: '2-digit',  
      minute: '2-digit',  
      second: '2-digit',  
      hour12: false  
    }); 
  } 
   
  /** 
   * Converte uma string de data no formato brasileiro para um objeto Date 
   * @param {string} dateString - A string de data no formato "dd/mm/yyyy, HH:MM:ss" 
   * @returns {Date} O objeto Date correspondente 
   */ 
  export function parseDateBR(dateString) { 
    const [datePart, timePart] = dateString.split(', '); 
    const [day, month, year] = datePart.split('/'); 
    const [hour, minute, second] = timePart.split(':'); 
    return new Date(year, month - 1, day, hour, minute, second); 
  } 
   
  /** 
   * Calcula a diferença em horas entre duas datas 
   * @param {Date} date1 - A primeira data 
   * @param {Date} date2 - A segunda data 
   * @returns {number} A diferença em horas 
   */ 
  export function getHoursDifference(date1, date2) { 
    const diffInMs = Math.abs(date2 - date1); 
    return diffInMs / (1000 * 60 * 60); 
  } 
   
  /** 
   * Adiciona um número de horas a uma data 
   * @param {Date} date - A data inicial 
   * @param {number} hours - O número de horas a adicionar 
   * @returns {Date} A nova data após adicionar as horas 
   */ 
  export function addHours(date, hours) { 
    return new Date(date.getTime() + hours * 60 * 60 * 1000); 
  } 
   
  /** 
   * Verifica se duas datas se sobrepõem 
   * @param {Date} start1 - Data de início do primeiro intervalo 
   * @param {Date} end1 - Data de fim do primeiro intervalo 
   * @param {Date} start2 - Data de início do segundo intervalo 
   * @param {Date} end2 - Data de fim do segundo intervalo 
   * @returns {boolean} Verdadeiro se houver sobreposição, falso caso contrário 
   */ 
  export function isOverlapping(start1, end1, start2, end2) { 
    return start1 < end2 && end1 > start2; 
  } 
   
  /** 
   * Formata uma duração em horas para uma string legível 
   * @param {number} hours - O número de horas 
   * @returns {string} A duração formatada (ex: "2 horas e 30 minutos") 
   */ 
  export function formatDuration(hours) { 
    const totalMinutes = Math.round(hours * 60); 
    const h = Math.floor(totalMinutes / 60); 
    const m = totalMinutes % 60; 
     
    let result = ''; 
    if (h > 0) result += `${h} hora${h !== 1 ? 's' : ''}`; 
    if (h > 0 && m > 0) result += ' e '; 
    if (m > 0) result += `${m} minuto${m !== 1 ? 's' : ''}`; 
     
    return result || '0 minutos'; 
  } 
   
  export default { 
    formatDateBR, 
    parseDateBR, 
    getHoursDifference, 
    addHours, 
    isOverlapping, 
    formatDuration 
  }; 
  