
import { _decorator, Component, Node, Camera, UITransform } from 'cc';
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

    start () {
        
    }

    update (deltaTime: number) {
        const position = this.node.worldPosition;
        this.node.setWorldPosition(position.x,position.y,position.z - this.speed)
        if(position.z<-50){
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
