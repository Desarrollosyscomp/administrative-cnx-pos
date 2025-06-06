import { defineStore } from "pinia";
import { LocationsService } from "../services/locations.services";
import {
  CountryInterface,
  DepartmentInterface,
  MunicipalityInterface,
  NeighborhoodInterface,
} from "../interfaces/locations.interface";

export const useLocationsStore: any = defineStore({
  id: "locations-store",
  state: () => ({
    countries: [] as Array<CountryInterface>,
    departments: [] as Array<DepartmentInterface>,
    municipalities: [] as Array<MunicipalityInterface>,
    neighborhoods: [] as Array<NeighborhoodInterface>,
    countryId: 0,
    departmentId: 0,
    municipalityId: 0,
  }),
  actions: {
    // ********************* COUNTRIES ********************* \\
    async getCountries() {
      let response = await LocationsService.getCountries();
      if (response.status == 200) {
        this.countries = response.data.response.countries;
        return response.data.response.countries;
      }
    },
    // ********************* DEPARTMENTS ********************* \\
    async getDepartments(country_id: number) {
      let response = await LocationsService.getDepartmentsByCountry(country_id);
      if (response.status == 200) {
        this.departments = response.data.response.departments;
        return response.data.response.departments;
      }
    },
    async addDepartment(data: any) {
      let response = await LocationsService.addDepartment(data);
      if (response.status == 201) {
        return response.data.response.department;
      }
    },
    async updateDepartment(id: number, data: any) {
      let response = await LocationsService.updateDepartment(id, data);
      if (response.status == 200) {
        return response.data.response.department;
        // return response.data;
      }
    },
    // ********************* MUNICIPALITIES ********************* \\
    async getMunicipalities(department_id: number) {
      let response = await LocationsService.getMunicipalitiesByDepartment(
        department_id
      );
      if (response.status == 200) {
        this.municipalities = response.data.response.municipalities;
        return response.data.response.municipalities;
      }
    },
    async addMunicipality(data: any) {
      let response = await LocationsService.addMunicipality(data);
      if (response.status == 201) {
        return response.data.response.municipalities;
      }
    },
    async updateMunicipality(id: number, data: any) {
      let response = await LocationsService.updateMunicipality(id, data);
      if (response.status == 200) {
        //this.departments = response.data.response.departments;
        return response.data;
      }
    },
    // ********************* NEIGHBORHOODS ********************* \\
    async getNeighborhoods(municipality_id: number) {
      let response = await LocationsService.getNeighborhoodsByMunicipality(
        municipality_id
      );
      if (response.status == 200) {
        this.neighborhoods = response.data.response.neighborhoods;
        return response.data.response.neighborhoods;
      }
    },
    async addNeighborhood(data: any) {
      let response = await LocationsService.addNeighborhood(data);
      if (response.status == 201) {
        return response.data.response.neighborhoods;
      }
    },
    async updateNeighborhood(id: number, data: any) {
      let response = await LocationsService.updateNeighborhood(id, data);
      if (response.status == 200) {
        //return response.data.response.neighborhoods;
        return response.data;
      }
    },
  },
});
