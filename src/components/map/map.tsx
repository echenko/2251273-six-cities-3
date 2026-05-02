// Import React
import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';
// Import Constants
import { MAP_PIN_ICON, ICON_SIZE, ICON_ANCHOR } from '../../const';
import { Link } from 'react-router-dom';

// Create Types
type MapProps = {
  className: string;
  offers: OffersElementType[];
  location: OffersElementType['location'];
  currentOffer: string | null;
  onOfferHover: (offerId: string) => void;
}

// Create Map
function Map({ className, offers, location, currentOffer, onOfferHover }: MapProps): JSX.Element {
  // Ref
  const mapRef = useRef(null);
  const isRendered = useRef(false);
  // State
  const [map, setMap] = useState<leaflet.Map | null>(null);

  // Create Map
  useEffect(() => {
    if (mapRef.current !== null && !isRendered.current) {
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
  }, [mapRef, location]);

  // Update Map
  useEffect(() => {
    if (isRendered.current) {
      map?.setView({ lat: location.latitude, lng: location.longitude }, location.zoom);
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
      marker.on('mouseover', () => onOfferHover(offer.id));
      marker.on('mouseout', () => onOfferHover(''));
      marker.on('click', () => {
        map?.flyTo({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
      });
      // Set Z-Index (Установка индекса Z)
      marker.setZIndexOffset(offer.id === currentOffer ? 1000 : 0);
      // Add Icon (Добавление иконки)
      marker.setIcon(leaflet.icon({
        iconUrl: offer.id === currentOffer ? MAP_PIN_ICON.ACTIVE : MAP_PIN_ICON.DEFAULT,
        iconSize: ICON_SIZE,
        iconAnchor: ICON_ANCHOR,
      }));

      // Add Marker to Layer (Добавление маркера в слой)
      marker.addTo(markersLayer);
    });

    return () => {
      // Remove Markers Layer (Удаление слоя маркеров)
      map?.removeLayer(markersLayer);
    };
  }, [map, offers, currentOffer, onOfferHover]);

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
