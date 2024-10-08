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
  
    type $$Props = NodeProps;
    export let id: $$Props['id'];
    export let data: $$Props['data'] & { value: string, label: string };
    $$restProps;
  
    const updateValue = (id: string, val: string) => (event) => {
      console.log(val);
  
      $nodes = $nodes;
    };
  </script>
  
  <div class="wrapper gradient nodrag fitChild">
    <div class="inner">
        <div>
            <label for="input-{id}">{data.label}</label>
        </div>
        <div>
            <input
              id="input-{id}"
              type="text"
              value={data.value}
              on:change={updateValue(id, data.value)}
            />
        </div>
    
    </div>
  </div>
  
  <style>
    input{
      width: 100px;
      box-sizing: border-box;
    }
  </style>