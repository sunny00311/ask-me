// router.js
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const { insertEntry } = require("./db");
const { getdata } = require("./db");

function handleRequest(req, res) {
  if (req.method === "GET" && req.url === "/") {
    // Serve form
    const filePath = path.join(__dirname, "public", "form.html");
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading form");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.method === "POST" && req.url === "/submit") {
    // Handle form submission
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const formData = querystring.parse(body);
      const { name, email, message } = formData;

      insertEntry(name, email, message, (err) => {
        if (err) {
          res.writeHead(500);

          res.end("Database error");
        } else {
          const filePath = path.join(__dirname, "public", "for-sub.html");
          fs.readFile(filePath, (err, content) => {
            if (err) {
              res.writeHead(500);
              res.end("Error loading form");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(content);
            }
          });
        }
      });
    });
  } else if (req.method === "GET" && req.url === "/%$unny") {
    getdata((err, results) => {
      if (err) {
        res.writeHead(500);
        res.end("Database error");
      } else {
        // Read the HTML template
        const filePath = path.join(__dirname, "public", "entries.html");
        fs.readFile(filePath, "utf8", (err, html) => {
          if (err) {
            res.writeHead(500);
            res.end("Error loading page");
          } else {
            // Generate rows dynamically
            let rows = "";
            results.forEach((row) => {
              rows += `
              <tr>
                
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.message}</td>
              </tr>`;
            });

            // Replace placeholder in HTML with generated rows
            html = html.replace("<!--ROWS_PLACEHOLDER-->", rows);

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
          }
        });
      }
    });
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
}

module.exports = handleRequest;
