export default (pokemonType: string) => {
  switch (pokemonType) {
    case 'bug':
      return '#3c9950';
    case 'dark':
      return '#595978';
    case 'dragon':
      return '#448a95';
    case 'electric':
      return '#e2e32b';
    case 'fairy':
      return '#961a45';
    case 'fighting':
      return '#994025';
    case 'fire':
      return '#ab1f24';
    case 'flying':
      return '#94b2c7';
    case 'ghost':
      return '#33336b';
    case 'grass':
      return '#147b3d';
    case 'ground':
      return '#a8702d';
    case 'ice':
      return '#86d2f5';
    case 'normal':
      return '#75525c';
    case 'poison':
      return '#5e2d89';
    case 'psychic':
      return '#a52a6c';
    case 'rock':
      return '#48190b';
    case 'steel':
      return '#60756e';
    case 'water':
      return '#1552e1';
    default:
      return '#000';
  }
};
