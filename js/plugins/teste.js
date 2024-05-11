var slots = [];
var Item = 0;
var Qtd = 0;
var a = 0;

const comeco_x = 124;
const comeco_y = 209;
const slot_h = 5;
const slot_v = 6;
const tamanho_do_slot = 31;
const buffer = 4;

var spritesAdicionadas = [];
var qualSlotEsta = 0;
var _slotsx = 0;
var _slotsy = 0;


(function(){
    for (var i = 0; i < 30; i++) {
        slots.push([0 , 0]);
    }
})();

slots[1] = [50 , 2];

(function() {
   
    // Função para adicionar um item ao inventário
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        // Adiciona o item ao inventário
        this._items[item.id] = (this._items[item.id] || 0) + amount;

        // Exibe as informações do inventário em uma janela de mensagem
        var message = `Você pegou ${amount}x ${item.name}.\n`;
        message += `Item ID: ${item.id}, Quantidade: ${this._items[item.id]}`;
        $gameMessage.add(message);
        Item = item.id;
        Qtd = this._items[item.id];
        importItem();
        $gameMessage.add(slots);
        $gameMap.requestRefresh();
    };

})();

function verificarStaks() {
    if (slots[a][1] > 18){
        separarStaks();
    } 
    if (!slots[a][1] > 18){
        $gameMessage.add(slots[a]);
    }
}

function importItem() {
    for (var i = 0; i < 30; i++){
        if (slots[i][0] === 0 || slots[i][0] === Item){
            slots[i] = [Item, Qtd];
            a = i;
            verificarStaks();
            break;
        }
    }
}

function separarStaks() {
    var qtd_item_div = Math.ceil(Qtd / 18);
    for (var j = 0; j < qtd_item_div; j++) {
        if (slots[j][0] === Item || slots[j][0] === 0){
            var qtd = (Qtd > 18) ? 18 : Qtd;
            slots[j] = [Item, qtd]; 
            $gameMessage.add(slots[j]);
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
    var frameIndex = qualSlotEsta; // Índice do frame que você quer exibir
    
    // Cria uma nova sprite
    imagemItem = new Sprite();
    
    // Carrega a imagem da sprite
    imagemItem.bitmap = ImageManager.loadPicture('objetos'); // Altere 'objetos' para o nome da sua imagem
    
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