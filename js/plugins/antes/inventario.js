// Função para verificar se a tecla "i" foi pressionada
function verificarTecla(event) {
    // Obtém o código da tecla pressionada
    console.log('o inventario esta:', inventario);
    var teclaPressionada = event.keyCode || event.which;
    var pictureId = 50;
    var imageName = "inventario"; 
    var x = 0; 
    var y = 0; 
    var scaleX = 100; 
    var scaleY = 100; 
    var opacity = 255;   
    var blendMode = 0;
    // Verifica se a tecla pressionada é a tecla "i" (código 73)
    if (teclaPressionada === 73) {
        // Alterna o estado do inventário entre on e off
        if (inventario === 'on') {
            inventario = 'off';
            var pictureId = 50;
            $gameScreen.erasePicture(pictureId);
            SceneManager._scene.removeChild(sprite);
        } else {
            inventario = 'on';
            $gameScreen.showPicture(pictureId, imageName, 0, x, y, scaleX, scaleY, opacity, blendMode);
        }
        console.log('o inventario esta:', inventario);
        if (inventario === 'on') {
            Grade();
        }
    }
}
function onMouseMove() {
    if (inventario === 'on') {
       Grade();
    }
}
if (typeof inventario === 'undefined') {
    var inventario = 'off';
    
}
if (typeof solto === 'undefined') {
    var solto = 'on';
    var atualx = 0
    var atualy = 0
}
var spr_inventario = ImageManager.loadPicture('spr_inventario');
var sprite = new Sprite(spr_inventario);

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('keydown', verificarTecla);

function Grade(){
    var comeco_x = 124;
    var comeco_y = 209;

    var slot_h = 5;
    var slot_v = 6;
    var total_slots = slot_h * slot_v;
    var tamanho_do_slot = 31;
    var buffer = 4;

    var inventario_l = 31;
    var inventario_a = 31;

    var _guil = 816;
    var _guia = 624;

    var _mx = getMouseX();
    var _my = getMouseY();

    var ix = 0;
    var iy = 0;

    console.log('o atialx esta:', atualx);
    console.log('o atialy esta:', atualy);
    
    if (_mx <= atualx || _mx >= atualx + tamanho_do_slot || _my <=  atualy || _my >=  atualy + tamanho_do_slot){
        SceneManager._scene.removeChild(sprite);
        solto = 'on';
    }

    console.log('o solto esta:', solto);

    if (solto === 'on'){
        for (var i = 0; i < total_slots; i++){
            var _slotsx = comeco_x + ((tamanho_do_slot + buffer) * ix);
            var _slotsy = comeco_y + ((tamanho_do_slot + buffer) * iy);
    
            if (_mx >= _slotsx && _mx <= _slotsx + tamanho_do_slot && _my >= _slotsy && _my <= _slotsy + tamanho_do_slot){
                sprite.x = _slotsx;
                sprite.y = _slotsy;
                SceneManager._scene.addChild(sprite);
                atualx = _slotsx;
                atualy = _slotsy;
                solto = 'off';
            }
    
            ix++;
            if (ix >= slot_h){
                ix = 0;
                iy++;
            }
        }
       
    }
    if (i === total_slots) {
    } 
}
// function ds_grid_create(largura, altura){
//     var grid = [];

//     // Loop para criar linhas
//     for (var i = 0; i < altura; i++) {
//         var linha = [];
        
//         // Loop para adicionar células à linha
//         for (var j = 0; j < largura; j++) {
//             linha.push(0); // 0 pode ser substituído pelo valor inicial desejado para cada célula
//         }
        
//         grid.push(linha); // Adiciona a linha à grade
//     }

//     return grid;
// }
