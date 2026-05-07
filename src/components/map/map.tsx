// Import React
import { useEffect, useRef, useState } from 'react';
// Import Leaflet
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Import Constants
import { MAP_MARKER_DEFAULT, MAP_MARKER_ACTIVE } from '../../const';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';


// Create Types
type MapProps = {
  className: string;
  offers: OffersElementType[];
  location: OffersElementType['location'] | null;
  currentOffer: string | null;
}

// Create Map
function Map({ className, offers, location, currentOffer }: MapProps): JSX.Element {
  // Ref
  const mapRef = useRef(null);
  const isRendered = useRef(false);
  // State
  const [map, setMap] = useState<leaflet.Map | null>(null);

  // Create Map
  useEffect(() => {
    if (mapRef.current !== null && !isRendered.current && location !== null) {
      // Create Map (Создание карты)
      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      // Create Layer (Создание слоя)
      const layer = leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );
      // Add Layer (Добавление слоя)
      layer.addTo(mapInstance);
      // Set Map (Установка карты)
      setMap(mapInstance);
      // Set Rendered
      isRendered.current = true;
    }
  }, [location]);

  // Update Map
  useEffect(() => {
    if (isRendered.current && location !== null) {
      map?.setView({
        lat: location.latitude,
        lng: location.longitude,
      }, location.zoom);
    }

  }, [map, location]);

  useEffect(() => {
    if (!map) {
      return;
    }
    // Create Markers Layer (Создание слоя маркеров)
    const markersLayer = leaflet.layerGroup().addTo(map);

    // Add Markers (Добавление маркеров)
    offers.forEach((offer) => {
      // Create Marker (Создание маркера)
      const marker = leaflet.marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      });
      // Add Popup (Добавление попапа)
      marker.bindPopup(offer.title);
      // Add Mouse Events (Добавление событий мыши)
      marker.on('mouseover', () => {
        marker.setIcon(leaflet.icon(MAP_MARKER_ACTIVE));
        marker.setZIndexOffset(1000);
      });
      marker.on('mouseout', () => {
        marker.setIcon(leaflet.icon(MAP_MARKER_DEFAULT));
        marker.setZIndexOffset(0);
      });
      marker.on('click', () => {
        map?.flyTo({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
      });
      // Add Icon (Добавление иконки)
      marker.setIcon(leaflet.icon(currentOffer === offer.id ? MAP_MARKER_ACTIVE : MAP_MARKER_DEFAULT));
      // Add ZIndex (Добавление индекса)
      marker.setZIndexOffset(currentOffer === offer.id ? 1000 : 0);
      // Add Marker to Layer (Добавление маркера в слой)
      marker.addTo(markersLayer);
    });

    return () => {
      // Remove Markers Layer (Удаление слоя маркеров)
      map?.removeLayer(markersLayer);
    };
  }, [map, offers, currentOffer]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    >
    </section>
  );
}

// Export Map
export { Map };
