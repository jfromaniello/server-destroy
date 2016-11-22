module.exports = enableDestroy;

function enableDestroy(server) {
  const connections = new Set();

  server.on('connection', (conn) => {
    connections.add(conn);
    conn.once('close', function() {
      connections.delete(conn);
    });
  });

  server.destroy = function(cb) {
    server.close(cb);
    connections.forEach(conn => conn.destroy());
  };
}
