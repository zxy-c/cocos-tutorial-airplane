
import { _decorator, Component, Node, Material, MeshRenderer, Prefab, math, instantiate, randomRangeInt, EventMouse, macro } from 'cc';
import { EnemyPlane } from './EnemyPlane';
const { ccclass, property,executeInEditMode } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Thu Nov 17 2022 14:04:13 GMT+0800 (中国标准时间)
 * Author = _Sombra
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/GameManager.tsv
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */


@ccclass('GameManager')
@_decorator.menu("manager/GameManager")
export class GameManager extends Component {
    
    @property(Prefab)
    enemyPlane1: Prefab

    @property(Prefab)
    enemyPlane2: Prefab

    private difficulty = 0

    private get generateSingleEnemyPlanePeriod (){
        const times = [2, 1.7, 1.4, 1];
        return times[this.difficulty]
    }

    private generateSingleEnemyPlaneWaitTime = 0

    onLoad(){
        this.schedule(()=>{
            this.difficulty += 1
        },30)
    }

    onEnable(){

    }

    update(delatTime:number){
        this.generateSingleEnemyPlaneWaitTime+=delatTime
        if(this.generateSingleEnemyPlaneWaitTime>=this.generateSingleEnemyPlanePeriod){
            this.createSingleEnemyPlane()
            this.generateSingleEnemyPlaneWaitTime = 0
        }
    }

    lateUpdate(){

    }

    start () {

    }

    createSingleEnemyPlane(){
        const prefab = [this.enemyPlane1,this.enemyPlane2][math.randomRangeInt(0,2)]
        const enemyPlane = instantiate(prefab)
        this.node.parent.addChild(enemyPlane)
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
