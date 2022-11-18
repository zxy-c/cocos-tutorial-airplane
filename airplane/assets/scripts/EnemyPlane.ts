
import { _decorator, Component, Node, randomRangeInt, Collider } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Fri Nov 18 2022 15:15:06 GMT+0800 (中国标准时间)
 * Author = _Sombra
 * FileBasename = EnemyPlane.ts
 * FileBasenameNoExtension = EnemyPlane
 * URL = db://assets/scripts/EnemyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {

    @property
    speed = 0.2

    start () {
        const randomX = randomRangeInt(-16, 16)
        this.node.setWorldPosition(randomX,0,-50)
    }

    update (deltaTime: number) {
        const position= this.node.worldPosition
        if(position.z > 50){
            this.node.destroy()
        } else {
            this.node.setWorldPosition(position.x,position.y,position.z + 0.5)
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
