import { useState, useEffect, useCallback } from 'react';
import client from '../api/client';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, ArrowLeft, Loader2 } from 'lucide-react';

export function GalleryPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [lightbox, setLightbox] = useState<{ galleryId: number, index: number } | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<any | null>(null);
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [galleryRes, pageRes] = await Promise.all([
          client.get('gallery'),
          client.get('pages/gallery')
        ]);
        setGalleries(galleryRes.data);
        if (pageRes.data && pageRes.data.content) {
          setPageContent(pageRes.data.content);
        }
      } catch (error) {
        console.error('Failed to fetch gallery data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openLightbox = (galleryId: number, index: number) => {
    setLightbox({ galleryId, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = 'unset';
  }, []);

  const openGalleryDetails = (gallery: any) => {
    setSelectedGallery(gallery);
    window.scrollTo(0, 0);
  };

  const closeGalleryDetails = () => {
    setSelectedGallery(null);
  };

  const currentGallery = galleries.find(g => g.id === lightbox?.galleryId);
  const currentImages = currentGallery?.images || [];
  const currentImage = currentImages[lightbox?.index ?? 0];

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightbox) {
      setLightbox(prev => ({
        ...prev!,
        index: (prev!.index + 1) % currentImages.length
      }));
    }
  }, [lightbox, currentImages.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightbox) {
      setLightbox(prev => ({
        ...prev!,
        index: (prev!.index - 1 + currentImages.length) % currentImages.length
      }));
    }
  }, [lightbox, currentImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, closeLightbox, handleNext, handlePrev]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0099ff]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0099ff] to-[#0077cc] text-white py-12 lg:py-16 relative overflow-hidden shadow-lg border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          {selectedGallery && (
            <button
              onClick={closeGalleryDetails}
              className="mb-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Galleries
            </button>
          )}
          <h1 className="text-4xl lg:text-5xl mb-4 font-bold">{selectedGallery ? selectedGallery.title : (pageContent?.hero_title || 'Photo Gallery')}</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {selectedGallery
              ? selectedGallery.description || 'View all photos from this gallery'
              : (pageContent?.hero_description || 'Explore memorable moments and milestones from Guntur Cooperative Urban Bank\'s journey of excellence and community service.')}
          </p>
        </div>
      </div>

      {/* Gallery Details View */}
      {selectedGallery ? (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedGallery.images.map((image: any, index: number) => (
              <div
                key={image.id}
                onClick={() => openLightbox(selectedGallery.id, index)}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={image.image_url}
                    alt={`${selectedGallery.title} - Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white w-8 h-8 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Gallery Cards Grid */
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col"
              >
                {/* Card Image */}
                {gallery.images.length > 0 && (
                  <div
                    onClick={() => openGalleryDetails(gallery)}
                    className="relative aspect-video overflow-hidden cursor-pointer bg-gray-100"
                  >
                    <ImageWithFallback
                      src={gallery.images[0].image_url}
                      alt={gallery.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                          <Maximize2 className="w-5 h-5" />
                          <span className="text-sm font-semibold">View Gallery</span>
                        </div>
                      </div>
                    </div>
                    {/* Image count badge */}
                    {gallery.images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                        <ImageIcon className="w-4 h-4" />
                        {gallery.images.length}
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0099ff] transition-colors">
                      {gallery.title}
                    </h3>
                    {gallery.description && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {gallery.description}
                      </p>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <ImageIcon className="w-4 h-4" />
                      <span>{gallery.images.length} {gallery.images.length === 1 ? 'Photo' : 'Photos'}</span>
                    </div>
                    <button
                      onClick={() => openGalleryDetails(gallery)}
                      className="text-[#0099ff] hover:text-[#0077cc] font-semibold text-sm flex items-center gap-1 group/btn"
                    >
                      View Gallery
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {galleries.length === 0 && (
            <div className="text-center py-24">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 font-medium">No gallery items available at the moment.</p>
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && currentGallery && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
          onClick={closeLightbox}
        >
          {/* Top Actions */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white bg-gradient-to-b from-black/50 to-transparent z-20">
            <div>
              <h3 className="text-lg font-bold">{currentGallery.title}</h3>
              <p className="text-sm text-gray-300">
                Image {lightbox.index + 1} of {currentImages.length}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(e); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white bg-[#0099ff] hover:bg-[#0077cc] rounded-full transition-all z-20 hidden sm:block shadow-2xl"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(e); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white bg-[#0099ff] hover:bg-[#0077cc] rounded-full transition-all z-20 hidden sm:block shadow-2xl"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentImage.id}
              src={currentImage.image_url}
              alt={currentGallery.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>

          {/* Mobile Swipe Simulation / Tappable areas */}
          <div className="absolute inset-y-0 left-0 w-24 sm:hidden z-10" onClick={(e) => { e.stopPropagation(); handlePrev(e); }}></div>
          <div className="absolute inset-y-0 right-0 w-24 sm:hidden z-10" onClick={(e) => { e.stopPropagation(); handleNext(e); }}></div>
        </div>
      )}
    </div>
  );
}
