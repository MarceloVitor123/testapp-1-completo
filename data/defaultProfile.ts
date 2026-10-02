import { Profile } from "../models/Profile";

export const defaultProfile: Profile = {
  id: "profile-001",
  name: "",
  photo: null,
  xp: 0,
  level: 1,
  currentWorld: 1,
  completedLessons: 0,
  accuracy: 0,
  studyTime: 0,
  createdAt: new Date().toISOString(),

  phases: {
    fase1: {
      xp: 0,
      accuracy: 0,
      time: 0,
      completed: false,
      attempts: 0,
    },
    fase2: {
      xp: 0,
      accuracy: 0,
      time: 0,
      completed: false,
      attempts: 0,
    },
    fase3: {
      xp: 0,
      accuracy: 0,
      time: 0,
      completed: false,
      attempts: 0,
    },
    fase4: {
      xp: 0,
      accuracy: 0,
      time: 0,
      completed: false,
      attempts: 0,
    },
    fase5: {
      xp: 0,
      accuracy: 0,
      time: 0,
      completed: false,
      attempts: 0,
    },
  }
}
    /*
     fase6: {
      xp: 0,
      accuracy: 0,
      time: 0,
      completed: false,
      attempts: 0,
    },
  },
};
/*quando as fases cresserem, basta adicionar mais fases no objeto phases, 
seguindo o mesmo padrão das fases existentes.
  faseX: {
    xp: 0,
    accuracy: 0,
    time: 0,
    completed: false,
  },
*/