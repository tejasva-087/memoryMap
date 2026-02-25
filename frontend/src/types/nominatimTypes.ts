export interface NominatimAddress {
  country?: string;
  country_code: string;
  city?: string;
  town?: string;
  village?: string;
  state?: string;
  postcode?: string;
  road?: string;
  flag?: string;
}

export interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: NominatimAddress;
  boundingbox: string[];
}
