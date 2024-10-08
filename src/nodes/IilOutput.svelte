<script lang="ts">
    import {
      type NodeProps,
      Handle,
      Position,
      useHandleConnections,
      useInternalNode,
      type BuiltInNode,
      type Dimensions
    } from '@xyflow/svelte';
  
    import { nodes } from '../nodes-and-edges';
    import Hexagon from './Hexagon.svelte';
    import RoundRect from './RoundRect.svelte';
  
    export let value: string;
  
    const updateValue = (id: string, val: string) => (event) => {
      console.log(val);
  
      $nodes = $nodes;
    };
  </script>
  
  <div class="wrapper gradient nodrag fitChild">
    <div class="inner">
      <Hexagon circleOnLeft={false} />
    </div>
  </div>
  