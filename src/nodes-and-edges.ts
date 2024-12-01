import { writable } from "svelte/store";
import type { AppNode } from "./types";
import type { Edge } from "@xyflow/svelte";
import { Direction } from "./models/Direction";

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
      activateIf: "차를 탈 준비가 완료됨",
      input: "열쇠, 열려 있는 차 문",
      actor: "운전자",
      act: "차 문을 열고 차에 탑승하기",
      actDoneIf: "운전석에 앉아 있음",
      output: "탑승 완료"
    },
    style: `
      backgroundColor: rgba(173, 216, 230, 0.3);
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
      activateIf: "탑승 완료",
      input: "운전석에 앉아 있음",
      actor: "운전자",
      act: "안전벨트를 착용하기",
      actDoneIf: "안전벨트 착용됨",
      output: "운전 준비 완료"
    },
    style: `
      backgroundColor: rgba(173, 216, 230, 0.3);
    `
  },
  {
    id: '3',
    type: 'iil',
    position: {
      x: 0,
      y: 300
    },
    data: {
      activateIf: "운전 준비 완료",
      input: "안전벨트 착용됨",
      actor: "운전자",
      act: "시동을 걸고 기어를 조작하기",
      actDoneIf: "차가 이동할 준비 완료됨",
      output: "운전 시작 가능"
    },
    style: `
      backgroundColor: rgba(173, 216, 230, 0.3);
    `
  }]);
 
  // same for edges
  export const edges = writable<Edge[]>([
    {
      id: '1-2',
      source: '1',
      sourceHandle: Direction.RIGHT,
      target: '2',
      targetHandle: Direction.LEFT,
      type: 'buttonedge'
    },
    {
      id: '2-3',
      source: '2',
      sourceHandle: Direction.RIGHT,
      target: '3',
      targetHandle: Direction.LEFT,
    }
  ]);

  