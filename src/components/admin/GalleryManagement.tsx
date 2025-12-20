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

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

export function GalleryManagement() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'form' | 'image-selection'>('list');
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({});
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; itemId: number | null }>({
    isOpen: false,
    itemId: null,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await client.get('/gallery');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch gallery items', error);
    }
    setIsLoading(false);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmation({ isOpen: true, itemId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.itemId) return;

    try {
      await client.delete(`/gallery/${deleteConfirmation.itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item', error);
    } finally {
      setDeleteConfirmation({ isOpen: false, itemId: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await client.put(`/gallery/${currentItem.id}`, formData);
      } else {
        await client.post('/gallery', formData);
      }
      setView('list');
      fetchItems();
      setFormData({});
      setCurrentItem(null);
    } catch (error) {
      console.error('Failed to save item', error);
    }
  };

  const openEditForm = (item: GalleryItem) => {
    setCurrentItem(item);
    setFormData(item);
    setView('form');
  };

  const openCreateForm = () => {
    setCurrentItem(null);
    setFormData({});
    setView('form');
  };

  const handleImageSelect = (url: string) => {
    setFormData({ ...formData, image_url: url });
    setView('form');
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${new URL(API_BASE_URL).origin}/${url}`;
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
              Add Photo
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

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0099ff] mx-auto mb-4"></div>
                <p>Loading gallery...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No photos found</p>
                <Button variant="link" onClick={openCreateForm} className="text-[#0099ff]">
                  Add your first photo
                </Button>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                    <img
                      src={getImageUrl(item.image_url)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <Button
                          size="icon"
                          className="h-10 w-10 bg-white text-gray-900 hover:bg-gray-100 hover:text-[#0099ff] shadow-lg transform transition-transform hover:scale-110"
                          onClick={(e: React.MouseEvent) => { e.stopPropagation(); openEditForm(item); }}
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-10 w-10 bg-white text-gray-900 hover:bg-gray-100 hover:text-red-600 shadow-lg transform transition-transform hover:scale-110"
                          onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleDeleteClick(item.id); }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm shadow-sm">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 line-clamp-1" title={item.title}>
                      {item.title}
                    </h3>
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
              {currentItem ? 'Edit Photo' : 'Add New Photo'}
            </h2>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="mb-2 block">Title</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Annual General Meeting 2024"
                />
              </div>

              <div>
                <Label htmlFor="category" className="mb-2 block">Category</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="e.g. Events, Awards, Office"
                />
              </div>

              <div>
                <Label className="mb-2 block">Image</Label>
                <div className="space-y-4">
                  {formData.image_url && (
                    <div className="aspect-video w-full relative rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={getImageUrl(formData.image_url)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      value={formData.image_url || ''}
                      readOnly
                      placeholder="No image selected"
                      className="flex-1 bg-gray-50"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setView('image-selection')}
                      className="whitespace-nowrap"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setView('list')}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc]">
                  Save Photo
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
              This action cannot be undone. This will permanently delete the photo from the gallery.
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