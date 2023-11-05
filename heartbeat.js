const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var string = "198237092183091283097219837192387120983719832798217398127398127309326409765978729804609721398127309812639712398213798123719828123"
const beating = async () => {
  var i = 100000;
  while (i > 0) {
    i--;
    string += string.charAt(0);
    string = string.slice(1);
    document.getElementById("heartbeat").innerText = string;
    await sleep(25);
  }
};

beating();
