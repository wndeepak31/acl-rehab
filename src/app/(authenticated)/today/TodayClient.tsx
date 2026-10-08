"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlayCircle, Info, Activity, Flame, Scale, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { generateWeeklySchedule, evaluateReadiness } from "@/lib/progression-engine";

export default function TodayClient({ data }: { data: any }) {
  const weeklySchedule = generateWeeklySchedule();
  const readiness = evaluateReadiness({ pain: 2, swelling: 'MILD', sleep: 'GOOD' }); // Hardcoded for demo
  
  const [selectedDayIdx, setSelectedDayIdx] = useState(0); // Default to Monday
  const todaySession = weeklySchedule[selectedDayIdx];

  const [completedEx, setCompletedEx] = useState<string[]>([]);
  const [expandedEx, setExpandedEx] = useState<string | null>(null);
  
  // Daily Tracking
  const [pain, setPain] = useState(2);
  const [swelling, setSwelling] = useState("MILD");
  const [rpe, setRpe] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleExercise = (name: string) => {
    if (completedEx.includes(name)) {
      setCompletedEx(completedEx.filter(e => e !== name));
    } else {
      setCompletedEx([...completedEx, name]);
      if (expandedEx === name) setExpandedEx(null);
    }
  };

  const toggleExpand = (name: string) => {
    if (expandedEx === name) setExpandedEx(null);
    else setExpandedEx(name);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Session logged! Your progression engine will adjust tomorrow's load based on this data.");
    }, 1000);
  };

  const totalExercises = todaySession.blocks.reduce((acc, b) => acc + b.exercises.length, 0);
  const progressPercent = totalExercises > 0 ? Math.round((completedEx.length / totalExercises) * 100) : 100;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      
      {/* HEADER & WEEK SELECTOR */}
      <div className="flex flex-col gap-6 border-b border-primary/20 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Weekly Program</h1>
            <p className="text-lg text-primary font-medium mt-1">Week 11 • Phase 3: Strength</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">Session Progress</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{progressPercent}%</span>
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-muted/20" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * progressPercent) / 100} className="text-primary transition-all duration-500 ease-in-out" />
              </svg>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex overflow-x-auto pb-2 gap-2 snap-x">
          {weeklySchedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedDayIdx(idx); setCompletedEx([]); setExpandedEx(null); }}
              className={`snap-start whitespace-nowrap px-6 py-3 rounded-lg font-bold transition-all ${
                selectedDayIdx === idx 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="text-sm opacity-80">{day.day}</div>
              <div>{day.type.split(' ')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SESSION OVERVIEW */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">{todaySession.day}: {todaySession.type}</h2>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Focus: {todaySession.focus}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: WORKOUT BLOCKS */}
        <div className="lg:col-span-8 space-y-8">
          {todaySession.blocks.length === 0 ? (
            <Card className="bg-muted/30 border-dashed border-2 p-12 text-center">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold text-muted-foreground">Rest Day</h3>
              <p className="text-muted-foreground mt-2">Recover and prepare for tomorrow.</p>
            </Card>
          ) : (
            todaySession.blocks.map((block, bIdx) => (
              <div key={bIdx} className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary/20 pb-2">
                  <h2 className="text-xl font-bold">{block.name}</h2>
                  <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">{block.duration}</span>
                </div>
                
                <div className="space-y-3">
                  {block.exercises.map((ex, eIdx) => {
                    const isCompleted = completedEx.includes(ex.name);
                    const isExpanded = expandedEx === ex.name;
                    
                    return (
                      <Card key={eIdx} className={`overflow-hidden transition-all duration-300 border-l-4 ${isCompleted ? 'border-l-green-500 opacity-60' : 'border-l-primary hover:border-primary/50'} `}>
                        {/* Condensed Header */}
                        <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(ex.name)}>
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleExercise(ex.name); }}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-500 text-black' : 'border-muted-foreground hover:border-primary'}`}
                            >
                              {isCompleted && <CheckCircle2 className="w-5 h-5" />}
                            </button>
                            <div>
                              <h3 className={`font-bold text-lg ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>{ex.name}</h3>
                              <p className="text-sm text-primary font-medium">{ex.sets} sets × {ex.reps} • {ex.load}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </Button>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="bg-muted/10 border-t border-border/50 px-6 py-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              
                              {/* Video / Visual Placeholder */}
                              <div className="w-full aspect-video bg-black/40 rounded-lg flex flex-col items-center justify-center border border-white/10 group cursor-pointer hover:bg-black/60 transition-all">
                                <PlayCircle className="w-12 h-12 text-primary/70 group-hover:text-primary transition-colors" />
                                <span className="text-xs text-muted-foreground mt-2">View Demo</span>
                              </div>

                              {/* Details */}
                              <div className="space-y-4">
                                <div>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target RPE</span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                      <div className="h-full bg-primary" style={{ width: `${(ex.targetRPE / 10) * 100}%` }} />
                                    </div>
                                    <span className="font-bold">{ex.targetRPE}/10</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1"><Info className="w-3 h-3"/> Why you're doing it</span>
                                  <p className="text-sm mt-1">{ex.rationale}</p>
                                </div>
                                
                                {ex.progressionTarget && (
                                  <div className="bg-primary/5 border border-primary/20 p-3 rounded-md">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Progression Note</span>
                                    <p className="text-sm mt-1 text-primary/90">{ex.progressionTarget}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: POST-SESSION TRACKING */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="sticky top-6 border-2 border-primary/20 bg-gradient-to-b from-background to-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Session Review</CardTitle>
              <CardDescription>Log your data to fuel the progression engine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Session RPE */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-bold flex items-center gap-2"><Scale className="w-4 h-4 text-primary"/> Overall RPE</label>
                  <span className="font-bold text-primary">{rpe} / 10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={rpe} onChange={e => setRpe(parseInt(e.target.value))}
                  className="w-full accent-primary"
                  disabled={todaySession.blocks.length === 0}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Very Easy</span>
                  <span>Max Effort</span>
                </div>
              </div>

              {/* Knee Pain */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-bold flex items-center gap-2"><Flame className="w-4 h-4 text-red-500"/> Knee Pain</label>
                  <span className="font-bold text-red-500">{pain} / 10</span>
                </div>
                <input 
                  type="range" min="0" max="10" 
                  value={pain} onChange={e => setPain(parseInt(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              {/* Swelling */}
              <div className="space-y-3">
                <label className="text-sm font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500"/> Morning Effusion</label>
                <div className="grid grid-cols-2 gap-2">
                  {["NONE", "MILD", "MODERATE", "SEVERE"].map(s => (
                    <Button 
                      key={s} 
                      onClick={() => setSwelling(s)}
                      variant={swelling === s ? "default" : "outline"} 
                      className={`text-xs ${swelling === s ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-900/50 hover:bg-blue-900/20'}`}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button 
                  onClick={handleSave} 
                  disabled={isSubmitting || (todaySession.blocks.length > 0 && completedEx.length === 0)} 
                  className="w-full h-12 text-lg font-bold"
                >
                  {isSubmitting ? "Processing..." : "Complete Check-in"}
                </Button>
                {todaySession.blocks.length > 0 && completedEx.length === 0 && <p className="text-xs text-center text-muted-foreground mt-3">Complete at least one exercise to finish the session.</p>}
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
