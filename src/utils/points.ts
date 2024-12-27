export const calculateTaskPoints = (task: {
  completed: boolean;
  subtasks: { completed: boolean }[];
}): number => {
  if (!task.completed) return 0;
  
  const basePoints = 10;
  const subtaskPoints = task.subtasks.filter(st => st.completed).length * 2;
  
  return basePoints + subtaskPoints;
};

export const getNextBadgeRequirement = (currentPoints: number): number => {
  const levels = [100, 250, 500, 1000, 2500, 5000];
  return levels.find(points => points > currentPoints) ?? Infinity;
};

export const formatPoints = (points: number): string => {
  return new Intl.NumberFormat().format(points);
};