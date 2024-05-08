//=============================================================================
// CustomMethods.js
//=============================================================================

/*:
 * @plugindesc Plugin contendo métodos personalizados para uso fora do RPG Maker MV.
 * @author [Seu Nome]
 *
 * @help Este plugin fornece métodos JavaScript personalizados para uso fora do RPG Maker MV.
 *
 */

(function() {
    // Método slotsPulados.includes
    Array.prototype.includesSlot = function(value) {
        return this.indexOf(value) !== -1;
    };

    // Método !slotsPulados.includes
    Array.prototype.notIncludesSlot = function(value) {
        return this.indexOf(value) === -1;
    };

    // Método Object.values
    Object.prototype.getValues = function() {
        return Object.keys(this).map(function(key) {
            return this[key];
        }, this);
    };

    // Método slotsPulados.push
    Array.prototype.pushSlot = function(value) {
        this.push(value);
    };

})();
