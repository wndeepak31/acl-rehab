import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, Lock } from "lucide-react";

export default function TimelinePage() {
  const phases = [
    {
      id: 1,
      name: "Phase 1: Protection",
      duration: "Weeks 0-2",
      status: "completed",
      milestones: ["Reduce swelling", "Full extension", "90° flexion"],
    },
    {
      id: 2,
      name: "Phase 2: ROM & Early Strength",
      duration: "Weeks 2-6",
      status: "completed",
      milestones: ["Full ROM", "Normal gait", "Minimal pain"],
    },
    {
      id: 3,
      name: "Phase 3: Strength",
      duration: "Weeks 6-12",
      status: "current",
      milestones: ["LSI > 70%", "Jogging progression", "Hop tests baseline"],
    },
    {
      id: 4,
      name: "Phase 4: Running",
      duration: "Weeks 12-18",
      status: "locked",
      milestones: ["Continuous running", "Basic agility"],
    },
    {
      id: 5,
      name: "Phase 5: Return to Play",
      duration: "Months 6-9+",
      status: "locked",
      milestones: ["LSI > 90%", "Full sports participation", "Psychological readiness"],
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recovery Timeline</h1>
        <p className="text-muted-foreground mt-2">Your roadmap back to the pitch.</p>
      </div>

      <div className="relative border-l border-muted ml-3 space-y-8 pb-8">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative pl-8">
            {/* Timeline Icon */}
            <div className="absolute -left-[17px] top-4 bg-background p-1">
              {phase.status === "completed" ? (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              ) : phase.status === "current" ? (
                <Clock className="h-6 w-6 text-primary animate-pulse" />
              ) : (
                <Lock className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <Card className={phase.status === "locked" ? "opacity-60" : ""}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{phase.name}</span>
                  <span className="text-sm font-normal text-muted-foreground">{phase.duration}</span>
                </CardTitle>
                <CardDescription>
                  {phase.status === "completed" && "You have successfully completed this phase."}
                  {phase.status === "current" && "You are currently in this phase."}
                  {phase.status === "locked" && "Unlock this phase by completing previous milestones."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-semibold mb-3">Key Milestones:</h4>
                <ul className="space-y-2">
                  {phase.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start text-sm">
                      {phase.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                      ) : phase.status === "current" && i === 0 ? (
                        <CheckCircle2 className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <span className={phase.status === "completed" || (phase.status === "current" && i === 0) ? "text-foreground" : "text-muted-foreground"}>
                        {milestone}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
