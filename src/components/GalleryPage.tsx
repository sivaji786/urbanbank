import { useState, useEffect } from 'react';
import client from '../api/client';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar } from 'lucide-react';

export function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await client.get('/gallery');
        const formattedGallery = response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: 'Recently Added',
          category: item.category,
          image_url: item.image_url
        }));
        setGalleryImages(formattedGallery);
      } catch (error) {
        console.error('Failed to fetch gallery', error);
      }
    };
    fetchGallery();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0099ff] to-[#0077cc] text-white py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl mb-4">Photo Gallery</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Explore memorable moments and milestones from Guntur Cooperative Urban Bank's journey of excellence and community service.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <ImageWithFallback
                  src={image.image_url || `https://images.unsplash.com/photo-${1580489944761 + image.id}-${Math.random().toString(36).substring(7)}?w=800&h=600&fit=crop`}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <div className="inline-block px-3 py-1 bg-[#0099ff]/10 text-[#0099ff] text-xs rounded-full mb-3">
                  {image.category}
                </div>
                <h3 className="text-lg text-gray-900 mb-2 line-clamp-2">
                  {image.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{image.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
