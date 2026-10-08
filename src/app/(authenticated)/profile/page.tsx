import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Activity, Calendar, Award, Edit3, HeartPulse, Stethoscope, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const profile = {
    name: "Nishad Deepak Rambhavan",
    email: "nishad@example.com",
    age: 31,
    height: "175 cm",
    weight: "75 kg",
    sport: "Motorsports / Biking",
    level: "Recreational",
    dominantLeg: "Right",
    surgery: "Right ACL-R (Quad Graft) + Medial Meniscus Repair + LEAT",
    surgeryDate: "April 22, 2026",
    surgeon: "Dr. Abhay D Narvekar",
    hospital: "Hinduja National Hospital",
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Athlete Profile</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your clinical and performance data.</p>
        </div>
        <Button className="bg-primary text-primary-foreground font-bold">
          <Edit3 className="w-4 h-4 mr-2" /> Update Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        
        {/* PERSONAL DETAILS */}
        <Card className="border-t-4 border-t-primary/50 hover:border-t-primary transition-all shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg"><User className="h-6 w-6 text-primary" /></div>
              <span>Personal Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Name</p>
                <p className="font-semibold text-lg mt-1">{profile.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="font-semibold text-lg mt-1">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Age</p>
                <p className="font-semibold text-lg mt-1">{profile.age} years</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Scale className="w-3 h-3"/> Height / Weight</p>
                <p className="font-semibold text-lg mt-1">{profile.height} / {profile.weight}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SPORTING PROFILE */}
        <Card className="border-t-4 border-t-blue-500/50 hover:border-t-blue-500 transition-all shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl">
              <div className="p-2 bg-blue-500/10 rounded-lg"><Award className="h-6 w-6 text-blue-500" /></div>
              <span>Sporting Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Primary Sport</p>
                <p className="font-semibold text-lg mt-1 text-foreground">{profile.sport}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Competition Level</p>
                <p className="font-semibold text-lg mt-1">{profile.level}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Dominant Leg</p>
                <p className="font-semibold text-lg mt-1">{profile.dominantLeg}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">RTS Goal</p>
                <p className="font-semibold text-lg mt-1 text-green-500">Jan 2027</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MEDICAL DETAILS */}
        <Card className="md:col-span-2 border-2 border-muted bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <div className="p-2 bg-red-500/10 rounded-lg"><HeartPulse className="h-6 w-6 text-red-500" /></div>
              <span>Medical & Surgery Details</span>
            </CardTitle>
            <CardDescription className="text-base">Clinical constraints and operative notes that drive your progression engine.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-background p-4 rounded-xl border shadow-sm">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-primary" /> Date of Surgery
                </p>
                <p className="text-xl font-bold">{profile.surgeryDate}</p>
                <p className="text-sm text-muted-foreground mt-1">78 Days Post-Op</p>
              </div>
              
              <div className="bg-background p-4 rounded-xl border shadow-sm">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center mb-2">
                  <Activity className="h-4 w-4 mr-2 text-primary" /> Surgery Type
                </p>
                <p className="text-lg font-bold text-wrap">{profile.surgery}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded">Caution: Quad Tendon Loading</span>
                  <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded">Avoid Deep Flexion Under Load (Meniscus)</span>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">IT Band Tension (LEAT)</span>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-xl border shadow-sm">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center mb-2">
                  <Stethoscope className="h-4 w-4 mr-2 text-primary" /> Medical Team
                </p>
                <p className="text-lg font-bold">{profile.surgeon}</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">{profile.hospital}</p>
              </div>
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
