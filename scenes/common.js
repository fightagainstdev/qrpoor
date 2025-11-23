export const common = {
  actionconf: {
    id: "c",
    val: 25,
    onfar() {
      this.exec("say", "c", "太远了，我得靠近点。");
    },
    onnoaction() {
      this.exec("say", "c", this.actions.find(a => a.id === this.action).default);
    },
    ignoredist: ["look-at"]
  },
  onpress() {
    this.setEntityProps("msg", {
      display: "none"
    });
  },
  onentitypress({ pos }) {
    this.exec("look", { pos });
  },
  onactions({ pos }) {
    this.exec("look", { pos });
  }
};

export const commonEntities = [
  {
    id: "tooltip",
    sprite: "msg",
    props: {
      x: 0,
      y: 0,
      w: 100,
      h: 5,
      c: "var(--c2)",
      scale: 0.7,
      t: "capitalize"
    }
  },
  {
    id: "msg",
    sprite: "msg",
    props: {
      x: 0,
      y: 0,
      w: 100,
      h: 5
    }
  }
];
