export type PoemGenre = "melancholy" | "nature" | "love" | "observations";

export type Poem = {
  id: number;
  title: string;
  excerpt: string;
  fullText: string;
  genre: PoemGenre;
  date: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  color: string;
};

const palettes: Record<PoemGenre, string> = {
  melancholy: "#A8B5C2",
  nature: "#BBC4A7",
  love: "#D59A8E",
  observations: "#E3D5C4",
};

const poems: Omit<Poem, "color">[] = [
  { id: 1, title: "Low Tide", excerpt: "The harbor keeps its blue in a locked room.", fullText: "The harbor keeps its blue\nin a locked room.\n\nAt dusk, every rope\nremembers a hand.\n\nI come back empty\nand leave the door open.", genre: "melancholy", date: "04.18.24", x: -850, y: -420, rotation: -2.2, width: 190 },
  { id: 2, title: "After Rain", excerpt: "A green arithmetic begins beneath the stones.", fullText: "A green arithmetic begins\nbeneath the stones.\n\nMoss counts the hours\nwith a patient mouth.\n\nThe garden is not early.\nIt is simply still here.", genre: "nature", date: "05.02.24", x: -640, y: -610, rotation: 1.8, width: 184 },
  { id: 3, title: "Small Hours", excerpt: "You turn the bedside lamp toward my shoulder.", fullText: "You turn the bedside lamp\ntoward my shoulder,\nwhere the night has gathered\nlike a small animal.\n\nNeither of us names it.\nBoth of us stay.", genre: "love", date: "05.11.24", x: -390, y: -520, rotation: -1.4, width: 196 },
  { id: 4, title: "Field Note 07", excerpt: "The crow edits the morning down to one black line.", fullText: "The crow edits the morning\ndown to one black line.\n\nA gate. A wire.\nThe unsaid between two fields.\n\nI write it all down\nand call this looking.", genre: "observations", date: "05.29.24", x: -115, y: -680, rotation: 2.8, width: 184 },
  { id: 5, title: "Weather Report", excerpt: "There is a kind of weather that happens inside names.", fullText: "There is a kind of weather\nthat happens inside names.\n\nYour name: a warm front\narriving over the kitchen.\n\nMy name: the window\nleft open after.", genre: "melancholy", date: "06.03.24", x: 170, y: -490, rotation: -3, width: 190 },
  { id: 6, title: "Instructions for Moss", excerpt: "Keep low. Hold the stone. Become a softer green.", fullText: "Keep low. Hold the stone.\nBecome a softer green.\n\nDo not hurry the wall.\nDo not ask the rain\nwhat it intends to make of you.", genre: "nature", date: "06.17.24", x: 430, y: -650, rotation: 1.5, width: 198 },
  { id: 7, title: "The Blue Hour", excerpt: "Even the windows have a way of looking away.", fullText: "Even the windows\nhave a way of looking away.\n\nAt blue hour, the room\nturns its face to the street.\n\nI practice being here\nwithout being seen.", genre: "melancholy", date: "07.08.24", x: 730, y: -360, rotation: 2.1, width: 184 },
  { id: 8, title: "Soft Evidence", excerpt: "Your hand on the table, the only proof of gravity.", fullText: "Your hand on the table,\nthe only proof of gravity.\n\nOutside, the trees\nkeep losing their argument\nwith the wind.\n\nInside, we do not move.", genre: "love", date: "07.14.24", x: 920, y: -580, rotation: -1.8, width: 196 },
  { id: 9, title: "Inventory of Light", excerpt: "One brass key, three apricots, the hour before sleep.", fullText: "One brass key.\nThree apricots.\nThe hour before sleep.\n\nA chair holding the shape\nof someone who just left.\n\nLight, in its usual disguise.", genre: "observations", date: "07.30.24", x: -980, y: -90, rotation: 3.2, width: 194 },
  { id: 10, title: "A Door Left Open", excerpt: "The house cools itself with the breath of the dark.", fullText: "The house cools itself\nwith the breath of the dark.\n\nSomewhere, a hinge\npractices its small language.\n\nI do not close the door.\nI do not ask why.", genre: "melancholy", date: "08.04.24", x: -680, y: 40, rotation: -2.5, width: 190 },
  { id: 11, title: "Seed Memory", excerpt: "Under the palm, a future with no interest in clocks.", fullText: "Under the palm, a future\nwith no interest in clocks.\n\nThe seed is a dark vowel\nheld in the mouth of soil.\n\nWait, says the root.\nWait, and make a world.", genre: "nature", date: "08.19.24", x: -360, y: 120, rotation: 1.2, width: 196 },
  { id: 12, title: "Love Letter, Unsent", excerpt: "I folded the morning until it fit beneath your door.", fullText: "I folded the morning\nuntil it fit beneath your door.\n\nThe sun made a thin envelope\nof every room.\n\nI wrote your name on the back\nand never sent it.", genre: "love", date: "09.01.24", x: -85, y: -20, rotation: -1.9, width: 202 },
  { id: 13, title: "At the Bus Stop", excerpt: "Three strangers make a temporary country of the rain.", fullText: "Three strangers make\na temporary country of the rain.\n\nWe share the roof.\nWe share the silence.\n\nWhen the bus comes,\nwe dissolve our borders.", genre: "observations", date: "09.12.24", x: 210, y: 80, rotation: 2.4, width: 190 },
  { id: 14, title: "Unlearning Winter", excerpt: "The body takes a while to believe the window.", fullText: "The body takes a while\nto believe the window.\n\nA pale branch.\nA bird refusing the old map.\n\nThen one green thing\nanswers from the ground.", genre: "nature", date: "10.03.24", x: 500, y: 10, rotation: -2.7, width: 198 },
  { id: 15, title: "Blue Thread", excerpt: "I keep finding you in the seams of ordinary things.", fullText: "I keep finding you\nin the seams of ordinary things:\n\na blue thread in the laundry,\nyour cup beside the sink,\nthe particular quiet\nof the room after laughter.", genre: "love", date: "10.22.24", x: 790, y: 120, rotation: 1.6, width: 204 },
  { id: 16, title: "The Shape of Leaving", excerpt: "A coat on a hook is a person reduced to weather.", fullText: "A coat on a hook\nis a person reduced to weather.\n\nThe sleeves remember shoulders.\nThe pockets keep their small dark rooms.\n\nBy morning, even the hook\nwill have forgotten.", genre: "melancholy", date: "11.05.24", x: 1030, y: -40, rotation: -1.3, width: 200 },
  { id: 17, title: "Museum of Almost", excerpt: "Here is the cup we nearly broke, the word we nearly said.", fullText: "Here is the cup\nwe nearly broke.\n\nHere is the word\nwe nearly said.\n\nThe museum is small,\nbut the lights stay on all night.", genre: "observations", date: "11.21.24", x: -900, y: 430, rotation: 2.6, width: 198 },
  { id: 18, title: "Root System", excerpt: "Everything tender is learning to travel underground.", fullText: "Everything tender\nis learning to travel underground.\n\nThe tree does not explain\nits invisible architecture.\n\nIt only lifts the pavement\nwith what it has survived.", genre: "nature", date: "12.02.24", x: -580, y: 580, rotation: -2, width: 200 },
  { id: 19, title: "Postscript", excerpt: "What remains is not the story, but the warmth it left in the chair.", fullText: "What remains is not the story,\nbut the warmth it left in the chair.\n\nA little afterimage.\nA little unspent breath.\n\nEnough to begin again,\nif beginning is what you mean.", genre: "love", date: "12.19.24", x: -220, y: 480, rotation: 1.8, width: 204 },
  { id: 20, title: "Night Garden", excerpt: "The flowers close their hands around whatever the moon forgets.", fullText: "The flowers close their hands\naround whatever the moon forgets.\n\nA white moth moves\nthrough the dark like punctuation.\n\nI stand at the gate\nand let the night finish speaking.", genre: "nature", date: "01.08.25", x: 130, y: 560, rotation: -2.4, width: 202 },
  { id: 21, title: "Counterpoint", excerpt: "The kettle sings; the radiator answers in a lower key.", fullText: "The kettle sings.\nThe radiator answers\nin a lower key.\n\nThis is how the room\nkeeps its conversation\nwhen we have gone quiet.", genre: "observations", date: "01.26.25", x: 480, y: 430, rotation: 2.3, width: 190 },
  { id: 22, title: "The Long Way Home", excerpt: "I took the streets that kept your shadow longest.", fullText: "I took the streets\nthat kept your shadow longest.\n\nPast the closed florist,\nthe cinema with no sign,\nthe river carrying night\nout toward the sea.", genre: "melancholy", date: "02.10.25", x: 820, y: 590, rotation: -1.7, width: 200 },
  { id: 23, title: "Common Ground", excerpt: "A hand reaches for the same bowl of cherries as another hand.", fullText: "A hand reaches\nfor the same bowl of cherries\nas another hand.\n\nWe laugh, and the room\nbecomes briefly exact.\n\nNo one is alone in the red.", genre: "love", date: "02.28.25", x: 1080, y: 420, rotation: 1.1, width: 198 },
  { id: 24, title: "Field Guide to Silence", excerpt: "Listen for the space the sparrow leaves behind.", fullText: "Listen for the space\nthe sparrow leaves behind.\n\nIt is not empty.\nIt is the shape of attention\nwhen attention lets go.", genre: "observations", date: "03.07.25", x: 40, y: 860, rotation: -2.8, width: 194 },
  { id: 25, title: "Warm Front", excerpt: "By noon, the whole street is holding its face to the sun.", fullText: "By noon, the whole street\nis holding its face to the sun.\n\nThe windows brighten.\nThe pavement loosens.\n\nEven the old walls\nseem willing to be touched.", genre: "nature", date: "03.21.25", x: -330, y: 820, rotation: 2.2, width: 198 },
  { id: 26, title: "Familiar Distance", excerpt: "We waved from opposite sides of the same afternoon.", fullText: "We waved from opposite sides\nof the same afternoon.\n\nBetween us, a field of glass\nheld the weather still.\n\nI could almost hear\nyour life continuing.", genre: "melancholy", date: "04.01.25", x: -760, y: 780, rotation: -1.6, width: 198 },
];

export const poemArchive: Poem[] = poems.map((poem) => ({ ...poem, color: palettes[poem.genre] }));

export const genreLabels: Record<PoemGenre, string> = {
  melancholy: "melancholy",
  nature: "nature / growth",
  love: "love / passion",
  observations: "observations",
};
