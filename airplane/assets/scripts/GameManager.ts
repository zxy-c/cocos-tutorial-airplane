
import { _decorator, Component, Node, Material, MeshRenderer, Prefab, math, instantiate, randomRangeInt, EventMouse, macro, Vec3, Camera } from 'cc';
import { BulletBuff, BulletBuffType } from './buff/bullet/BulletBuff';
import { EnemyPlane } from './EnemyPlane';
import { MyPlane } from './MyPlane';
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

    @property(MyPlane)
    myPlane?:MyPlane

    @property(Prefab)
    bulletBuffM:Prefab

    @property(Prefab)
    bulletBuffH:Prefab

    @property(Prefab)
    bulletBuffS:Prefab

    @property(Camera)
    camera: Camera

    private get generateSingleEnemyPlanePeriod (){
        const times = [2, 1.7, 1.4, 1];
        return times[Math.max(this.difficulty,times.length-1)]
    }

    private generateSingleEnemyPlaneWaitTime = 0

    onLoad(){
        this.schedule(()=>{
            this.difficulty += 1
        },30)
        this.schedule(()=>{
            this.createBulletBuff()
        },10,macro.REPEAT_FOREVER,1)
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

    createBulletBuff(){
        const prefab:Prefab = [this.bulletBuffH,this.bulletBuffM,this.bulletBuffS][ math.randomRangeInt(0,3)]
        const node = instantiate(prefab);
        const bulletBuff = node.getComponent(BulletBuff);
        bulletBuff.camera = this.camera
        this.node.addChild(node)
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
