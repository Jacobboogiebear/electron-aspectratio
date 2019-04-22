# Electron Aspect Ratio
This library was made for people who are sick of their electronjs projects needing to perfectly scale for every aspect ratio!
### Why should I use this?
It only has 2 commands but they work great for what they are needed for!
It didn't take long to create this but it is still better then not having it!
### Alright, that wasn't much but I'll try it
![Alt Text](https://media.giphy.com/media/CjmvTCZf2U3p09Cn0h/giphy.gif)
Ok, so here is the basic documentation down below!

**Demo script**
****
```
//Create the basic variables
let { app, BrowserWindow } = require("electron");
let aspect = require("electron-aspectratio");
let mainWindow, mainWindowHandler;

//Create the app
app.on("ready", function() {

    //Create the window
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720
   }); 
   //Set the menubar to NULL
   mainWindow.setMenu(null);
   
   //Load githubocm in webview
   mainWindow.loadURL("https://github.com");
   
   //Create a new handler for the mainWindow
   mainWindowHandler = new aspect(mainWindow);
   
   //define the ratio
   mainWindowHandler.setRatio(16, 9, 10);
});
```
Now that you have seen a demo script, I'll show you the quick syntax of it!

```__windowHandler__.setRatio(Ratio Width, Ratio Height, [optional]Milliseconds between updates)```
The above is simple, so I don't think there is more to say!

### One last thing
You can end the ratio handler by doing
```__windowHandler__.stop()```
but you can start it again afterwards by doing the normal commands!
![Alt Text](https://media.giphy.com/media/2t9sddFwLHT5fhuT7g/giphy.gif)