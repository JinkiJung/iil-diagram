<script lang="ts">
  import { writable } from "svelte/store";
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
    type NodeTypes,
    Handle,
  } from "@xyflow/svelte";
  import TextNode from "./nodes/TextNode.svelte";
  import IilNode from "./nodes/IilNode.svelte";
  import { nodes, edges } from "./nodes-and-edges";
  import { v4 as uuidv4 } from "uuid";
  import ButtonEdge from './nodes/ButtonEdge.svelte';

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";
  import { Direction } from "./models/Direction";

  const nodeTypes: NodeTypes = {
    textinput: TextNode,
    iil: IilNode,
  };

  const snapGrid: [number, number] = [10, 10];
  const { screenToFlowPosition } = useSvelteFlow();
  const edgeTypes = {
      buttonedge: ButtonEdge,
    };

    const defaultEdgeOptions = {
    type: 'buttonedge',
  };
  
  const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
    if (connectionState.isValid) return;

    const sourceNodeId = connectionState.fromNode?.id ?? "1";
    const id = uuidv4();
    const { clientX, clientY } =
      "changedTouches" in event ? event.changedTouches[0] : event;

    const newNode: Node = {
      id,
      type: "iil",
      data: {
        input: "",
        activateIf: "",
        actor: "",
        act: "",
        actDoneIf: "",
        output: "",
      },
      // project the screen coordinates to pane coordinates
      position: screenToFlowPosition({
        x: clientX,
        y: clientY,
      }),
      // set the origin of the new node so it is centered
      origin: [0.5, 0.0],
      style: `backgroundColor: rgba(208, 192, 247, 0.2);`,
    };
    $nodes.push(newNode);
    console.log(connectionState);
    if (
      connectionState.fromHandle?.id === Direction.LEFT ||
      connectionState.fromHandle?.id === Direction.RIGHT ||
      connectionState.fromHandle?.id === Direction.RIGHT_TOP ||
      connectionState.fromHandle?.id === Direction.RIGHT_BOTTOM
    ) {
      if (connectionState.fromHandle?.id === Direction.LEFT) {
        $edges.push({
          source: id,
          sourceHandle: Direction.RIGHT,
          target: sourceNodeId,
          targetHandle: connectionState.fromHandle?.id,
          id: `${sourceNodeId}--${id}`,
          type: 'buttonedge',
        });
      } else {
        $edges.push({
          source: sourceNodeId,
          sourceHandle: connectionState.fromHandle?.id,
          target: id,
          targetHandle: Direction.LEFT,
          id: `${sourceNodeId}--${id}`,
          type: 'buttonedge',
        });
      }
    } else {
      if (connectionState.fromHandle?.id === Direction.TOP) {
        $edges.push({
          source: id,
          sourceHandle: Direction.BOTTOM,
          target:sourceNodeId,
          targetHandle: connectionState.fromHandle?.id,
          id: `${sourceNodeId}--${id}`,
          type: 'buttonedge',
        });
      }
      $edges.push({
        source: sourceNodeId,
        sourceHandle: connectionState.fromHandle?.id,
        target: id,
        targetHandle: Direction.TOP,
        id: `${sourceNodeId}--${id}`,
        type: 'buttonedge',
      });
    }

    $nodes = $nodes;
    $edges = $edges;
  };
</script>

<div style:height="500px">
  <SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    {edgeTypes}
    {defaultEdgeOptions}
    fitView
    on:nodeclick={(event) => console.log("on node click", event.detail.node)}
    onconnectend={handleConnectEnd}
  >
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>
</div>
