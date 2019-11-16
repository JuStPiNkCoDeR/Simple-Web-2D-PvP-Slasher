<template>
    <div>
        <canvas id="game-field"></canvas>
    </div>
</template>

<script>
    import Character from '../../js/Actor/Character';
    import Animation from '../../js/Actor/Animation';
    import Vector from '../../js/Graphics/Vector';
    import States from '../../js/Actor/States';
    import ViewPort from '../../js/Graphics/ViewPort';
    import Render from "../../js/Graphics/Render";
    import GameZones from "../../js/GameData/GameZones";
    import SocketManager from "../../js/SocketManager";

    let size = {x: document.documentElement.clientWidth, y: document.documentElement.clientHeight};

    let initPosition = new Vector(size.x / 2, size.y / 2);

    let hero = new Character(initPosition, {
        accessToController: true
    });

    let enemy = new Character(new Vector(size.x / 2 + size.x, size.y / 2 + size.y), {
        accessToController: false
    });

    let id = 0;

    export default {
        name: "GameField",
        data: function() {
          return {

          }
        },
        components: {

        },
        methods: {
            init: function (data) {
                hero.opponentID = data.opponentID;
                if (data.isQuest) {
                    hero.position = new Vector(size.x / 2 + size.x, size.y / 2 + size.y);
                    enemy.position = initPosition;
                }

                SocketManager.$on('enemy:game:event', (data) => {
                    console.log(data);
                    switch (data) {
                        case "up":
                            enemy.pressed.push('w');
                            break;
                        case "down":
                            enemy.pressed.push('s');
                            break;
                        case "left":
                            enemy.pressed.push('a');
                            break;
                        case "right":
                            enemy.pressed.push('d');
                            break;
                    }
                });
                let canvas = document.getElementById('game-field');
                let ctx = canvas.getContext("2d");
                let vp = new ViewPort(
                    ctx,
                    new Vector(0, 0),
                    new Vector(size.x, size.y)
                );

                canvas.width = size.x;
                canvas.height = size.y;

                let zones = Object.values(GameZones);

                let lastTriggered = Date.now();

                enemy.sprite.addAnimation(States.Idle, new Animation("img/Reaper_Man_2/IdleSpriteSheet.png", 18, 1300, 900, 900));
                enemy.sprite.addAnimation(States.Walking, new Animation("img/Reaper_Man_2/IdleSpriteSheet.png", 18, 1300, 900, 900));
                hero.sprite.addAnimation(States.Idle, new Animation("img/Reaper_Man_1/IdleSpriteSheet.png", 18, 1300, 900, 900));
                hero.sprite.addAnimation(States.Walking, new Animation("img/Reaper_Man_1/WalkingSpriteSheet.png", 24, 800, 900, 900));

                function render() {
                    let now = Date.now();
                    let delta = now - lastTriggered;

                    hero.update();
                    enemy.update();
                    vp.update(hero.position);
                    vp.drawZones(zones);
                    vp.drawGameObjects(Render.sortByIncreasingY([hero, enemy]), delta);

                    lastTriggered = now;
                    requestAnimationFrame(render);
                }

                render();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #game-field {

    }
</style>