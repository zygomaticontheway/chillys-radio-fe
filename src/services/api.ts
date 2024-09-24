import axios from 'axios';
import { Station } from '../types/station';

const API_URL = 'http://localhost:8080/api';

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error:', error.message);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
  } else {
    console.error('Unexpected error:', error);
  }
  throw error;
};

export const getStationsByTopClicks = async (): Promise<Station[]> => {
  try {
    const response = await axios.get<Station[]>(`${API_URL}/stations/top-clicks`);
    console.log('Top clicks response:', response.data);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getStationsByTopVotes = async (): Promise<Station[]> => {
  try {
    const response = await axios.get<Station[]>(`${API_URL}/stations/top-votes`);
    console.log('Top votes response:', response.data);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getStationByStationuuid = async (stationuuid: string): Promise<Station> => {
  try {
    const response = await axios.get<Station>(`${API_URL}/stations/${stationuuid}`);
    console.log('Station by UUID response:', response.data);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getStreamUrl = async (stationuuid: string): Promise<string> => {
  try {
    const response = await axios.get<{ url: string }>(`${API_URL}/stations/${stationuuid}/stream`);
    console.log('Stream URL response:', response.data);
    return response.data.url;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const voteForStation = async (stationuuid: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/stations/${stationuuid}/vote`);
    console.log('Vote response:', response.data);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getAllStationsPaginated = async (page: number, size: number): Promise<{ stations: Station[], total: number }> => {
  try {
    const response = await axios.get(`${API_URL}/stations/paginated`, { 
      params: { page, size },
      timeout: 5000 // 5 second timeout
    });
    console.log('Paginated stations response:', response.data);
    return { 
      stations: response.data.content, 
      total: response.data.totalElements 
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const findStationsByTagsCountryLanguage = async (tags?: string, country?: string, language?: string): Promise<Station[]> => {
  try {
    const response = await axios.get<Station[]>(`${API_URL}/stations`, { 
      params: { tags, country, language },
      timeout: 5000 // 5 second timeout
    });
    console.log('Stations by tags/country/language response:', response.data);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
export const getLanguages = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/languages`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Languages response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};
export const getTags = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/tags`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Tags response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const getCountries = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_URL}/countries`);
    console.log('Countries response:', response.data);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
export const getTopStations = async (): Promise<Station[]> => {
  try {
    const [topClicks, topVotes] = await Promise.all([
      getStationsByTopClicks(),
      getStationsByTopVotes()
    ]);

   
    const combinedTopStations = [...topClicks, ...topVotes];

    
    const uniqueTopStations = Array.from(new Set(combinedTopStations.map(s => s.stationuuid)))
      .map(uuid => combinedTopStations.find(s => s.stationuuid === uuid)!)
      .sort((a, b) => (b.clickcount + b.votes) - (a.clickcount + a.votes));

  
    return uniqueTopStations.slice(0, 30);
  } catch (error) {
    return handleAxiosError(error);
  }
};