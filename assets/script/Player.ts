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
    @property
    jumpHeight:number=200
    @property
    jumpDuration:number=0.3
    @property
    maxMoveSpeed:number=400
    @property
    accel:number=350
    @property
    xSpeed:number=0

    jumpAction:cc.ActionInterval
    lAccel:boolean=false
    rAccel:boolean=false
    
    @property(cc.AudioClip)
    jumpSound:cc.AudioClip=null
    PlayerJumpAction(){
        let jumpUp=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut())
        let jumpDown=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn())
        let onJumpSoundCallBack=cc.callFunc(this.playJumpSound,this)
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,onJumpSoundCallBack))
    }
    playJumpSound(){
        cc.audioEngine.playEffect(this.jumpSound,false)
    }
    onKeyDown(event:any){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.lAccel=true
                break
            case cc.macro.KEY.d:
                this.rAccel=true
        }
    }
    onKeyUp(event:any){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.lAccel=false
                break
            case cc.macro.KEY.d:
                this.rAccel=false
                break
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jumpAction=this.PlayerJumpAction()
        this.node.runAction(this.jumpAction)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)
    }

    start () {
        
    }

    update (dt) {
        if(this.lAccel){
            this.xSpeed-=this.accel*dt
        }
        if(this.rAccel){
            this.xSpeed+=this.accel*dt
        }
        if(Math.abs(this.xSpeed)>this.maxMoveSpeed){
            this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)
        }
        this.node.x+=this.xSpeed*dt
    }
}
