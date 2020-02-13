import { SuggestionMap } from '../models';

class PokepediaFacadeService {
  get<T>(path: string): Promise<T> {
    const url = this.buildUrl(path);
    return fetch(url).then(resp => resp.json());
  }

  getPokemonNameMap(): Promise<SuggestionMap> {
    return fetch('pokemon-names.json').then(resp => resp.json());
  }

  private buildUrl(path: string) {
    const baseUrl = 'https://us-central1-pokepedia-cd5d3.cloudfunctions.net';
    return `${baseUrl}/${path}`;
  }
}

export default new PokepediaFacadeService();
