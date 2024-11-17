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
    import IilInput from './IilInput.svelte';
    import IilActivateIf from './IilActivateIf.svelte';
    import IilOutput from './IilOutput.svelte';
    import IilActDoneIf from './IilActDoneIf.svelte';
    import IilAct from './IilAct.svelte';
  
    type $$Props = NodeProps;
    export let id: $$Props['id'];
    export let data: $$Props['data'] & { input: string, activateIf: string, actor: string, act: string, actDoneIf: string, output: string };
    $$restProps;
  
    const updateValue = (id: string, val: string) => (event) => {
      console.log(val);
  
      $nodes = $nodes;
    };
  </script>
  
  
  <div class="iil">
    <div class="container">
        <div class="column">
            <div class="row">
                <IilInput value="test"/>
            </div>
            <div class="row">
                <IilActivateIf value="test"/>
            </div>
        </div>
        <div class="column">
          <div class="row">
            <IilAct value="test"/>
        </div>
        </div>
        <div class="column">
            <div class="row">
                <IilOutput value="test"/>
            </div>
            <div class="row">
                <IilActDoneIf value="test"/>
            </div>
        </div>
    
    </div>
  </div>
  <Handle type="target" position={Position.Left} 
    style="top:16px; left: -3px;"/>
  <Handle type="source" position={Position.Right} 
    style="top:16px; right: -3px;"/>
  
  <style>
    :global(.svelte-flow__node-iil) {
      font-size: 10px;
      background: #f5f5f6;
      color: #222;
      box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 15%),
        0 2px 4px -1px rgb(0 0 0 / 8%);
      border-radius: 2px;
    }

    :global(.svelte-flow__node-iil .svelte-flow__handle) {
    top: 24px;
    right: -15px;
    width: 6px;
    height: 10px;
    border-radius: 2px;
    background-color: #778899;
  }

    input{
      width: 100px;
      box-sizing: border-box;
    }

    .container {
      display: flex;
      width: fit-content; /* Adjust width to fit the content */
      box-sizing: border-box; /* Include padding in element’s width */
      flex-direction: row;
      align-items: stretch;
    }

  .row {
    display: flex;
  flex-wrap: wrap; /* Allow columns to wrap to a new line on small screens */
  }

  .column {
    flex: 1; /* Columns take equal width */
    box-sizing: border-box; /* Ensure padding doesn’t affect width */
    background-color: #F5F5F5;
    }
  </style>
