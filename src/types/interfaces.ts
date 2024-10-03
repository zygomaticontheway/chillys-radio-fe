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

export interface IStationResponse {
  stations: IStation[]
  isLoading: boolean
  error: string
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
  id: number
  username: string
  email: string
  token: string
  refreshToken: string
}

export interface IAudioPlayerState {
  isPlaying: boolean
  streamUrl: string
}
