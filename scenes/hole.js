import { common, commonEntities } from "./common.js";

export const hole = {
  id: "hole",
  bg: "var(--c0)",
  ...common,
  actionconf: { ...common.actionconf, val: 50 },
  entities: [
    ...commonEntities,
    {
      id: "c",
      sprite: "c",
      props: {
        x: 33,
        y: 40,
        w: 6 * 2,
        h: 8 * 2
      }
    },
    {
      id: "area",
      sprite: "area",
      props: {
        x: 50,
        y: 53,
        w: 50,
        h: 15,
        c: "var(--c0)",
        skewx: "20deg",
        rotate: "25deg"
      },
      onpress(...args) {
        this.exec("look", ...args);
        this.exec("move", ...args);
      }
    },
    {
      id: "exit1",
      sprite: "hole",
      props: {
        x: 27,
        y: 27,
        w: 13,
        h: 8,
        c: "color-mix(in srgb, var(--c1) 80%, var(--c2) 20%)",
        clip: "ellipse(42% 40% at 50% 47%)"
      },
      tooltip() {
        return "离开洞里";
      },
      onpress() {
        this.exec("move", { pos: { y: 41, x: 34 } });
        this.setScene("mountains");
      }
    },
    {
      id: "exit2",
      sprite: "area",
      props: {
        x: 73,
        y: 64,
        w: 6,
        h: 8,
        c: "var(--c0)",
        skewx: "20deg",
        rotate: "25deg"
      },
      tooltip() {
        return "跟随路径";
      },
      onpress({ pos }) {
        if (this.state.spider) {
          this.exec("move", { pos: { y: pos.y, x: 70 } });
          this.setScene("hole2");
        }
      }
    },
    {
      id: "spider",
      sprite: "spider",
      props: {
        x: 68,
        y: 62,
        w: 22,
        h: 30
      },
      actions: {
        "look-at"() {
          this.exec("talk", [["c", "他有4只眼睛"], ["c", "他很可怕"]]);
        },
        hit() {
          this.exec("say", "c", "你疯了吗？");
        },
        "pick-up"() {
          this.exec("say", "c", "你是认真的吗？");
        },
        use() {
          if (this.object === "mirror") {
            if (!this.state.spider) {
              this.lock(true);
              this.setEntityProps("spider", {
                rotate: "170deg",
                y: 22
              });
              this.playSound("spider");
              setTimeout(() => {
                this.exec("say", "c", "他被自己吓到了");
                this.lock(false);
              }, 500);
              this.state.spider = 1;
            } else {
              this.exec("say", "c", "又来？");
            }
          } else if (this.object === "torch") {
            this.setEntityProps("spider", {
              rotate: "20deg",
            });
            this.playSound("spider");
            setTimeout(() => {
              this.setEntityProps("spider", {
                rotate: "170deg",
              });
              this.playSound("spider");
            }, 200);
          } else if (this.object === "shovel") {
            this.exec("say", "c", "我不会和巨型蜘蛛战斗");
          } else if (this.object === "duck") {
            this.exec("say", "c", "你为什么讨厌这只鸭子？");
          } else {
            return this.none;
          }
        }
      }
    }
  ]
};
