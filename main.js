const {app, BrowserWindow} = require("electron")

let window

app.on("ready", () => {
    window = new BrowserWindow({})
    window.loadURL('data:text/html,<html><head><style>html,body{font-family:arial;}</style><title>Hello</title></head><body><h1>Hello World</h1></body></html>')
})