export default function CanvasDraw(canvas2d) {
  let me = this;
  let ctx = canvas2d;

  let style = {
    strokeStyle: '#666666',
    lineWidth: 2,
    fillStyle: "#ffEEdd",
    fontStyle: '#303133',
    focusStyle: '#67C23A',
    lineHeight: 24,
    lineDash: []
  }

  me.rect = function (rect, color) {
    if (color) {
      ctx.strokeStyle = color;
    } else {
      ctx.strokeStyle = style.strokeStyle;
    }
    ctx.lineWidth = style.lineWidth;
    ctx.setLineDash(style.lineDash)
    ctx.strokeRect(rect.left, rect.top, rect.wid, rect.hei);
  }

  me.rectByLineDash = function (rect, lineDash) {
    let oldDash = style.lineDash;
    style.lineDash = lineDash;
    me.rect(rect)
    style.lineDash = oldDash;
  }

  //填充矩形
  me.fullRect = function (rect) {
    ctx.fillStyle = style.fillStyle;
    ctx.fillRect(rect.left, rect.top, rect.wid, rect.hei);
  }

  me.text = function (text, x, y) {
    if (text) {
      txtInit();
      ctx.fillText(text, x, y);
    }
  }

  //不考虑换行 居中对齐
  me.textByRect = function (text, rect) {
    if (text) {
      txtInit();
      ctx.textAlign = 'center';
      ctx.fillText(text, rect.left + (rect.wid / 2), (rect.hei) / 2 + rect.top + 5);
    }
  }

  me.display = function (obj) {
    if (!obj || !obj.type) {
      return
    }
    switch (obj.type) {
      case "标签":
        me.textByRect(obj.text, obj)
      case "表格":
        me.textByRect(obj.text, obj)

        break
    }

    if (obj.focus) {
      me.rect(obj, style.focusStyle)
    }
  }

  function txtInit() {
    ctx.fillStyle = "#333333";
    ctx.font = "16px Arial";
    ctx.textAlign = 'left';
  }

  //自动换行
  me.wrapText = function (text, x, y, maxWidth) {
    if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
      return;
    }
    txtInit();
    if (typeof maxWidth == 'undefined') {
      maxWidth = 180;
    }
    // 字符分隔为数组
    let arrText = text.split('');
    let line = '';

    for (let n = 0; n < arrText.length; n++) {
      let testLine = line + arrText[n];
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth) {
        ctx.fillText(line, x, y);
        line = arrText[n];
        y += style.lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  };
}
