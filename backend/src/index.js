import app from "./app.js";
import config from "./config.js";

const port = config.port;

app.listen(port, () =>
	console.log(`Example app listening att http://localhost:${port}`)
);
