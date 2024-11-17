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
    import IilCondition from './IilCondition.svelte';
  
    export let value: string;
  
    const updateValue = (id: string, val: string) => (event) => {
      console.log(val);
  
      $nodes = $nodes;
    };
  </script>
  
  <IilCondition hasCircle={true} circleOnLeft={false} {value} />
  