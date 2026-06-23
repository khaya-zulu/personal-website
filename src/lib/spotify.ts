export const getAccessToken = async () => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify environment variables");
  }

  const basic = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ?? data.error ?? "Failed to refresh Spotify token"
    );
  }

  return data;
};

export const getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return response.json();
  }

  if (response.status === 204) {
    return undefined;
  }

  throw new Error(
    `Spotify currently-playing request failed (${response.status})`
  );
};
