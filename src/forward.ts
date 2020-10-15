import ArtMaker, { Rand } from "art-maker";
import { DialogueManager } from "./dialogue";

const artMaker = new ArtMaker(128);
const seed = Rand.randString(8);
console.log(seed);
artMaker.art(seed);
//ijhxlzqt (seed for the alabaster white platform)
//mjfaivcm (cool swirl)
//yxcmyspo (calming baubles)
//tffpepaa (soft radial)
//sirfipcv (portal to green world)

const dialogueManager = new DialogueManager([
  {
    tag: "abcd",
    seed: "randomseed",
    text:
      "You stand in the center platform. It is alabaster white and incredibly ornate; " +
      "very fine geometric patterns radiate out from the center. Before you are two paths.",
    choices: [
      {
        text: "go left",
      },
      {
        text: "go right",
        tag: "abcd",
      },
    ],
  },

  {
    tag: "defg",
    seed: "randomseed",
    text: "something else",
    choices: [
      {
        text: "foo",
      },
      {
        text: "bar",
        tag: "abcd",
      },
    ],
  },
]);
