// Header.js 
 
class Header extends HTMLElement { 
  constructor() { 
    super(); 
    this.attachShadow({ mode: 'open' }); 
  } 
 
  connectedCallback() { 
    this.render(); 
  } 
 
  render() { 
    const currentPath = window.location.pathname; 
    const isHomePage = currentPath === '/' || currentPath.endsWith('index.html'); 
    const logoPath = isHomePage ? 'images/logo.jpg' : '../images/logo.jpg'; 
    const estoquePath = isHomePage ? 'pages/estoque.html' : '../index.html'; 
    const estoqueText = isHomePage ? 'Importar Estoque' : 'Voltar para o Planejador de Operações'; 
 
    this.shadowRoot.innerHTML = ` 
      <style> 
        :host { 
          display: block; 
          background-color: var(--background-color, #f0f0f0); 
          padding: 1em; 
          width: 100%; 
          box-sizing: border-box; 
        } 
        .header-content { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          max-width: 1600px; 
          width: 100%; 
          margin: 0 auto; 
        } 
        #logo { 
          max-height: 50px; 
          margin-right: 20px; 
        } 
        .title-nav { 
          display: flex; 
          align-items: center; 
          flex-grow: 1; 
        } 
        h1 { 
          margin: 0; 
          font-size: 1.5em; 
          white-space: nowrap; 
        } 
        nav { 
          margin-left: auto; 
        } 
        nav a { 
          text-decoration: none; 
          color: #fff; 
          background-color: var(--primary-color, #007bff); 
          padding: 0.5em 1em; 
          border-radius: 4px; 
          transition: background-color 0.3s; 
        } 
        nav a:hover { 
          background-color: var(--secondary-color, #0056b3); 
        } 
        @media (max-width: 768px) { 
          .header-content, .title-nav { 
            flex-direction: column; 
            align-items: center; 
          } 
          nav { 
            margin-left: 0; 
            margin-top: 10px; 
            width: 100%; 
            text-align: center; 
          } 
          nav a { 
            display: inline-block; 
            margin: 5px 0; 
          } 
        } 
      </style> 
      <div class="header-content"> 
        <img src="${logoPath}" alt="Logo do Planejador de Operações" id="logo"> 
        <div class="title-nav"> 
          <h1>Planejador de Operações</h1> 
          <nav> 
            <a href="${estoquePath}">${estoqueText}</a> 
          </nav> 
        </div> 
      </div> 
    `; 
  } 
} 
 
customElements.define('app-header', Header); 
 
export default Header; 
