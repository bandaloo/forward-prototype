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
      "and covers her mouth \u2014 expression that could be either fear, relief, or a mix of both.",
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
    seed: "waqgjphv",
    text: template`"Care to play a game to pass the time?" asks the clock. "How about an AI's favorite war game, tic-tac-toe?${(
      map: Store
    ) =>
      map.musicChoice === "classical"
        ? ' This music is a perfect for a game of minds!"'
        : map.musicChoice === "punk"
        ? " Although, this grating music is going to make it a bit tricky to hone in on the correct play " +
          'among the multitudes of strategic options, however."'
        : map.musicChoice === "rock"
        ? " The rock music will have to do as a score to this battle of wits."
        : ""}`,
    choices: [
      {
        text: "accept",
      },
      {
        text: "decline",
      },
    ],
  },
]);
