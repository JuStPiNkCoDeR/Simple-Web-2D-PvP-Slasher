<template>
  <div id="app">
    <GameField ref="gameField"></GameField>
  </div>
</template>

<script>
import GameField from './components/field/GameField';
import SocketManager from './js/SocketManager';

export default {
  name: 'app',
  data: function() {
    return {

    }
  },
  components: {
    GameField
  },
  mounted() {
    let opponentID = null;
    let isQuest = null;

    SocketManager.$on('enemy:search', (data) => {
      if (SocketManager.id !== data) {
        SocketManager.$emit('enemy:requestForFight', {
          opponentID: data,
          isQuest: false
        });
      }
    });

    SocketManager.$on('enemy:ready', (data) => {
      if (!opponentID) {
        opponentID = data.opponentID;
        isQuest = !data.isQuest;
        SocketManager.$emit('enemy:requestForFight', {
          opponentID: opponentID,
          isQuest: isQuest
        });

        this.$refs.gameField.init({
          opponentID: opponentID,
          isQuest: isQuest
        })
      }
    })
  }
}
</script>

<style lang="scss">
  @import "../public/stylesheets/sprites/index";

  body{
    margin: 0;
    overflow: hidden;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
