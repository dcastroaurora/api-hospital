import app from "./app";
import "./database";

app.listen(app.get("port"));
console.log("corriendo en el puerto 3000");
