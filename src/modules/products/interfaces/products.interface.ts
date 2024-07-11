export interface ProductsInterface {
    id:          number;
    //company_id:  number;
    name:        string;
    description: null;
    is_active:   number;
    createdAt:   string;
    updatedAt:   string;
    products_type_id: number;
}

export interface CompanyInterface {
    id:          number;
    name:        string;
    description: null;
    is_active:   number;
    createdAt:   string;
    updatedAt:   string;
}
