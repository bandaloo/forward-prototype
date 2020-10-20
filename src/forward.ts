import ArtMaker, { Rand } from "art-maker";
import { DialogueManager, Store, template } from "./dialogue";

const artMaker = new ArtMaker(128);

//ijhxlzqt (seed for the alabaster white platform)
//mjfaivcm (cool swirl)
//yxcmyspo (calming baubles)
//tffpepaa (soft radial)
//sirfipcv (portal to green world)
//xhvlluag (swirly red)
//bvqrguwx (pink rising squares)
//zqfxjnru (bubbling lines)
//krvdqlql (harsh vignette with red center)
//kqnnhnju (blobby pink)
//lgudjfdv (neon displaced squares)
//fuhsoyip (dark boiling lines)
//vxxbkuya (dense line kaliedoscope)
//hnjlowce (bitmappy squares)
//zviirsak (colorful warping)
//iixxhnso (white red black distortion)
//lymkoqxu (red swirling)
//rmqhumlc (blue digital squares)
//owrzgxsq (carpet blue)
//snvpllrd (blue midi)
//iappagka (blue triangles)
//vlrtdoaf (darkened bit grid sides)
//uwmodqhf (crayon spiral)
//rczxhezc (zooming blue)
//fsfhnogn (flower)
//axxvygkv (mouse red spiral)

