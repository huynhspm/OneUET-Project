const app = require("./app");
const config = require("./config");

const port = config.port;

app.listen(port, () =>
	console.log(`Example app listening att http://localhost:${port}`)
);
