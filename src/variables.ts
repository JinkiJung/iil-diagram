import { writable } from 'svelte/store';

export const rectDimensions = writable({ width: 80, height: 16 });

export const componentStyles = writable({ stroke: '#666', fill: 'white', circleStroke: 'black', circleFill: 'white' });

export const nodeStyles = writable({ stroke: '#222', fill: 'white', strokeWidth: 1 });