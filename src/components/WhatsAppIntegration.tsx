import React, { useState } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export const WhatsAppIntegration = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (phoneNumber) {
      setIsConnected(true);
      toast({
        title: "WhatsApp Connected",
        description: "Successfully connected to WhatsApp Business API",
      });
    }
  };

  const handleSendSurvey = () => {
    toast({
      title: "Survey Sent",
      description: "Survey deployed via WhatsApp to selected contacts",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          WhatsApp Integration
          {isConnected && <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>}
        </CardTitle>
        <CardDescription>
          Deploy surveys directly through WhatsApp Business API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter WhatsApp Business number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isConnected}
          />
          <Button 
            onClick={handleConnect} 
            disabled={isConnected || !phoneNumber}
            variant={isConnected ? "secondary" : "default"}
          >
            {isConnected ? "Connected" : "Connect"}
          </Button>
        </div>
        
        {isConnected && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Active Campaigns</span>
              <Badge variant="outline">3 Active</Badge>
            </div>
            <Button onClick={handleSendSurvey} className="w-full" variant="outline">
              <Send className="mr-2 h-4 w-4" />
              Deploy New Survey
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const IVRIntegration = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const handleToggleIVR = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "IVR Deactivated" : "IVR Activated",
      description: isActive 
        ? "Voice surveys are now offline" 
        : "Voice surveys are now active",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-600" />
          IVR System
          {isActive && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Active</Badge>}
        </CardTitle>
        <CardDescription>
          Interactive Voice Response for telephone-based surveys
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-medium">Calls Today</div>
            <div className="text-2xl font-bold text-primary">247</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-medium">Completion Rate</div>
            <div className="text-2xl font-bold text-success">78%</div>
          </div>
        </div>
        
        <Button 
          onClick={handleToggleIVR} 
          variant={isActive ? "destructive" : "default"}
          className="w-full"
        >
          {isActive ? "Deactivate IVR" : "Activate IVR"}
        </Button>
        
        {isActive && (
          <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm text-success-foreground">
              IVR system is active. Phone surveys are being conducted in Hindi, English, and regional languages.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};