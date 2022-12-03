
import { _decorator, Component, Node, Camera, UITransform, Collider, View } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Fri Nov 18 2022 11:44:01 GMT+0800 (中国标准时间)
 * Author = _Sombra
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/scripts/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 const MAX_MOVE_RANGE = 50
@ccclass('Bullet')
export class Bullet extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property
    speed = 0.5

    camera:Camera

    rotate = 0

    start () {
        this.node.setRotationFromEuler(-90,this.rotate,0)

        const collider = this.getComponent(Collider)
        collider.once("onTriggerEnter",()=>{
            this.node.destroy()
            this.destroy()
        })
    }

    update (deltaTime: number) {
        const position = this.node.worldPosition;
        
        const radius = Math.PI / 180 * this.rotate;
        this.node.setWorldPosition(position.x-Math.sin(radius)*this.speed,position.y,position.z - Math.cos(radius) * this.speed)
        const viewportRect = View.instance.getViewportRect();
        const screenPosition = this.camera.worldToScreen(this.node.worldPosition);
        const horizontalBound = viewportRect.width * 0.1
        const verticalBound = viewportRect.height * 0.2
        if(screenPosition.x > viewportRect.width + horizontalBound || screenPosition.x < -horizontalBound || screenPosition.y > viewportRect.height + verticalBound || screenPosition.y < - verticalBound){
            this.node.destroy()
        }
    }
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
