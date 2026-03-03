export interface Superstition {
  id: string;
  title: string;
  backstory: string;
  origin: string;
  believers: string;
  reasoning: string;
  personalExperience?: string;
  votes: {
    truth: number;
    myth: number;
  };
  userComments: {
    type: 'truth' | 'myth';
    comment: string;
    timestamp: number;
  }[];
}

export type NewSuperstition = Omit<Superstition, 'id' | 'votes' | 'userComments'>;
