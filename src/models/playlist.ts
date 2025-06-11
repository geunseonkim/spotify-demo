import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  tracks?: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: PlaylistTrack[];
  };
}

export interface PlaylistTrack {
  added_at?: string | null;
  added_by: {
    external_urls?: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local?: boolean;
  track?: Track | Episode;
}

export interface Track {
  type: "track";
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  album: {
    id: string;
    name: string;
    album_type: string;
    total_tracks: number;
    release_date: string;
    release_date_precision: string;
    uri: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    images: Image[];
  };
  artists: Artist[];
  is_playable: boolean;
  linked_from?: object;
  restrictions?: {
    reason: string;
  };
}

export interface Episode {
  type: "episode";
  id: string;
  name: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  release_date: string;
  release_date_precision: string;
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  audio_preview_url: string | null;
  language: string;
  languages: string[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  show: {
    id: string;
    name: string;
    publisher: string;
    uri: string;
    href: string;
    type: string;
    external_urls: ExternalUrls;
  };
  images: Image[];
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}
