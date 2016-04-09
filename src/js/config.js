import { getForce } from './data/object';
import { getW,getH } from './util';

export let c = {w:getW(),h:getH()};
export let svg;
export let foreignObjects;
export let sp = 500;

export let posts;

export let postNum = 0;

export let force = getForce();

export let interrupt = false;