import { fetchTodayWorkout } from "@/actions/workoutEngine";
import TodayClient from "./TodayClient";

export default async function TodayPage() {
  const data = await fetchTodayWorkout("athlete@example.com");

  return (
    <TodayClient data={data} />
  );
}
