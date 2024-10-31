import { throwHttpErrorHandler } from "@/handlers";
import axios from "axios";

export interface nationalityInterface {
  name: string;
}

export class NationalitiesService {
  static async getAll(): Promise<nationalityInterface[]> {
    const fetchNationalities = await axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/unicode")
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
    const nationalities = fetchNationalities.data.map(
      (country: nationalityInterface) => ({
        name: country.name,
      }),
    );
    nationalities.sort((a: nationalityInterface, b: nationalityInterface) =>
      a.name.localeCompare(b.name),
    );
    return nationalities;
  }
}
