<script>
    import { getTextLengthInPx } from "../lib/textLengthRuler";

  export let hasCircle = false;
    export let circleOnLeft = false;
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
      width - paddingLR * 2;
    let input_width = min_input_width;
    let circleCx = 0;
    let pOffset = 0.5;

    // Points for a hexagon, adjusting middle width with the width prop
    $: points = getPoints();

    // Circle's position and size
    $: circleCx = 
    !hasCircle ? 0 :
        circleOnLeft ? padding + circleOffset :
          paddingLR + input_width + circleOffset - circleR;
    let circleCy = height / 2;

    function updateWidth() {
      input_width = Math.max(min_input_width, getTextLengthInPx(text, font) + 4);
      width = hasCircle ? input_width + paddingLR + circleOffset + circleR * 2: input_width + paddingLR * 2;
      if (hasCircle) {
        circleCx = circleOnLeft ? padding + circleOffset : padding + input_width + circleOffset;
      }
      console.log(width);
      points = getPoints();
    }

    function getPoints() {
      return `
      ${pOffset}, ${height / 2 + pOffset/2}
      ${height / 2 + pOffset}, ${height - pOffset}
      ${width - height / 2 - pOffset}, ${height - pOffset}
      ${width - pOffset}, ${height / 2 + pOffset /2}, 
      ${width - height / 2 - pOffset}, ${pOffset} 
      ${height / 2 + pOffset}, ${pOffset}
    `;
    }

    //$: width = Math.max(80, text.length * 5);
    $: text, updateWidth();
    $: width, points;
  </script>
  
  <svg class="hexagon" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <polygon points={points} fill="white" stroke="#555" />
    {#if hasCircle}
    <circle cx={circleCx} cy={circleCy} r={circleR} fill="white" stroke="#555" />
    {/if}
    {#if circleOnLeft}
    <foreignObject x={circleOffset + circleR + padding} y={2} width={input_width} height={height - 4}>
        <div>
          <input style="width: 100%;" type="text" placeholder={placeholder} bind:value={text}>
        </div>
    </foreignObject>
    {:else}
    <foreignObject x={paddingLR} y={2} width={input_width} height={height - 4}>
        <div>
          <input style="width: 100%;" type="text" placeholder={placeholder} bind:value={text}>
        </div>
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