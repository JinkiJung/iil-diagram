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
    import IilContent from './IilContent.svelte';
  
    export let value: string;
    export let placeholder: string;
    $$restProps;
  
    const updateValue = (id: string, val: string) => (event) => {
      console.log(val);
  
      $nodes = $nodes;
    };
  </script>
  
<IilContent hasCircle={true} circleOnLeft={true} {value} {placeholder}/>
  