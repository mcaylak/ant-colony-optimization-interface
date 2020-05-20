import City from "./city";
import AcoOptions from "./aco-options";

export default class AcoInput{
  cities: City[];
  acoOptions: AcoOptions;

  static of(cities: City[],acoOptions: AcoOptions){
    const input = new AcoInput();
    input.cities = cities;
    input.acoOptions = acoOptions;
    return input;
  }
}
