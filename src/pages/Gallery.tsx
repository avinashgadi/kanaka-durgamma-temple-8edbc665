
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder gallery images - in a real app, these would be actual temple photos
  const galleryImages = [
    {
      id: 1,
      title: 'Main Temple Hall',
      description: 'Beautiful view of the main worship hall with traditional architecture',
      category: 'Architecture'
    },
    {
      id: 2,
      title: 'Lord Shiva Statue',
      description: 'Magnificent statue of Lord Shiva in the temple sanctum',
      category: 'Deities'
    },
    {
      id: 3,
      title: 'Evening Aarti',
      description: 'Devotees participating in the evening aarti ceremony',
      category: 'Ceremonies'
    },
    {
      id: 4,
      title: 'Temple Gardens',
      description: 'Peaceful gardens surrounding the temple complex',
      category: 'Surroundings'
    },
    {
      id: 5,
      title: 'Festival Celebration',
      description: 'Maha Shivratri celebration with hundreds of devotees',
      category: 'Festivals'
    },
    {
      id: 6,
      title: 'Prayer Hall',
      description: 'Serene prayer hall for meditation and contemplation',
      category: 'Architecture'
    },
    {
      id: 7,
      title: 'Traditional Lamps',
      description: 'Beautiful oil lamps lighting up the temple premises',
      category: 'Ceremonies'
    },
    {
      id: 8,
      title: 'Temple Entrance',
      description: 'Grand entrance gate with traditional Hindu architecture',
      category: 'Architecture'
    }
  ];

  const categories = ['All', 'Architecture', 'Deities', 'Ceremonies', 'Festivals', 'Surroundings'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Temple Gallery</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Explore the divine beauty and spiritual moments captured at our sacred temple
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 mx-2 mb-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openModal(index)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                <span className="text-gray-500 text-sm">{image.title}</span>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Image */}
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">{filteredImages[selectedImage].title}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-gray-600">{filteredImages[selectedImage].description}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                    {filteredImages[selectedImage].category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No images message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Upload Notice */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Share Your Moments</h3>
          <p className="text-blue-700 mb-6">
            Have beautiful photos from your temple visit? We'd love to feature them in our gallery!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Submit Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
