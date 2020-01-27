// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    starPrefab:cc.Prefab = null;

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Node)
    ground:cc.Node = null;
    @property
    maxStarDuration: number = 0;
    @property
    minStarDuration: number = 0;

    generateNewStar(){
        let newStar=cc.instantiate(this.starPrefab)
        this.node.addChild(newStar)
        newStar.setPosition(this.generateRandomPosition())
    }
    
    generateRandomPosition():cc.Vec2{
        let maxX=this.node.width/2
        let x=(Math.random()-0.5)*2*maxX+this.starPrefab.data.width/2
        let baseY=this.ground.y+this.ground.height/2
        let relativeY=this.player.getComponent("Player").jumpHeight*Math.random()+this.starPrefab.data.height/2
        let y=baseY+relativeY
        return cc.v2(x,y)
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.generateNewStar()
    }

    start () {

    }

    // update (dt) {}
}
