<script>
    import { getTextLengthInPx } from "../lib/textLengthRuler";

  export let text = "";
  export let font = "10px sans-serif";
    let height = 14; // Default width
    let width = 80; // Adjust height based on width
    const padding = 2;
    let input_width = width - padding;
    let min_input_width = 80;
    
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
      input_width = Math.max(min_input_width, getTextLengthInPx(text, font) + 4);
      width = input_width + 4;
    }

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