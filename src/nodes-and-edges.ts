import { writable } from "svelte/store";
import type { AppNode } from "./types";
import type { Edge } from "@xyflow/svelte";

// We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
export const nodes = writable<AppNode[]>([
  {
    id: '1',
    type: 'iil',
    position: {
      x: 0,
      y: 0
    },
    data: {
      activateIf: "hello",
      input: "dear",
      actor: "me",
      act: "doing what",
      actDoneIf: "trash",
      output: "world"
    },
    style: `
      backgroundColor: rgba(208, 192, 247, 0.2);
      width: 400px;
    `
  },
  {
    id: '2',
    type: 'iil',
    position: {
      x: 450,
      y: 0
    },
    data: {
      activateIf: "hello",
      input: "dear",
      actor: "me",
      act: "doing what",
      actDoneIf: "trash",
      output: "world"
    },
    style: `
      backgroundColor: rgba(208, 192, 247, 0.2);
      width: 100px;
      height: 180px;
    `
  }
  ]);
 
  // same for edges
  export const edges = writable<Edge[]>([
    {
      id: '1-2',
      type: 'default',
      source: '1',
      target: '2',
      label: 'Edge Text'
    }
  ]);