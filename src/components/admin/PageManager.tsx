import { useState, useEffect } from 'react';
import { IconPicker } from './IconPicker';
import { Save, AlertCircle, Code, Layout, Plus, Trash2, FileText, ChevronRight, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import client from '../../api/client';
import { toast } from 'sonner';

interface Page {
    id: number;
    slug: string;
    title: string;
    content: any;
}

export function PageManager() {
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPageSlug, setSelectedPageSlug] = useState<string>('');
    const [jsonContent, setJsonContent] = useState<string>('');
    const [formData, setFormData] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'form' | 'json'>('form');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [pageSearch, setPageSearch] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchPages();
    }, []);

    useEffect(() => {
        if (selectedPageSlug) {
            fetchPageContent(selectedPageSlug);
        } else {
            setJsonContent('');
            setFormData(null);
        }
    }, [selectedPageSlug]);

    const fetchPages = async () => {
        try {
            const response = await client.get('pages');
            const sortedPages = response.data.sort((a: Page, b: Page) => a.title.localeCompare(b.title));
            setPages(sortedPages);
            if (sortedPages.length > 0 && !selectedPageSlug) {
                setSelectedPageSlug(sortedPages[0].slug);
            }
        } catch (err) {
            console.error('Failed to fetch pages', err);
            setError('Failed to load pages list.');
        }
    };

    const fetchPageContent = async (slug: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await client.get(`/pages/${slug}`);
            let content = response.data.content;

            // Handle content parsing
            let parsedData = content;
            if (typeof content === 'string') {
                try {
                    parsedData = JSON.parse(content);
                } catch (e) {
                    console.error("Failed to parse JSON content", e);
                }
            }

            setFormData(parsedData);
            setJsonContent(JSON.stringify(parsedData, null, 2));
        } catch (err) {
            console.error('Failed to fetch page content', err);
            setError('Failed to load page content.');
        } finally {
            setLoading(false);
        }
    };

    // Auto-inject template for financial reports if missing
    useEffect(() => {
        if (selectedPageSlug === 'financial-reports' && formData && !formData.financial_highlights) {
            const template = {
                ...formData,
                hero_title: formData.hero_title || "Financial & Annual Reports",
                hero_description: formData.hero_description || "Access our comprehensive financial reports...",
                financial_highlights_title: formData.financial_highlights_title || "Financial Highlights (2023-24)",
                financial_highlights: [
                    { title: "Total Deposits", value: "₹850+ Crore", icon: "TrendingUp", color: "text-green-600", bgColor: "bg-green-50" },
                    { title: "Total Advances", value: "₹620+ Crore", icon: "BarChart3", color: "text-blue-600", bgColor: "bg-blue-50" },
                    { title: "Net Profit", value: "₹12.5+ Crore", icon: "TrendingUp", color: "text-purple-600", bgColor: "bg-purple-50" },
                    { title: "Branches", value: "13 Branches", icon: "BarChart3", color: "text-orange-600", bgColor: "bg-orange-50" }
                ]
            };
            setFormData(template);
            setJsonContent(JSON.stringify(template, null, 2));
            toast.info("Financial Highlights fields auto-loaded.");
        }
    }, [selectedPageSlug, formData]);

    const updateFormData = (path: string, value: any) => {
        const newData = { ...formData };
        const keys = path.split('.');
        let current = newData;

        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;

        setFormData(newData);
        setJsonContent(JSON.stringify(newData, null, 2));
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            let contentToSave = formData;

            if (viewMode === 'json') {
                try {
                    contentToSave = JSON.parse(jsonContent);
                } catch (e) {
                    setError('Invalid JSON format. Please correct the errors.');
                    setSaving(false);
                    return;
                }
            }

            const page = pages.find(p => p.slug === selectedPageSlug);
            if (!page) return;

            await client.put(`/pages/${page.id}`, {
                slug: page.slug,
                title: page.title,
                content: contentToSave
            });

            setSuccess('Page content updated successfully.');
            setFormData(contentToSave);
            setJsonContent(JSON.stringify(contentToSave, null, 2));
            toast.success('Changes saved successfully');
        } catch (err) {
            console.error('Failed to save page content', err);
            setError('Failed to save changes.');
            toast.error('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const renderDynamicFields = (data: any, prefix = '') => {
        if (!data) return null;

        return Object.entries(data).map(([key, value]) => {
            const fieldPath = prefix ? `${prefix}.${key}` : key;
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            if (Array.isArray(value)) {
                return (
                    <div key={fieldPath} className="space-y-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                        <Label className="text-lg font-bold text-gray-800">{label}</Label>
                        {value.map((item, index) => (
                            <div key={`${fieldPath}.${index}`} className="p-4 bg-white border border-gray-200 rounded-md shadow-sm space-y-4 relative">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-[#0099ff]">Item #{index + 1}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => {
                                            const newArray = [...value];
                                            newArray.splice(index, 1);
                                            updateFormData(fieldPath, newArray);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                {typeof item === 'object' ? renderDynamicFields(item, `${fieldPath}.${index}`) : (
                                    <Input
                                        value={item}
                                        onChange={(e) => {
                                            const newArray = [...value];
                                            newArray[index] = e.target.value;
                                            updateFormData(fieldPath, newArray);
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-dashed border-2 hover:border-[#0099ff] hover:text-[#0099ff]"
                            onClick={() => {
                                const newItem = typeof value[0] === 'object' ? { ...value[0] } : '';
                                if (typeof newItem === 'object') {
                                    // Clear values of new object item
                                    Object.keys(newItem).forEach(k => {
                                        const originalValue = value[0] ? value[0][k] : null;
                                        newItem[k] = Array.isArray(originalValue) ? [] : '';
                                    });
                                }
                                updateFormData(fieldPath, [...value, newItem]);
                            }}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Item to {label}
                        </Button>
                    </div>
                );
            }

            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={fieldPath} className="space-y-4 p-4 border border-gray-100 rounded-lg">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">{label}</h3>
                        <div className="grid gap-4">
                            {renderDynamicFields(value, fieldPath)}
                        </div>
                    </div>
                );
            }

            if (key === 'icon') {
                return (
                    <div key={fieldPath} className="space-y-2">
                        <Label htmlFor={fieldPath}>{label}</Label>
                        <IconPicker
                            value={value as string}
                            onChange={(newValue) => updateFormData(fieldPath, newValue)}
                        />
                    </div>
                );
            }

            return (
                <div key={fieldPath} className="space-y-2">
                    <Label htmlFor={fieldPath}>{label}</Label>
                    {key.includes('description') || key.includes('content') || key.includes('details') || (typeof value === 'string' && value.length > 100) ? (
                        <Textarea
                            id={fieldPath}
                            value={value as string}
                            onChange={(e) => updateFormData(fieldPath, e.target.value)}
                            className="min-h-[100px]"
                        />
                    ) : (
                        <Input
                            id={fieldPath}
                            value={value as string}
                            onChange={(e) => updateFormData(fieldPath, e.target.value)}
                        />
                    )}
                </div>
            );
        });
    };

    const filteredPages = pages.filter(p => p.title.toLowerCase().includes(pageSearch.toLowerCase()));

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
                <div>
                    <h1 className="text-[28px] font-black text-gray-900 tracking-tighter leading-tight font-['Poppins']">Page Content Manager</h1>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Landing page architecture refinement</p>
                </div>
                {selectedPageSlug && (
                    <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                        <Button
                            variant={viewMode === 'form' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('form')}
                            className={`h-8 px-4 text-[10px] font-black uppercase tracking-widest ${viewMode === 'form' ? 'bg-white shadow-sm text-[#0099ff]' : 'text-gray-500'}`}
                        >
                            <Layout className="w-3.5 h-3.5 mr-2" />
                            Visual Editor
                        </Button>
                        <Button
                            variant={viewMode === 'json' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('json')}
                            className={`h-8 px-4 text-[10px] font-black uppercase tracking-widest ${viewMode === 'json' ? 'bg-white shadow-sm text-[#0099ff]' : 'text-gray-500'}`}
                        >
                            <Code className="w-3.5 h-3.5 mr-2" />
                            Source Code
                        </Button>
                    </div>
                )}
            </div>

            {/* Main Dual-Card Layout - FORCED Side-by-Side on Desktop */}
            <div
                className="flex flex-col md:flex-row gap-6 items-start"
                style={{ display: 'flex', flexDirection: window.innerWidth > 768 ? 'row' : 'column', width: '100%' }}
            >

                {/* Left Card - Navigation Explorer (roughly 18% width) */}
                <Card
                    className="border-gray-200 shadow-sm bg-white flex flex-col rounded-2xl overflow-hidden"
                    style={{
                        flex: window.innerWidth > 768 ? '0 0 18%' : '1 1 auto',
                        width: window.innerWidth > 768 ? '18%' : '100%',
                        minWidth: window.innerWidth > 768 ? '250px' : 'auto',
                        border: '1px solid #e5e7eb',
                        position: window.innerWidth > 768 ? 'sticky' : 'relative',
                        top: window.innerWidth > 768 ? '100px' : '0',
                        zIndex: 10
                    }}
                >
                    <div className="p-3 border-b border-gray-50 bg-gray-50/10">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Content Manager</span>
                    </div>
                    <div className="flex-1 min-h-[400px] p-2 space-y-0.5 overflow-y-auto custom-scrollbar">
                        {filteredPages.map((page) => (
                            <button
                                key={page.id}
                                onClick={() => setSelectedPageSlug(page.slug)}
                                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-all text-left relative group ${selectedPageSlug === page.slug
                                    ? 'bg-blue-50/50 text-[#0099ff]'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <div className="flex items-center gap-2.5 truncate">
                                    {selectedPageSlug === page.slug && (
                                        <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#0099ff] rounded-full" />
                                    )}
                                    <FileText className={`w-4 h-4 flex-shrink-0 ${selectedPageSlug === page.slug ? 'text-[#0099ff]' : 'text-gray-400'}`} />
                                    <span className="truncate text-md px-2 font-bold tracking-tight">{page.title}</span>
                                </div>
                                {selectedPageSlug === page.slug && <ChevronRight className="w-3 h-3 text-[#0099ff]/40" />}
                            </button>
                        ))}
                    </div>
                    <div className="p-3 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Secure Instance</span>
                        </div>
                    </div>
                </Card>

                {/* Right Card - Content Editor (roughly 82% width) */}
                <Card
                    className="border-gray-200 bg-white relative overflow-hidden flex flex-col rounded-3xl min-h-[750px]"
                    style={{
                        flex: '1 1 auto',
                        width: window.innerWidth > 768 ? '80%' : '100%',
                        border: '3px solid #f3f4f6',
                        marginLeft: window.innerWidth > 768 ? '10px' : '0'
                    }}
                >
                    {selectedPageSlug ? (
                        <div className="flex-1 flex flex-col">
                            {/* Editor Header Bar */}
                            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0099ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100/50">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-[22px] font-black text-gray-900 tracking-tighter uppercase font-['Poppins']">
                                            {pages.find(p => p.slug === selectedPageSlug)?.title}
                                        </h2>
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{selectedPageSlug} protocol active</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => fetchPageContent(selectedPageSlug)}
                                        disabled={saving}
                                        className="text-gray-400 hover:text-gray-900 font-black text-[9px] uppercase tracking-[0.2em] h-10 px-4"
                                    >
                                        REVERT PROTOCOL
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="bg-[#0099ff] hover:bg-black text-white h-10 px-8 rounded-xl shadow-lg shadow-blue-100 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95"
                                    >
                                        {saving ? 'SYNCING...' : (
                                            <div className="flex items-center gap-2">
                                                <Save className="w-4 h-4" />
                                                <span>PUBLISH REPOSITORY</span>
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            {/* Main Content Area */}
                            <div className="p-4 bg-[#fafbfc] flex-1">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-6 h-6 border-3 border-[#0099ff] border-t-transparent rounded-full animate-spin mb-3" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Hydrating Workspace...</p>
                                    </div>
                                ) : (
                                    <div className="w-full max-w-6xl mx-auto pb-20">
                                        {viewMode === 'form' ? (
                                            <div className="grid gap-6">
                                                {renderDynamicFields(formData)}
                                            </div>
                                        ) : (
                                            <div className="p-2">
                                                <div className="rounded-2xl border border-gray-800 overflow-hidden shadow-2xl bg-[#09090b]">
                                                    <div className="bg-[#18181b] px-4 py-2 flex items-center justify-between border-b border-white/5">
                                                        <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">source: {selectedPageSlug}.json</span>
                                                    </div>
                                                    <Textarea
                                                        id="json-editor"
                                                        value={jsonContent}
                                                        onChange={(e) => setJsonContent(e.target.value)}
                                                        className="font-mono h-[600px] bg-[#09090b] text-[#0099ff] border-0 focus-visible:ring-0 rounded-none text-[13px] p-6 leading-relaxed"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Floating Global Alerts */}
                            {(error || success) && (
                                <div className="absolute bottom-10 right-10 z-50">
                                    {error ? (
                                        <div className="bg-red-600 text-white py-4 px-8 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm">
                                            <AlertCircle className="h-5 w-5" />
                                            {error}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-900 text-white py-4 px-8 rounded-[2rem] shadow-2xl flex items-center gap-4 text-xs font-black uppercase tracking-widest border-2 border-emerald-500/20">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
                                            {success}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-20 text-center bg-gray-50/30">
                            <div className="w-24 h-24 bg-white border border-gray-100 rounded-3xl flex items-center justify-center mb-10 shadow-xl group relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#0099ff]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <FileText className="w-10 h-10 text-gray-200 relative z-10 group-hover:text-[#0099ff] transition-colors" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-3">Workspace Standby</h3>
                            <p className="text-sm text-gray-400 max-w-sm mx-auto font-medium leading-relaxed">
                                Please select a landing page from the secure rail on the left to begin content refinement.
                            </p>
                        </div>
                    )
                    }
                </Card >
            </div >
        </div >
    );
}
