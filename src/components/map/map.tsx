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
  const markersRef = useRef<leaflet.Marker[]>([]);

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
    const markersLayer = leaflet.layerGroup().addTo(map);
    const markers: leaflet.Marker[] = [];

    offers.forEach((offer) => {
      const marker = leaflet.marker(
        {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: leaflet.icon(MAP_MARKER_DEFAULT),
        }
      );
      marker.bindPopup(offer.title);
      marker.on('mouseover', () => {
        marker.setIcon(leaflet.icon(MAP_MARKER_ACTIVE));
        marker.setZIndexOffset(1000);
      });
      marker.on('mouseout', () => {
        const currentOfferLat = offers.find((item) => item.id === currentOffer)?.location.latitude;
        const currentOfferLng = offers.find((item) => item.id === currentOffer)?.location.longitude;
        const markerLat = marker.getLatLng().lat;
        const markerLng = marker.getLatLng().lng;
        if(currentOfferLat === markerLat && currentOfferLng === markerLng) {
          return;
        }
        marker.setIcon(leaflet.icon(MAP_MARKER_DEFAULT));
        marker.setZIndexOffset(0);
      });
      marker.on('click', () => {
        map?.flyTo({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
      });

      markers.push(marker);
      marker.addTo(markersLayer);
    });

    markersRef.current = markers;

    return () => {
      map?.removeLayer(markersLayer);
      markersRef.current = [];
    };
  }, [map, offers]);

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const offer = offers[index];
      if (!offer) {
        return;
      }

      marker.setZIndexOffset(currentOffer === offer.id ? 1000 : 0);
      marker.setIcon(currentOffer === offer.id ? leaflet.icon(MAP_MARKER_ACTIVE) : leaflet.icon(MAP_MARKER_DEFAULT));

    });
  }, [currentOffer, offers]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    >
    </section>
  );
}

export { Map };
