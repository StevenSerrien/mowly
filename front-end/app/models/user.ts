import { Place } from '../models/place';

export class User {
  id: number;
  name: string;
  email: string;
  places: Place[];
}
