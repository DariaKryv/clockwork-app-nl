import { useEffect, useState } from "react";
const AMSTERDAM_DEFAULT = { lat: "52.3676", lng: "4.9041" };

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: AMSTERDAM_DEFAULT,
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
      coordinates: AMSTERDAM_DEFAULT,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
      setLocation((state) => ({
        ...state,
        loaded: true,
        error: {
          code: 0,
          message: "Geolocation not supported",
        },
        coordinates: AMSTERDAM_DEFAULT,
      }));
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
};
export default useGeoLocation;
