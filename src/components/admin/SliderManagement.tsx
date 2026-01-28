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
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Hero Slider Management</h2>
          <p className="text-xs text-slate-500">Manage hero slider images and content on the homepage</p>
        </div>
        <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] gap-2 h-9 px-4">
          <Plus className="h-4 w-4" />
          Add Slide
        </Button>
      </div>

      {/* Slider List */}
      <div className="space-y-3">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 rounded-xl">
            <div className="grid md:grid-cols-[240px_1fr] gap-0">
              {/* Image Preview */}
              <div className="aspect-video md:aspect-auto relative bg-slate-100">
                <ImageWithFallback
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-[#0099ff] text-[10px] h-5 px-2 uppercase font-bold tracking-wider">
                  Slide {slide.order}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#0099ff] mb-0.5 uppercase tracking-wider">{slide.subtitle}</p>
                    <h3 className="text-base font-bold text-[#0F172A] mb-1 truncate">{slide.title}</h3>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2 leading-relaxed">{slide.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100">CTA: {slide.ctaText}</span>
                      <span className="truncate">→ {slide.ctaLink}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 self-start">
                    <div className="flex flex-col gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => moveSlide(index, 'up')}
                        disabled={index === 0}
                        className="h-7 w-7 text-slate-400 hover:text-[#0099ff] hover:bg-blue-50 border border-slate-100"
                      >
                        <MoveUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => moveSlide(index, 'down')}
                        disabled={index === slides.length - 1}
                        className="h-7 w-7 text-slate-400 hover:text-[#0099ff] hover:bg-blue-50 border border-slate-100"
                      >
                        <MoveDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(slide)}
                        className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-100"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(slide.id)}
                        className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
          <div className="bg-[#0F172A] px-4 py-3">
            <DialogHeader>
              <DialogTitle className="text-white text-lg font-bold tracking-tight">
                {editingItem ? 'Edit Slider Image' : 'Add Slider Image'}
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs">
                {editingItem ? 'Edit the details of the hero slider image.' : 'Add a new slider image to the homepage.'}
              </DialogDescription>
            </DialogHeader>
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-white">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="title" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Main Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter main title"
                  required
                  className="h-9 text-sm border-slate-200 focus:ring-[#0099ff]/20"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="subtitle" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter subtitle"
                  required
                  className="h-9 text-sm border-slate-200 focus:ring-[#0099ff]/20"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="description" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  rows={2}
                  required
                  className="text-sm border-slate-200 focus:ring-[#0099ff]/20 min-h-[60px]"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="imageUrl" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Background Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="h-9 text-sm border-slate-200 focus:ring-[#0099ff]/20"
                  />
                  <Button type="button" variant="outline" size="icon" className="h-9 w-9 shrink-0 border-slate-200">
                    <Upload className="h-4 w-4 text-slate-500" />
                  </Button>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Recommended size: 1920x1080px for high-definition displays.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaText" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Button Text</Label>
                <Input
                  id="ctaText"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="Learn More"
                  required
                  className="h-9 text-sm border-slate-200 focus:ring-[#0099ff]/20"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaLink" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Button Link</Label>
                <Input
                  id="ctaLink"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  placeholder="#services"
                  required
                  className="h-9 text-sm border-slate-200 focus:ring-[#0099ff]/20"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 mt-6 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="h-9 text-xs font-bold border-slate-200">
                Cancel
              </Button>
              <Button type="submit" className="h-9 px-6 bg-[#0099ff] hover:bg-[#0077cc] text-xs font-bold tracking-wide">
                {editingItem ? 'UPDATE' : 'ADD'} SLIDE
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}