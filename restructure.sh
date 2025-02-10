#!/bin/bash

echo "Iniciando reestruturação do projeto..."

# Criar estrutura de diretórios necessária
mkdir -p js/{models,controllers,views,services,utils} \
         css \
         images \
         pages

# Mover arquivos para a estrutura correta
mv js/services/*.js js/services/ 2>/dev/null
mv js/utils/*.js js/utils/ 2>/dev/null
mv js/controllers/*.js js/controllers/ 2>/dev/null

# Mover componentes de visualização
mv js/views/*.js js/views/ 2>/dev/null

# Mover modelos e controladores
mv js/state/*.js js/models/ 2>/dev/null
mv js/planejador/*.js js/controllers/ 2>/dev/null
mv js/estoque/*.js js/controllers/ 2>/dev/null

# Atualizar imports nos arquivos JavaScript
update_js_imports() {
    sed -i '
        s#../state/stockData#../models/stockData#g
        s#../state/operations#../models/operations#g
        s#./state/operations#./models/operations#g
        s#../planejador/#./#g
        s#../estoque/#./#g
        s#from '\''\./state#from '\''../models#g
        s#from "\./state#from "../models#g
        s#from '\''\./planejador#from '\''./#g
        s#from "\./planejador#from "./#g
        s#from '\''\./estoque#from '\''./#g
        s#from "\./estoque#from "./#g
        s#from '\''\./views/components#from '\''./#g
        s#from "\./views/components#from "./#g
    ' "$1"
}

export -f update_js_imports
find js -type f -name "*.js" -exec bash -c 'update_js_imports "$0"' {} \;

# Atualizar imports específicos em componentes
sed -i 's#from "../estoque/importacao.js"#from "../controllers/importacao.js"#g' js/views/DropZone.js

# Atualizar referências nos arquivos HTML
update_html_imports() {
    sed -i '
        s#js/views/components/#js/views/#g
        s#js/planejador/#js/controllers/#g
        s#js/estoque/#js/controllers/#g
        s#../js/estoque/#../js/controllers/#g
    ' "$1"
}

export -f update_html_imports
find . -type f -name "*.html" -exec bash -c 'update_html_imports "$0"' {} \;

# Corrigir permissões
chmod +x restructure.sh

echo "Reestruturação concluída. Verificando problemas residuais..."

# Verificar imports problemáticos
grep -ERn "from.*(state|planejador|estoque|components)" js/ \
    | grep -v "models\|controllers\|views\|services\|utils"

echo "Atualizando arquivo de estrutura do projeto..."
find . -type f ! -name "gitpod.yml" ! -name "LICENSE" ! -name "README.md" \
    ! -name "estrutura_projeto.txt" ! -path "*/images/*" ! -path "*/.git/*" \
    -exec echo "File: {}" \; -exec cat {} \; > estrutura_projeto.txt

echo "Estrutura atualizada em estrutura_projeto.txt"
echo "Reestruturação concluída com sucesso!"
echo "Por favor, revise os resultados e execute testes manuais se necessário."