export interface Artist {
  _id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[];
  instruments: string[];
}
export interface BodyUser {
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
export interface Band {
  _id: string;
  name: string;
  origin: string;
  members: Member[];
  website: string;
  genresIds: string[];
}
export interface Member {
  id: string;
  artist: string;
  instrument: string;
  year: String;
}

export interface Genre {
  _id: string;
  name: string;
  description: string;
  country: string;
  year: string;
}
export interface Track {
  _id: string;
  title: string;
  albumId: string;
  bandsIds: string[];
  artistsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}
export interface updateTrack {
  title: string;
  albumId: string;
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}
export interface Album {
  _id: string;
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}
export interface Favorite {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}
