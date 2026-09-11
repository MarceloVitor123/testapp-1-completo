export interface PhaseProgress {
  xp: number;
  accuracy: number;
  time: number;
  completed: boolean;
}

export interface Profile {
  id: string;
  name: string;
  photo: string | null;
  xp: number;
  level: number;
  currentWorld: number;
  completedLessons: number;
  accuracy: number;
  studyTime: number;
  createdAt: string;

  phases: {
    fase1: PhaseProgress;
    fase2: PhaseProgress;
    fase3: PhaseProgress;
    fase4: PhaseProgress;
    fase5: PhaseProgress;
  };
}