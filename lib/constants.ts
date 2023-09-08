// @ts-ignore
import * as phil from "select-philippines-address";

export interface Region {
  id: number;
  psgc_code: string;
  region_code: string;
  region_name: string;
}

export interface Province {
  province_code: string;
  province_name: string;
  psgc_code: string;
  region_code: string;
}

export interface City {
  city_code: string;
  city_name: string;
  province_code: string;
  region_desc: string;
}

export interface Barangay {
  brgy_code: string;
  brgy_name: string;
  province_code: string;
  region_code: string;
}

export const getRegions = async (): Promise<Region[]> => {
  const regionsArr = await phil.regions();
  return regionsArr;
};

export const getProvincesByRegion = async (
  regionCode: string
): Promise<Province[]> => {
  const provinceArr = await phil.provinces(regionCode);
  return provinceArr;
};

export const getCitiesByProvince = async (
  provinceCode: string
): Promise<City[]> => {
  const citiesArr = await phil.cities(provinceCode);
  return citiesArr;
};

export const getBarangaysByCity = async (
  cityCode: string
): Promise<Barangay[]> => {
  const barangayArr = await phil.barangays(cityCode);
  return barangayArr;
};

const getAllProvinces = async () => {
  const regions = await getRegions();

  const provinces = await Promise.all(
    regions.map(async (region) => {
      const provincesOfRegion = await getProvincesByRegion(region.region_code);
      return provincesOfRegion;
    })
  ).then((values) => values.flat());

  return provinces;
};
