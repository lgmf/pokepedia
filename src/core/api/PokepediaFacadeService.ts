import { env } from "@/environment";

class PokepediaFacadeService {
  get<T>(path: string): Promise<T> {
    const url = this.buildUrl(path);
    return fetch(url).then(resp => resp.json());
  }

  private buildUrl(path: string) {
    return `${env.apiUrl}/${path}`;
  }
}

export default new PokepediaFacadeService();
