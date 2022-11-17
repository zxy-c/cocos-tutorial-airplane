
import { _decorator, Component, Node, Material, MeshRenderer } from 'cc';
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
@_decorator.requireComponent(MeshRenderer)
@_decorator.menu("manager/GameManager")
export class GameManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property
    foo = 10

    @property(Material)
    bar: Material = null

    private _init = false

    onLoad(){

    }

    onEnable(){

    }

    update(){
        if(this._init){
            console.log("update")
        }
    }

    lateUpdate(){
        if (this._init){
            console.log("lateUpdate")
            this._init = false
        }
    }

    start () {
        // [3]
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
