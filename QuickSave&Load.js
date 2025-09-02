/*:
 * @target MV
 * @plugindesc Quick Save & Quick Load system with 5 slots (F5-F9 keys) 
 * @author lycradiata
 *
 * @help
 * F5 = Quick Save/Load (slot 1)
 * F6 = Quick Save/Load (slot 2)
 * F7 = Quick Save/Load (slot 3)
 * F8 = Quick Save/Load (slot 4)
 * F9 = Quick Save/Load (slot 5)
 *
 * Note: Each key is used for both saving and loading.
 * Hold CTRL + key = Quick Load
 * Press key only   = Quick Save
 *
 * If there is no save file in the slot, quick load will fail.
 */

(function() {

    // Extend Scene_Map update to detect key presses
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);

        if (Input.isTriggered("f5")) this.quickHandle(1);
        if (Input.isTriggered("f6")) this.quickHandle(2);
        if (Input.isTriggered("f7")) this.quickHandle(3);
        if (Input.isTriggered("f8")) this.quickHandle(4);
        if (Input.isTriggered("f9")) this.quickHandle(5);
    };

    // Decide whether to save or load depending on CTRL key
    Scene_Map.prototype.quickHandle = function(slot) {
        if (Input.isPressed("control")) {
            this.quickLoad(slot);
        } else {
            this.quickSave(slot);
        }
    };

    // Perform quick save to a specific slot
    Scene_Map.prototype.quickSave = function(savefileId) {
        if (DataManager.isSavefileEnabled()) {
            SoundManager.playSave();
            $gameSystem.onBeforeSave();
            DataManager.saveGame(savefileId)
                .then(() => console.log("Quick Saved! Slot " + savefileId));
        }
    };

    // Perform quick load from a specific slot
    Scene_Map.prototype.quickLoad = function(savefileId) {
        if (DataManager.isThisGameFile(savefileId)) {
            SoundManager.playLoad();
            DataManager.loadGame(savefileId)
                .then(() => {
                    Scene_Load.prototype.reloadMapIfUpdated.call(this);
                    SceneManager.goto(Scene_Map);
                    $gameSystem.onAfterLoad();
                    console.log("Quick Loaded! Slot " + savefileId);
                });
        }
    };

})();
