import { environment } from "../../environments/environment"

const base_url = environment.base_url;

export class Transaction {    

    constructor(
        public codigo: string,
        public referencia: string,
        public valor: number,
        public transaction?: number,
        public xxx?: string,
        public aaa?: string,
        public status?: boolean,
        public fecha?: Date,
        public tid?: string,
    ){}   

};