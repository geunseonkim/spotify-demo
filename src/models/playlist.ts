import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Image, Owner } from "./commonType";
import { Episode, Track } from "./track";

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
  } | null;
  is_local?: boolean;
  track?: Track | Episode;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface CreatePlaylistRequest {
  name: string;
  // public?: string;
  playlistPublic?: string;
  collaborative?: boolean;
  description?: string;
}

export interface UpdatePlaylistRequest {
  uris?: string[];
  range_start?: number;
  insert_before?: string;
  range_length?: number;
  snapshot_id?: string;
}

export interface GetBrowseCategoryRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface Category {
  href: string;
  icons: {
    height: number | null;
    url: string;
    width: number | null;
  }[];
  id: string;
  name: string;
}

export interface GetBrowseCategoryResponse {
  categories: {
    href: string;
    items: Category[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
