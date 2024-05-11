document.addEventListener('keydown', verificarTecla);

function verificarTecla(event) {
    var teclaPressionada = event.keyCode || event.which;

    if (teclaPressionada === 66) {
        // Mostra o ícone da arma na tela
    var iconId = 2; // ID do ícone da arma na sua folha de ícones
    var iconX = 100; // Posição X onde o ícone será exibido
    var iconY = 100; // Posição Y onde o ícone será exibido
    var iconWidth = 32; // Largura do ícone
    var iconHeight = 32; // Altura do ícone

    // Desenha o ícone na tela
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconId % 16 * pw;
    var sy = Math.floor(iconId / 16) * ph;
    var iconBitmap = new Bitmap(pw, ph);
    iconBitmap.blt(bitmap, sx, sy, pw, ph, 0, 0, iconWidth, iconHeight);
    var sprite = new Sprite(iconBitmap);
    sprite.x = iconX;
    sprite.y = iconY;
    SceneManager._scene.addChild(sprite);
    }
}