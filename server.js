const http = require("http");
const app = require("./app")
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);   

//https://www.youtube.com/watch?v=642J5YzLXDk&list=PLWgD0gfm500EMEDPyb3Orb28i7HK5_DkR&index=8