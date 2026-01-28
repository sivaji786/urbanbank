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
      const response = await client.get('news');
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
        const response = await client.post('news', formData);
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
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-6">
            <div>
              <h2 className="text-[28px] font-black text-gray-900 tracking-tighter leading-tight font-['Poppins']">News & Announcements</h2>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Corporate intelligence protocol</p>
            </div>
            <Button onClick={handleAdd} className="bg-[#0099ff] hover:bg-black text-[9px] font-black px-6 h-10 rounded-xl shadow-md uppercase tracking-[0.2em] transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              PROVISION NEWS
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
                <Card className="p-8 text-center text-[#94A3B8] border-dashed border-2 border-blue-50 bg-blue-50/5 rounded-2xl">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em]">Zero news entries detected</p>
                </Card>
              ) : (
                news.map((item) => (
                  <Card key={item.id} className="p-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 group border-[#F1F5F9] rounded-2xl bg-white">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight group-hover:text-[#0099ff] transition-colors font-['Poppins']">{item.title}</h3>
                          <span className="text-[9px] font-black text-[#94A3B8] bg-[#F8FAFC] px-2.5 py-1 rounded-full border border-[#F1F5F9] uppercase tracking-[0.1em]">
                            {new Date(item.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none text-slate-600 line-clamp-2 text-[13px] leading-relaxed mb-0 whitespace-pre-wrap">
                          {item.content || <span className="text-slate-400 italic font-normal">No content available</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-[#64748B] hover:text-[#0099ff] hover:bg-blue-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-100"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-[#64748B] hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => setView('list')} className="h-10 w-10 rounded-full hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight font-['Poppins']">
              {editingItem ? 'Edit Corporate Insight' : 'Provision New Insight'}
            </h2>
          </div>

          <Card className="p-6 border-[#F1F5F9] rounded-2xl shadow-sm bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="title" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">INSIGHT TITLE</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="ENTER HEADLINE..."
                    required
                    className="h-10 text-xs font-bold border-[#E5E7EB] rounded-xl focus:ring-[#0099ff]/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PUBLICATION PROTOCOL DATE</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="h-10 text-xs font-bold border-[#E5E7EB] rounded-xl focus:ring-[#0099ff]/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="content" className="text-[10px] font-black text-gray-400 uppercase tracking-widest">NARRATIVE CONTENT</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="DOCUMENT THE NARRATIVE..."
                    rows={8}
                    required
                    className="min-h-[200px] text-xs font-medium border-[#E5E7EB] rounded-xl leading-relaxed focus:ring-[#0099ff]/10"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-[#F1F5F9] mt-6">
                <Button type="button" variant="outline" onClick={() => setView('list')} className="h-10 px-6 border-[#E5E7EB] rounded-xl text-gray-500 font-black text-[9px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all">
                  ABORT TRANSACTION
                </Button>
                <Button type="submit" className="bg-[#0099ff] hover:bg-black h-10 px-8 rounded-xl text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-blue-100 transition-all duration-300" disabled={submitting}>
                  {submitting ? (
                    <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 mr-2" />
                      {editingItem ? 'COMMIT UPDATE' : 'PUBLISH INSIGHT'}
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
