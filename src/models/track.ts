import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { ExternalUrls, Image, Restriction } from "./commonType";

export interface Track {
  type?: "track";
  id?: string;
  name?: string;
  duration_ms?: number;
  explicit?: boolean;
  popularity?: number;
  //   preview_url?: string | null; // deprecated
  track_number?: number;
  uri?: string;
  href?: string;
  external_urls?: ExternalUrls;
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  external_ids?: {
    isrc: string;
    ean: string;
    upc: string;
  };
  is_playable?: boolean;
  //   linked_from??: object;
  linked_from?: Track;
  restrictions?: Restriction;
  is_local?: boolean;
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
  //   audio_preview_url: string | null; // deprecated
  //   language: string; // deprecated
  languages: string[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  show: Show;
  images: Image[];
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  restrictions?: Restriction;
}

export interface Show {
  available_markets: string[];
  copyrights: {
    text?: string;
    type?: string;
  };
  description: string;
  explicit: boolean;
  html_description: string;
  id: string;
  name: string;
  publisher: string;
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  image: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  type: "show";
  total_episodes: number;
}
