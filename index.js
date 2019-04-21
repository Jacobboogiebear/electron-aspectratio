/**
 * @description A object handler for aspect ratio stuff in electron.js
 * @copyright This code has been modified but is mainly from https://stackoverflow.com/questions/48043469/how-to-lock-aspect-ratio-while-resizing-the-window and https://github.com/electron/electron/issues/8036
 * @param {electron.BrowserWindow} window The electron.js window to connect the handle to
 */
module.exports = function(window) {
    this._rem = false;
    this._win = window;
    this._oldRes = this._win.getSize();
    this._wRatio = 0;
    this._hRatio = 0;
    this._func1 = (wRatio, hRatio) => {
        if (!this._ended) {
            let size = this._win.getSize();
            let widthChanged = this._oldRes[0] != size[0];
            var ratioY2X = this._hRatio / this._wRatio;
            if (widthChanged) {
                this._win.setSize(size[0], parseInt((size[0] * ratioY2X).toString()));
            } else {
                this._win.setSize(parseInt((size[1] / ratioY2X).toString()), size[1]);
            }
        }
    }
    this._func2 = () => {
        this._rem = true;
    }
    this._ended = false;
    /**
     * @description A command to set and lock the Ratio of the window supplyed at the creation of this object
     * @param {number} wRatio The ratio width of the window
     * @param {number} hRatio The ratio height of the window
     * @param {number} [sLoop=10] How many milliseconds between each size update
     */
    this.setRatio = function(wRatio, hRatio, sLoop = 10) {
        this._resLoop = setInterval(() => {
            if (!this._rem) {
                this._oldRes = this._win.getSize();
            }
        }, sLoop);
        this._wRatio = wRatio;
        this._hRatio = hRatio;
        this._win.on('resize', this._func1);
        this._win.on('close', this._func2);
        this.setRatio = function() {
            throw new Error("You can't run this command twice without stopping it first");
        }
    }
    this.stop = function() {
        clearInterval(this._resLoop);
        this._ended = true;
        this.setRatio = function(wRatio, hRatio, sLoop = 10) {
            this._ended = false;
            this._resLoop = setInterval(() => {
                if (!this._rem) {
                    this._oldRes = this._win.getSize();
                }
            }, sLoop);
            this._wRatio = wRatio;
            this._hRatio = hRatio;
            this.setRatio = function() {
                throw new Error("You can't run this command twice without stopping it first");
            }
        }
    }
}