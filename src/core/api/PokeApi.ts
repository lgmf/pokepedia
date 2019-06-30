class PokeApi {

  get(path: string) {
    const url = this.buildUrl(path);
    return fetch(url).then(resp => resp.json());
  }


  private buildUrl(path: string, version: string = 'v2') {
    const baseUrl = 'https://pokeapi.co/api';
    return `${baseUrl}/${version}/${path}`;
  }
}

export default new PokeApi();
