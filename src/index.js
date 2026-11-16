
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== "/ws") {
      return new Response("WebSocket Server Online!");
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("WebSocket Required", { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    server.accept();

    server.addEventListener("message", (event) => {
      server.send("Echo: " + event.data);
    });

    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }
};
