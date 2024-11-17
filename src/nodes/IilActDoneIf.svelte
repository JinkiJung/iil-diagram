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
  
    import IilCondition from './IilCondition.svelte';
  
    export let value: string = "";
    export let placeholder: string = "";
    $$restProps;
  
  </script>
  
  <IilCondition hasCircle={true} circleOnLeft={false} {value} {placeholder}/>
