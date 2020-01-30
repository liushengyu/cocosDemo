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
export default class Star extends cc.Component {
    @property
    meetDistance: number = 0;
    // LIFE-CYCLE CALLBACKS:
    init() {
        this.initPickDistance()
    }
    initPickDistance() {
        let playerWidth = this.game.player.width
        let playerHeight = this.game.player.height
        let distance = Math.sqrt(Math.pow((playerWidth + this.node.width) / 2, 2) + Math.pow((playerHeight + this.node.height) / 2, 2))
        
        this.meetDistance = distance
    }

    getPlayerDistance(): number {
        let pPos = this.game.player.getPosition()
        let distance = this.node.position.sub(pPos).mag()
        return distance
    }

    jugMeetPlayer(): boolean {
        if (this.getPlayerDistance() <= this.meetDistance) return true
        return false
    }

    onMeetPlayer() {
        this.game.generateNewStar()
        this.node.destroy()
    }
    onLoad() {
        
    }

    start() {
        this.init()
    }

    update(dt) {
        // console.log("onUpdate:",this.game)
        if (this.jugMeetPlayer()) {
            this.onMeetPlayer()
            return
        }
    }
}
