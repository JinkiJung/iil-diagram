<script lang="ts">
  import {
    type NodeProps,
    Handle,
    Position,
    useHandleConnections,
    useInternalNode,
    type BuiltInNode,
    type Dimensions,
    NodeResizer,
  } from "@xyflow/svelte";
  import { onMount, onDestroy } from "svelte";
  import { nodes } from "../nodes-and-edges";
  import IilInput from "./IilInput.svelte";
  import IilActivateIf from "./IilActivateIf.svelte";
  import IilOutput from "./IilOutput.svelte";
  import IilActDoneIf from "./IilActDoneIf.svelte";
  import IilAct from "./IilAct.svelte";
  import IilCondition from "./IilCondition.svelte";
    import { Direction } from "../models/Direction";

  type $$Props = NodeProps;
  export let id: $$Props["id"];
  export let selected: $$Props['selected'] = undefined;
  export let data: $$Props["data"] & {
    input: string;
    activateIf: string;
    actor: string;
    act: string;
    actDoneIf: string;
    output: string;
  };
  $$restProps;

  let divElement; // 크기를 감지할 div 요소를 참조할 변수
  let width = 0;
  let height = 0;
  let hasCheckout = false;

  let resizeObserver;

  onMount(() => {
    // ResizeObserver 초기화
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = newWidth;
        height = newHeight;
      }
    });

    // divElement를 감시하도록 설정
    if (divElement) {
      resizeObserver.observe(divElement);
    }
  });

  onDestroy(() => {
    // 컴포넌트가 제거될 때 observer를 해제
    if (resizeObserver && divElement) {
      resizeObserver.unobserve(divElement);
      resizeObserver.disconnect();
    }
  });

  const updateValue = (id: string, val: string) => (event) => {
    console.log(val);

    $nodes = $nodes;
  };

  const isValidConnection = (connection: any) => {
    if ((connection.sourceHandle === Direction.RIGHT || connection.sourceHandle === Direction.RIGHT_TOP || connection.sourceHandle === Direction.RIGHT_BOTTOM) && connection.targetHandle === Direction.LEFT) {
      return true;
    } else if (connection.sourceHandle === Direction.BOTTOM && connection.targetHandle === Direction.TOP) {
      return true;
    } 
    return false;
  }

  function handleKeyDown(event: CustomEvent<any>) {
    //let key = event.key;
    console.log(`Key pressed: ${event}`);
  }

  const deleteNode = () => {
    nodes.update((n) => n.filter((node) => node.id !== id));
  };
</script>

<NodeResizer minWidth={100} minHeight={30} isVisible={selected} on:keyDown={handleKeyDown} color="rgb(255, 64, 0)"
  shouldResize={() => false} />
<div class="iil" id={id}>
  <div class="container">
    <div class="column" >
      <div class="container iilbody" bind:this={divElement}>
        <div class="column">
          <div class="row">
            <IilInput value={data.input} placeholder="input" />
          </div>
          <div class="row">
            <IilActivateIf value={data.activateIf} placeholder="activateIf" />
          </div>
        </div>
        <div class="column">
          <div class="row">
            <IilAct value={data.act} />
          </div>
        </div>
        <div class="column">
          <div class="row">
            <IilOutput value={data.output} placeholder="output" />
          </div>
          <div class="row">
            <IilActDoneIf value={data.actDoneIf} placeholder="actDoneIf" />
          </div>
        </div>
      </div>
    </div>
    
    <div class="column">
        {#if hasCheckout}
        <div style="position: relative; width: 100%; height: 100%;">
          <svg width="100" height={height}>
            <line x1="0" y1="0" x2="100" y2="100%" stroke="black" stroke-width="1" />
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="black" stroke-width="1" />
          </svg>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -55%);">
            <IilCondition hasCircle={false} value="test" placeholder="output" />
            </div>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, 53%);">
              <button class="closeButton" on:click={() => hasCheckout = false}>-</button>
            </div>
        </div>
        {:else}
        <button class="expandButton" on:click="{() => hasCheckout = true}">+</button>
        {/if}
    </div>
  
  </div>
</div>
<Handle type="target" position={Position.Left}
  id={Direction.LEFT} style="top:16px; left: -3px;" {isValidConnection}/>
<Handle type="target" position={Position.Top}
  id={Direction.TOP} style="top:-5px; left: 130px;" {isValidConnection}/>
<Handle type="source" position={Position.Bottom}
  id={Direction.BOTTOM} style="top: 30px; left: 130px;" {isValidConnection}/>
{#if !hasCheckout}
<Handle
  type="source"
  position={Position.Right}
  style="top:16px; right: -3px;"
  id={Direction.RIGHT}
  {isValidConnection}
/>
{:else}
<Handle
  type="source"
  position={Position.Right}
  style="top:0px; right: -3px;"
  {isValidConnection}
  id={Direction.RIGHT_TOP}
/>

<Handle
  type="source"
  position={Position.Right}
  style="top:{height}px; right: -3px;"
  {isValidConnection}
  id={Direction.RIGHT_BOTTOM}
/>
{/if}

<style>
  :global(.svelte-flow__node-iil) {
    font-size: 10px;
  }

  :global(.svelte-flow__node-iil .svelte-flow__handle) {
    top: 24px;
    right: -15px;
    width: 6px;
    height: 10px;
    border-radius: 2px;
    background-color: #778899;
  }

  .container {
    display: flex;
    width: fit-content; /* Adjust width to fit the content */
    box-sizing: border-box; /* Include padding in element’s width */
    flex-direction: row;
    align-items: stretch;
    border: 0.5px solid black;
  }

  .row {
    display: flex;
    flex-wrap: wrap; /* Allow columns to wrap to a new line on small screens */
  }

  .column {
    flex: 1; /* Columns take equal width */
    box-sizing: border-box; /* Ensure padding doesn’t affect width */
  }
  .iilbody {
    background-color: #f5f5f5;
    color: #222;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 15%),
      0 2px 4px -1px rgb(0 0 0 / 8%);
    border-radius: 2px;
  }
  .closeButton {
    background-color: red;
    border: none;
    color: white;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

    .expandButton {
      background-color: skyblue;
      border: none;
      color: white;
      width: 12px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

</style>
