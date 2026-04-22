// Import React
import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
//
// Create Map
function Map(): JSX.Element {
  // Reference
  const mapRef = useRef(null);
  const isRendered = useRef(false);
  // State
  const [map, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {
    if (!isRendered.current && mapRef.current !== null) {

      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: 52.35514938496378,
          lng: 4.673877537499948,
        },
        zoom: 8,
      });

      leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(mapInstance);

      setMap(mapInstance);


      isRendered.current = true;
    }
  }, [isRendered]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

// Export Map
export { Map };
