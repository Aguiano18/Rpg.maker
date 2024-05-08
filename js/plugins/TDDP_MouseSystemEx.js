(function() {
    // Variáveis globais para armazenar as coordenadas do mouse
    var mouseX = 0;
    var mouseY = 0;

    // Função para atualizar as coordenadas quando o mouse se move
    function atualizarCoordenadas(event) {
        // Obtém as coordenadas do mouse
        mouseX = Graphics.pageToCanvasX(event.pageX);
        mouseY = Graphics.pageToCanvasY(event.pageY);

        // Exibe as coordenadas no console (opcional)
        console.log('X: ' + mouseX + ', Y: ' + mouseY);
    }

    // Adiciona um ouvinte de evento para capturar o movimento do mouse
    document.addEventListener('mousemove', atualizarCoordenadas);

    // Função para obter a coordenada X do mouse
    function getMouseX() {
        return mouseX;
    }

    // Função para obter a coordenada Y do mouse
    function getMouseY() {
        return mouseY;
    }

    // Torna as funções de obtenção das coordenadas globais acessíveis fora do escopo
    window.getMouseX = getMouseX;
    window.getMouseY = getMouseY;
})();
