export class Automobile {
    constructor(
        public id?: number,
        public marca?: string,
        public modello?: string,
        public targa?: string,
        public dataImmatricolazione?: Date,
        public inProduzione: boolean = false
    ) { }
}