import { Food } from '../models/food';
import { Drink } from '../models/drink';

export class Place {
    id: number;
    name: string;
    streetname: string;
    housenumber: string;
    city: string;
    latitude: string;
    longitude: string;
    user_id: number;
    foods: Food[];
    drinks: Drink[];
    distance: string;
}
