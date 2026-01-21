import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import client, { API_BASE_URL } from '../../api/client';
import { ImageSelector } from './ImageSelector';

interface GalleryImage {
  id: number;
  gallery_id: number;
  image_url: string;
}

interface Gallery {
  id: number;
  title: string;
  description: string;
  images: GalleryImage[];
}

export function GalleryManagement() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'form' | 'image-selection'>('list');
  const [currentGallery, setCurrentGallery] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    images: string[];
  }>({
    title: '',
    description: '',
    images: [],
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; galleryId: number | null }>({
    isOpen: false,
    galleryId: null,
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setIsLoading(true);
    try {
      const response = await client.get('gallery');
      setGalleries(response.data);
    } catch (error) {
      console.error('Failed to fetch galleries', error);
    }
    setIsLoading(false);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmation({ isOpen: true, galleryId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.galleryId) return;

    try {
      await client.delete(`/gallery/${deleteConfirmation.galleryId}`);
      fetchGalleries();
    } catch (error) {
      console.error('Failed to delete gallery', error);
    } finally {
      setDeleteConfirmation({ isOpen: false, galleryId: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentGallery) {
        await client.put(`/gallery/${currentGallery.id}`, formData);
      } else {
        await client.post('gallery', formData);
      }
      setView('list');
      fetchGalleries();
      setFormData({ title: '', description: '', images: [] });
      setCurrentGallery(null);
    } catch (error) {
      console.error('Failed to save gallery', error);
    }
  };

  const openEditForm = (gallery: Gallery) => {
    setCurrentGallery(gallery);
    setFormData({
      title: gallery.title,
      description: gallery.description || '',
      images: gallery.images.map(img => img.image_url),
    });
    setView('form');
  };

  const openCreateForm = () => {
    setCurrentGallery(null);
    setFormData({ title: '', description: '', images: [] });
    setView('form');
  };

  const handleImageSelect = (url: string | string[]) => {
    if (Array.isArray(url)) {
      setFormData({ ...formData, images: [...formData.images, ...url] });
    } else {
      setFormData({ ...formData, images: [...formData.images, url] });
    }
    setView('form');
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${new URL(API_BASE_URL).origin}/${url}`;
  };

  const filteredGalleries = galleries.filter((gallery) =>
    gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {view === 'list' ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
              <p className="text-sm text-gray-500">Manage your photo gallery, categories, and images.</p>
            </div>
            <Button onClick={openCreateForm} className="bg-[#0099ff] hover:bg-[#0077cc]">
              <Plus className="w-4 h-4 mr-2" />
              Add New Gallery
            </Button>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0099ff] mx-auto mb-4"></div>
                <p>Loading galleries...</p>
              </div>
            ) : filteredGalleries.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No galleries found</p>
                <Button variant="link" onClick={openCreateForm} className="text-[#0099ff]">
                  Create your first gallery
                </Button>
              </div>
            ) : (
              filteredGalleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                    {gallery.images.length > 0 ? (
                      <img
                        src={getImageUrl(gallery.images[0].image_url)}
                        alt={gallery.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <ImageIcon className="w-12 h-12 text-gray-200" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <Button
                          size="icon"
                          className="h-10 w-10 bg-white text-gray-900 hover:bg-gray-100 hover:text-[#0099ff] shadow-lg transform transition-transform hover:scale-110"
                          onClick={(e: React.MouseEvent) => { e.stopPropagation(); openEditForm(gallery); }}
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-10 w-10 bg-white text-gray-900 hover:bg-gray-100 hover:text-red-600 shadow-lg transform transition-transform hover:scale-110"
                          onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleDeleteClick(gallery.id); }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm shadow-sm">
                        {gallery.images.length} {gallery.images.length === 1 ? 'Image' : 'Images'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 line-clamp-1 mb-1" title={gallery.title}>
                      {gallery.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 italic">
                      {gallery.description || 'No description'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : view === 'image-selection' ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => setView('form')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">Select Image</h2>
          </div>
          <Card className="p-6">
            <ImageSelector
              onSelect={handleImageSelect}
              onCancel={() => setView('form')}
              multiple={true}
            />
          </Card>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => setView('list')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentGallery ? 'Edit Gallery' : 'Create Gallery'}
            </h2>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="mb-2 block">Gallery Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Annual General Meeting 2024"
                />
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full min-h-[100px] p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0099ff]/10 focus:border-[#0099ff] transition-all"
                  placeholder="Enter a brief description of this gallery..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="block">Gallery Images</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setView('image-selection')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="group relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={getImageUrl(url)}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {formData.images.length === 0 && (
                    <div className="col-span-full py-12 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500">No images added yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setView('list')}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc]">
                  {currentGallery ? 'Update Gallery' : 'Create Gallery'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(open: boolean) => setDeleteConfirmation(prev => ({ ...prev, isOpen: open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the gallery and all its images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}