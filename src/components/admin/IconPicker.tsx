import { useState } from 'react';
import {
    Search, Check, TrendingUp, BarChart3, Download, FileText, Calendar,
    CreditCard, DollarSign, Wallet, Users, Building, ShieldCheck,
    Smartphone, Globe, Briefcase, Award, Percent, PieChart,
    ArrowRight, ChevronRight, Home, Settings, Lock, Unlock,
    Bell, Mail, Phone, MapPin, Printer, Share2, AlertCircle,
    CheckCircle2, XCircle, Info, HelpCircle, User, LogOut,
    Menu, X, ChevronDown, ChevronUp, ChevronsRight,
    // Removed potentially problematic icons to ensure stability
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../ui/utils';

// Icon mapping
export const iconMap: Record<string, any> = {
    TrendingUp, BarChart3, Download, FileText, Calendar,
    CreditCard, DollarSign, Wallet, Users, Building, ShieldCheck,
    Smartphone, Globe, Briefcase, Award, Percent, PieChart,
    ArrowRight, ChevronRight, Home, Settings, Lock, Unlock,
    Bell, Mail, Phone, MapPin, Printer, Share2, AlertCircle,
    CheckCircle2, XCircle, Info, HelpCircle, User, LogOut,
    Menu, X, ChevronDown, ChevronUp, ChevronsRight
};

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
    const [search, setSearch] = useState('');

    const filteredIcons = Object.keys(iconMap).filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    const CurrentIcon = iconMap[value] || HelpCircle;

    return (
        <Popover>
            <PopoverTrigger className="w-full text-left">
                <div className="flex items-center justify-between w-full h-10 px-3 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0099ff]/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 text-gray-600 flex-shrink-0">
                            <CurrentIcon className="w-4 h-4" />
                        </div>
                        <span className="truncate font-medium text-gray-700">
                            {value || "Select icon..."}
                        </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="p-0 bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden z-[9999]"
                align="start"
                sideOffset={8}
                style={{ width: '320px' }}
            >
                <div className="p-3 bg-gray-50/50 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search icons..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-9 text-sm bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-[#0099ff]"
                        />
                    </div>
                </div>
                <ScrollArea className="h-[280px]">
                    <div className="p-3 gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        {filteredIcons.map((name) => {
                            const Icon = iconMap[name];
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => {
                                        onChange(name);
                                        // Popover will close automatically if we don't prevent default
                                    }}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1.5 p-2 rounded-md border transition-all hover:bg-[#0099ff]/5 focus:outline-none focus:ring-2 focus:ring-[#0099ff]/20",
                                        value === name
                                            ? "border-[#0099ff] bg-[#0099ff]/5 text-[#0099ff]"
                                            : "border-transparent text-gray-600 hover:border-gray-100"
                                    )}
                                    title={name}
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            );
                        })}
                        {filteredIcons.length === 0 && (
                            <div className="col-span-4 py-12 text-center text-sm text-gray-400">
                                No icons found
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        {filteredIcons.length} Available
                    </span>
                    {value && (
                        <span className="text-[10px] text-[#0099ff] font-bold uppercase tracking-wider">
                            Selected
                        </span>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;
