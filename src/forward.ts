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

new DialogueManager(artMaker, [
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
]);
