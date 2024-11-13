<script>
    export let circleOnLeft = true;
    export let text = "";
    let height = 14; // Default width
    let width = 80; // Adjust height based on width
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
    // Circle's position and size
    $: circleCx = circleOnLeft ? 12 : width - 12;
    let circleCy = height / 2;
    let circleR = height / 4;

    $: width = Math.max(80, text.length * 6 + 25);
  </script>
  
  <svg class="roundrect" width={width} height={height} viewBox={`-0.5 -0.5 ${width+1} ${height+1}`} xmlns="http://www.w3.org/2000/svg">
    <rect width={width} height={height} rx={height/2} fill="white" stroke="#555" />
    <circle cx={circleCx} cy={circleCy} r={circleR} fill="white" stroke="#555" />
    {#if circleOnLeft}
    <foreignObject x={circleCx + padding * 4} y={1} width={width- paddingOppositeCircle} height={height - padding*2}>
        <div>
          <input type="text" placeholder="Hello" bind:value={text}>
        </div>
    </foreignObject>
    {:else}
    <foreignObject x={padding * 4} y={1} width={width- paddingOppositeCircle} height={height - padding*2}>
        <div>
          <input type="text" placeholder="Hello" bind:value={text}>
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