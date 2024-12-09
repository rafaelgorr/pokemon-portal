const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

const others = {
  dreamWorld: 'other/dream-world',
  officialArtwork: 'other/official-artwork',
}

const getBaseUrl = (type: keyof typeof others) => `${others[type]}`

const generations = {
  one: {
    path: 'versions/generation-i',
    games: { redBlue: 'red-blue', yellow: 'yellow' },
  },
  two: {
    path: 'versions/generation-ii',
    games: { crystal: 'crystal', gold: 'gold', silver: 'silver' },
  },
  three: {
    path: 'versions/generation-iii',
    games: {
      emerald: 'emerald',
      fireredLeafgreen: 'firered-leafgreen',
      rubySapphire: 'ruby-sapphire',
    },
  },
  four: {
    path: 'versions/generation-iv',
    games: {
      diamondPearl: 'diamond-pearl',
      heartgoldSoulsilver: 'heartgold-soulsilver',
      platinum: 'platinum',
    },
  },
  five: {
    path: 'versions/generation-v',
    games: {
      blackWhite: 'black-white',
    },
  },
  six: {
    path: 'versions/generation-vi',
    games: {
      omegarubyAlphasapphire: 'omegaruby-alphasapphire',
      xY: 'x-y',
    },
  },
  seven: {
    path: 'versions/generation-vii',
    games: {
      ultraSunUltraMoon: 'ultra-sun-ultra-moon',
    },
  },
}
type Generations = typeof generations
type GenerationsKeys = keyof Generations
type Game<G extends Generations, K extends GenerationsKeys> = keyof G[K]['games']

const getters = {
  getSprite: (pokemonId: string) => `${baseUrl}/${pokemonId}.png`,
  getShinySprite: (pokemonId: string) => `${baseUrl}/shiny/${pokemonId}.png`,
  getOtherSprite: (pokemonId?: string) => `${baseUrl}/${getBaseUrl('officialArtwork')}/${pokemonId}.png`,
  getGenerationSprite: <G extends Generations, K extends GenerationsKeys>(input: {
    number: K
    game: Game<G, K>
    pokemonId: string
  }) => {
    const { game, number, pokemonId } = input
    const generation = generations[number]
    const gamePath = Object.entries(generation.games).find(([k]) => k === game)?.[1]

    return `${baseUrl}/${generation.path}/${gamePath}/${pokemonId}.png`
  },
}

export default getters
