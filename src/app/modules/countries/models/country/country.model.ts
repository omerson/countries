export class Country {
    name: string;
    population: number;
    flag: string;
    alpha3Code: string;
    currencies: string[];
    timezones: string[];
    languages: string[];
    borders: string[];
    borderCountries?: string[];
}