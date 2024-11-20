<script lang="ts">
  import {
    type NodeProps,
    Handle,
    Position,
    useHandleConnections,
    useInternalNode,
    type BuiltInNode,
    type Dimensions,
  } from "@xyflow/svelte";
  import { onMount, onDestroy } from "svelte";
  import { nodes } from "../nodes-and-edges";
  import IilInput from "./IilInput.svelte";
  import IilActivateIf from "./IilActivateIf.svelte";
  import IilOutput from "./IilOutput.svelte";
  import IilActDoneIf from "./IilActDoneIf.svelte";
  import IilAct from "./IilAct.svelte";
  import IilCondition from "./IilCondition.svelte";

  type $$Props = NodeProps;
  export let id: $$Props["id"];
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
        console.log(`Width: ${width}, Height: ${height}`);
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
</script>

<div class="iil" id={id}>
  <div class="container">
    <div class="column" >
      <div class="container iilbody">
        <div class="column" bind:this={divElement}>
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
      <div class="row">
        {#if hasCheckout}
        <div style="position: relative; width: 100%; height: 100%;">
          <svg width="100" height={height}>
            <line x1="0" y1="0" x2="100" y2="100%" stroke="black" stroke-width="1" />
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="black" stroke-width="1" />
          </svg>
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
            <IilCondition hasCircle={false} value="test" placeholder="output" />
          </div>
        </div>
        {:else}
        <button on:click="{() => hasCheckout = true}">Add Checkout</button>
        {/if}
      </div>
    </div>
  
  </div>
</div>
<Handle type="target" position={Position.Left} style="top:16px; left: -3px;" />
{#if !hasCheckout}
<Handle
  type="source"
  position={Position.Right}
  style="top:16px; right: -3px;"
/>
{:else}
<Handle
  type="source"
  position={Position.Right}
  style="top:0px; right: -3px;"
  id="yes"
/>

<Handle
  type="source"
  position={Position.Right}
  style="top:{height}px; right: -3px;"
  id="no"
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
</style>
