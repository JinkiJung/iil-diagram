<script>
  export let text = "";
    let height = 14; // Default width
    let width = 80; // Adjust height based on width
    let input_width = width - 2;
    let min_input_width = 80;
    const padding = 2;
    const paddingOppositeCircle = 30;

    // Points for a hexagon, adjusting middle width with the width prop
    $: points = `
      0, ${height / 2}
      ${height / 2}, ${height}
      ${width - height / 2}, ${height}
      ${width}, ${height / 2}, 
      ${width - height / 2}, 0 
      ${height / 2}, 0
    `;

    function updateWidth() {
      input_width = Math.max(min_input_width, getTextWidth(text, "10px sans-serif") + 4);
      width = input_width + 4;
    }

    function getTextWidth(text, font) {
      // if given, use cached canvas for better performance
      // else, create new canvas
      var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width;
    };

    //$: width = Math.max(80, text.length * 5);
    $: text, updateWidth();
  </script>
  <svg class="roundrect" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width={width - 1} height={height - 1} fill="white" stroke="#555" />
    <foreignObject x={1} y={1} width={input_width} height={height - 2}>
      <div>
        <input style="width: 100%;" type="text" placeholder="Act" bind:value={text}>
      </div>
  </foreignObject>
  </svg>

  <style>
    input{
      box-sizing: border-box;
      border: none;
      font-size: 10px;
      outline:none;
    }
  </style>