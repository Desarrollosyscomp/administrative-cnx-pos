export interface UsersInterface {
    id:          number;
    username:    string;
    password:    string;
    // description: null;
    is_active:   number;
    createdAt:   string;
    updatedAt:   string;
    // users_type_id: number;
}

export interface CompanyInterface {
    id:          number;
    name:        string;
    description: null;
    is_active:   number;
    createdAt:   string;
    updatedAt:   string;
}
