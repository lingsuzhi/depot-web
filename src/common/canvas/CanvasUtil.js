export function newCtx(wid, hei) {
  var c2 = document.createElement("canvas");
  c2.width = wid;
  c2.height = hei;
  console.log(12)
  return c2.getContext("2d");

}

export function log1() {
  console.log(10)
}
