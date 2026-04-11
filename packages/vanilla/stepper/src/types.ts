export type StepState = "pending" | "active" | "completed";

export interface StepChangeDetail {
  value: number;
  prev: number;
}

export interface StepCompleteDetail {
  steps: number;
}
