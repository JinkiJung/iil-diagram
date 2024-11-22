<script>

    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Canvas from "./Canvas.svelte";

</script>

 
<!--
👇 By default, the Svelte Flow container has a height of 100%.
This means that the parent container needs a height to render the flow.
-->
<SvelteFlowProvider>
  <Canvas />
</SvelteFlowProvider>