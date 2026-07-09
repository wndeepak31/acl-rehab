"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlayCircle, Info, Activity } from "lucide-react";
import { submitDailyWorkout } from "@/actions/progressionEngine";

export default function TodayClient({ data }: { data: any }) {
  const { status, template, exercises } = data;
  
  // Track completed exercises
  const [completedEx, setCompletedEx] = useState<string[]>([]);
  
  // Daily Logs state
  const [pain, setPain] = useState(0);
  const [swelling, setSwelling] = useState("NONE");
  const [rom, setRom] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const toggleExercise = (id: string) => {
    if (completedEx.includes(id)) {
      setCompletedEx(completedEx.filter(e => e !== id));
    } else {
      setCompletedEx([...completedEx, id]);
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitDailyWorkout("athlete@example.com", {
        pain,
        swelling,
        rom,
        completedExercises: completedEx,
        totalExercises: exercises.length
      });
      setSuccessMsg(res.message);
      if (res.painWarning) alert("Recovery Warning: Pain is > 4. Next week's load will be reduced.");
    } catch (e) {
      console.error(e);
      alert("Failed to save workout");
    }
    setIsSubmitting(false);
  };

  if (!template) {
    return <div>No workout scheduled for today. Rest up!</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Today's Workout</h1>
        <p className="text-muted-foreground mt-2">
          Day {status.daysSinceSurgery} • Week {status.weekNumber} • {status.phaseName}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exercises.map((ex: any) => (
                  <div key={ex.exerciseId} className="flex items-center justify-between p-4 border rounded-xl hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Checkbox 
                        checked={completedEx.includes(ex.exerciseId)} 
                        onCheckedChange={() => toggleExercise(ex.exerciseId)} 
                      />
                      <div>
                        <p className={`font-medium ${completedEx.includes(ex.exerciseId) ? 'line-through text-muted-foreground' : ''}`}>
                          {ex.exercise.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {ex.sets} sets x {ex.reps} {ex.weightProgression ? `• Target: ${ex.weightProgression.targetWeight}kg` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Tracking</CardTitle>
              <CardDescription>Log your morning check-in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pain Level (0-10): {pain}</label>
                <input 
                  type="range" min="0" max="10" 
                  value={pain} onChange={e => setPain(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Swelling</label>
                <div className="grid grid-cols-4 gap-2">
                  {["NONE", "MILD", "MODERATE", "SEVERE"].map(s => (
                    <Button 
                      key={s} 
                      onClick={() => setSwelling(s)}
                      variant={swelling === s ? "default" : "outline"} 
                      size="sm" 
                      className="text-xs"
                    >
                      {s.substring(0, 4)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Current ROM</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                  <input 
                    type="number" 
                    placeholder="e.g. 120" 
                    value={rom}
                    onChange={e => setRom(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-sm" 
                  />
                  <span className="text-sm text-muted-foreground">degrees</span>
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Saving..." : "Save Tracking"}
              </Button>
              {successMsg && <p className="text-sm text-green-500 mt-2">{successMsg}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
