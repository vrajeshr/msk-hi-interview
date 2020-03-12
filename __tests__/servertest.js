import io from "socket.io-client"
let ioClient;

beforeAll( () => {
    ioClient = io('localhost:8080')
});

describe('basic socket.io unit tests', () => {
  test('should communicate', (done) => {
    ioClient.emit('PING')
    socket.on('PONG', (message) => {
      expect(message).toBe('Hello world!');
      done();
    });
  });
});