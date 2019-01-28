import {newCtx} from "./CanvasUtil"

export default  class LszCanvas{
  constructor(canvasId) {
    let me = this;
    me.canvansDom = document.getElementById(canvasId);
    me.ctx = me.canvansDom.getContext("2d");
    me.width = me.canvansDom.clientWidth;
    me.height = me.canvansDom.clientHeight;

    me.buff = newCtx(me.width, me.height);


  }

  refresh () {
    let me = this;
    me.buff.clearRect(0, 0, me.width, me.height);
    let imgData = me.buff.getImageData(0, 0, me.width, me.height);
    me.ctx.putImageData(imgData, 0, 0);
  }

}
