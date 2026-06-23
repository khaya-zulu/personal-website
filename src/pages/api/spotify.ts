import type { APIRoute } from "astro";

import { getCurrentlyPlaying } from "../../lib/spotify.js";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const data = await getCurrentlyPlaying();

    return new Response(
      JSON.stringify({
        type: data?.currently_playing_type,
        payload: data
          ? {
              songCover: data?.item?.album?.images[0]?.url,
              songName: data?.item?.name,
              songArtists: data?.item?.artists?.map(
                (artist: { name: string }) => artist.name
              ),
              songUrl: data?.item?.external_urls?.spotify,
              isPlaying: data?.is_playing,
              duration: data?.item?.duration_ms,
              progress: data?.progress_ms,
            }
          : undefined,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("/api/spotify error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch Spotify data",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