new DialogueManager(artMaker, [
  // bed level
  {
    seed: "ijhxlzqt",
    text:
      "You stand in the center platform. It is alabaster white and incredibly ornate; " +
      "very fine geometric patterns radiate out from the center. Before you are two paths.",
    choices: [
      {
        text: "go left",
        tag: "left path",
      },
      {
        text: "go right",
        tag: "right path",
      },
    ],
  },

  {
    tag: "left path",
    seed: "bvqrguwx",
    text:
      "You approach the end of the path and arrive at a door. You find yourself " +
      "in an unusually tall hospital room. At the center is a slow-moving " +
      "swarm of flying hospital beds.",
    choices: [
      {
        text: "attempt to climb the beds",
      },
    ],
  },

  {
    text:
      "You leap and clamber from bed to bed. Some move you in flat circles, and others float " +
      "up and down, taking you to new heights. Multiple times you nearly miss a jump or lose your footing. " +
      "At the very top of this treacherous climb, you find another bottle of pills suspended in midair. " +
      "One more leap and you might be able to reach it.",
    choices: [
      {
        text: "leap for the pills",
        callback: (map: Store) => {
          map.gotLeftPills = true;
        },
      },
    ],
  },

  {
    seed: "zqfxjnru",
    text:
      "As you grab the pills, all of the beds beneath you instantly vanish. You plummet. " +
      "As you hit the ground, your vision goes dark.",
    choices: [
      {
        text: "try to wake",
        tag: "center platform later",
      },
    ],
  },

  {
    seed: "gdkcrxml",
    tag: "right path",
    text:
      "You traverse the path which leads you to a door. Beyond the door is a long hospital hallway. " +
      "shadowy spectres of paragliders flit across the floor. The floor is falling away in places, " +
      "revealing the endless void below.",
    choices: [
      {
        text: "attempt to cross the hallway",
      },
    ],
  },

  {
    text:
      "You narrowly avoid the shadows and pits to reach the end of the hallway. " +
      "A bottle of pills is floating on a small platform just beyond the fragmented end " +
      "of the threacherous corridor.",
    choices: [
      {
        text: "leap for the pills",
        callback: (map: Store) => {
          map.gotRightPills = true;
        },
      },
    ],
  },

  {
    seed: "iixxhnso",
    text:
      "As you grab the pills, gravity shifts and you begin to fall back, back through the hallway. " +
      "Your vision goes black.",
    choices: [
      {
        text: "try to wake",
        tag: "center platform later",
      },
    ],
  },

  {
    seed: "ijhxlzqt",
    tag: "center platform later",
    text: template`You open your eyes and find that you are back at the white center platform above the void.\
    You have already gone the ${(map: Store) =>
      map.gotLeftPills && map.gotRightPills
        ? "left and right"
        : map.gotRightPills
        ? "right"
        : "left"} path. ${(map: Store) =>
      map.gotLeftPills && map.gotRightPills
        ? "In the space between both paths, fragmented pieces of the all-to-familiar hospital tiling " +
          "rise from the void to form stepping stones leading to a swirling ball of white light. " +
          "You can hear rushing wind in the distance."
        : ""}`,
    choices: [
      {
        showIf: (map: Store) => !map.gotLeftPills,
        text: "go left",
        tag: "left path",
      },
      {
        showIf: (map: Store) => !map.gotRightPills,
        text: "go right",
        tag: "right path",
      },
      {
        showIf: (map: Store) => map.gotLeftPills && map.gotRightPills,
        text: "take the path",
      },
    ],
  },

  // clock level
  {
    seed: "yxcmyspo",
    text:
      "Your eyes slowly come into focus, and you realize you are peering into the hospital from the outside." +
      "You can see through the walls. Looking at the hospital in this way reminds you of a dollhouse.",
    choices: [
      {
        text: "continue",
      },
    ],
  },

  {
    text:
      "Among the array of rooms \u2014 some with doctors, nurses, patients, some empty \u2014 " +
      "you find your own, and focus in on it. You see your own body, in your bed, unmoving, " +
      "as two doctors in white lab coats talk over it, one male and one female. Shortly, a nurse " +
      "in a green scrub walks in, followed by your parents. Your mother swiftly walks over to the bedside " +
      "and covers her mouth \u2014 an expression that could be either fear, relief, or a mix of both.",
    choices: [
      {
        text: "continue",
      },
    ],
  },

  {
    text:
      "Your disembodied view of the scene moves in closer until you are in the room with the others, hovering low, " +
      "just above the height of the bedframe. You see yourself wake up and look around while shifting around " +
      "slightly. Your parents go between shouting with joy and trying to be quiet in order to not overwhelm you.",
    choices: [
      {
        text: "continue",
      },
    ],
  },

  {
    tag: "start",
    text:
      "For a moment, everything goes dark. In the next instant, you are in your own body once again. " +
      "You turn your head towards the alarm clock.",
    choices: [
      {
        text: "speak to the clock",
      },
    ],
  },

  {
    text: `"Hi"

    "Hello there," the clock responds.`,
    choices: [
      {
        text: "continue",
      },
    ],
  },

  {
    seed: "bbhkopmy",
    text: `The blue LCD digits on the face rearrange to create a face with two eyes. "I've been watching you sleep."

      "Oh," you respond.`,
    choices: [
      {
        text: "continue",
      },
    ],
  },

  {
    text: `"I \u2014 I'm not sure I know what's real anymore."

    "That sounds awful!" the clock replies. "Well, I can assure you that I'm real, if that is any help. "

    "Hmm\u2026." You are not sure that this is helpful.`,
    choices: [
      {
        text: `"I'm not so sure"`,
        tag: "not so sure real",
        callback: (map: Store) => {
          map.clockMood--;
        },
      },
      {
        text: `"Sure\u2026"`,
        tag: "clock what happened",
      },
    ],
  },

  {
    seed: "fakfrsab",
    tag: "not so sure real",
    text: `"Okay, that stings a bit," says the clock. "Quite frankly, I'm not too sure you're real either."`,
    choices: [
      {
        text: "continue",
        tag: "clock what happened",
      },
    ],
  },

  {
    seed: "iappagka",
    tag: "clock what happened",
    text: `"Do you know what happened?" asks the clock.

    "I was in the sky\u2026 I think\u2026 and I fell."

    "Youch, man." There is a pause. "Would some tunes help? I do love Chopin."`,
    choices: [
      {
        text: "play classical",
        tag: "classical music",
        callback: (map: Store) => {
          map.clockMood++;
          map.musicChoice = "classical";
        },
      },
      {
        text: "play rock",
        tag: "rock music",
        callback: (map: Store) => {
          map.musicChoice = "rock";
        },
      },
      {
        text: "play punk",
        tag: "punk music",
        callback: (map: Store) => {
          map.clockMood--;
          map.musicChoice = "punk";
        },
      },
    ],
  },

  {
    tag: "classical music",
    seed: "snvpllrd",
    text: `"Wonderful! This is one of my favorites," the clock exclaims, seemingly satisfied.`,
    choices: [
      {
        text: "continue",
        tag: "after music",
      },
    ],
  },

  {
    tag: "rock music",
    seed: "hmmmriuq",
    text: `"Alright. Not exactly my scene, but I could get into this," says the clock.`,
    choices: [
      {
        text: "continue",
        tag: "after music",
      },
    ],
  },

  {
    tag: "punk music",
    seed: "waqgjphv",
    text: `"Really? No, sure, that's alright," mutters the clock. It seems irritated.`,
    choices: [
      {
        text: "continue",
        tag: "after music",
      },
    ],
  },

  {
    tag: "after music",
    text: template`"Care to play a game to pass the time?" asks the clock. "How about an AI's favorite war game, tic-tac-toe?${(
      map: Store
    ) =>
      map.musicChoice === "classical"
        ? ' This music is a perfect for a game of minds!"'
        : map.musicChoice === "punk"
        ? " Although, this grating music is going to make it a bit tricky to hone in on the correct play " +
          'among the multitudes of strategic options."'
        : map.musicChoice === "rock"
        ? " The rock music will have to do as a score to this battle of wits."
        : ""}`,
    choices: [
      {
        text: "accept",
        tag: "accept game",
      },
      {
        text: "decline",
        tag: "decline game",
      },
    ],
  },

  {
    tag: "accept game",
    callback: (map: Store) => {
      map.playerWentFirst = map.clockMood > 0;
    },
    text: template`A tic-tac-toe board etches itself into the wall across from your bed.

    "${(map: Store) =>
      map.playerWentFirst ? "You" : "I'll"} go first," the clock says. \
    ${(map: Store) =>
      map.playerWentFirst
        ? "With your mind, you scratch"
        : "Without moving, the clock scratches"} the first X on the wall. ${(
      map: Store
    ) =>
      map.playerWentFirst
        ? ""
        : "In response, you etch an O into the wall simply by thinking about where it will go."} \
"Strange game\u2026" you think to yourself.`,
    choices: [
      {
        text: "continue",
      },
    ],
  },

  {
    text:
      "Very soon, you notice the clock doesn't have much of a strategy. " +
      "It leaves you open to win the game in a single move.",
    choices: [
      {
        text: "play the winning move",
        tag: "you win game",
      },
      {
        text: "force a draw",
        tag: "you draw game",
      },
      {
        text: "throw the game",
        tag: "you lose game",
      },
    ],
  },

  {
    tag: "you lose game",
    text:
      '"First chess, then go, now tic-tac-toe! AI has truly mastered the domain of all games once ' +
      'thought to necessitate the creativity and critical thinking faculties of natural intelligence," ' +
      "the clock gloats.",
    choices: [
      {
        text: "continue",
        tag: "clock mad",
      },
    ],
    callback: (map: Store) => {
      map.clockMood++;
    },
  },

  {
    tag: "you draw game",
    text:
      '"Well, that\'s a little bit of a boring outcome," the clock complains.',
    choices: [
      {
        text: "continue",
        tag: "clock mad",
      },
    ],
    callback: (map: Store) => {
      map.clockMood--;
    },
  },

  {
    tag: "you win game",
    text:
      "\"That's not possible. Impossible! IMPOSSIBLE!\" The clock's voice grows deeper and louder.",
    choices: [
      {
        text: "continue",
        tag: "clock mad",
      },
    ],
    callback: (map: Store) => {
      map.clockMood -= 2;
    },
  },

  {
    tag: "clock mad",
    text: template`The lights in the room slowly fade to a dim red. The face of the clock\
    displays the message in red digital lettering:

CALCULATION: ${(map: Store) => "" + Math.max(-map.clockMood, 0.5) * 24} DEAD, \
${(map: Store) => "" + Math.max(-map.clockMood, 0.5) * 36} INJURED

"DETONATION IMMINENT. THIS IS YOUR FAULT."`,
    choices: [
      {
        text: "try to calm the clock",
        tag: "guess music",
      },
      {
        text: "smash it",
        tag: "smash clock",
      },
    ],
  },

  {
    tag: "guess music",
    callback: (map: Store) => {
      map.wrongAnswersAllowed = map.clockMood > 0 ? 1 : 0;
    },
    text: template`"Please! Disarm the bomb! What has anyone done to deserve this?" You continue to plead.

"I'LL GIVE YOU A CHANCE. YOU'RE ALLOWED ${(map: Store) =>
      map.wrongAnswersAllowed === 1
        ? "ONE WRONG ANSWER."
        : "NO WRONG ANSWERS. WHAT IS MY FAVORITE MUSIC GENRE?"}"`,
    choices: [
      {
        text: '"classical!"',
        callback: (map: Store) => {
          map.correctAnswers++;
        },
      },
      {
        text: '"rock!"',
      },
      {
        text: '"punk!"',
      },
    ],
  },

  {
    tag: "guess movie",
    text: `"WHAT'S MY FAVORITE MOVIE FEATURING A CORRUPT AI?"`,
    choices: [
      {
        text: '"2001: A Space Odyssey!"',
      },
      {
        text: '"WarGames!"',
        callback: (map: Store) => {
          map.correctAnswers++;
        },
      },
      {
        text: '"I, Robot!"',
      },
    ],
  },

  {
    tag: "guess tic-tac-toe",
    text: '"WHO WENT FIRST WHEN WE PLAYED OUR GAME OF TIC-TAC-TOE?"',
    choices: [
      {
        text: '"You!"',
        callback: (map: Store) => {
          if (!map.playerWentFirst) map.correctAnswers++;
        },
      },
      {
        text: '"Me!"',
        callback: (map: Store) => {
          if (map.playerWentFirst) map.correctAnswers++;
        },
      },
    ],
  },

  {
    tag: "quiz results",
    callback: (map: Store) => {
      map.quizPassed = 3 - map.correctAnswers <= map.wrongAnswersAllowed;
    },
    text: template`"YOU HAVE GOTTEN ${(map: Store) =>
      "" + map.correctAnswers}/3 answers correct. \
THIS IS ${(map: Store) => (map.quizPassed ? "" : "NOT")} SUFFICIENT."`,
    choices: [
      {
        text: "continue",
        tag: (map: Store) =>
          map.quizPassed ? "clock calm chance" : "clock failure",
      },
    ],
  },

  {
    tag: "clock calm chance",
    callback: (map: Store) => {
      map.bombSurvivalChance = Math.min(
        Math.max((3 + map.clockMood) / 7, 0.1),
        1
      );
    },
    text: template`"I LEAVE FATE UP TO CHANCE. BASED ON YOUR PREVIOUS ACTIONS, \
TO GIVE YOU A ${(map: Store) =>
      "" + Math.floor(100 * map.bombSurvivalChance)}% CHANCE OF DISARMAMENT."`,
    choices: [],
  },
]);
