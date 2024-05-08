var inventario = (typeof inventario === 'undefined') ? true : inventario;
var solto = (typeof solto === 'undefined') ? true : solto;
var comeco_x = 124;
var comeco_y = 209;
var slot_h = 5;
var slot_v = 6;
var total_slots = slot_h * slot_v;
var tamanho_do_slot = 31;
var buffer = 4;
var spr_inventario = ImageManager.loadPicture('spr_inventario');
var sprite = new Sprite(spr_inventario);
var atualx, atualy, slot, _mx, _my;

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('keydown', verificarTecla);

function Grade() {
    _mx = getMouseX();
    _my = getMouseY();
    var ix = 0;
    var iy = 0;
    
    if (solto === true) {
        for (var i = 0; i < total_slots; i++) {
            var _slotsx = comeco_x + ((tamanho_do_slot + buffer) * ix);
            var _slotsy = comeco_y + ((tamanho_do_slot + buffer) * iy);
            slot = i;
            
            if (_mx >= _slotsx && _mx <= _slotsx + tamanho_do_slot && _my >= _slotsy && _my <= _slotsy + tamanho_do_slot) {
                atualx = _slotsx;
                atualy = _slotsy;
                sprite.x = _slotsx;
                sprite.y = _slotsy;
                SceneManager._scene.addChild(sprite);
            }
            ix++;
            if (ix >= slot_h) {
                ix = 0;
                iy++;
            }
        }       
    }
    if (_mx <= atualx || _mx >= atualx + tamanho_do_slot || _my <= atualy || _my >= atualy + tamanho_do_slot) {
        SceneManager._scene.removeChild(sprite);
    }
}

function verificarTecla(event) {
    var teclaPressionada = event.keyCode || event.which;
    var pictureId = 50;
    var imageName = "inventario"; 
    var x = 0; 
    var y = 0; 
    var scaleX = 100; 
    var scaleY = 100; 
    var opacity = 255;   
    var blendMode = 0;
    if (teclaPressionada === 73) {
        if (inventario === true) {
            inventario = false;
            $gameScreen.erasePicture(pictureId);
            SceneManager._scene.removeChild(sprite);
        } else {
            inventario = true;
            $gameScreen.showPicture(pictureId, imageName, 0, x, y, scaleX, scaleY, opacity, blendMode);
        }
        console.log('O inventário está:', inventario);
        if (inventario === true) {
            Grade();
        }
    }
}

function onMouseMove() {
    if (inventario === true) {
        Grade();
    }
}
