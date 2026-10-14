export type PoemMood = "Tender" | "Longing" | "Grief" | "Joy" | "Anger" | "Wonder" | "Unsorted";

export type PaperVariant = "sticky" | "torn" | "letter" | "postcard" | "folded" | "plain";

export type Poem = {
  id: number;
  title: string;
  excerpt: string;
  fullText: string;
  mood: PoemMood;
  date: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  variant: PaperVariant;
};

const moodColors: Record<PoemMood, string> = {
  Tender: "#f0d9d6",
  Longing: "#dce5ef",
  Grief: "#e7def0",
  Joy: "#f1e7bd",
  Anger: "#e6d4bd",
  Wonder: "#dce6d8",
  Unsorted: "#fffdf8",
};

const poems: Omit<Poem, "variant">[] = [
  { id: 1, title: "people who remember me", excerpt: "there are people who still know me", fullText: "there are people who still know me\nas someone i don\u2019t recognise anymore.\nthey remember the old haircut,\nthe stupid joke i always made,\nthe person i was trying so hard to impress.\nthey say my name like nothing has changed.\nand for a second, i am seventeen again,\nstanding exactly where they remember me.\nit\u2019s strange how growing up\ndoesn\u2019t happen equally\ninside everyone else\u2019s memory.\nsomewhere in their heads,\ni am still becoming who i am now.\nmaybe that\u2019s why\nold friends feel a little unfamiliar.\nthey aren\u2019t meeting a stranger.\nthey\u2019re meeting someone\ni haven\u2019t been for years.\n~shreeraj", mood: "Wonder", date: "2024", x: -420, y: -280, rotation: -2, width: 210 },
  { id: 2, title: "three days", excerpt: "It\u2019s barely been three days,", fullText: "It\u2019s barely been three days,\nand already the quiet has a shape.\nI keep finding your absence\nin the places I used to put my hands.\n~shreeraj", mood: "Joy", date: "2024", x: -180, y: -360, rotation: 1.5, width: 190 },
  { id: 3, title: "becoming strangers", excerpt: "there wasn\u2019t a moment", fullText: "there wasn\u2019t a moment\nwhen we decided.\nwe just kept walking\nin opposite directions\nuntil the path forked\nand neither of us looked back.\n~shreeraj", mood: "Grief", date: "2024", x: 40, y: -420, rotation: -1, width: 200 },
  { id: 4, title: "does love live here?", excerpt: "the garden still waits,", fullText: "the garden still waits,\nthough no one waters it anymore.\nsome things continue\nout of habit.\n~shreeraj", mood: "Grief", date: "2024", x: 260, y: -300, rotation: 2, width: 195 },
  { id: 5, title: "allow me this much", excerpt: "i know we'll never be together,", fullText: "i know we'll never be together,\nbut allow me this much:\nto remember the way\nyou said my name\nas if it were a place\nyou might still visit.\n~shreeraj", mood: "Longing", date: "2024", x: 480, y: -380, rotation: -2.5, width: 205 },
  { id: 6, title: "three feet away", excerpt: "i wonder how many strangers,", fullText: "i wonder how many strangers\nhave stood exactly where you stood,\nthree feet away,\nand never known\nthey were almost you.\n~shreeraj", mood: "Wonder", date: "2024", x: -520, y: -80, rotation: 1, width: 185 },
  { id: 7, title: "no bad blood", excerpt: "there was no last conversation,", fullText: "there was no last conversation.\nwe simply stopped\nbeing in the same weather.\n~shreeraj", mood: "Grief", date: "2024", x: -300, y: 40, rotation: -1.5, width: 190 },
  { id: 8, title: "laapata", excerpt: "sheher se poochha mera pata,", fullText: "sheher se poochha mera pata,\nlogon ne kandhe uchkaaye.\nmain khud bhi nahi jaanta\nkahan kho gaya hoon.\n~shreeraj", mood: "Grief", date: "2024", x: -60, y: 120, rotation: 2.5, width: 200 },
  { id: 9, title: "almost her", excerpt: "i saw a face today, not hers, but close enough,", fullText: "i saw a face today,\nnot hers, but close enough\nthat my chest did the old thing\nfor half a second.\nthen the light changed\nand it was only a stranger again.\n~shreeraj", mood: "Longing", date: "2024", x: 180, y: 60, rotation: -2, width: 210 },
  { id: 10, title: "Unlovable", excerpt: "I crave love", fullText: "I crave love\nthe way a locked room\ncraves a window.\nnot violently.\njust enough\nto remember it exists.\n~shreeraj", mood: "Longing", date: "2024", x: 400, y: 140, rotation: 1.2, width: 195 },
];

const variants: PaperVariant[] = ["folded", "sticky", "torn", "letter", "postcard", "plain"];

export const poemArchive: Poem[] = poems.map((poem, i) => ({
  ...poem,
  variant: variants[i % variants.length],
}));

export const moodLabels = Object.keys(moodColors) as PoemMood[];
