interface ChoiceNode {
  callback?: (store: Map<string, any>) => void;
  showIf?: (store: Map<string, any>) => boolean;
  text: string;
  tag?: string;
}

interface DialogueNode {
  seed?: string;
  tag?: string;
  text: string;
  choices: ChoiceNode[];
}

function removeAllChildNodes(parent: HTMLElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export class DialogueManager {
  private dialogue: DialogueNode[];
  private curIndex = 0;
  private nodes: Map<string, number> = new Map();
  private store: Map<string, any> = new Map();
  private div: HTMLElement;

  constructor(dialogue: DialogueNode[], id = "dialogue") {
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

    this.updateDom();
  }

  /** updates the current index and updates the DOM */
  private advance(tag?: string) {
    if (tag === undefined) {
      this.curIndex++;
      if (this.curIndex >= this.dialogue.length) {
        throw new Error("current index somehow advanced past end of dialogue");
      }
    } else {
      const nodeIndex = this.nodes.get(tag);
      if (nodeIndex === undefined) {
        throw new Error(`could not find node with tag "${tag}"`);
      }
      this.curIndex = nodeIndex;
    }
    this.updateDom();
  }

  /** makes button with proper onclick */
  private makeButton(choice: ChoiceNode) {
    const button = document.createElement("button");
    button.innerText = choice.text;
    button.onclick = () => {
      this.advance(choice.tag);
    };
    return button;
  }

  private updateDom() {
    removeAllChildNodes(this.div);

    const node = this.dialogue[this.curIndex];
    const p = document.createElement("p");
    p.innerText = node.text;

    const buttons = node.choices
      .filter((n) => n.showIf === undefined || n.showIf(this.store))
      .map((n) => this.makeButton(n));

    this.div.appendChild(p);
    for (const b of buttons) {
      this.div.appendChild(b);
      this.div.innerHTML += " ";
    }
  }
}
