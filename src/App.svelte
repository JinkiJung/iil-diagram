<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap
  } from '@xyflow/svelte';

  import CustomNode from './nodes/CustomNode.svelte';
  import TextNode from './nodes/TextNode.svelte';
  import IilNode from './nodes/IilNode.svelte';
  import { nodes, edges } from './nodes-and-edges';

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
 
  const nodeTypes: NodeTypes = {
    custom: CustomNode,
    textinput: TextNode,
    iil: IilNode
  };

  
    const snapGrid: [number, number] = [10, 10];
</script>
 
<!--
👇 By default, the Svelte Flow container has a height of 100%.
This means that the parent container needs a height to render the flow.
-->
<div style:height="500px">
  <SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    fitView
    on:nodeclick={(event) => console.log('on node click', event.detail.node)}
  >
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>
</div>