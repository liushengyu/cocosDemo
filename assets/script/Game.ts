// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    SCROEPREFIX: string = "Score:"

    @property(cc.Prefab)
    p_starPrefab: cc.Prefab = null;
    @property(cc.Node)
    n_player: cc.Node = null;
    @property(cc.Node)
    n_ground: cc.Node = null;
    @property(cc.Label)
    l_score: cc.Label = null;

    @property
    maxStarDuration: number = 0;
    @property
    minStarDuration: number = 0;

    v_score: number = 0
    generateNewStar() {
        let newStar = cc.instantiate(this.p_starPrefab)
        this.node.addChild(newStar)
        newStar.setPosition(this.generateRandomStarPosition())
        newStar.getComponent("Star").game = this
    }

    generateRandomStarPosition(): cc.Vec2 {
        let maxX = this.node.width / 2
        let x = (Math.random() - 0.5) * 2 * maxX + this.p_starPrefab.data.width / 2
        let baseY = this.n_ground.y + this.n_ground.height / 2
        let relativeY = this.n_player.getComponent("Player").jumpHeight * Math.random() + this.p_starPrefab.data.height / 2
        let y = baseY + relativeY
        return cc.v2(x, y)
    }

    gainScore() {
        this.v_score++
        this.l_score.string = this.SCROEPREFIX + this.v_score
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.init()
    }
    init() {
        this.initStar()
    }
    initStar() {
        this.generateNewStar();
    }
    start() {

    }

    update(dt) {

    }
}
