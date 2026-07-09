import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Activity, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const profile = {
    name: "John Doe",
    email: "athlete@example.com",
    age: 24,
    height: "180 cm",
    weight: "75 kg",
    sport: "Cricket",
    level: "Professional",
    dominantLeg: "Right",
    surgery: "ACL Reconstruction + Meniscus Repair",
    surgeryDate: "April 23, 2026",
    surgeon: "Dr. Smith",
    hospital: "Elite Sports Institute",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Athlete Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your personal and medical information.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Personal Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-semibold">{profile.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Age</p>
                <p className="font-semibold">{profile.age}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Height / Weight</p>
                <p className="font-semibold">{profile.height} / {profile.weight}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">Edit Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Sporting Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Primary Sport</p>
                <p className="font-semibold">{profile.sport}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Competition Level</p>
                <p className="font-semibold">{profile.level}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dominant Leg</p>
                <p className="font-semibold">{profile.dominantLeg}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Medical & Surgery Details</span>
            </CardTitle>
            <CardDescription>This information is used to adapt your protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                  <Calendar className="h-4 w-4 mr-1" /> Date
                </p>
                <p className="font-semibold">{profile.surgeryDate}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground mb-1">Surgery Type</p>
                <p className="font-semibold">{profile.surgery}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Surgeon</p>
                <p className="font-semibold">{profile.surgeon}</p>
                <p className="text-sm text-muted-foreground">{profile.hospital}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
