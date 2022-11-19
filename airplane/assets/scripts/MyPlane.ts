
import { _decorator, Component, Node, systemEvent, SystemEvent, Touch, Camera, Vec3, PhysicsSystem, PhysicsRayResult, Vec2, Prefab, instantiate, Collider, ITriggerEvent, ICollisionEvent, RigidBody, ERigidBodyType } from 'cc';
import { Bullet } from './bullet/Bullet';
import PhysicsGroup from './utils/PhysicsGroup';
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

    @property
    speed = 1

    @property(Camera)
    camera: Camera

    shootRate = 0.3

    private touchStartPosition = new Vec3()

    private shootWaitTime = 0

    @property(Prefab)
    bullet: Prefab

    start() {
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this.handlerTouchStart)
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.handlerTouchMove)
        const collider = this.getComponent(Collider)
        collider.once("onTriggerEnter",(event:ITriggerEvent)=>{
            this.node.destroy()
            this.destroy()
        })
    }

    private handlerTouchStart = (touch: Touch) => {
        const touchStartLocation = touch.getLocation()
        this.touchStartPosition.set(this.camera.screenToWorld(new Vec3(touchStartLocation.x, touchStartLocation.y, 0)))
    }

    private handlerTouchMove = (touch: Touch) => {
        const position = this.node.position
        const touchLocation = touch.getLocation()
        const touchPosition = this.camera.screenToWorld(new Vec3(touchLocation.x, touchLocation.y, 0))
        const deltaPosition = touchPosition.clone().subtract(this.touchStartPosition)

        this.node.setWorldPosition(position.x + deltaPosition.x, position.y, position.z + deltaPosition.z)
        this.touchStartPosition.set(touchPosition)
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.TOUCH_START, this.handlerTouchStart)
        systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.handlerTouchMove)
    }

    update(deltaTime: number) {
        this.shootWaitTime += deltaTime

        if (this.shootWaitTime > this.shootRate) {
            this.createBullet()
            this.shootWaitTime = 0;
        }
    }

    createBullet() {
        const bullet = instantiate(this.bullet)
        const bulletComponent = bullet.getComponent(Bullet);
        bulletComponent.camera = this.camera
        const rigidBody = bullet.getComponent(RigidBody);
        rigidBody.group = PhysicsGroup.MY_BULLET
        this.node.parent.addChild(bullet)
        bullet.setWorldPosition(this.node.worldPosition.x, this.node.worldPosition.y, this.node.worldPosition.z - 7)
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
