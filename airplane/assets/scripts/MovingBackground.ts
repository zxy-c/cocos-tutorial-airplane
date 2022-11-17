
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MovingBackground
 * DateTime = Thu Nov 17 2022 14:41:25 GMT+0800 (中国标准时间)
 * Author = _Sombra
 * FileBasename = MovingBackground.ts
 * FileBasenameNoExtension = MovingBackground
 * URL = db://assets/MovingBackground.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('MovingBackground')
export class MovingBackground extends Component {

    @property(Node)
    background1:Node = null


    @property(Node)
    background2:Node = null

    private backgroundMovingSpeed = 10

    private backgroundMovingRange = 90

    start () {
        this.backgroundMovingRange = Math.abs(this.background2.position.z)
    }

    update (deltaTime: number) {
        this.moveBackground(deltaTime)
    }

    private init(){
        this.background1.setPosition(0,0,0)
        this.background2.setPosition(0,0,-this.backgroundMovingRange)
    }

    moveBackground(deltaTime: number){
        this.background1.setPosition(0,0,this.background1.position.z + this.backgroundMovingSpeed * deltaTime)
        this.background2.setPosition(0,0,this.background2.position.z + this.backgroundMovingSpeed * deltaTime)
        if(this.background1.position.z > this.backgroundMovingRange){
            this.background1.setPosition(0,0,this.background2.position.z - this.backgroundMovingRange)
        }else if(this.background2.position.z > this.backgroundMovingRange){
            this.background2.setPosition(0,0,this.background1.position.z - this.backgroundMovingRange)
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
