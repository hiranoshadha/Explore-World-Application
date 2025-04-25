// src/components/features/GlobeVisualization.jsx
import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { useNavigate } from 'react-router-dom';

const GlobeVisualization = ({ countries, height = 500 }) => {
  const globeRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (globeRef.current) {
      // Set initial rotation and camera position
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      
      // Adjust camera position
      globeRef.current.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 2.5
      });
    }
    
    return () => {
      if (globeRef.current && globeRef.current.controls()) {
        globeRef.current.controls().autoRotate = false;
      }
    };
  }, []);

  const handleCountryClick = (country) => {
    navigate(`/country/${country.cca3}`);
  };

  // Prepare data for the globe
  const globeData = countries.map(country => ({
    lat: country.latlng?.[0] || 0,
    lng: country.latlng?.[1] || 0,
    size: Math.log(country.population) / 10 || 0.5,
    color: '#3b82f6',
    name: country.name.common,
    cca3: country.cca3
  }));

  return (
    <div className=" h-full overflow-hidden rounded-lg">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={globeData}
        pointAltitude={0.01}
        pointRadius="size"
        pointColor="color"
        pointLabel={d => `${d.name} (Click to view)`}
        onPointClick={point => handleCountryClick(countries.find(c => c.cca3 === point.cca3))}
        width={height}
        height={height}
      />
    </div>
  );
};

export default GlobeVisualization;
