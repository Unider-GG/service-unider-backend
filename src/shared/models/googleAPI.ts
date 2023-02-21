export interface GooglePlacesAPIQuery {
  location?: string;
  latitude?: string;
  longitude?: string;
  radius?: string;
  type?: string;
}

export interface Establishment {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  permanently_closed: boolean;
  photos: [
    {
      height: number;
      html_attributions: Array<string>;
      photo_reference: string;
      width: number;
    },
  ];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  types: Array<string>;
  user_ratings_total: number;
  vicinity: string;
}

export interface NearbysearchResult {
  results: Array<Establishment>;
}
