import {newCtx, posToRect} from "./CanvasUtil"
import CanvasDraw from "./CanvasDraw"

export default function LszCanvas(canvasId) {
  let me = this;
  me.objArr = [];
  me.canvansDom = document.getElementById(canvasId);
  me.ctx = me.canvansDom.getContext("2d");
  me.width = me.canvansDom.clientWidth;
  me.height = me.canvansDom.clientHeight;
  me.buff = newCtx(me.width, me.height);
  let draw = new CanvasDraw(me.buff);

  me.mouseRect = {
    type: '',
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    getRect: function () {
      return posToRect(this.x1, this.y1, this.x2, this.y2);
    }
  }

  me.setType = function (type) {
    me.mouseRect.type = type;
  }

  me.refresh = function () {
    me.buff.clearRect(0, 0, me.width, me.height);
    me.refreshEx(me.objArr);
    me.mouseRectDraw();

    let imgData = me.buff.getImageData(0, 0, me.width, me.height);
    me.ctx.putImageData(imgData, 0, 0);
  }

  //鼠标矩形
  me.mouseRectDraw = function () {
    if (me.mouseRect.type) {
      switch (me.mouseRect.type) {
        case 'mouse':
          draw.rectByLineDash(me.mouseRect.getRect(), [4, 6])
          break;
        default:
          let rect = {
            left: me.mouseRect.x2 - 50,
            top: me.mouseRect.y2 - 15,
            wid: 100,
            hei: 30
          }
          draw.textByRect(me.mouseRect.type, rect)
          draw.rect(rect)
          break
      }
    }

  }

  me.selectObj=function(x,y){
    for (let obj of me.objArr) {
      obj.focus = false;
    }
    let obj = me.findFocusByPos(x,y);
    if (obj){
      obj.focus = true;
    }
  }

  me.selectObjFocus = function(selectObj){
    for (let obj of me.objArr) {
      obj.focus = false;
    }
    selectObj.focus = true;
  }

  me.findFocusByPos = function(x,y){
    for (let obj of me.objArr) {

      if (x > obj.left && x < (obj.left + obj.wid)
        && y > obj.top && y < (obj.top + obj.hei)) {
        return obj;
      }
    }
  }

  me.pushObj = function (mouseRect) {
    let rect = {
      left: mouseRect.x2 - 50,
      top: mouseRect.y2 - 15,
      wid: 100,
      hei: 30
    }
    let obj = {
      type: mouseRect.type,
      left: rect.left,
      top: rect.top,
      wid: rect.wid,
      hei: rect.hei,
      text:mouseRect.type,
      focus: false,
    }
    me.objArr.push(obj)
    return obj;
  }

  me.refreshEx = function (arr) {
    for (let obj of arr) {
        draw.display(obj)
    }
  }

  me.canvansDom.onmousedown = function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (e.buttons == 1) {
      //左键
      me.mouseRect.type = 'mouse';
      me.mouseRect.x1 = x;
      me.mouseRect.y1 = y;

      me.mouseRect.x2 = me.mouseRect.x1;
      me.mouseRect.y2 = me.mouseRect.y1;

    }
  }

  me.canvansDom.onmousemove = function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (e.buttons == 1) {
      //左键
      if (me.mouseRect.type) {
        me.mouseRect.x2 = x;
        me.mouseRect.y2 = y;
      }
    }
    me.refresh();
  }

  me.canvansDom.onmouseup = function (e) {
    let x = e.offsetX;
    let y = e.offsetY;

    //左键
    if (me.mouseRect.type) {
      switch (me.mouseRect.type) {
        case 'mouse':
            me.selectObj(x,y);


          break
        default:
          me.pushObj(me.mouseRect);
      }


      me.mouseRect.type = '';
    }else{

    }
    me.refresh();
  }
}
