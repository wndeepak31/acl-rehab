"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Flame, HeartPulse, Scale, TrendingUp, AlertTriangle, CheckCircle2, Lock } from "lucide-react"
import { generateTodaySession, calculateReturnToSport, MOCK_TRENDS } from "@/lib/progression-engine"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  const todaySession = generateTodaySession();
  const rtsData = calculateReturnToSport();
  
  const readinessColor = 
    todaySession.readiness.status === 'GREEN' ? 'text-green-500' :
    todaySession.readiness.status === 'YELLOW' ? 'text-yellow-500' : 'text-red-500';

  const readinessBg = 
    todaySession.readiness.status === 'GREEN' ? 'bg-green-500/10 border-green-500/20' :
    todaySession.readiness.status === 'YELLOW' ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20';

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recovery Dashboard</h1>
        <p className="text-muted-foreground mt-2">Day 78 Post-Op • Week 11</p>
      </div>

      {/* Readiness Banner */}
      <Card className={`border-2 ${readinessBg}`}>
        <CardContent className="flex items-center p-6 gap-4">
          <div className={`p-3 rounded-full bg-background/50 ${readinessColor}`}>
            {todaySession.readiness.status === 'GREEN' ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${readinessColor}`}>
              Readiness: {todaySession.readiness.status}
            </h3>
            <p className="text-sm text-muted-foreground">
              {todaySession.readiness.reasons.length > 0 
                ? todaySession.readiness.reasons.join(" ") 
                : "Recovering well. Ready for progression."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Phase & High-Level Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Current Phase</CardTitle>
            <CardDescription className="text-primary font-medium text-lg">{todaySession.phase.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{todaySession.phase.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Phase Progress</span>
                <span>~60%</span>
              </div>
              <Progress value={60} />
            </div>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <h4 className="text-sm font-semibold mb-2">Current Limiters to Phase 4:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2"><AlertTriangle className="h-3 w-3 text-yellow-500"/> Quadriceps LSI {`<`} 80% (Current: 68%)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500"/> Pain-free running fundamentals</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms */}
        <div className="space-y-6 flex flex-col justify-between">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pain Level</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">2 / 10</div>
              <p className="text-xs text-muted-foreground mt-1">-1 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Swelling</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">Mild</div>
              <p className="text-xs text-muted-foreground mt-1">Stable</p>
            </CardContent>
          </Card>
        </div>

        {/* Core Metrics */}
        <div className="space-y-6 flex flex-col justify-between">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current ROM</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">130°</div>
              <p className="text-xs text-muted-foreground mt-1">+5° from Wk 10</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Strength (LSI)</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">68%</div>
              <p className="text-xs text-muted-foreground mt-1">Target: &gt;80%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Strength Trend (LSI)</CardTitle>
            <CardDescription>Quadriceps symmetry over last 5 weeks</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TRENDS.strengthLSI}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="week" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[40, 100]} stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }} />
                <Line type="monotone" dataKey="lsi" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ROM Trend</CardTitle>
            <CardDescription>Knee flexion progression</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TRENDS.rom}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="week" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[90, 140]} stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}°`} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }} />
                <Line type="monotone" dataKey="flexion" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Today's Session */}
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5 pb-6 border-b border-primary/10">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Today's Session</CardTitle>
              <CardDescription className="text-sm mt-2 max-w-2xl">
                <span className="font-semibold text-primary">Goal:</span> {todaySession.sessionGoal}
              </CardDescription>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-muted-foreground">Est. Time</span>
              <p className="text-xl font-bold">{todaySession.estimatedDuration} min</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {todaySession.blocks.map((block, idx) => (
            <div key={idx} className="border-b last:border-0 border-border/50">
              <div className="px-6 py-3 bg-muted/30 flex justify-between items-center">
                <h3 className="font-semibold">{block.name}</h3>
                <span className="text-xs text-muted-foreground">{block.duration}</span>
              </div>
              <div className="px-6 py-4 space-y-6">
                {block.exercises.map((ex, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <p className="font-bold text-lg">{ex.name}</p>
                      <p className="text-sm text-primary font-medium">{ex.sets} sets × {ex.reps}</p>
                      <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="bg-secondary px-2 py-1 rounded">Load: {ex.load}</span>
                        <span className="bg-secondary px-2 py-1 rounded">Target RPE: {ex.targetRPE}</span>
                      </div>
                    </div>
                    <div className="md:col-span-8 bg-background border rounded-lg p-3 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Why you're doing it</span>
                          <p className="mt-1">{ex.rationale}</p>
                        </div>
                        {/* @ts-ignore - Some exercises might not have a progressionTarget defined yet */}
                        {(ex as any).progressionTarget && (
                          <div>
                            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Progression Note</span>
                            <p className="mt-1 text-primary">{(ex as any).progressionTarget}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="bg-primary/5 border-t border-primary/10 p-6 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Log your RPE and pain after the session to drive tomorrow's progression.</p>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors">
            Start Session
          </button>
        </CardFooter>
      </Card>

      {/* Return to Sport Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Return to Sport Readiness</CardTitle>
          <CardDescription>Criteria-based evaluation for unrestricted activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rtsData.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    {item.status === 'Locked' && <Lock className="h-4 w-4 text-muted-foreground" />}
                    {item.status === 'Warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {item.status === 'Good' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {item.category}
                  </h4>
                  {item.score > 0 && <span className="font-bold">{item.score}%</span>}
                </div>
                {item.score > 0 && <Progress value={item.score} className="h-2 mb-3" />}
                <p className="text-xs text-muted-foreground mt-auto">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
