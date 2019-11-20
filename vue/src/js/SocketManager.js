let host = location.host;
let uri = 'http://' + host;
//uri = "http://localhost:3000";

/*let SocketManager = {
    id: undefined,
    socket: require('socket.io-client')(uri),
    $on: function (name, callback) {
        this.socket.on(name, callback);
    },
    $emit: function (name, data) {
        this.socket.emit(name, data);
    }
};

(() => {
    SocketManager.$on('client:personalID', (id) => {
        console.log("Personal id: " + id);
        SocketManager.id = id;
    })
})();

export default SocketManager;*/