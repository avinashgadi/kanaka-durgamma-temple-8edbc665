
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const TempleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // For now, we'll use a Google Maps embed since we don't have Mapbox configured
    // The coordinates for FG5C+VH, Indugabilli correspond to approximately 17.1744, 81.3719
    const loadMap = () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.892!2d81.3719!3d17.1744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDEwJzI3LjgiTiA4McKwMjInMTguOCJF!5e0!3m2!1sen!2sin!4v1234567890"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        `;
      }
    };

    loadMap();
  }, []);

  return (
    <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />
      
      {/* Fallback content */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600">
        <div className="text-center">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-green-600" />
          <h3 className="text-lg font-semibold mb-2">Shiva Temple</h3>
          <p className="text-sm">FG5C+VH, Indugabilli</p>
          <p className="text-sm">Andhra Pradesh 533407</p>
          <a
            href="https://maps.google.com/?q=FG5C+VH,+Indugabilli,+Andhra+Pradesh+533407"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default TempleMap;
