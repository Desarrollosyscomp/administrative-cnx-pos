export interface CountryInterface {
    id:        number;
    name:      string;
    dian_id:      string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface DepartmentInterface {
    id:         number;
    name:       string;
    dian_id:       string;
    country_id: number;
    is_active:  boolean;
    createdAt:  string;
    updatedAt:  string;
  }
  
  export interface MunicipalityInterface {
    id:            number;
    name:          string;
    dian_id:          string;
    department_id: number;
    is_active:     boolean;
    createdAt:     string;
    updatedAt:     string;
  }
  
  export interface NeighborhoodInterface {
    id:              number;
    name:            string;
    dian_id:            string;
    municipality_id: number;
    is_active:       boolean;
    createdAt:       string;
    updatedAt:       string;
  }