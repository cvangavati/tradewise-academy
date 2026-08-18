export type ReviewRating = "again" | "good" | "easy";

export const reviewIntervalsDays: Record<ReviewRating, number> = {
  again: 1,
  good: 3,
  easy: 7,
};

export function nextReviewAt(rating: ReviewRating, from = new Date()) {
  const date = new Date(from);
  date.setDate(date.getDate() + reviewIntervalsDays[rating]);
  return date.toISOString();
}
