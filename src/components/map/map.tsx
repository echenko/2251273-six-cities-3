import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import { MAP_MARKER_DEFAULT, MAP_MARKER_ACTIVE } from '../../const';
import { OffersElementType } from '../../types/offers';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  offers: OffersElementType[];
  location: OffersElementType['location'] | null;
  currentOffer: string | null;
}

function Map({ className, offers, location, currentOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const isRendered = useRef(false);
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const markersLayerRef = useRef<leaflet.LayerGroup | null>(null);
  const markersRef = useRef<leaflet.Marker[]>([]);

  // Создание карты
  useEffect(() => {
    if (mapRef.current !== null && !isRendered.current && location !== null) {
      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const layer = leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      layer.addTo(mapInstance);
      setMap(mapInstance);
      isRendered.current = true;
    }
  }, [location]);

  // Обновление вида карты
  useEffect(() => {
    if (isRendered.current && location !== null) {
      map?.setView(
        {
          lat: location.latitude,
          lng: location.longitude,
        },
        location.zoom
      );
    }
  }, [map, location]);

  // Создание маркеров и добавление на карту
  useEffect(() => {
    if (!map) {
      return;
    }

    if (markersLayerRef.current) {
      map.removeLayer(markersLayerRef.current);
    }

    const markersLayer = leaflet.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    const markers: leaflet.Marker[] = [];

    offers.forEach((offer) => {
      const isActive = currentOffer === offer.id;

      const marker = leaflet.marker(
        {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: leaflet.icon(isActive ? MAP_MARKER_ACTIVE : MAP_MARKER_DEFAULT),
          zIndexOffset: isActive ? 1000 : 0,
        }
      );

      marker.addTo(markersLayer);
      markers.push(marker);
    });

    markersRef.current = markers;

    return () => {
      map.removeLayer(markersLayer);
      markersRef.current = [];
    };
  }, [map, offers, currentOffer]);

  // Настройка интерактивности маркеров (попапы и события)
  useEffect(() => {
    if (!map) {
      return;
    }

    const markers = markersRef.current;

    markers.forEach((marker, index) => {
      const offer = offers[index];

      marker.bindPopup(offer.title);

      marker.on('mouseover', () => {
        marker.setIcon(leaflet.icon(MAP_MARKER_ACTIVE));
        marker.setZIndexOffset(1000);
      });

      marker.on('mouseout', () => {
        marker.setIcon(leaflet.icon(MAP_MARKER_DEFAULT));
        marker.setZIndexOffset(0);
      });

      marker.on('click', () => {
        map.flyTo({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
      });
    });
  }, [map, offers]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    />
  );
}

export { Map };
