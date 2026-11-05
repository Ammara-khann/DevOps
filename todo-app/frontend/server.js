const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = 80;

// Static files (index.html, style.css, script.js) serve karo
app.use(express.static(__dirname));

// /api/* requests backend pe forward karo
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://backend:3000",
    changeOrigin: true,
  })
);

// Baaki sab routes pe index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});