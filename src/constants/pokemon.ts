import { StandardCSSProperties } from '@mui/system'

export const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
} as const

export const TYPE_ID_COLORS: Record<
  string,
  StandardCSSProperties['backgroundColor']
> = {
  '1': '#A8A77A',
  '2': '#C22E28',
  '3': '#A98FF3',
  '4': '#A33EA1',
  '5': '#E2BF65',
  '6': '#B6A136',
  '7': '#A6B91A',
  '8': '#735797',
  '9': '#B7B7CE',
  '10': '#EE8130',
  '11': '#6390F0',
  '12': '#7AC74C',
  '13': '#F7D02C',
  '14': '#F95587',
  '15': '#96D9D6',
  '16': '#6F35FC',
  '17': '#705746',
  '18': '#D685AD',
} as const

export const MAX_POKEMON_ID = 809
