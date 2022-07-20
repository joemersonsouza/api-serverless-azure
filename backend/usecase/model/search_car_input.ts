export class SearchCarInput {
    search: string;
    limit: number;
    offset: number;
    sort: string;
    _validSortField: String[] = ["maker", "model_name", "year", "color", "monthlyPrice", "availableDate"]

    constructor(search: string, limit: number, offset: number, sort: string) {
        this.search = search || "";
        this.limit = limit || 10;
        this.offset = offset || 0;
        this.sort = sort || "monthlyPrice";
        if(!this._validSortField.includes(this.sort)) {
            throw Error("Invalid sort field")
        }
    }
}