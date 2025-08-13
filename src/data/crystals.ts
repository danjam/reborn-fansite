import {
  backswing_m,
  boost,
  boost_m,
  daze,
  daze_m,
  focus_m,
  initiate,
  initiate_m,
  mark_m,
  parry,
  parry_m,
  radiate,
  radiate_m,
  shield,
  shield_m,
} from '@/assets/img';

type CrystalData = {
  id: string;
  name: string;
  icon: string;
  effect: string;
  sell_price: number | null;
};

export const CRYSTALS_DATA: CrystalData[] = [
  {
    id: 'backswing_m',
    name: 'Backswing (M)',
    icon: backswing_m,
    effect: 'Each attack hits an additional time for 0% damage',
    sell_price: 500,
  },
  {
    id: 'boost',
    name: 'Boost',
    icon: boost,
    effect: 'Killing enemies grants x stack(s) of speed boost',
    sell_price: 500,
  },
  {
    id: 'boost_m',
    name: 'Boost (M)',
    icon: boost_m,
    effect: 'Killing enemies grants x stack(s) of speed boost',
    sell_price: 500,
  },
  {
    id: 'daze',
    name: 'Daze',
    icon: daze,
    effect: "Delays Creatures' Attacks by 0.x Seconds",
    sell_price: 500,
  },
  {
    id: 'daze_m',
    name: 'Daze (M)',
    icon: daze_m,
    effect: "Delays Creatures' Attacks by 0.x Seconds",
    sell_price: 500,
  },
  {
    id: 'focus_m',
    name: 'Focus (M)',
    icon: focus_m,
    effect: 'Increases chance to hit a Creature by x% each time they dodge',
    sell_price: 500,
  },
  {
    id: 'initiate',
    name: 'Initiate',
    icon: initiate,
    effect: 'Initial attacks deal x0% extra damage',
    sell_price: 500,
  },
  {
    id: 'initiate_m',
    name: 'Initiate (M)',
    icon: initiate_m,
    effect: 'Initial attacks deal x0% extra damage',
    sell_price: 500,
  },
  {
    id: 'mark_m',
    name: 'Mark (M)',
    icon: mark_m,
    effect:
      'Critical attacks increase chance of future critical attacks on Creature by x%',
    sell_price: 500,
  },
  {
    id: 'parry',
    name: 'Parry',
    icon: parry,
    effect: 'Successfully dodging retaliates with an attack at x0% damage',
    sell_price: 500,
  },
  {
    id: 'parry_m',
    name: 'Parry (M)',
    icon: parry_m,
    effect: 'Successfully dodging retaliates with an attack at x0% damage',
    sell_price: 500,
  },
  {
    id: 'radiate',
    name: 'Radiate',
    icon: radiate,
    effect: 'Critical attacks spread x% damage to all enemies',
    sell_price: 500,
  },
  {
    id: 'radiate_m',
    name: 'Radiate (M)',
    icon: radiate_m,
    effect: 'Critical attacks spread x% damage to all enemies',
    sell_price: 500,
  },
  {
    id: 'shield',
    name: 'Shield',
    icon: shield,
    effect: 'Adds 2 times x% of defence',
    sell_price: 500,
  },
  {
    id: 'shield_m',
    name: 'Shield (M)',
    icon: shield_m,
    effect: 'Adds 2 times x% of defence',
    sell_price: 500,
  },
];
