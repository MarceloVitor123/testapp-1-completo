export function calculateResult({
  total,
  correct,
  startTime,
  endTime,
}: {
  total: number;
  correct: number;
  startTime: number;
  endTime: number;
}) {
  const accuracy = total > 0 ? (correct / total) * 100 : 0;
  const timeSpent = endTime - startTime;

  const xp = Math.round(correct * 10 + Math.max(0, 30 - timeSpent / 1000));

  return {
    accuracy,
    timeSpent,
    xp,
  };
}