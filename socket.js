class Socket {

    constructor(socket) {
        this.io = socket;
    }

    socketConnection() {
        this.io.on('connection', (socket) => {

            console.log('A new visitor here as session id = ' + socket.id);

            ////////////////////////////////////////////// Write events here \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


            socket.on("hello", (data) => {
                console.log("Fired");
                console.log(data);

                this.io.emit("notify2", "Noty")
            })


            ////////////////////////////////////////////// End of events \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


            this.socketDisconnect(socket);
        })
    }


    socketDisconnect(socket) {
        socket.on('disconnect', (data) => {
            console.log('user logout , id : ' + socket.id);
        })
    }



}

module.exports = Socket;