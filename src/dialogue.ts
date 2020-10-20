import ArtMaker from "art-maker";

export interface Store {
  gotLeftPills: boolean;
  gotRightPills: boolean;
  musicChoice?: "classical" | "rock" | "punk";
  clockMood: number;
  lastAnswerRight: boolean;
  wrongAnswersAllowed: number;
  correctAnswers: number;
  playerWentFirst: boolean;
  quizPassed: boolean;
  trauma: number;
  bombSurvivalChance: number;
}

interface ChoiceNode {
  callback?: (store: Store) => void;
  showIf?: (store: Store) => boolean;
  text: string | StringTemplate;
  tag?: string | ((store: Store) => string);
}

interface DialogueNode {
  callback?: (store: Store) => void;
  seed?: string | ((store: Store) => string);
  tag?: string;
  text: string | StringTemplate;
  choices: ChoiceNode[];
}

function removeAllChildNodes(parent: HTMLElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

type StringTemplate = {
  sections: string[];
  values: ((map: Store) => string)[];
};

export function template(
  strings: TemplateStringsArray,
  ...values: ((map: Store) => string)[]
): StringTemplate {
  return { sections: strings.concat([]), values: values };
}

export class DialogueManager {
  private dialogue: DialogueNode[];
  private curIndex = 0;
  private nodes: Map<string, number> = new Map();
  private store: Store = {
    gotLeftPills: false,
    gotRightPills: false,
    clockMood: 0,
    lastAnswerRight: false,
    wrongAnswersAllowed: 0,
    correctAnswers: 0,
    playerWentFirst: false,
    quizPassed: false,
    trauma: 0,
    bombSurvivalChance: 0,
  };
  private div: HTMLElement;
  private artMaker: ArtMaker;
  private prevSeed?: string;

  constructor(artMaker: ArtMaker, dialogue: DialogueNode[], id = "dialogue") {
    this.artMaker = artMaker;
    this.dialogue = dialogue;

    const div = document.getElementById(id);
    if (div === null) {
      throw new Error(`could not find element with id "${id}"`);
    }
    this.div = div;

    let index = 0;
    for (const d of dialogue) {
      if (d.tag !== undefined) {
        if (this.nodes.has(d.tag)) {
          throw new Error(`duplicate tag "${d.tag}"`);
        }
        this.nodes.set(d.tag, index);
      }
      index++;
    }

    const startIndex = this.nodes.get("start");
    this.curIndex = startIndex ?? 0;

    this.update();
  }

  templateToString(str: string | StringTemplate) {
    if (typeof str === "string") return str;
    let ret = "";
    for (let i = 0; i < str.values.length; i++) {
      ret += str.sections[i] + str.values[i](this.store);
    }
    return ret + str.sections[str.sections.length - 1];
  }

  private advance(tag?: string | ((store: Store) => string)) {
    if (tag === undefined) {
      this.curIndex++;
      if (this.curIndex >= this.dialogue.length) {
        throw new Error("current index advanced past end of dialogue");
      }
    } else {
      const str = typeof tag === "string" ? tag : tag(this.store);
      const nodeIndex = this.nodes.get(str);
      if (nodeIndex === undefined) {
        throw new Error(`could not find node with tag "${str}"`);
      }
      this.curIndex = nodeIndex;
    }
    const node = this.dialogue[this.curIndex];
    if (node.callback !== undefined) node.callback(this.store);
    this.update();
  }

  private makeButton(choice: ChoiceNode) {
    const button = document.createElement("button");
    button.innerText = this.templateToString(choice.text);
    button.onclick = () => {
      if (choice.callback !== undefined) choice.callback(this.store);
      this.advance(choice.tag);
    };
    return button;
  }

  private update() {
    console.log("update");
    removeAllChildNodes(this.div);

    const node = this.dialogue[this.curIndex];
    if (node.seed !== undefined && this.prevSeed !== node.seed) {
      const seed =
        typeof node.seed === "string" ? node.seed : node.seed(this.store);
      this.prevSeed = seed;
      this.artMaker.art(seed);
    }
    const p = document.createElement("p");
    p.innerText = this.templateToString(node.text);

    const buttons = node.choices
      .filter((n) => n.showIf === undefined || n.showIf(this.store))
      .map((n) => this.makeButton(n));

    this.div.appendChild(p);
    for (const b of buttons) {
      this.div.appendChild(b);
      this.div.innerHTML;
    }
  }
}
