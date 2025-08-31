import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Play, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  X, 
  Plus,
  Film,
  AlertTriangle,
  CheckCircle,
  Loader2
} from "lucide-react";
import type { GeneratedFile, VideoStitchingProject } from "@shared/schema";

interface VideoStitchingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoStitchingModal({ isOpen, onClose }: VideoStitchingModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedClips, setSelectedClips] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("");
  const [isStitching, setIsStitching] = useState(false);
  const [stitchingProgress, setStitchingProgress] = useState(0);

  // Fetch available video clips for this user
  const { data: availableClips = [], isLoading: isLoadingClips } = useQuery({
    queryKey: ["/api/files", "image-to-video"],
    enabled: isOpen,
  }) as { data: GeneratedFile[], isLoading: boolean };

  // Get user's tier limits (for demo, we'll use static values)
  const maxDuration = 180; // 3 minutes - this should come from user's subscription tier
  
  // Calculate total duration of selected clips
  const totalDuration = selectedClips.reduce((total, clipId) => {
    const clip = availableClips.find(c => c.id === clipId);
    // Assuming 5 seconds per clip - in real implementation, get from clip metadata
    return total + (clip ? 5 : 0);
  }, 0);

  // Video stitching mutation
  const stitchVideoMutation = useMutation({
    mutationFn: async (projectData: { 
      name: string; 
      clipIds: string[]; 
      totalDuration: number 
    }) => {
      const response = await apiRequest("/api/video-stitching/create", "POST", projectData);
      return response as VideoStitchingProject;
    },
    onSuccess: async (project) => {
      setIsStitching(true);
      setStitchingProgress(0);
      
      // Simulate stitching progress (in real implementation, poll the backend)
      for (let i = 0; i <= 100; i += 10) {
        setStitchingProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setIsStitching(false);
      toast({
        title: "Video Stitched Successfully!",
        description: `"${project.name}" has been created and saved to your files.`,
      });
      
      // Invalidate files query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      
      // Reset and close modal
      handleReset();
      onClose();
    },
    onError: (error) => {
      setIsStitching(false);
      setStitchingProgress(0);
      toast({
        title: "Stitching Failed",
        description: "There was an error creating your stitched video. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddClip = (clipId: string) => {
    if (!selectedClips.includes(clipId)) {
      setSelectedClips([...selectedClips, clipId]);
    }
  };

  const handleRemoveClip = (clipId: string) => {
    setSelectedClips(selectedClips.filter(id => id !== clipId));
  };

  const handleReorderClip = (clipId: string, direction: 'up' | 'down') => {
    const currentIndex = selectedClips.indexOf(clipId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= selectedClips.length) return;
    
    const newOrder = [...selectedClips];
    [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];
    setSelectedClips(newOrder);
  };

  const handleReset = () => {
    setSelectedClips([]);
    setProjectName("");
    setStitchingProgress(0);
    setIsStitching(false);
  };

  const handleStitch = () => {
    if (!projectName.trim()) {
      toast({
        title: "Project Name Required",
        description: "Please enter a name for your stitched video.",
        variant: "destructive",
      });
      return;
    }

    if (selectedClips.length < 2) {
      toast({
        title: "Minimum 2 Clips Required",
        description: "Please select at least 2 clips to create a stitched video.",
        variant: "destructive",
      });
      return;
    }

    if (totalDuration > maxDuration) {
      toast({
        title: "Duration Limit Exceeded",
        description: `Your selected clips exceed the ${maxDuration}s limit for your plan.`,
        variant: "destructive",
      });
      return;
    }

    stitchVideoMutation.mutate({
      name: projectName,
      clipIds: selectedClips,
      totalDuration,
    });
  };

  const isOverLimit = totalDuration > maxDuration;
  const canStitch = selectedClips.length >= 2 && projectName.trim() && !isOverLimit && !isStitching;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Film className="h-5 w-5 text-purple-600" />
            Create Stitched Video
          </DialogTitle>
          <DialogDescription>
            Select and reorder your video clips to create a single stitched video.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Project Name */}
          <div>
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter a name for your stitched video"
              disabled={isStitching}
              data-testid="input-project-name"
            />
          </div>

          {/* Duration Limit Info */}
          <div className={`p-4 rounded-lg border ${isOverLimit ? 'bg-red-50 border-red-200' : 'bg-purple-50 border-purple-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isOverLimit ? (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-purple-600" />
              )}
              <span className={`font-medium ${isOverLimit ? 'text-red-900' : 'text-purple-900'}`}>
                Duration: {totalDuration}s / {maxDuration}s
              </span>
            </div>
            <p className={`text-sm ${isOverLimit ? 'text-red-700' : 'text-purple-700'}`}>
              {isOverLimit 
                ? "Your selection exceeds the duration limit for your plan. Please remove some clips."
                : `You can add ${Math.floor((maxDuration - totalDuration) / 5)} more 5s clips.`
              }
            </p>
          </div>

          {/* Available Clips */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Available Video Clips</h3>
            {isLoadingClips ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading your video clips...</span>
              </div>
            ) : availableClips.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Play className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No video clips available.</p>
                <p className="text-sm">Generate some videos first to use video stitching.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableClips.filter(clip => clip.fileType === 'video').map((clip) => (
                  <div
                    key={clip.id}
                    className={`border rounded-lg p-4 transition-all ${
                      selectedClips.includes(clip.id)
                        ? 'border-purple-300 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm truncate">{clip.fileName}</h4>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        5s
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-200 rounded-lg h-24 flex items-center justify-center mb-3">
                      <Play className="h-6 w-6 text-gray-400" />
                    </div>
                    
                    <Button
                      onClick={() => 
                        selectedClips.includes(clip.id) 
                          ? handleRemoveClip(clip.id)
                          : handleAddClip(clip.id)
                      }
                      variant={selectedClips.includes(clip.id) ? "destructive" : "outline"}
                      size="sm"
                      className="w-full"
                      disabled={isStitching}
                      data-testid={`button-${selectedClips.includes(clip.id) ? 'remove' : 'add'}-clip-${clip.id}`}
                    >
                      {selectedClips.includes(clip.id) ? (
                        <>
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Project
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Clips Order */}
          {selectedClips.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Selected Clips (In Order)</h3>
              <div className="space-y-2">
                {selectedClips.map((clipId, index) => {
                  const clip = availableClips.find(c => c.id === clipId);
                  if (!clip) return null;
                  
                  return (
                    <div
                      key={clipId}
                      className="flex items-center justify-between p-3 border border-purple-200 bg-purple-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span className="font-medium">{clip.fileName}</span>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          5s
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleReorderClip(clipId, 'up')}
                          variant="ghost"
                          size="sm"
                          disabled={index === 0 || isStitching}
                          data-testid={`button-move-up-${clipId}`}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleReorderClip(clipId, 'down')}
                          variant="ghost"
                          size="sm"
                          disabled={index === selectedClips.length - 1 || isStitching}
                          data-testid={`button-move-down-${clipId}`}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleRemoveClip(clipId)}
                          variant="ghost"
                          size="sm"
                          disabled={isStitching}
                          data-testid={`button-remove-selected-${clipId}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stitching Progress */}
          {isStitching && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="font-medium text-blue-900">Stitching Video...</span>
              </div>
              <Progress value={stitchingProgress} className="mb-2" />
              <p className="text-sm text-blue-700">
                Processing {selectedClips.length} clips • {stitchingProgress}% complete
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={isStitching}
            data-testid="button-reset"
          >
            Reset
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            disabled={isStitching}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStitch}
            disabled={!canStitch}
            className="bg-purple-600 hover:bg-purple-700"
            data-testid="button-stitch"
          >
            {isStitching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Stitching...
              </>
            ) : (
              <>
                <Film className="h-4 w-4 mr-2" />
                Stitch Video
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}