import { Device } from "./device";
import { Track } from "./track";

export type CurrentlyPlaying = {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  };
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track; //track object (can be an episode but we (I) will cross that bridge when we get there (hopefully we dont))
  curently_playing_type: string;
  actions: {
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_suffle: boolean;
    toggling_repeat_track: boolean;
    transferring_playback: boolean;
  }
}