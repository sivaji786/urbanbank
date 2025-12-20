import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, AlertCircle, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import client from '../../api/client';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
}

export function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.get('/news');
      // Ensure specific fields are correctly mapped if needed, mostly handled by backend
      setNews(response.data);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError('Failed to load news items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setSuccess(null);
    setError(null);
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setSuccess(null);
    setError(null);
    setFormData({
      title: item.title,
      content: item.content,
      date: item.date,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    setSuccess(null);
    setError(null);
    try {
      await client.delete(`/news/${id}`);
      setNews(news.filter(item => item.id !== id));
      setSuccess('News item deleted successfully.');
    } catch (err) {
      console.error('Failed to delete news:', err);
      setError('Failed to delete news item.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingItem) {
        const response = await client.put(`/news/${editingItem.id}`, formData);
        setNews(news.map(item =>
          item.id === editingItem.id ? { ...response.data, ...formData } : item
        ));
        setSuccess('News item updated successfully.');
      } else {
        const response = await client.post('/news', formData);
        // If the backend returns the created object with ID
        const newItem = response.data.data || response.data;
        setNews([newItem, ...news]);
        setSuccess('News item added successfully.');
      }
      setIsDialogOpen(false);
      // Refresh list to be sure
      fetchNews();
    } catch (err) {
      console.error('Failed to save news:', err);
      setError('Failed to save news item. Please check your inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Latest News Management</h2>
          <p className="text-gray-600">Manage news and announcements displayed on the website</p>
        </div>
        <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] gap-2">
          <Plus className="h-4 w-4" />
          Add News
        </Button>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-900 border-green-200">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0099ff] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading news items...</p>
        </div>
      ) : (
        /* News List */
        <div className="space-y-4">
          {news.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              <p>No news items found. Click "Add News" to create one.</p>
            </Card>
          ) : (
            news.map((item) => (
              <Card key={item.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-600 mb-3 whitespace-pre-wrap">
                      {item.content || <span className="text-gray-400 italic">No content available</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit News Item' : 'Add News Item'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Edit the news item details' : 'Add a new news item'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">News Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter news title"
                required
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter news content"
                rows={6}
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc]" disabled={submitting}>
                {submitting ? 'Saving...' : (editingItem ? 'Update' : 'Add') + ' News'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}