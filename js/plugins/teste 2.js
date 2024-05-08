var slots = 0;
const MAX_ITEM = 18;
var item = 1;
var local = [];
var def_armas = def_armas;
var valor = 200;
var spritesAdicionadas = [];

document.addEventListener('keydown', Tecla);

function definirOpacidadeZero() {
    spritesAdicionadas.forEach(function(sprite) {
        sprite.opacity = 0;
    });
}

function definirOpacidadeCem() {
    spritesAdicionadas.forEach(function(sprite) {
        sprite.opacity = 255;
    });
}

function Tecla(event) {
    var teclaPressionada = event.keyCode || event.which;
    if (teclaPressionada === 70) {
        verificar();
        $gameMessage.add("Você pressionou a tecla 'f'!");
    }
    if (teclaPressionada === 71){
        definirOpacidadeZero();
    }
    if (teclaPressionada === 72){
        definirOpacidadeCem();
    }
    if (teclaPressionada === 73){
        removerSpritesAdicionadas();
    }
}

function verificar() {
    for (var i = 1; i <= $dataItems.length; i++) {
        item = i;
        var items = $gameParty.numItems($dataItems[i]);
        if (items > 0) {
            marcador = items;
            if (items > MAX_ITEM) {
                var qtd_item_div = Math.ceil(items / MAX_ITEM);
                for (var j = 1; j <= qtd_item_div; j++) {
                    var qtd = (items > MAX_ITEM) ? MAX_ITEM : items;
                    local.push(slots);
                    valor += 20;
                    imagem();
                    valor -= 20; 
                    $gameMessage.add('local no inventario:' + slots + '   ID_Iten:' + item + '   quantia:' + qtd);
                    $gameMessage.add(local);
                    items -= MAX_ITEM;
                    slots++;
                }
            } else {
                local.push(slots);
                valor += 20;
                imagem();
                valor -= 20; 
                $gameMessage.add('local no inventario:' + slots + '   ID_Iten:' + item + '   quantia:' + items);
                $gameMessage.add(local);
                slots++;
            }
        } 
    }  
}

function imagem() {
    var frameWidth = 32; // Largura de cada frame da sprite
    var frameHeight = 32; // Altura de cada frame da sprite
    var frameIndex = item; // Índice do frame que você quer exibir
    
    // Cria uma nova sprite
    def_armas = new Sprite();
    
    // Carrega a imagem da sprite
    def_armas.bitmap = ImageManager.loadPicture('objetos'); // Altere 'objetos' para o nome da sua imagem
    
    // Define as dimensões da sprite
    def_armas.width = frameWidth;
    def_armas.height = frameHeight;
    
    // Define o recorte (clip) da imagem para mostrar apenas o frame desejado
    def_armas.setFrame(frameWidth * frameIndex, 0, frameWidth, frameHeight);

    def_armas.x = valor;
    def_armas.y = valor;
    
    // Adiciona a sprite ao palco da cena
    adicionarSprite(def_armas)
}

// Função para adicionar uma sprite e armazená-la no array
function adicionarSprite(def_armas) {
    SceneManager._scene.addChild(def_armas);
    spritesAdicionadas.push(def_armas);
}

// Função para remover todas as sprites adicionadas
function removerSpritesAdicionadas() {
    spritesAdicionadas.forEach(function(def_armas) {
        SceneManager._scene.removeChild(def_armas);
    });
    spritesAdicionadas = []; // Limpa o array após remover as sprites
}

(function() {

    // Função para adicionar um item ao inventário
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        // Adiciona o item ao inventário
        this._items[item.id] = (this._items[item.id] || 0) + amount;

        // Exibe as informações do inventário em uma janela de mensagem
        var message = "Você pegou " + amount + "x " + item.name + ".\n";
        message += "Item ID: " + item.id + ", Quantidade: " + this._items[item.id];
        $gameMessage.add(message);

        $gameMap.requestRefresh();
    };

})();


//armas
//$gameParty.numItems($dataWeapons[armaId]);
//$dataWeapons.length - 1;
//itens
//$gameParty.numItems($dataItems[itemId]);
//$dataItems.length - 1;
//armadura
//$gameParty.numItems($dataArmors[armaduraId]);
//$dataArmors.length - 1;