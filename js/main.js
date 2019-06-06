var game;
var model;
var emitter;
var G;
var controller;
var mediaManager;

window.onload = function()
{
    var config = {
        type: Phaser.AUTO,
        width: 1080,
        height: 900,
        parent: 'space-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [SceneTitle,SceneMain,SceneOver,LevelSelect,SceneStory]
    };

    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);

}