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
  
    import Hexagon from './Hexagon.svelte';
  
    export let hasCircle: boolean = false;
    export let circleOnLeft: boolean = false;
    export let placeholder: string = "";
    export let value: string = "";
  </script>
  
  <div class="nodrag item">
        <Hexagon {hasCircle} text={value} {circleOnLeft} {placeholder} />
  </div>

  <style>
    .item {
      display: flex;
      align-self: flex-start;
      padding: 2px;
    }
  </style>
  