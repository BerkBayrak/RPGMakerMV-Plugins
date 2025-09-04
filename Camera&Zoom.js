/*:
 * @target MV
 * @plugindesc Auto zoom for map and characters with camera centering on player
 * @author lycradiata
 *
 * @help
 * Map tiles: 1.5x
 * Characters: 2x
 * Camera always centers on player
 */
(function() {
    var mapZoom = 1.2;   // map zoom
    var charZoom = 1.4;  // character zoom

    // --- tilemap zoom ---
    const _Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        _Spriteset_Map_createTilemap.call(this);
        this._tilemap.scale.x = mapZoom;
        this._tilemap.scale.y = mapZoom;
    };

    // --- character zoom ---
    const _Sprite_Character_setCharacter = Sprite_Character.prototype.setCharacter;
    Sprite_Character.prototype.setCharacter = function(character) {
        _Sprite_Character_setCharacter.call(this, character);
        this.scale.set(charZoom, charZoom);
        this.anchor.x = 0.5;
        this.anchor.y = 1.0;
    };

    // --- camera zoom  ---
    const _Spriteset_Map_updatePosition = Spriteset_Map.prototype.updatePosition;
    Spriteset_Map.prototype.updatePosition = function() {
        var player = $gamePlayer;
        var tileWidth = $gameMap.tileWidth() * mapZoom;
        var tileHeight = $gameMap.tileHeight() * mapZoom;

        // player always in the center of the screen
        this.x = Graphics.width / 2 - player.screenX() * mapZoom;
        this.y = Graphics.height / 2 - player.screenY() * mapZoom;

        //camera does not show outside the map borders
        var maxX = 0;
        var maxY = 0;
        var minX = Graphics.width - $gameMap.width() * tileWidth;
        var minY = Graphics.height - $gameMap.height() * tileHeight;

        this.x = Math.min(maxX, Math.max(minX, this.x));
        this.y = Math.min(maxY, Math.max(minY, this.y));
    };
})();
