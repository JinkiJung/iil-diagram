
<script lang="ts">
    import { writable } from 'svelte/store';
    import {
      SvelteFlow,
      Controls,
      Background,
      BackgroundVariant,
      MiniMap,
      useSvelteFlow,
      type OnConnectEnd,
      type Node,
      SvelteFlowProvider,
      type NodeTypes
  
  
    } from '@xyflow/svelte';
    import CustomNode from './nodes/CustomNode.svelte';
    import TextNode from './nodes/TextNode.svelte';
    import IilNode from './nodes/IilNode.svelte';
    import { nodes, edges } from './nodes-and-edges';
    import { v4 as uuidv4 } from 'uuid';
  
    // 👇 this is important! You need to import the styles for Svelte Flow to work
    import '@xyflow/svelte/dist/style.css';
   
    const nodeTypes: NodeTypes = {
      custom: CustomNode,
      textinput: TextNode,
      iil: IilNode
    };
  
    
      const snapGrid: [number, number] = [10, 10];
      const { screenToFlowPosition } = useSvelteFlow();
      
      const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
      if (connectionState.isValid) return;
   
      const sourceNodeId = connectionState.fromNode?.id ?? '1';
      const id = uuidv4();
      const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;
   
      const newNode: Node = {
        id,
        type: 'iil',
        data: { input: '', activateIf: '', actor: '', act: '', actDoneIf: '', output: '' },
        // project the screen coordinates to pane coordinates
        position: screenToFlowPosition({
          x: clientX,
          y: clientY
        }),
        // set the origin of the new node so it is centered
        origin: [0.5, 0.0],
        style: `backgroundColor: rgba(208, 192, 247, 0.2);`
      };
      $nodes.push(newNode);
      $edges.push({
        source: sourceNodeId,
        target: id,
        id: `${sourceNodeId}--${id}`
      });
   
      $nodes = $nodes;
      $edges = $edges;
    };
  </script>

<div style:height="500px">
    <SvelteFlow
      {nodes}
      {edges}
      {nodeTypes}
      fitView
      on:nodeclick={(event) => console.log('on node click', event.detail.node)}
      onconnectend={handleConnectEnd}
    >
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
    </SvelteFlow>
</div>