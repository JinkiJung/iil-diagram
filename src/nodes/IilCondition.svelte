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
  
    export let hasCircle: boolean = true;
    export let circleOnLeft: boolean = true;
    export let placeholder: string = "";
    export let value: string = "";
  </script>
  
  <div class="wrapper gradient nodrag fitChild">
    <div class="inner">
        <Hexagon {hasCircle} text={value} {circleOnLeft} {placeholder}>
        </Hexagon>
    </div>
  </div>
  