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
    import Levels from '../../js/GameData/Levels';
    import GameObject from "../../js/Actor/GameObject";

    //import SocketManager from "../../js/SocketManager";

    /*let initPosition = new Vector(1300 / 2, 700 / 2);

    let hero = new Character(initPosition, {
        accessToController: true
    });

    let enemy = new Character(new Vector(size.x / 2 + size.x, size.y / 2 + size.y), {
        accessToController: false
    });*/

    let id = 0;

    let vp, canvas, ctx;

    export default {
        name: "GameField",
        data() {
          return {

          }
        },
        components: {

        },
        mounted() {
            let screenSize = new Vector(
                this.$store.state.viewPortSize.x,
                this.$store.state.viewPortSize.y
            );

            canvas = document.getElementById('game-field');
            ctx = canvas.getContext("2d");
            vp = new ViewPort(
                ctx,
                new Vector(0, 0),
                screenSize
            );
            canvas.width = screenSize.x;
            canvas.height = screenSize.y;
        },
        methods: {
            loadMenu() {
                let levelData = Levels.menu;
                vp.zones = levelData.zones;
                let objects = Levels.getGameObjects(levelData);
                vp.gameObjects = objects;

                objects.solid.forEach((obj) => {
                   objects.hero[0].collision.addTriggerWith(obj.collision);
                });

                let lastTriggered = Date.now();

                function render() {
                    let now = Date.now();
                    let delta = now - lastTriggered;

                    vp.update();
                    vp.drawZones();
                    vp.drawGameObjects(delta);

                    lastTriggered = now;
                    requestAnimationFrame(render);
                }

                render();
            },
            init: function (data) {
                /*hero.opponentID = data.opponentID;
                if (data.isQuest) {
                    hero.position = new Vector(size.x / 2 + size.x, size.y / 2 + size.y);
                    enemy.position = initPosition;
                }

                SocketManager.$on('enemy:game:event', (data) => {
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
                });*/

                /*vp.zones = Object.values(GameZones);
                vp.gameObjects = [hero, enemy];
                let lastTriggered = Date.now();



                function render() {
                    let now = Date.now();
                    let delta = now - lastTriggered;

                    hero.update();
                    enemy.update();
                    vp.update(hero.position);
                    vp.drawZones();
                    vp.drawGameObjects(Render.sortByIncreasingY([hero, enemy]), delta);

                    lastTriggered = now;
                    requestAnimationFrame(render);
                }

                render();*/
            },
            clientSizeChanged: function () {
                let size = new Vector(
                    this.$store.state.viewPortSize.x,
                    this.$store.state.viewPortSize.y
                );

                try {
                    canvas.width = size.x;
                    canvas.height = size.y;
                    vp.size = size;
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #game-field {

    }
</style>