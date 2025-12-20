import { useState } from 'react';
import { Plus, Trash2, Edit, Upload, MoveUp, MoveDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Badge } from '../ui/badge';

interface SliderItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  order: number;
}

const initialSlides: SliderItem[] = [
  {
    id: 1,
    title: 'Banking Excellence Since 1949',
    subtitle: 'Your Trusted Financial Partner',
    description: 'Experience personalized banking services with a legacy of trust and innovation',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920',
    ctaText: 'Open Account',
    ctaLink: '#contact',
    order: 1,
  },
  {
    id: 2,
    title: 'Digital Banking Made Simple',
    subtitle: 'Bank Anytime, Anywhere',
    description: 'Access your accounts 24/7 with our advanced mobile and internet banking services',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920',
    ctaText: 'Explore Services',
    ctaLink: '#services',
    order: 2,
  },
  {
    id: 3,
    title: 'Competitive Interest Rates',
    subtitle: 'Grow Your Savings',
    description: 'Attractive interest rates on deposits and flexible loan options for all your needs',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920',
    ctaText: 'View Rates',
    ctaLink: '#deposits',
    order: 3,
  },
];

export function SliderManagement() {
  const [slides, setSlides] = useState<SliderItem[]>(initialSlides);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    ctaText: '',
    ctaLink: '',
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      imageUrl: '',
      ctaText: 'Learn More',
      ctaLink: '#',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: SliderItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      imageUrl: item.imageUrl,
      ctaText: item.ctaText,
      ctaLink: item.ctaLink,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      setSlides(slides.filter(item => item.id !== id));
    }
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    
    // Update order
    newSlides.forEach((slide, idx) => {
      slide.order = idx + 1;
    });
    
    setSlides(newSlides);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setSlides(slides.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      ));
    } else {
      setSlides([...slides, { id: Date.now(), ...formData, order: slides.length + 1 }]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Hero Slider Management</h2>
          <p className="text-gray-600">Manage hero slider images and content on the homepage</p>
        </div>
        <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] gap-2">
          <Plus className="h-4 w-4" />
          Add Slide
        </Button>
      </div>

      {/* Slider List */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-[300px_1fr] gap-0">
              {/* Image Preview */}
              <div className="aspect-video md:aspect-auto relative bg-gray-100">
                <ImageWithFallback
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-[#0099ff]">
                  Slide {slide.order}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-[#0099ff] mb-1">{slide.subtitle}</p>
                    <h3 className="text-gray-900 mb-2">{slide.title}</h3>
                    <p className="text-gray-600 mb-3">{slide.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>CTA: {slide.ctaText}</span>
                      <span>→ {slide.ctaLink}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveSlide(index, 'up')}
                        disabled={index === 0}
                        className="px-2"
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveSlide(index, 'down')}
                        disabled={index === slides.length - 1}
                        className="px-2"
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(slide)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(slide.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Slider Image' : 'Add Slider Image'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Edit the details of the slider image.' : 'Add a new slider image to the homepage.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">Main Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter main title"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter subtitle"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="imageUrl">Background Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1920x1080px
                </p>
              </div>
              <div>
                <Label htmlFor="ctaText">Button Text</Label>
                <Input
                  id="ctaText"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="Learn More"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ctaLink">Button Link</Label>
                <Input
                  id="ctaLink"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  placeholder="#services"
                  required
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc]">
                {editingItem ? 'Update' : 'Add'} Slide
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}