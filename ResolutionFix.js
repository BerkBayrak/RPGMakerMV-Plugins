/*:
 * @plugindesc Force resolution 1920x1080 + fullscreen at startup
 * @author lycradiata
 */

(function() {
    var _SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        this._screenWidth  = 1920;
        this._screenHeight = 1080;
        this._boxWidth     = 1920;
        this._boxHeight    = 1080;
        _SceneManager_run.call(this, sceneClass);
    };

    // When the game is opened, it starts in full screen.
    var _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        _SceneManager_initialize.apply(this, arguments);
        if (Utils.isNwjs()) {
            Graphics._switchFullScreen();
        }
    };
})();
