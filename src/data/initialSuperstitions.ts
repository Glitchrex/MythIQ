import { Superstition } from '../types';

export const initialSuperstitions: Superstition[] = [
  {
    id: '1',
    title: 'Breaking a Mirror',
    backstory: 'In ancient Rome, it was believed that the soul regenerates every seven years. A mirror was thought to be a reflection of the soul, so breaking one meant damaging the soul and delaying its regeneration.',
    country: 'Italy',
    state: 'Rome',
    reasoning: 'The reflection is seen as a part of the self; damaging it is damaging the essence of the person.',
    personalExperience: 'My grandmother always covered mirrors during thunderstorms to prevent them from breaking.',
    votes: { truth: 124, myth: 842 },
    userComments: []
  },
  {
    id: '2',
    title: 'Walking Under a Ladder',
    backstory: 'A ladder leaning against a wall forms a triangle, which many cultures saw as a symbol of the Holy Trinity. Walking through it was seen as breaking the Trinity and inviting the devil.',
    country: 'Egypt',
    state: 'Cairo',
    reasoning: 'It is a sign of disrespect to the sacred geometry of the triangle.',
    personalExperience: 'I once walked under a ladder and tripped immediately after. Coincidence?',
    votes: { truth: 45, myth: 612 },
    userComments: []
  },
  {
    id: '3',
    title: 'Opening an Umbrella Indoors',
    backstory: 'Ancient Egyptians used umbrellas to protect themselves from the sun. Opening one in the shade (indoors) was seen as an insult to the Sun God, Ra.',
    country: 'Egypt',
    state: 'Alexandria',
    reasoning: 'It brings bad luck because it offends the natural order of light and protection.',
    personalExperience: 'My mom screams if I even touch an umbrella inside the house.',
    votes: { truth: 89, myth: 432 },
    userComments: []
  },
  {
    id: '4',
    title: 'Spilling Salt',
    backstory: 'Salt was once a very expensive and precious commodity. Spilling it was seen as a waste of wealth and an invitation to bad spirits. Throwing a pinch over the left shoulder is said to blind the devil.',
    country: 'Iraq',
    state: 'Sumer',
    reasoning: 'Salt is a preservative and a purifier; wasting it is seen as inviting decay.',
    personalExperience: 'I always throw a pinch over my shoulder, just in case.',
    votes: { truth: 156, myth: 234 },
    userComments: []
  }
];
