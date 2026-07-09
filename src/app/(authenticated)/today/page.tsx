import { fetchTodayWorkout } from "@/actions/workoutEngine";
import TodayClient from "./TodayClient";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const data = await fetchTodayWorkout("athlete@example.com");

  return (
    <TodayClient data={data} />
  );
}
