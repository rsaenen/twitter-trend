let Twitter = require('twitter');

function socket(io) {
    let client;

    initClient = () => {
        client = new Twitter({
            consumer_key: 'wGvstC7IYmO1KX7JT6ttBPEJ9',
            consumer_secret: '5PQpUzWUD9CoodpAYtr4H9L81XDHeOjCIkhclwj4fK81M3XUuO',
            access_token_key: '979706012918829056-mMTUdRtHBX8yRoy98W49fiHSjTwSlqd',
            access_token_secret: '1Pa6z4IRLPk1uirSn6p4zh6392aHR7eHqRMSfkOCfuMTO'
        });
    }

    initClient();
    // Does not handle multiple clients, rate limiting or any errors
    io.on('connection', socket => {
        console.log(`A client with identifier ${socket.id} is connected`);

        socket.on('search', ({ terms }) => {
            terms.forEach(term => {
                client.stream('statuses/filter', { track: term }, stream => {
                    stream.on('data', ({ text }) => {
                        socket.emit('result', { term, text });
                    });
                    stream.on('error', error => {
                        console.error(error);
                    });
                });
            });
        });

        socket.on('disconnect', () => {
            console.log(`A client with identifier ${socket.id} disconnect`);
            initClient();
        });
    });
}

module.exports = socket;