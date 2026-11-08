import { EATRRITE_AVAILABLE_TIMES } from "@/features/appointment/constants/eatrrite-available-times";
import { weeklyToSchedule } from "@/features/appointment/utils/scheduleWeekly";

// The schedule page starts from Eat Rrite's real working hours.
export const SEED_SCHEDULE = weeklyToSchedule(EATRRITE_AVAILABLE_TIMES);
