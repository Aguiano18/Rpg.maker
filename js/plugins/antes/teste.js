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

function Grade() {
    var comeco_x = 124;
    var comeco_y = 209;

    var slot_h = 5;
    var slot_v = 6;
    var total_slots = slot_h * slot_v;
    var tamanho_do_slot = 31;
    var buffer = 4;

    var _mx = getMouseX();
    var _my = getMouseY();

    var ix = 0;
    var iy = 0;

    // Array para representar o inventário
    var inventory = [];

    // Adiciona um item permanente ao inventário
    var itemPermanente = { nome: "Espada Mágica", tipo: "arma", poder: 10 };
    inventory.push(itemPermanente);

    // Criação dos slots do inventário
    for (var i = 0; i < total_slots; i++) {
        var _slotsx = comeco_x + ((tamanho_do_slot + buffer) * ix);
        var _slotsy = comeco_y + ((tamanho_do_slot + buffer) * iy);

        // Verifica se o mouse está sobre o slot
        if (_mx >= _slotsx && _mx <= _slotsx + tamanho_do_slot && _my >= _slotsy && _my <= _slotsy + tamanho_do_slot) {
            // Adiciona o item ao slot se estiver disponível
            if (solto === 'on') {
                // Verifica se já há um item nesse slot
                if (inventory[i] === undefined) {
                    // Adiciona o item ao slot
                    inventory[i] = sprite;
                    sprite.x = _slotsx;
                    sprite.y = _slotsy;
                    SceneManager._scene.addChild(sprite);
                    atualx = _slotsx;
                    atualy = _slotsy;
                } else {
                    // Se houver um item no slot, talvez você queira fazer alguma outra ação aqui
                    // Por exemplo, trocar o item de slot
                    // inventory[i] = novoItem;
                    // Remova o item anterior da cena e adicione o novo item
                }
            }
        }
        ix++;
        if (ix >= slot_h) {
            ix = 0;
            iy++;
        }
    }

    // Manipula os itens dentro do inventário
    // Por exemplo, você pode querer imprimir os itens no console para debugar
    console.log("Inventário:");
    for (var j = 0; j < inventory.length; j++) {
        console.log("Slot " + j + ": ", inventory[j]);
    }
}

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