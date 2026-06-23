export const analogTime = (timeMs: number) => {
  // get minutes and seconds
  const minutes = Math.floor(timeMs / 60000);
  const seconds = Math.floor((timeMs % 60000) / 1000);

  // format time
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutesStr}:${secondsStr}`;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// sort by integer in asc
export const sortByOrder = (a: any, b: any) => {
  const aOrder = a.data?.order ?? a.order;
  const bOrder = b.data?.order ?? b.order;

  if (aOrder != null && bOrder != null) {
    return aOrder - bOrder;
  }

  if (aOrder != null) return -1;
  if (bOrder != null) return 1;

  return 0;
};

// Tuesday, 04 Feb
export const formatDate = (date: Date) => {
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const dayOfWeek = date.toLocaleString("default", { weekday: "long" });

  return `${dayOfWeek}, ${day} ${month}`;
};

// get interval time hh:mm from date
export const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const fetchWeather = async (coords: { lat: number; lng: number }) => {
  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${
        coords.lng
      }&appid=${import.meta.env.OPEN_WEATHER_API_KEY}&units=metric`
    );

    if (resp.status !== 200) {
      return undefined;
    }

    // documentation: https://openweathermap.org/current
    return resp.json() as Promise<{ main: { temp: string } }>;
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
};
