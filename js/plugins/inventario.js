var inventario = (typeof inventario === 'undefined') ? false : inventario;

const comeco_x = 124;
const comeco_y = 209;
const slot_h = 5;
const slot_v = 6;
const total_slots = slot_h * slot_v;
const tamanho_do_slot = 31;
const buffer = 4;

var spr_inventario = ImageManager.loadPicture('spr_inventario');
var sprite = new Sprite(spr_inventario);
var atualx, atualy, slot, _mx, _my, _slotsx, _slotsy, qualSlotEsta, Item, Qtd, a, Tipo, b;
var isInGame = false;

var slots = [];
var spritesAdicionadas = [];

(function(){
    for (var i = 0; i < 30; i++) {
        slots.push([0 , 0 , 0]);
    }
})();

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('keydown', verificarTecla);

(function() {
    // Função para adicionar um item ao inventário
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        // Adiciona o item ao inventário
        this._items[item.id] = (this._items[item.id] || 0) + amount;

        // Determina o tipo de item e adiciona ao texto
        var itemType = '';
        if (DataManager.isItem(item)) {
            itemType = 1;
        } else if (DataManager.isWeapon(item)) {
            itemType = 2;
        } else if (DataManager.isArmor(item)) {
            itemType = 3;
        }

        // Exibe as informações do inventário em uma janela de mensagem
        var message = `Você pegou ${amount}x ${item.name} (${itemType}).\n`;
        message += `Item ID: ${item.id}, Quantidade: ${this._items[item.id]}`;
        $gameMessage.add(message);
        Item = item.id;
        Qtd = this._items[item.id];
        Tipo = itemType;
        importItem();
        $gameMap.requestRefresh();
    };
})();


function Grade() {
    checkGameState();

    _mx = getMouseX();
    _my = getMouseY();
    var ix = 0;
    var iy = 0;
    
    if (isInGame === true) {
        for (var i = 0; i < total_slots; i++) {
            _slotsx = comeco_x + ((tamanho_do_slot + buffer) * ix);
            _slotsy = comeco_y + ((tamanho_do_slot + buffer) * iy);
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
            removerSpritesAdicionadas();
        } else {
            inventario = true;
            $gameScreen.showPicture(pictureId, imageName, 0, x, y, scaleX, scaleY, opacity, blendMode);
        }
        if (inventario === true) {
            Grade();
            leitorDeInventario();
        }
    }
}

function onMouseMove() {
    if (inventario === true) {
        Grade();
    }
}

function checkGameState() {
    // Verifica se o jogador está no mapa
    if ($gamePlayer && $gameMap && SceneManager._scene instanceof Scene_Map) {
        isInGame = true;
    } else {
        isInGame = false;
    }
}

function verificarStaks() {
    if (slots[a][1] > 18){
        separarStaks();
    } 
}

function importItem() {
    for (var i = 0; i < 30; i++){
        if (slots[i][0] === 0 || slots[i][0] === Item){
            if (slots[i][2] === 0 || slots[i][2] === Tipo){
                slots[i] = [Item, Qtd, Tipo];
                a = i;
                verificarStaks();
                break;
            }
        }
    }
}

function separarStaks() {
    var qtd_item_div = Math.ceil(Qtd / 18);
    for (var j = 0; j < qtd_item_div; j++) {
        if (slots[j][0] === Item || slots[j][0] === 0){
            var qtd = (Qtd > 18) ? 18 : Qtd;
            slots[j] = [Item, qtd, Tipo]; 
            Qtd -= qtd;
        }
        if (slots[j][0] !== Item && slots[j][0] !== 0){
            qtd_item_div++
        }
    }
}

function leitorDeInventario() {
    var ix = 0;
    var iy = 0;

    for (var i = 0; i < 30; i++) {
        if (slots[i][0] !== 0){
            qualSlotEsta = slots[i][0];
            _slotsx = comeco_x + ((tamanho_do_slot + buffer) * ix);
            _slotsy = comeco_y + ((tamanho_do_slot + buffer) * iy);
            b = i;
            Imagem();
        }
        ix++;
            if (ix >= slot_h) {
                ix = 0;
                iy++;
            }
    }
}

function Imagem() {
    var frameWidth = 32; // Largura de cada frame da sprite
    var frameHeight = 32; // Altura de cada frame da sprite
    var frameIndex = qualSlotEsta - 1; // Índice do frame que você quer exibir
    
    // Cria uma nova sprite
    imagemItem = new Sprite();
    
    // Carrega a imagem da sprite
    if (slots[b][2] === 1){
        imagemItem.bitmap = ImageManager.loadPicture('armas'); // Altere 'objetos' para o nome da sua imagem
    } else if (slots[b][2] === 2){
        imagemItem.bitmap = ImageManager.loadPicture('armas'); // Altere 'objetos' para o nome da sua imagem
    } else if (slots[b][2] === 3){
        imagemItem.bitmap = ImageManager.loadPicture('armas'); // Altere 'objetos' para o nome da sua imagem
    }
    
    // Define as dimensões da sprite
    imagemItem.width = frameWidth;
    imagemItem.height = frameHeight;
    
    // Define o recorte (clip) da imagem para mostrar apenas o frame desejado
    imagemItem.setFrame(frameWidth * frameIndex, 0, frameWidth, frameHeight);

    imagemItem.x = _slotsx;
    imagemItem.y = _slotsy;
    
    // Adiciona a sprite ao palco da cena
    adicionarSprite(imagemItem)
}

function adicionarSprite(imagemItem) {
    SceneManager._scene.addChild(imagemItem);
    spritesAdicionadas.push(imagemItem);
}

function removerSpritesAdicionadas() {
    spritesAdicionadas.forEach(function(imagemItem) {
        SceneManager._scene.removeChild(imagemItem);
    });
    spritesAdicionadas = []; // Limpa o array após remover as sprites
}