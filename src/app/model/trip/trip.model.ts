import { Destination } from '../destination/destination.model';

export class Trip {
    key : string;
    name : string;
    passengers : string;
    origin: string;
    destination : Array<Destination>;
    totalPrice: number;
}