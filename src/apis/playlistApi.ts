import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import {
  CreatePlaylistRequest,
  GetBrowseCategoryRequest,
  GetBrowseCategoryResponse,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
  UpdatePlaylistRequest,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch current user playlists");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      // params:params
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to create playlist");
  }
};

export const updatePlaylist = async (
  playlist_id: string,
  params: UpdatePlaylistRequest
): Promise<any> => {
  try {
    const response = await api.post(`/playlists/${playlist_id}/tracks`, {
      uris: params.uris,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to update playlist");
  }
};

export const getBrowseCategory = async (
  token?: string,
  params?: GetBrowseCategoryRequest
): Promise<GetBrowseCategoryResponse> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      params,
      headers,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Invalid or missing access token");
    }
    throw new Error("Fail to fetch browse categories");
  }
};
