<script>
    import { getTextLengthInPx } from "../lib/textLengthRuler";

  export let hasCircle = false;
    export let circleOnLeft = true;
    export let text = "";
    export let placeholder= "";
    export let font = "10px sans-serif";
    let height = 14; // Default width
    let width = 80; // Adjust height based on width
    const padding = 4;
    const paddingLR = 8;
    let circleR = 3.5;
    let circleOffset = 8;
    let min_input_width = hasCircle ? width - paddingLR - circleOffset:
      width - paddingLR;
    let input_width = min_input_width;
    let circleCx = 0;
    
    // Points for a hexagon, adjusting middle width with the width prop
    $: points = `
      0, ${height / 2}
      ${height / 2}, ${height}
      ${width - height / 2}, ${height}
      ${width}, ${height / 2}, 
      ${width - height / 2}, 0 
      ${height / 2}, 0
    `;
    // Circle's position and size
    $: circleCx = 
      !hasCircle ? 0 :
        circleOnLeft ? padding + circleOffset :
          paddingLR + input_width + circleOffset - circleR;
    let circleCy = height / 2;

    function updateWidth() {
      input_width = Math.max(min_input_width, getTextLengthInPx(text, font) + 4);
      width = hasCircle ? input_width + paddingLR + circleOffset + circleR * 2: input_width + paddingLR;
      if (hasCircle) {
        circleCx = circleOnLeft ? padding + circleOffset : padding + input_width + circleOffset;
      }
    }

    //$: width = Math.max(80, text.length * 5);
    $: text, updateWidth();
  </script>
  
  <svg class="roundrect" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width={width - 1} height={height - 1} rx={height/2} fill="white" stroke="#555" />
    {#if hasCircle}
    <circle cx={circleCx} cy={circleCy} r={circleR} fill="white" stroke="#555" />
    {/if}
    {#if circleOnLeft}
    <foreignObject x={circleOffset + circleR + padding} y={2} width={input_width} height={height - 4}>
      <input style="width: 100%;" type="text" placeholder={placeholder} bind:value={text}>
    </foreignObject>
    {:else}
    <foreignObject x={paddingLR} y={2} width={input_width} height={height - 4}>
      <input style="width: 100%;" type="text" placeholder={placeholder} bind:value={text}>
    </foreignObject>
    {/if}
    
  </svg>

  <style>
    input{
      box-sizing: border-box;
      border: none;
      font-size: 10px;
      outline:none;
    }
  </style>