
import { _decorator, Component, Node, Collider, View, Camera, ITriggerEvent, math } from 'cc';
import { MyPlane } from '../../MyPlane';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletBuff
 * DateTime = Sat Dec 03 2022 10:53:55 GMT+0800 (中国标准时间)
 * Author = _Sombra
 * FileBasename = BulletBuff.ts
 * FileBasenameNoExtension = BulletBuff
 * URL = db://assets/scripts/buff/bullet/BulletBuff.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('BulletBuff')
export class BulletBuff extends Component {

    private xSpeed=0.33

    static xBoundary = 15
    

    private ySpeed = 0.2

    camera:Camera

    get bulletBuffType (){
        return this.node.name.charAt(this.node.name.length-1) as BulletBuffType
    }

    onEnable(){
        
    }

    start () {
        this.node.setWorldPosition(math.randomRange( BulletBuff.xBoundary,-BulletBuff.xBoundary),0,-50)

        const collider = this.getComponent(Collider)
        collider.once("onTriggerEnter",()=>{            
            this.node.destroy()
            this.destroy()
        })
    }

    update (deltaTime: number) {
        const position = this.node.worldPosition
        const screenPosition = this.camera.worldToScreen(this.node.worldPosition);
        if(screenPosition.y <0 ){
            this.node.destroy()
        }else {
            if(Math.abs(position.x)>=BulletBuff.xBoundary){
                this.xSpeed = -this.xSpeed
            }
            this.node.setWorldPosition(position.x + this.xSpeed,position.y,position.z + this.ySpeed)
        }
    }



    
}

export const enum BulletBuffType{
    M="M",H="H",S="S"
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
