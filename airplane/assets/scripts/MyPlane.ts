
import { _decorator, Component, Node, systemEvent, SystemEvent,Touch, Camera, Vec3, PhysicsSystem, PhysicsRayResult } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MyPlane
 * DateTime = Thu Nov 17 2022 15:31:57 GMT+0800 (中国标准时间)
 * Author = _Sombra
 * FileBasename = MyPlane.ts
 * FileBasenameNoExtension = MyPlane
 * URL = db://assets/scripts/MyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('MyPlane')
export class MyPlane extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property
    speed = 1

    @property(Camera)
    camera:Camera

    start () {
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE,this.handlerTouchMove)
    }

    


    private handlerTouchMove = (touch:Touch)=>{
        // console.log(touch.getLocation(),touch.getDelta(),touch.getUIDelta(),this.camera.screenToWorld(new Vec3(touch.getLocationX(),0,touch.getLocationY())))
        
        const delta = touch.getDelta()
        
        const position = this.node.position
        const ray = this.camera.screenPointToRay(delta.x, delta.y);
        this.node.con
        const newLocal = PhysicsSystem.instance.raycast(ray);
        console.log(newLocal,PhysicsSystem.instance.raycastResults)
        
        // const deltaPosition = this.camera.screenToWorld(new Vec3(delta.x, 0, delta.y))
        // console.log(deltaPosition,delta)
        // this.node.setPosition(position.x + deltaPosition.x,position.y,position.z + deltaPosition.z)
        // const ray = this.camera.screenPointToRay(0, 0);
        // ray.computeHit()
        // this.camera.screenToWorld(touch.getDelta())
        // this.node.setPosition(position.x+ this.speed * delta.x,position.y,position.z - this.speed * delta.y)
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
