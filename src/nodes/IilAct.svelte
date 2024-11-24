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
    import Rect from './Rect.svelte';
  
    export let value: string;
    $$restProps;
  
    const updateValue = (id: string, val: string) => (event) => {
      console.log(val);
  
      $nodes = $nodes;
    };
  </script>
  
  <div class="nodrag item">
    <Rect text={value} />
  </div>
  <style>
    .item {
      display: flex;
      align-self: flex-start;
      padding: 2px;
    }
  </style>