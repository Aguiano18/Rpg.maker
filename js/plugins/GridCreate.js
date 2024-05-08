function armazenarPosicoes() {
  let itens = ["Alice", "Bob", "Carol"];
  let posicoes = [];
  for (let i = 0; i < itens.length; i++) {
      posicoes.push(i); // Armazena a posição do elemento atual
      if (getMouseX() >= 0 || getMouseY() >= 0){
          $gameMessage.add(itens[i]);
      }
  }
}
function onMouseMove() {
    if (inventario === 'on') {
       Grade();
    }
}
document.addEventListener('mousemove', onMouseMove);