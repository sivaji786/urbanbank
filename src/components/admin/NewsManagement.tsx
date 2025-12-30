import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, AlertCircle, Check, ArrowLeft, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
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

  const [view, setView] = useState<'list' | 'form'>('list');
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
    setView('form');
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
    setView('form');
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
        const newItem = response.data.data || response.data;
        setNews([newItem, ...news]);
        setSuccess('News item added successfully.');
      }
      setView('list');
      fetchNews();
    } catch (err) {
      console.error('Failed to save news:', err);
      setError('Failed to save news item. Please check your inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {view === 'list' ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Latest News Management</h2>
              <p className="text-sm text-gray-500 mt-1">Manage news and announcements displayed on the website</p>
            </div>
            <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-[#0077cc] gap-2">
              <Plus className="h-4 w-4" />
              Add News
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-900 border-green-200">
              <Check className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0099ff] mx-auto mb-4"></div>
              <p className="text-gray-500">Loading news items...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {news.length === 0 ? (
                <Card className="p-5 text-center text-gray-500">
                  <p>No news items found. Click "Add News" to create one.</p>
                </Card>
              ) : (
                news.map((item) => (
                  <Card key={item.id} className="p-4 hover:shadow-md transition-shadow group border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
                          <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-600 line-clamp-3 mb-1 whitespace-pre-wrap">
                          {item.content || <span className="text-gray-400 italic font-normal">No content available</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-500 hover:text-[#0099ff] hover:bg-blue-50"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(item.id)}
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
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setView('list')} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">
              {editingItem ? 'Edit News Item' : 'Add New News Item'}
            </h2>
          </div>

          <Card className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-700">News Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter news title"
                    required
                    className="focus-visible:ring-[#0099ff]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-700">Publication Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="focus-visible:ring-[#0099ff]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-gray-700">News Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your news article here..."
                    rows={10}
                    required
                    className="min-h-[200px] focus-visible:ring-[#0099ff]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setView('list')}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc] min-w-[140px]" disabled={submitting}>
                  {submitting ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingItem ? 'Update News' : 'Publish News'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}