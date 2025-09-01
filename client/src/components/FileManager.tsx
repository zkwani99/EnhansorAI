import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Download, Calendar, FileType, HardDrive } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SocialExport } from "@/components/shared/social-export";

interface GeneratedFile {
  id: string;
  service: string;
  fileType: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  originalPrompt?: string;
  creditsUsed: number;
  downloadCount: number;
  lastDownloaded?: string;
  scheduledDeletion: string;
  createdAt: string;
}

interface FileManagerProps {
  service: string;
  title?: string;
  className?: string;
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "Unknown size";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + " " + sizes[i];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDaysUntilDeletion(scheduledDeletion: string): number {
  const deletionDate = new Date(scheduledDeletion);
  const now = new Date();
  const diffTime = deletionDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function FileManager({ service, title, className = "" }: FileManagerProps) {
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  // Fetch user's files for this service
  const { data: files = [], isLoading } = useQuery({
    queryKey: ["/api/files", service],
  });

  // Download mutation
  const downloadMutation = useMutation({
    mutationFn: async (fileId: string) => {
      const response = await apiRequest(`/api/files/${fileId}/download`);
      return response as { downloadUrl: string; fileName: string; fileType: string };
    },
    onSuccess: (data, fileId) => {
      // Create a temporary link to download the file
      const link = document.createElement("a");
      link.href = data.downloadUrl;
      link.download = data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `${data.fileName} is being downloaded.`,
      });
      
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
      
      // Refresh files to update download count
      queryClient.invalidateQueries({ queryKey: ["/api/files", service] });
    },
    onError: (error, fileId) => {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "Failed to download the file. Please try again.",
        variant: "destructive",
      });
      
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    },
  });

  const handleDownload = (fileId: string) => {
    setDownloadingFiles(prev => new Set(prev).add(fileId));
    downloadMutation.mutate(fileId);
  };

  const handleDownloadAll = () => {
    files.forEach(file => {
      if (!downloadingFiles.has(file.id)) {
        handleDownload(file.id);
      }
    });
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            {title || "Generated Files"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Progress value={undefined} className="w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          {title || "Generated Files"}
        </CardTitle>
        
        {/* Auto-deletion warning notice */}
        <div className="relative bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 rounded-xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Auto-deletion Notice
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your generated content will be automatically deleted after 30 days. 
                <span className="font-medium text-orange-700 ml-1">Download files to keep them permanently.</span>
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {files.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileType className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No files yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
              Start creating content to see your generated files here. All files are automatically organized for easy access.
            </p>
          </div>
        ) : (
          <>
            {/* Bulk download option */}
            {files.length > 1 && (
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-sm text-gray-600">
                  {files.length} file{files.length !== 1 ? "s" : ""} available
                </span>
                <Button
                  onClick={handleDownloadAll}
                  variant="outline"
                  size="sm"
                  disabled={downloadMutation.isPending}
                  data-testid="button-download-all"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            )}

            {/* File list */}
            <div className="space-y-3">
              {files.map((file) => {
                const daysLeft = getDaysUntilDeletion(file.scheduledDeletion);
                const isDownloading = downloadingFiles.has(file.id);
                
                return (
                  <div
                    key={file.id}
                    className="p-4 border rounded-lg hover:bg-gray-50"
                    data-testid={`file-item-${file.id}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium truncate" data-testid={`text-filename-${file.id}`}>
                            {file.fileName}
                          </h4>
                          <Badge variant={file.fileType === "video" ? "default" : "secondary"}>
                            {file.fileType}
                          </Badge>
                          {daysLeft <= 7 && (
                            <Badge variant="destructive" className="text-xs">
                              {daysLeft} days left
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(file.createdAt)}
                          </span>
                          <span>{formatFileSize(file.fileSize)}</span>
                          <span>{file.creditsUsed} credits used</span>
                          {file.downloadCount > 0 && (
                            <span className="text-purple-600">
                              Downloaded {file.downloadCount} time{file.downloadCount !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        
                        {file.originalPrompt && (
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            "{file.originalPrompt}"
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Button
                        onClick={() => handleDownload(file.id)}
                        disabled={isDownloading || downloadMutation.isPending}
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white"
                        data-testid={`button-download-${file.id}`}
                      >
                        {isDownloading ? (
                          <>
                            <Progress value={undefined} className="h-4 w-4 mr-2" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                      
                      <div className="lg:max-w-xs">
                        <SocialExport 
                          fileUrl={file.fileUrl}
                          fileName={file.fileName}
                          fileType={file.fileType as "image" | "video"}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}