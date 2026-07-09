import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Flame, HeartPulse, Scale, TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recovery Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back. You are on Day 78 of your recovery.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2 row-span-2 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Phase 3: Strength</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="relative flex items-center justify-center h-48 w-48 rounded-full border-[8px] border-primary/20">
              {/* Fake Progress Ring */}
              <div className="absolute inset-0 rounded-full border-[8px] border-primary" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)" }} />
              <div className="text-center">
                <span className="text-4xl font-bold">43%</span>
                <p className="text-sm text-muted-foreground mt-1">Recovered</p>
              </div>
            </div>
            <div className="flex gap-4 mt-8 w-full justify-around text-center">
              <div>
                <p className="text-sm text-muted-foreground">Week</p>
                <p className="text-xl font-semibold">11</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Post-Op</p>
                <p className="text-xl font-semibold">78</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pain Level</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">2 / 10</div>
            <p className="text-xs text-muted-foreground mt-1">-1 from yesterday</p>
            <Progress value={20} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Swelling</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">Mild</div>
            <p className="text-xs text-muted-foreground mt-1">Consistent with last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current ROM</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120° Flexion</div>
            <p className="text-xs text-muted-foreground mt-1">+5° from last week</p>
            <Progress value={85} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strength Score</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65 LSI</div>
            <p className="text-xs text-muted-foreground mt-1">Limb Symmetry Index</p>
            <Progress value={65} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Workout</CardTitle>
            <CardDescription>Morning Session (3 Exercises)</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Quad Set</p>
                  <p className="text-sm text-muted-foreground">3 sets x 15 reps</p>
                </div>
                <div className="h-6 w-6 rounded-full border-2 border-primary/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
              </li>
              <li className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Heel Slide</p>
                  <p className="text-sm text-muted-foreground">3 sets x 10 reps</p>
                </div>
                <div className="h-6 w-6 rounded-full border-2 border-primary/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
              </li>
              <li className="flex items-center justify-between pb-2">
                <div>
                  <p className="font-medium">Leg Press</p>
                  <p className="text-sm text-muted-foreground">4 sets x 8 reps</p>
                </div>
                <div className="h-6 w-6 rounded-full border-2 border-primary/20" />
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recovery Goals</CardTitle>
            <CardDescription>Track your readiness for return to sport</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>Return To Running</span>
                <span>80%</span>
              </div>
              <Progress value={80} />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>Return To Sport</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="pt-4 mt-4 border-t">
              <p className="text-sm text-muted-foreground">Next Milestone: Unlock Running</p>
              <p className="text-xs text-muted-foreground mt-1">Requires 80 LSI and 130° Flexion</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
