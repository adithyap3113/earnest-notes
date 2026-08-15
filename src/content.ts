/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.
 *  This is the only file you need to touch to change the words.
 *  Tip: wrap any phrase in *asterisks* to emphasise it,
 *  e.g. "I just want us to *understand each other*."
 * ─────────────────────────────────────────────────────────────
 */

export const opening = {
  title: "I couldn't explain this properly through messages.",
  subtitle: "So I made this for you instead.",
  button: "Read this slowly →",
};

export const introduction = [
  "There are some things I want to say, but whenever I try to text you, I don't know how to put everything into words.",
  "So instead of sending you another confusing message, I wanted to explain everything here — properly, honestly, and without rushing.",
];

export const understand = {
  title: "What I want you to understand",
  lines: [
    "I'm not trying to fight with you.",
    "I'm not trying to blame you.",
    "I'm not trying to make you feel guilty.",
    "I just want you to understand what is going on in my mind and what I have been feeling.",
  ],
};

/**
 * YOUR OWN MESSAGES — shown exactly as written, nothing rewritten.
 * `highlight: true` makes a message a larger, glowing card.
 * A `note` entry is a quiet transition line between parts.
 */
export type MessageItem =
  | { type: "message"; text: string; highlight?: boolean }
  | { type: "note"; text: string };

export const highlightedTitle = "My important messages";

export const messagesIntro = [
  "These aren't words I wrote perfectly.",
  "They're just the things I was trying to say.",
];

export const highlightedMessages: MessageItem[] = [
  // PART 1
  { type: "message", text: "Naa eathuku story vachan kuda unakku thearila lekha....." },
  {
    type: "message",
    text: "Eadho soldraaaa laaaa..... intha day oru nalla story poda mudiyathu ahh nuu.....nee first ennaku msg panniyyaa lekha....",
  },
  { type: "message", text: "Atta illa naaa...nee thaa call pannuveaaa....." },
  { type: "message", text: "Aana....ippa pana matraaa..." },
  { type: "message", text: "Attha irukangala illayaa nu naanum ah thaaa keakanum pola....." },
  { type: "message", text: "Nee thaa lekha maritaaaaa", highlight: true },
  {
    type: "message",
    text: "Naa thaaa change panniteaa.....unna koraa sollitea irukan nu soldraa laaaa....",
    highlight: true,
  },
  { type: "message", text: "Naa Enna Unna koraa sonneaa....", highlight: true },
  {
    type: "message",
    text: "Munnadi nee....eathu ella panniyoooo....ippa athu ella pandrathu illaaaaa.......athu unta ketaaaa",
  },
  { type: "message", text: "Unna koraa soldran...." },

  // TRANSITION
  { type: "note", text: "Maybe I didn't explain it properly..." },

  // PART 2
  {
    type: "message",
    text: "Naa enna Ketan...... mrng laa irundhu oru msg kuda ilaa.... Avolo wrk ahh nu ketann.....ithu kuda keaka kudathu ahhh",
  },
  { type: "message", text: "Eadho soldraa... inikumm yen ippadi pandraa nuuuu.... enna pannea" },
  {
    type: "message",
    text: "Call pannadrathu...nee thaaa pannanum.....naa epadi pannuves......",
    highlight: true,
  },
  { type: "message", text: "Nee thaa sonna.... oorulaa ellarumea unna theriyum nuu" },
  { type: "message", text: "Athu mattu illamaa... attha illayaa nu naa thaaa ketannn" },
  {
    type: "message",
    text: "Neeyaa thaa call pannuven.... attha illa naa.....ippa thaa eadhoo pudhusu ahh pandraa",
    highlight: true,
  },
];

export const messagesOutro = {
  lines: ["That's what I was trying to say.", "I just wanted you to understand me."],
  focus: "Whenever you're ready, I want to understand you too. ❤️",
};


export const feel = {
  title: "What I feel",
  lines: [
    "Sometimes I feel like you're not really understanding what I'm trying to say.",
    "When I say something, there is usually a reason behind it. Even when I don't explain myself properly, it doesn't mean I don't care.",
    "Sometimes I become quiet because I don't know how to explain what I'm feeling. Sometimes I say things badly. Sometimes I overthink.",
    "But behind all of that, there is one simple thing:",
  ],
  focus: "I don't want us to misunderstand each other.",
};

export const need = {
  title: "What I need from you",
  lines: [
    "I don't need you to agree with everything I say.",
    "I don't expect you to understand everything immediately.",
    "I just want you to listen to me and try to understand what I actually mean before assuming what I meant.",
    "And I promise I'll try to do the same for you.",
  ],
};

export const about = {
  title: "About us",
  lines: [
    "I care about you. That's exactly why these things affect me so much.",
    "If I didn't care, I wouldn't be trying this hard to explain myself.",
    "I don't want a relationship where we keep fighting because of misunderstandings.",
    "I want us to be able to talk honestly, understand each other, and solve things together.",
  ],
};

export const final = {
  lines: [
    "I'm not making this website because I want a perfect answer from you.",
    "I'm making it because I couldn't say all of this properly through a chat.",
    "Take your time.",
    "Read everything.",
    "And when you're ready, I just want you to tell me what you understood, what you felt, and what you want me to understand too.",
    "I don't want to win an argument.",
  ],
  focus: "I want us to understand each other. ❤️",
};

export const ending = {
  button: "I've read everything ❤️",
  thanks: [
    "Thank you for reading everything.",
    "Whenever you're ready, talk to me. That's all I want.",
  ],
};

export const meta = {
  title: "Something I couldn't say in a message",
  description:
    "A quiet letter — some things I couldn't explain properly over text, written down slowly and honestly.",
};
