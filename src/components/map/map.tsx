// Import React
import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create Types
type MapProps = {
  className: string;
  offers: OffersElementType[];
}

// Create Map
function Map({className, offers}: MapProps): JSX.Element {
  // Ref
  const mapRef = useRef(null);
  const isRendered = useRef(false);
  // State

  const [, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {
    if (!isRendered.current && mapRef.current !== null) {

      // Create Map (Создание карты)
      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: 52.35514938496378,
          lng: 4.673877537499948,
        },
        zoom: 8,
      });

      // Create Layer (Создание слоя)
      const layer = leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      // Add Markers (Добавление маркеров)
      offers.forEach((offer) => {
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
        ).addTo(mapInstance);
      });

      // Add Layer (Добавление слоя)
      layer.addTo(mapInstance);

      // Set Map (Установка карты)
      setMap(mapInstance);

      isRendered.current = true;
    }
  }, [offers]);

  return (
    <section className={`${className} map`} ref={mapRef}></section>
  );
}

// Export Map
export { Map };
