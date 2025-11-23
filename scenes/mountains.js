import { common, commonEntities } from "./common.js";

export const mountains = {
  id: "mountains",
  bg: "linear-gradient(0deg, var(--c6) 68%, var(--c3) 68%)",
  ...common,
  onenter() {
    this.state.mountains = (this.state.mountains || 0) + 1;
    if (this.state.mountains > 1 && this.getEntity("coso").props.hidden) {
      this.setEntityProps("coso", { hidden: false });
    }
  },
  entities: [
    ...commonEntities,
    {
      id: "c",
      sprite: "c",
      props: {
        x: 50,
        y: 47,
        w: 6,
        h: 8
      }
    },
    {
      id: "area",
      sprite: "area",
      props: {
        x: 44,
        y: 58,
        w: 78,
        h: 40,
        c: "var(--c6)"
      },
      onpress({ pos }) {
        this.exec("move", { pos });
      }
    },
    {
      id: "exit1",
      sprite: "area",
      props: {
        x: 3,
        y: 50,
        w: 6,
        h: 8,
        c: "var(--c6)"
      },
      tooltip() {
        return "跟随路径";
      },
      onpress({ pos }) {
        this.exec("move", { pos: { y: pos.y, x: 5 } });
        this.setScene("farm");
      }
    },
    {
      id: "cloud",
      sprite: "cloud",
      props: {
        x: 13,
        y: 7,
        w: 15,
        h: 15
      }
    },
    {
      id: "cloud2",
      sprite: "cloud",
      props: {
        x: 56,
        y: 18,
        w: 17,
        h: 17
      }
    },
    {
      id: "bush",
      sprite: "cloud",
      props: {
        x: 79,
        y: 81,
        w: 12,
        h: 12,
        c: "color-mix(in srgb, var(--c6) 80%, var(--c0) 20%)"
      }
    },
    {
      id: "bush2",
      sprite: "cloud",
      props: {
        x: 95,
        y: 37,
        w: 12,
        h: 12,
        c: "color-mix(in srgb, var(--c6) 80%, var(--c0) 20%)"
      }
    },
    {
      id: "bush3",
      sprite: "cloud",
      props: {
        x: 88,
        y: 55,
        w: 15,
        h: 15,
        c: "color-mix(in srgb, var(--c6) 80%, var(--c0) 20%)"
      }
    },
    {
      id: "bush4",
      sprite: "cloud",
      props: {
        x: 9,
        y: 35,
        w: 12,
        h: 12,
        c: "color-mix(in srgb, var(--c6) 80%, var(--c0) 20%)"
      }
    },
    {
      id: "mount",
      sprite: "mount",
      props: {
        x: 40,
        y: 24,
        w: 18 * 4,
        h: 8 * 4,
        clip: "polygon(0% 0%, 95% 0%, 95% 100%, 0% 100%)"
      }
    },
    {
      id: "direction",
      sprite: "direction",
      props: {
        x: 8,
        y: 43,
        w: 7,
        h: 7
      },
      actions: {
        hit() {
          this.exec("say", "c", "我不想打破它");
        },
        read() {
          this.exec("say", "c", "特里斯卡镇");
        },
        "look-at"() {
          this.exec("say", "c", "这是一个路标");
        }
      }
    },
    {
      id: "lake",
      sprite: "hole",
      props: {
        x: 37,
        y: 59,
        w: 44,
        h: 20,
        c: "var(--c3)",
        clip: "ellipse(42% 38% at 50% 50%)"
      }
    },
    {
      id: "cave",
      sprite: "cave",
      props: {
        x: 30,
        y: 35.8,
        w: 12,
        h: 9
      },
      tooltip() {
        return "走进洞穴";
      },
      onpress({ pos }) {
        if (this.state.torch) {
          this.exec("move", { pos: { y: 40, x: pos.x } });
          this.setScene("cave");
        } else {
          this.exec("say", "c", "里面太暗了");
        }
      }
    },
    {
      id: "moon",
      sprite: "moon",
      props: {
        x: 80,
        y: 20,
        w: 12,
        h: 25
      },
      actions: {
        use() {
          if (this.object === "ladder") {
            this.setEntityProps("ladder", { hidden: false });
            this.destroy("ladder");
            this.playSound("yes");
          } else {
            return this.none;
          }
        },
        "look-at"() {
          this.exec("say", "c", "看起来很美");
        },
        "talk-to"() {
          this.exec("say", "c", "我希望你能听懂我...");
        }
      }
    },
    {
      id: "coso",
      sprite: "coso",
      props: {
        x: 15,
        y: 70,
        w: 7,
        h: 9,
        hidden: true
      },
      actions: {
        hit() {
          if (this.state.apple) {
            this.exec("say", "c", "他现在太远了");
          } else {
            this.exec("arm");
            this.playSound("hit");
            setTimeout(() => {
              this.exec("say", "coso", "Ouch!");
            }, 200);
          }
        },
        use() {
          if (this.object === "apple") {
            this.lock(true);
            this.exec("say", "coso", "美味！");
            this.destroy("apple");
            this.setEntityProps("tooltip", {
              display: "none"
            });
            this.state.apple = 1;
            setTimeout(() => {
              this.setEntityProps("coso", {
                x: 80,
                y: 13,
                scale: ".5",
                rotate: "-378deg"
              });
              this.setEntityProps("msg", {
                display: "none"
              });
              this.playSound("yes");
              this.lock(false);
            }, 2000);
          } else if (this.object === "violet") {
            this.exec("say", "coso", "我不吃花");
          } else if (this.object === "mirror") {
            this.exec("say", "coso", "我知道我很帅");
          } else if (this.object === "torch" || this.object === "shovel") {
            this.exec("say", "c", "I don't want hurt him");
          } else if (this.object === "duck") {
            this.exec("say", "coso", "我是素食主义者");
          } else {
            return this.none;
          }
        },
        "look-at"() {
          if (!this.state.apple) {
            this.exec("say", "c", "他应该是本地人");
          } else {
            this.exec("say", "c", "他跳到月亮上了");
          }
        },
        "talk-to"() {
          if (!this.state.apple) {
            this.exec("look", { pos: this.getEntity("c").props, who: "coso" });
            this.exec("talk", [
              ["c", "你好"],
              ["coso", "嘿，在一天结束之前"],
              ["coso", "我们需要离开这里"],
              ["c", "离开？去哪里？"],
              ["coso", "我需要先填饱肚子"],
              ["c", "好吧..."]
            ]);
          } else {
            if (this.state.graffiti) {
              this.exec("talk", [
                ["c", "你能读涂鸦吗？"],
                ["coso", "当然"],
                ["coso", "它们说要去月球"],
                ["coso", "否则你会死"],
                ["coso", "上来这里！"],
                ["c", "我不能像你那样跳"],
                ["c", "我必须找到办法"]
              ]);
              this.state.moon = 1;
            } else {
              this.exec("talk", [
                ["c", "嘿！"],
                ["coso", "嗯，是时候午睡了"],
                ["coso", "再见"],
                ["c", "真的...？"]
              ]);
            }
          }
        }
      }
    },
    {
      id: "hole",
      sprite: "hole",
      props: {
        x: 75,
        y: 60,
        w: 12,
        h: 6,
        clip: "ellipse(42% 40% at 50% 45%)"
      },
      tooltip() {
        return "走进洞里";
      },
      onpress({ pos }) {
        this.exec("move", { pos: { y: 56, x: pos.x } });
        this.setScene("hole");
      }
    },
    {
      id: "ladder",
      sprite: "ladder",
      props: {
        x: 80,
        y: 27,
        w: 27,
        h: 27,
        hidden: true
      },
      actions: {
        use() {
          if (this.state.graffiti && !this.object) {
            if (this.state.duck) {
              this.setScene("moon");
            } else {
              this.exec("say", "coso", "请救救我的鸭子！");
            }
          } else {
            return this.none;
          }
        }
      }
    },
    {
      id: "duck",
      sprite: "duck",
      props: {
        x: 37,
        y: 56,
        w: 4,
        h: 4
      },
      actions: {
        hit() {
          this.exec("say", "c", "I won't hurt her");
        },
        use() {
          this.exec("say", "duck", "Quack!");
        },
        "look-at"() {
          if (this.state.moon) {
            this.exec("say", "c", "我需要很近才能抓住她");
          } else {
            this.exec("say", "c", "她不会飞");
          }
        },
        "talk-to"() {
          this.exec("talk", [
            ["c", "嘿"],
            ["duck", "嘎嘎！"]
          ]);
        },
        "pick-up"({ dist }) {
          this.playSound("duck");
          if (dist > 6) {
            this.exec("arm");
            const x = 27 + Math.random() * 20;
            const prevX = this.getEntity("duck").props.x;
            this.setEntityProps("duck", {
              x,
              y: 51 + Math.random() * 10,
              scale: prevX < x ? 1 : "-1 1"
            });
          } else {
            this.exec("collect", { id: "duck", sprite: "duck", sceneObj: "duck" });
            this.state.duck = 1;
          }
        }
      }
    },
    {
      id: "violet",
      sprite: "flower",
      props: {
        x: 55,
        y: 62,
        w: 5,
        h: 6,
        c: "var(--c4)"
      },
      actions: {
        hit() {
          this.exec("say", "c", "I don't want to break it");
        },
        "look-at"() {
          this.exec("say", "c", "这让我想起了我的家乡");
        },
        "pick-up"() {
          this.exec("collect", { id: "violet", sprite: "flower", sceneObj: "violet", props: { c: "var(--c4)" } });
        }
      }
    },
  ]
};
