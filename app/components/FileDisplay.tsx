import React from "react";
import { File, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FileAttachment } from "@/app/types/query";

interface FileDisplayProps {
	files: FileAttachment[];
	className?: string;
}

export function FileDisplay({ files, className = "" }: FileDisplayProps) {
	const getFileIcon = (fileType: string, fileName: string) => {
		const extension = fileName.split('.').pop()?.toLowerCase();
		
		if (fileType.includes("pdf") || extension === "pdf") {
			return <FileText className="w-3 h-3 text-red-500" />;
		} else if (fileType.includes("word") || extension === "doc" || extension === "docx") {
			return <FileText className="w-3 h-3 text-blue-500" />;
		} else if (fileType.includes("excel") || extension === "xls" || extension === "xlsx" || extension === "csv") {
			return <FileText className="w-3 h-3 text-green-500" />;
		} else if (fileType.includes("powerpoint") || extension === "ppt" || extension === "pptx") {
			return <FileText className="w-3 h-3 text-orange-500" />;
		} else if (extension === "txt" || extension === "rtf") {
			return <FileText className="w-3 h-3 text-gray-500" />;
		} else if (extension === "json" || extension === "xml") {
			return <FileText className="w-3 h-3 text-purple-500" />;
		} else {
			return <File className="w-3 h-3" />;
		}
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const handleDownload = (file: FileAttachment) => {
		if (file.url) {
			window.open(file.url, '_blank');
		} else if (file.file) {
			const url = URL.createObjectURL(file.file);
			const a = document.createElement('a');
			a.href = url;
			a.download = file.name;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	};

	if (!files || files.length === 0) {
		return null;
	}

	return (
		<div className={`flex flex-wrap gap-1 ${className}`}>
			{files.map((file) => (
				<div
					key={file.id}
					className="flex items-center gap-1.5 bg-muted/30 rounded-md p-1.5 max-w-48 border border-border/50 hover:bg-muted/50 transition-colors"
				>
					<div className="flex-shrink-0">
						{getFileIcon(file.type, file.name)}
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs font-medium text-foreground truncate">{file.name}</p>
						<p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
					</div>
					<Button
						size="icon"
						variant="ghost"
						className="h-4 w-4 hover:bg-primary/10 hover:text-primary"
						onClick={() => handleDownload(file)}
					>
						<Download className="w-2.5 h-2.5" />
					</Button>
				</div>
			))}
		</div>
	);
} 