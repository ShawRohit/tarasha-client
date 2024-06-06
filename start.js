import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serve = require("serve");
// import serve from "serve";

const server = serve("dist", {
  port: 3000, // Make sure this is the port you are using
  ignore: ["node_modules"],
  host: "0.0.0.0", // Ensure the server listens on all IP addresses
});
