export interface IStation {
  id?: number
  stationuuid: string
  name: string
  url?: string
  url_resolved: string
  homepage?: string
  favicon: string
  tags: string
  country: string
  countrycode?: string
  state?: string
  language: string
  languagecodes?: string
  votes: number
  lastchangetime?: string
  codec?: string
  bitrate?: number
  lastcheckok?: number
  clickcount: number
}
export interface IStationResponseData{
    content: IStation [];
    // pageable: {
    //     pageNumber: boolean,
    //     pageSize: number,
    //     sort: {
    //         empty: boolean,
    //         sorted: boolean,
    //         unsorted: boolean
    //     },
    //     offset: boolean,
    //     paged: boolean,
    //     unpaged: boolean
    // },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    // sort: {
    //     empty: boolean,
    //     sorted: boolean,
    //     unsorted: boolean
    // },
    numberOfElements: number,
    first: boolean,
    empty: boolean
}

export interface IStationResponse {
    data: IStationResponseData;
    isLoading: boolean;
    error: string | null;
}

export interface ITokenResponse {
  accessToken: string
  refreshToken: string
}

export interface IDataResponse {
  ok: boolean
  message: string
  modifiedItems: string
}

export interface IUserData {
    id: number;
    username: string;
    email: string;
    token: string;
    refreshToken: string;
  }

  export interface IAudioPlayerState {
    isPlaying: boolean;
    streamUrl: string;
  }

 export interface IFavoriteStations {
    stations: IStation[]; 
}

export interface IStationInfo {
    id: number;
    title: string;
    amount: number;
    type: string;
}
