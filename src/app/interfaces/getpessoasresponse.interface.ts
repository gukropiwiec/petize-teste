import { IPessoa } from "./pessoa.interface";

export interface IGetPessoasResponse {
    content: IPessoa[],
    pageable: {
        sort: {
            unsorted: boolean,
            sorted: boolean,
            empty: boolean
        },
        pageNumber: number,
        pageSize: number,
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    numberOfElements: number,
    first: boolean,
    sort: {
        unsorted: boolean,
        sorted: boolean,
        empty: boolean
    },
    number: number,
    size: number,
    empty: boolean
}