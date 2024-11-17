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
    import IilContent from './IilContent.svelte';
  
    export let value: string;
    export let placeholder: string;
  
  </script>
  
  <IilContent hasCircle={true} circleOnLeft={false} {value} {placeholder} />
  