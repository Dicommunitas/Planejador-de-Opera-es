// footer.js 
 
class Footer extends HTMLElement { 
    constructor() { 
      super(); 
      this.attachShadow({ mode: 'open' }); 
    } 
   
    connectedCallback() { 
      this.render(); 
    } 
   
    render() { 
      const currentYear = new Date().getFullYear(); 
      this.shadowRoot.innerHTML = ` 
        <style> 
          :host { 
            display: block; 
            background-color: var(--background-color, #f0f0f0); 
            padding: 1em; 
            width: 100%; 
            box-sizing: border-box; 
            text-align: center; 
          } 
          p { 
            margin: 0; 
          } 
          a { 
            color: var(--primary-color, #007bff); 
            text-decoration: none; 
            transition: color 0.3s; 
          } 
          a:hover { 
            text-decoration: underline; 
            color: var(--secondary-color, #0056b3); 
          } 
        </style> 
        <footer> 
          <p>&copy; ${currentYear} Planejador de Operações. Tepar.</p> 
          <a href="https://github.com/Dicommunitas/Planejador-de-Opera-es" target="_blank">Visite o projeto no GitHub</a> 
        </footer> 
      `; 
    } 
  } 
   
  customElements.define('app-footer', Footer); 
   
  export default Footer; 
  