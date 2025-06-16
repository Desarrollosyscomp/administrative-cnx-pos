import { defineStore } from "pinia";

import { LocationsService } from "../../../modules/locations/services/locations.services"; 
import {
  CountryInterface,
  DepartmentInterface,
  MunicipalityInterface,
  NeighborhoodInterface,
} from "../../../modules/locations/interfaces/locations.interface"

export const useLocationsComponentStore: any = defineStore({
  id: "locations-component-store",
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
  },
});
