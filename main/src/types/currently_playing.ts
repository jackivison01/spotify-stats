import { Track } from "./track";

export type CurrentlyPlaying = {
  actions: {
    disallows: {
      resuming: boolean;
      pausing: boolean;
      skipping_next: boolean;
      skipping_prev: boolean;
      toggling_repeat_context: boolean;
      toggling_shuffle: boolean;
      seeking: boolean;
    };
  };
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  curently_playing_type: string;
  is_playing: boolean;
  item: Track;
}