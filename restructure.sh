#!/bin/bash

echo "Iniciando reestruturação completa do projeto..."

# Criar estrutura de diretórios necessária
mkdir -p js/{models,controllers,views,services,utils} \
         css \
         images \
         pages

# Corrigir imports e estrutura do DropZone
fix_dropzone() {
    # Corrigir CSS do DropZone
    sed -i '
        /#dropZone {/ {
            a\
            min-height: 150px;\
            display: flex;\
            align-items: center;\
            justify-content: center;\
            flex-direction: column;\
            padding: 2rem;\
            transition: all 0.3s ease;
        }
        /#dropZone::before/ {
            i\
        #dropZone::before {\
            content: "⬆️ Solte seu arquivo Excel aqui";\
            font-size: 1.2em;\
            margin-bottom: 10px;\
        }
        }
        /#dropZone.dragover/ {
            c\
        #dropZone.dragover {\
            background-color: #e6f7ff;\
            border-color: #007bff;\
            box-shadow: 0 0 15px rgba(0,123,255,0.2);\
        }
        }
    ' js/views/DropZone.js

    # Corrigir evento de processamento
    sed -i '/document.dispatchEvent(new CustomEvent(/ {
        c\
            this.dispatchEvent(new CustomEvent("fileProcessed", {\
                bubbles: true,\
                composed: true,\
                detail: { success: true, data: globalStockData }\
            }));
    }' js/controllers/importacao.js
}

# Atualizar imports nos componentes
update_imports() {
    find js/ -name "*.js" -exec sed -i '
        s#../services/storage#../services/storage.js#g;
        s#../utils/validation#../utils/validation.js#g;
        s#./importacao.js#../controllers/importacao.js#g;
    ' {} \;
}

# Corrigir estilos globais
update_styles() {
    echo "
    /* DropZone Enhancements */
    drop-zone {
        margin: 2rem auto;
        width: 80%;
        max-width: 600px;
    }

    #dropZone {
        position: relative;
        border: 3px dashed #007bff;
        border-radius: 10px;
        background-color: #f8fcff;
        color: #666;
        text-align: center;
        transition: all 0.3s ease;
    }

    #dropZone:hover {
        border-color: #0056b3;
        background-color: #f0faff;
    }

    #fileInput {
        display: none;
    }" >> css/styles.css
}

# Executar correções
fix_dropzone
update_imports
update_styles

# Corrigir permissões
chmod +x restructure.sh

echo "Reestruturação concluída! Principais alterações:"
echo "1. CSS do DropZone totalmente reformulado"
echo "2. Importações normalizadas"
echo "3. Eventos de arquivo sincronizados"
echo "4. Estilos globais atualizados"

echo "Verifique o console do navegador para eventuais erros restantes e teste a funcionalidade de upload."