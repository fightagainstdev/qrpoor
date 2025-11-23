import { common, commonEntities } from "./common.js";

export const house = {
  id: "house",
  bg: "linear-gradient(17deg, transparent 80%, var(--c0) 80%), linear-gradient(-17deg, transparent 80%, var(--c0) 80%), color-mix(in srgb, var(--c7) 60%, var(--c0) 40%)",
  ...common,
  actionconf: { ...common.actionconf, val: 30 },
  entities: [
    ...commonEntities,
    {
      id: "c",
      sprite: "c",
      props: {
        x: 50,
        y: 60,
        w: 6 * 1.5,
        h: 8 * 1.5
      }
    },
    {
      id: "area",
      sprite: "area",
      props: {
        x: 50,
        y: 50,
        w: 40,
        h: 40,
        c: "var(--c7)"
      },
      onpress(...args) {
        this.exec("look", ...args);
        this.exec("move", ...args);
      }
    },
    {
      id: "exit1",
      sprite: "area",
      props: {
        x: 50,
        y: 72,
        w: 10,
        h: 8,
        c: "var(--c7)"
      },
      tooltip() {
        return "离开房子";
      },
      onpress({ pos }) {
        this.exec("move", { pos: { y: 70, x: pos.x } });
        this.setScene("farm");
      }
    },
    {
      id: "ladder",
      sprite: "ladder",
      props: {
        x: 71,
        y: 25,
        w: 20,
        h: 20,
        rotate: "13deg"
      },
      actions: {
        "look-at"() {
          this.exec("say", "c", "这只是个梯子");
        },
        "pick-up"() {
          if (!this.state.violet) {
            this.exec("say", "ao", "别碰那个！");
          } else if (this.state.ladder) {
            this.exec("collect", { id: "ladder", sprite: "ladder", sceneObj: "ladder" });
          } else {
            this.exec("talk", [
              ["ao", "我需要它去屋顶"],
              ["ao", "你需要它做什么？"]
            ]);
          }
        },
        use() {
          if (this.object === "torch") {
            this.exec("say", "c", "我不是纵火狂");
          } else if (!this.object) {
            if (this.state.violet) {
              this.setScene("roof");
            } else {
              this.exec("say", "ao", "你要去哪里！？");
            }
          } else {
            return this.none;
          }
        }
      }
    },
    {
      id: "mirror",
      sprite: "mirror",
      props: {
        x: 39,
        y: 27,
        w: 6,
        h: 6
      },
      actions: {
        "pick-up"() {
          if (!this.state.violet) {
            this.exec("say", "ao", "这是我的镜子！");
          } else {
            this.exec("collect", { id: "mirror", sprite: "mirror", sceneObj: "mirror" });
            setTimeout(() => {
              this.exec("say", "ao", "I lend it to you");
            }, 100);
          }
        },
        "look-at"() {
          this.exec("say", "c", "它会反射");
        }
      }
    },
    {
      id: "ao",
      sprite: "ao",
      props: {
        x: 41,
        y: 41,
        w: 10,
        h: 14
      },
      actions: {
        hit() {
          this.exec("say", "c", "这不好");
        },
        "talk-to"() {
          if (this.state.moon) {
            this.exec("talk", [
              ["c", "和我一起去月球"],
              ["ao", "我老了"],
              ["ao", "我的最后一天到了"],
              ["ao", "和我的花一起"],
              ["c", "我能拿梯子吗？"],
              ["ao", "就这么做"]
            ]);
            this.state.ladder = 1;
          } else if (this.state.graffiti) {
            this.exec("talk", [
              ["c", "你能读涂鸦吗？"],
              ["ao", "我看起来像穴居人吗？？"]
            ]);
          } else if (this.state.scroll && this.state.ao) {
            this.exec("talk", [
              ["c", "今天是什么日子？"],
              ["ao", "今天是1313年9月12日"],
              ["ao", "明天是最后一天"]
            ]);
          } else {
            this.exec("talk", [
              ["c", "你好先生"],
              ["c", "我能问我们在哪里吗？"],
              ["ao", "在我家里！？"],
              ["c", "抱歉我迷路了"],
              ["ao", "滚出去！"]
            ]);
            this.state.ao = 1;
          }
        },
        "look-at"() {
          this.exec("say", "c", "他看起来又老又累");
        },
        use() {
          if (this.object === "violet") {
            this.destroy("violet");
            this.exec("talk", [
              ["ao", "漂亮的紫罗兰，谢谢"],
              ["ao", "我要种上它"],
              ["ao", "我爱花"]
            ]);
            this.state.violet = 1;
            setTimeout(() => {
              this.setEntityProps("ao", {
                y: 55,
                x: 35,
                scale: "-1 1"
              });
              this.setEntityProps("violet", {
                hidden: false
              });
            }, 3000);
          } else if (this.object === "apple") {
            this.exec("say", "ao", "水果很好");
          } else if (this.object === "torch" || this.object === "shovel") {
            this.exec("say", "c", "我不想伤害他");
          } else if (this.object === "duck") {
            this.exec("say", "ao", "可爱");
          } else {
            return this.none;
          }
        }
      }
    },
    {
      id: "scroll",
      sprite: "scroll",
      props: {
        x: 50,
        y: 24,
        w: 10,
        h: 14
      },
      actions: {
        "pick-up"() {
          this.exec("say", "c", "我不想打破那个");
        },
        "look-at"() {
          this.exec("say", "c", "它看起来很古老");
        },
        read({ pos }) {
          this.exec("talk", [
            ["c", "1313年9月13日"],
            ["c", "太阳会爆炸"],
            ["c", "天空会变红"],
            ["c", "一切都会融化"],
            ["c", "月亮会被发射到远处"],
            ["c", "末日已定"],
            ["ao", "那是预言！"]
          ]);
          this.state.scroll = 1;
        },
        use() {
          if (this.object === "torch") {
            this.exec("say", "c", "I am not a pyromaniac");
          } else {
            return this.none;
          }
        }
      }
    },
    {
      id: "rose",
      sprite: "flower",
      props: {
        x: 26,
        y: 58,
        w: 6,
        h: 6,
        c: "pink"
      },
      actions: {
        "look-at"() {
          this.exec("say", "c", "闻起来不错");
        },
        "pick-up"() {
          this.exec("say", "ao", "别碰我的花！");
        },
      }
    },
    {
      id: "violet",
      sprite: "flower",
      props: {
        x: 31,
        y: 58,
        w: 5,
        h: 5,
        c: "var(--c4)",
        hidden: true
      }
    }
  ]
};
