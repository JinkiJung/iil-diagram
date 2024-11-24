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
    import RoundRect from './RoundRect.svelte';
  
    export let hasCircle: boolean = true;
    export let circleOnLeft: boolean = true;
    export let placeholder: string = "";
    export let value: string = "";
  </script>
  
  <div class="nodrag item">
        <RoundRect {hasCircle} text={value} {circleOnLeft} {placeholder} />
  </div>
  <style>
    .item {
      display: flex;
      align-self: flex-start;
      padding: 2px;
    }
  </style>