import { useState, useEffect, useRef } from 'react';
import { Folder, ChevronLeft, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '../ui/dialog';
import client from '../../api/client';

interface FileItem {
    name: string;
    type: 'file' | 'directory';
    path: string;
    url: string | null;
}

interface ImageSelectorProps {
    onSelect: (url: string | string[]) => void;
    onCancel: () => void;
    multiple?: boolean;
}

export function ImageSelector({ onSelect, onCancel, multiple = false }: ImageSelectorProps) {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [currentPath, setCurrentPath] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchFiles(currentPath);
    }, [currentPath]);

    const fetchFiles = async (path: string) => {
        setIsLoading(true);
        try {
            const response = await client.get(`uploads`, {
                params: { path }
            });
            setFiles(response.data);
        } catch (error) {
            console.error('Failed to fetch files', error);
        }
        setIsLoading(false);
    };

    const handleNavigate = (path: string) => {
        setCurrentPath(path);
    };

    const handleBack = () => {
        const parts = currentPath.split('/');
        parts.pop();
        setCurrentPath(parts.join('/'));
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.');
            return;
        }

        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size exceeds 2MB limit.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', currentPath);

        try {
            await client.post('uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchFiles(currentPath);
        } catch (error) {
            console.error('Failed to upload file', error);
            alert('Failed to upload file');
        }
        setIsUploading(false);
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCreateFolder = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newFolderName) return;

        try {
            await client.post('uploads/create-folder', {
                path: currentPath,
                name: newFolderName
            });
            fetchFiles(currentPath);
            setNewFolderName('');
            setIsNewFolderDialogOpen(false);
        } catch (error) {
            console.error('Failed to create folder', error);
            alert('Failed to create folder');
        }
    };

    const toggleImageSelection = (url: string) => {
        if (!multiple) {
            onSelect(url);
            return;
        }

        setSelectedImages(prev =>
            prev.includes(url)
                ? prev.filter(u => u !== url)
                : [...prev, url]
        );
    };

    const handleConfirmSelection = () => {
        if (selectedImages.length > 0) {
            onSelect(selectedImages);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {currentPath && (
                        <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    )}
                    <h3 className="font-semibold text-lg text-gray-800">
                        {currentPath ? (
                            <span className="flex items-center gap-2">
                                <Folder className="w-5 h-5 text-blue-500" />
                                {currentPath.split('/').pop()}
                            </span>
                        ) : 'Main Uploads'}
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Location: {currentPath ? `/${currentPath}` : '/root'}
                    </span>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/png, image/jpeg, image/gif, image/webp"
                        onChange={handleFileChange}
                    />
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-white hover:bg-gray-50 border-gray-200"
                            onClick={() => setIsNewFolderDialogOpen(true)}
                        >
                            <Folder className="w-4 h-4 mr-2 text-blue-500" />
                            New Folder
                        </Button>
                        <Button
                            size="sm"
                            className="bg-[#0099ff] hover:bg-[#0077cc] text-white shadow-sm"
                            onClick={handleUploadClick}
                            disabled={isUploading}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {isUploading ? 'Uploading...' : 'Upload Image'}
                        </Button>
                    </div>
                </div>
            </div>

            <ScrollArea className="h-[450px] border border-gray-100 rounded-xl bg-gray-50/30 p-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0099ff] mb-4"></div>
                        <p className="text-sm">Reading directory...</p>
                    </div>
                ) : files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                        <Folder className="w-16 h-16 text-gray-200 mb-4" />
                        <p className="text-lg font-medium text-gray-500">No files found here</p>
                        <p className="text-sm mt-1">Upload an image or create a folder to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {files.map((file) => {
                            const isSelected = multiple && file.url && selectedImages.includes(file.url);
                            return (
                                <div
                                    key={file.name}
                                    className="cursor-pointer group relative"
                                    onClick={() => {
                                        if (file.type === 'directory') {
                                            handleNavigate(file.path);
                                        } else {
                                            if (file.url) toggleImageSelection(file.url);
                                        }
                                    }}
                                >
                                    <div className={`aspect-square rounded-lg border bg-gray-50 flex items-center justify-center overflow-hidden transition-all ${isSelected
                                        ? 'border-[#0099ff] border-2 ring-2 ring-[#0099ff]/20'
                                        : 'hover:border-blue-500'
                                        }`}>
                                        {file.type === 'directory' ? (
                                            <Folder className="w-12 h-12 text-gray-400 group-hover:text-blue-500" />
                                        ) : (
                                            <>
                                                <img
                                                    src={file.url!}
                                                    alt={file.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {multiple && (
                                                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected
                                                        ? 'bg-[#0099ff] border-[#0099ff]'
                                                        : 'bg-white border-gray-300 group-hover:border-[#0099ff]'
                                                        }`}>
                                                        {isSelected && (
                                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-center truncate px-1">
                                        {file.name}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ScrollArea>

            <div className="flex justify-between items-center gap-2">
                {multiple && selectedImages.length > 0 && (
                    <p className="text-sm text-gray-600">
                        {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
                    </p>
                )}
                <div className="flex gap-2 ml-auto">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    {multiple && selectedImages.length > 0 && (
                        <Button
                            onClick={handleConfirmSelection}
                            className="bg-[#0099ff] hover:bg-[#0077cc]"
                        >
                            Add {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''}
                        </Button>
                    )}
                </div>
            </div>

            <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                        <DialogDescription>
                            Enter a name for the new folder to organize your images.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateFolder} className="space-y-4">
                        <div>
                            <Label htmlFor="folderName">Folder Name</Label>
                            <Input
                                id="folderName"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="Enter folder name"
                                className="mt-1"
                                autoFocus
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!newFolderName.trim()}>
                                Create Folder
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
