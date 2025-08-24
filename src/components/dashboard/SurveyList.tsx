import { MoreHorizontal, Eye, Edit, Trash2, Share, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Survey {
  id: string;
  title: string;
  description: string;
  status: "draft" | "deployed" | "completed" | "paused";
  responses: number;
  completionRate: number;
  channels: string[];
  createdBy: string;
  createdAt: string;
  aadhaarEnabled: boolean;
}

const dummySurveys: Survey[] = [
  {
    id: "1",
    title: "Digital India Infrastructure Survey",
    description: "Assessment of digital infrastructure needs across rural India",
    status: "deployed",
    responses: 1247,
    completionRate: 78.5,
    channels: ["WhatsApp", "IVR", "Web"],
    createdBy: "Priya Sharma",
    createdAt: "2024-08-10",
    aadhaarEnabled: true,
  },
  {
    id: "2",
    title: "Healthcare Access Survey",
    description: "Understanding healthcare accessibility in tier-2 cities",
    status: "deployed",
    responses: 892,
    completionRate: 65.3,
    channels: ["WhatsApp", "Avatar"],
    createdBy: "Rajesh Kumar",
    createdAt: "2024-08-12",
    aadhaarEnabled: true,
  },
  {
    id: "3",
    title: "Education Quality Assessment",
    description: "Evaluating educational outcomes in government schools",
    status: "draft",
    responses: 0,
    completionRate: 0,
    channels: [],
    createdBy: "Meera Patel",
    createdAt: "2024-08-14",
    aadhaarEnabled: false,
  },
  {
    id: "4",
    title: "Financial Inclusion Study",
    description: "Banking and financial services adoption survey",
    status: "completed",
    responses: 2156,
    completionRate: 89.2,
    channels: ["WhatsApp", "IVR", "Web", "Avatar"],
    createdBy: "Arjun Singh",
    createdAt: "2024-07-28",
    aadhaarEnabled: true,
  },
  {
    id: "5",
    title: "Agricultural Technology Survey",
    description: "Farmer adoption of modern agricultural technologies",
    status: "paused",
    responses: 456,
    completionRate: 42.1,
    channels: ["IVR", "WhatsApp"],
    createdBy: "Sunita Reddy",
    createdAt: "2024-08-08",
    aadhaarEnabled: true,
  },
];

const getStatusColor = (status: Survey["status"]) => {
  switch (status) {
    case "deployed":
      return "bg-success text-success-foreground";
    case "completed":
      return "bg-primary text-primary-foreground";
    case "draft":
      return "bg-muted text-muted-foreground";
    case "paused":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: Survey["status"]) => {
  switch (status) {
    case "deployed":
      return "Active";
    case "completed":
      return "Completed";
    case "draft":
      return "Draft";
    case "paused":
      return "Paused";
    default:
      return status;
  }
};

const SurveyList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>(dummySurveys);

  const handleViewDetails = (survey: Survey) => {
    toast({
      title: "Viewing Survey Details",
      description: `Opening details for "${survey.title}"`,
    });
    // Navigate to survey details or open modal
  };

  const handleEditSurvey = (survey: Survey) => {
    navigate("/survey-builder", { state: { surveyId: survey.id, surveyData: survey } });
    toast({
      title: "Opening Survey Editor",
      description: `Editing "${survey.title}"`,
    });
  };

  const handleShareSurvey = async (survey: Survey) => {
    const shareUrl = `${window.location.origin}/survey/${survey.id}`;
    
    // Try native sharing first, with proper error handling
    if (navigator.share) {
      try {
        await navigator.share({
          title: survey.title,
          text: survey.description,
          url: shareUrl,
        });
        return; // Exit if sharing was successful
      } catch (error) {
        console.log('Native sharing failed, falling back to clipboard');
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Share Link Copied",
        description: "Survey link copied to clipboard",
      });
    } catch (error) {
      // Final fallback - show the URL in a toast
      toast({
        title: "Share Survey",
        description: `Share this link: ${shareUrl}`,
      });
    }
  };

  const handleDeleteSurvey = (surveyId: string) => {
    setSurveys(surveys.filter(s => s.id !== surveyId));
    toast({
      title: "Survey Deleted",
      description: "Survey has been permanently deleted",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Your Surveys</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          Total Responses: {surveys.reduce((acc, survey) => acc + survey.responses, 0).toLocaleString()}
        </div>
      </div>

      <div className="grid gap-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-elegant transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{survey.title}</CardTitle>
                    {survey.aadhaarEnabled && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Aadhaar
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{survey.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2" onClick={() => handleViewDetails(survey)}>
                      <Eye className="h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2" onClick={() => handleEditSurvey(survey)}>
                      <Edit className="h-4 w-4" />
                      Edit Survey
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2" onClick={() => handleShareSurvey(survey)}>
                      <Share className="h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDeleteSurvey(survey.id)}>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(survey.status)}>
                    {getStatusLabel(survey.status)}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{survey.responses.toLocaleString()} responses</span>
                    <span>{survey.completionRate}% completion</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {survey.channels.map((channel) => (
                    <Badge key={channel} variant="outline" className="text-xs">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {survey.createdBy.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Created by {survey.createdBy}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(survey.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;