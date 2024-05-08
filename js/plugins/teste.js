var slots = [];
var Item = 0;
var Qtd = 0;
var a = 0;

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
        var message = "Você pegou " + amount + "x " + item.name + ".\n";
        message += "Item ID: " + item.id + ", Quantidade: " + this._items[item.id];
        $gameMessage.add(message);
        Item = item.id;
        Qtd = this._items[item.id];
        PegouItem();
        $gameMessage.add(slots);
        $gameMap.requestRefresh();
    };

})();

function verificar() {
    if (slots[a][1] > 18){
        var qtd_item_div = Math.ceil(Qtd / 18);
        for (var j = 0; j < qtd_item_div; j++) {
            if (slots[j][0] === Item || slots[j][0] === 0){
                var qtd = (Qtd > 18) ? 18 : Qtd;
                slots[j] = [Item, qtd]; 
                $gameMessage.add(slots[j]);
                Qtd -= qtd;
            } else {
                qtd_item_div++
            }
        }
    } else {
        $gameMessage.add(slots[a]);
    }
}

function PegouItem(){
    for (var i = 0; i < 30; i++){
        if (slots[i][0] === 0 || slots[i][0] === Item){
            if (slots[i][1] === 0){
                slots[i] = [Item, Qtd];
                a = i;
                verificar();
                break;
            }
            slots[i] = [Item, Qtd];
            a = i;
            verificar();
            break;
        }
    }
}