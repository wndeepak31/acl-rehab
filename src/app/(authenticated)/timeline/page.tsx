import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, Lock } from "lucide-react";
import { REHAB_PHASES } from "@/lib/progression-engine";

export default function TimelinePage() {
  // Simulating that the athlete is currently in Phase 3
  const currentPhaseId = 'PHASE_3';

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Recovery Timeline</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your criteria-based roadmap back to the pitch.</p>
      </div>

      <div className="relative border-l-2 border-primary/20 ml-4 space-y-12 pb-8 mt-12">
        {REHAB_PHASES.map((phase, index) => {
          const isCompleted = index < REHAB_PHASES.findIndex(p => p.id === currentPhaseId);
          const isCurrent = phase.id === currentPhaseId;
          const isLocked = !isCompleted && !isCurrent;

          return (
            <div key={phase.id} className="relative pl-10">
              {/* Timeline Icon */}
              <div className="absolute -left-[19px] top-6 bg-background p-1 rounded-full">
                {isCompleted ? (
                  <div className="bg-green-500/20 rounded-full p-1"><CheckCircle2 className="h-7 w-7 text-green-500" /></div>
                ) : isCurrent ? (
                  <div className="bg-primary/20 rounded-full p-1"><Clock className="h-7 w-7 text-primary animate-pulse" /></div>
                ) : (
                  <div className="bg-muted rounded-full p-1"><Lock className="h-7 w-7 text-muted-foreground" /></div>
                )}
              </div>

              <Card className={`transition-all duration-300 ${isLocked ? "opacity-60 bg-muted/5 border-dashed" : isCurrent ? "border-primary shadow-lg scale-[1.02]" : "bg-muted/10 border-green-500/30"}`}>
                <CardHeader>
                  <CardTitle className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <span className="text-2xl">{phase.name}</span>
                    <span className="text-sm font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                      Timeline: {phase.expectedDurationWeeks[0]}-{phase.expectedDurationWeeks[1]} Weeks
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base mt-2 text-foreground/80">
                    {phase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                  
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Entry Requirements:</h4>
                    <ul className="space-y-2">
                      {phase.entryCriteria.map((criterion, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Exit Milestones:</h4>
                    <ul className="space-y-2">
                      {phase.exitCriteria.map((criterion, i) => (
                        <li key={i} className="flex items-start text-sm font-medium">
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                          ) : isCurrent ? (
                            <Circle className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <Lock className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                          )}
                          <span className={isCompleted ? "text-muted-foreground" : "text-foreground"}>
                            {criterion}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
