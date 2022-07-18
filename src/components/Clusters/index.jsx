import React from "react";
import { Marker, Tooltip, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import useSupercluster from "use-supercluster";

import markerIcon from "../../assets/marker-icon.png";
import markerShadow from "../../assets/marker-shadow.png";

const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

const Clusters = ({ orders, client }) => {
  const map = useMap();
  const [bounds, setBounds] = React.useState(null);
  const [zoom, setZoom] = React.useState(13);

  const mapEvetnts = useMapEvents({
    moveend() {
      updateMap();
    },
  });

  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  React.useEffect(() => {
    updateMap();
  }, []);

  const points = orders.map((order) => ({
    type: "Feature",
    properties: {
      cluster: false,
      orderId: order.id,
      type: order.type,
      price: order.price,
      clientName: client(order.client_id).name,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(order.coords.long),
        parseFloat(order.coords.lat),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  17
                );
                map.setView([latitude, longitude], expansionZoom, {
                  animate: true,
                });
              }}
            />
          );
        }
        return (
          <Marker
            key={`order-${cluster.properties.orderId}`}
            position={[latitude, longitude]}
            icon={icon}
          >
            <Tooltip>
              <div className="tooltip--header">
                <span>#{cluster.properties.orderId}</span>
                <b>{cluster.properties.price} ₸</b>
              </div>
              <h4>{cluster.properties.clientName}</h4>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
};

export default Clusters;
