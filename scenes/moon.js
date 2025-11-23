import { common, commonEntities } from "./common.js";

export const moon = {
  id: "moon",
  bg: "radial-gradient(circle at 50% 100%, var(--c2) 78%, var(--c2) 75%, var(--c3) 80%)",
  ...common,
  entities: [
    ...commonEntities,
    {
      id: "c",
      sprite: "c",
      props: {
        x: 42,
        y: 50,
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
        c: "rgba(0,0,0,.2)",
      },
      onpress(...args) {
        this.exec("look", ...args);
        this.exec("move", ...args);
      }
    },
    {
      id: "coso",
      sprite: "coso",
      props: {
        x: 58,
        y: 49,
        w: 6 * 2,
        h: 8 * 2,
        scale: "-1 1"
      },
      actions: {
        use() {
          if (this.object === "duck") {
            this.exec("say", "coso", "感谢你救了她 ❤️");
          } else {
            this.exec("say", "coso", "我们这里不需要那个");
          }
        },
        "talk-to"() {
          this.exec("talk", [
            ["c", "哇，我们在月球上！"],
            ["coso", "世界结束了"],
            ["coso", "但我们在这里安全"],
            ["c", "我们要去哪里？"],
            ["coso", "那里未来还没有被写下"],
            ["coso", "就是这样，我的朋友"],
            ["coso", "感谢游玩 ❤️"]
          ]);
          setTimeout(() => {
            this.setScene("end");
          }, 15000);
        }
      }
    }
  ]
};
