"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { Input } from "./input";
import { Button } from "./button";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Filter,
    ArrowUpDown,
    Loader2
} from "lucide-react";
import { cn } from "./utils";

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    title?: string;
    subtitle?: string;
    searchPlaceholder?: string;
    searchKey?: keyof T;
    onSearch?: (term: string) => void;
    isLoading?: boolean;
    pageSize?: number;
    className?: string;
    emptyMessage?: string;
}

export function DataTable<T>({
    data,
    columns,
    title,
    subtitle,
    searchPlaceholder = "Search...",
    searchKey,
    onSearch,
    isLoading = false,
    pageSize: initialPageSize = 10,
    className,
    emptyMessage = "No results found.",
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    // Reset to first page when search or page size changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, pageSize]);

    useEffect(() => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    }, [searchTerm, onSearch]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((item) => {
            if (searchKey) {
                const val = item[searchKey];
                return String(val).toLowerCase().includes(searchTerm.toLowerCase());
            }

            // Default: search across all string values in the object
            return Object.values(item as any).some((val) =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [data, searchTerm, searchKey]);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage, pageSize]);

    return (
        <div className={cn("space-y-4 font-inter", className)}>
            {/* Unified Professional Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {title && (
                    <div className="flex flex-col justify-center">
                        <h3 className="text-lg font-black text-slate-900 tracking-tight font-['Poppins'] leading-none mb-0.5">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-[10px] font-black text-gray-400 tracking-widest leading-none">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-2.5">
                    {/* Record Selector moved to top */}
                    <div className="relative group">
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="appearance-none bg-white border border-slate-200 text-slate-600 text-sm font-normal rounded-lg pl-3 px-3 pr-8 h-9 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500/40 block focus:outline-none transition-all cursor-pointer hover:border-slate-300 min-w-[110px]"
                        >
                            <option value={10}>10 / page</option>
                            <option value={20}>20 / page</option>
                            <option value={50}>50 / page</option>
                            <option value={100}>100 / page</option>
                        </select>
                    </div>

                    <div className="relative min-w-[240px] flex-1 sm:flex-none p-2">
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border-slate-200 h-9 pl-9 pr-3 text-[13px] font-normal rounded-lg placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all shadow-none"
                        />
                    </div>

                    <Button
                        variant="outline"
                        className="h-9 px-3.5 rounded-lg border-slate-200 text-slate-600 font-medium text-[12px] flex items-center gap-2 hover:bg-slate-50 shadow-none transition-all"
                    >
                        <Filter className="w-3.5 h-3.5" />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-none transition-all">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-slate-100 bg-white">
                                {columns.map((column, idx) => (
                                    <TableHead
                                        key={idx}
                                        className={cn(
                                            "h-11 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-slate-500",
                                            column.headerClassName
                                        )}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-2 cursor-pointer group select-none transition-colors",
                                            column.headerClassName?.includes('text-right') ? 'justify-end' : 'justify-start'
                                        )}>
                                            {column.header}
                                            <ArrowUpDown className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-48 text-center border-none">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Loader2 className="h-6 w-6 animate-spin text-blue-500 opacity-50" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Synchronizing...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((row, rowIdx) => (
                                    <TableRow
                                        key={rowIdx}
                                        className="hover:bg-slate-50/50 border-b border-slate-100 last:border-0 transition-colors group/row"
                                    >
                                        {columns.map((column, colIdx) => (
                                            <TableCell
                                                key={colIdx}
                                                className={cn(
                                                    "px-4 py-3 text-[13px] font-normal text-slate-600",
                                                    column.className
                                                )}
                                            >
                                                {column.cell
                                                    ? column.cell(row)
                                                    : column.accessorKey
                                                        ? (row[column.accessorKey] as React.ReactNode)
                                                        : null}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-32 text-center text-slate-300 font-bold text-xs uppercase tracking-widest border-none"
                                    >
                                        {emptyMessage}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* SIMPLIFIED FOOTER */}
                {!isLoading && filteredData.length > 0 && (
                    <div className="px-5 py-3.5 bg-white border-t border-slate-50 flex items-center justify-between">
                        {/* Pagination on the Left */}
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="h-9 w-9 text-slate-400 hover:text-slate-900 rounded-xl"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <Button
                                        key={i + 1}
                                        variant="ghost"
                                        className={cn(
                                            "h-9 w-9 text-[12px] font-semibold transition-all rounded-xl",
                                            currentPage === i + 1
                                                ? "text-blue-600 bg-blue-50/50"
                                                : "text-slate-400 hover:text-slate-900"
                                        )}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="h-9 w-9 text-slate-400 hover:text-slate-900 rounded-xl"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Pagination Info */}
                        <div className="text-sm font-semibold text-slate-400 tracking-widest">
                            Page {currentPage} of {totalPages}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
