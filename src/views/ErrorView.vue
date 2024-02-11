<script>
export default {
  name: "ErrorView",
  methods: {},
  mounted() {
    consoleText(
      [
        "errore 404",
        "pagina non trovata.",
        "pagina non trovata, sul serio.",
        "sei ancora qui?",
        "ok.",
        "come vuoi.",
        "              ",
        "ho tutto il tempo del mondo.",
      ],
      "text",
      [
        "#262626",
        "##262626",
        "#262626",
        "#262626",
        "#262626",
        "#262626",
        "#262626",
        "#262626",
      ]
    );
  },
};
function consoleText(words, id, colors) {
  if (colors === undefined) colors = ["#222"];
  let visible = true;
  let con = document.getElementById("console");
  let letterCount = 1;
  let x = 1;
  let waiting = false;
  let target = document.getElementById(id);
  target.setAttribute("style", "color:" + colors[0]);
  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      window.setTimeout(function () {
        let usedColor = colors.shift();
        colors.push(usedColor);
        let usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute("style", "color:" + colors[0]);
        letterCount += x;
        waiting = false;
      }, 500);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 120);
  window.setInterval(function () {
    if (visible === true) {
      con.className = "console-underscore hidden";
      visible = false;
    } else {
      con.className = "console-underscore";

      visible = true;
    }
  }, 400);
}
</script>

<template>
  <div id="our-error">
    <div class="container-fluid">
      <div class="console-container">
        <span id="text"></span>
        <div class="console-underscore" id="console">&#95;</div>
      </div>
    </div>
  </div>
</template>
