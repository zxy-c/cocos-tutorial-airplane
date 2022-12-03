
import { _decorator, Component, Node, systemEvent, SystemEvent, Touch, Camera, Vec3, PhysicsSystem, PhysicsRayResult, Vec2, Prefab, instantiate, Collider, ITriggerEvent, ICollisionEvent, RigidBody, ERigidBodyType } from 'cc';
import { BulletBuff, BulletBuffType } from './buff/bullet/BulletBuff';
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

    basicShootRate = 0.3

    private touchStartPosition = new Vec3()

    private shootWaitTime = 0

    @property(Prefab)
    bulletPill: Prefab

    @property(Prefab)
    bulletMoon: Prefab

    bulletBuffType = BulletBuffType.M

    static MIN_BULLET_LEVEL = 1
    static MAX_BULLET_LEVEL = 5
    private bulletLevel = 1

    private get shootRate(){
        console.log(this.basicShootRate * this.shootRateBasicNumberByBulletType * Math.pow(0.8,this.bulletLevel - 1),this.bulletBuffType,this.bulletLevel)
        return this.basicShootRate * this.shootRateBasicNumberByBulletType * Math.pow(0.8,this.bulletLevel - 1)
    }

    private get shootRateBasicNumberByBulletType(){
        return {
            [BulletBuffType.M]: 1,
            [BulletBuffType.H]: 2.4,
            [BulletBuffType.S]: 3.6,
        }[this.bulletBuffType]
    }

    onEnable() {
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this.handlerTouchStart)
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.handlerTouchMove)
        const collider = this.getComponent(Collider)
        collider.on("onTriggerEnter",this.onTriggerEnter)
    }

    private onTriggerEnter = (event:ITriggerEvent)=>{
        const group = event.otherCollider.getGroup();
        if(group === PhysicsGroup.BULLET_BUFF){
            this.applyBulletBuff( event.otherCollider.getComponent(BulletBuff).bulletBuffType);
        }else if(group === PhysicsGroup.ENEMY_BULLET || group === PhysicsGroup.ENEMY_PLANE){
            this.node.destroy()
            this.destroy()
        }
    }
    

    private applyBulletBuff(bulletBuffType:BulletBuffType){
        if(this.bulletBuffType === bulletBuffType){
            this.bulletLevel = Math.min(MyPlane.MAX_BULLET_LEVEL,this.bulletLevel + 1);
        } else {
            this.bulletLevel = Math.max(MyPlane.MIN_BULLET_LEVEL,this.bulletLevel - 2);
        }
        this.bulletBuffType = bulletBuffType
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
        const collider = this.getComponent(Collider)
        collider.off("onTriggerEnter",this.onTriggerEnter)
    }

    update(deltaTime: number) {
        this.shootWaitTime += deltaTime

        if (this.shootWaitTime > this.shootRate) {
            this.createBullet()
            this.shootWaitTime = 0;
        }
    }

    createBullet() {
        if(this.bulletBuffType==BulletBuffType.M){
            this.createVerticalyMoveBullect(this.node.worldPosition.x,this.node.worldPosition.z - 7)
        }else if(this.bulletBuffType==BulletBuffType.H){
            this.createVerticalyMoveBullect(this.node.worldPosition.x - 2.5,this.node.worldPosition.z - 2)
            this.createVerticalyMoveBullect(this.node.worldPosition.x + 2.5,this.node.worldPosition.z - 2)
        } else {
            this.createSBullet(this.node.worldPosition.x + 2.5,this.node.worldPosition.z - 2,-20)
            this.createSBullet(this.node.worldPosition.x, this.node.worldPosition.z - 7,0)
            this.createSBullet(this.node.worldPosition.x - 2.5,this.node.worldPosition.z - 2,20)
        }
    }

    private createVerticalyMoveBullect(x:number, z:number){
        const bullet = instantiate(this.bulletPill)
        const bulletComponent = bullet.getComponent(Bullet);
        bulletComponent.camera = this.camera
        const rigidBody = bullet.getComponent(RigidBody);
        rigidBody.group = PhysicsGroup.MY_BULLET
        this.node.parent.addChild(bullet)
        bullet.setWorldPosition(x, this.node.worldPosition.y, z)
    }

    private createSBullet(x:number,z:number,rotate = 0){
        const bullet = instantiate(this.bulletMoon)
        const bulletComponent = bullet.getComponent(Bullet);
        bulletComponent.camera = this.camera
        bulletComponent.rotate = rotate;
        const rigidBody = bullet.getComponent(RigidBody);
        rigidBody.group = PhysicsGroup.MY_BULLET
        this.node.parent.addChild(bullet)

        bullet.setWorldPosition(x, this.node.worldPosition.y, z)
        
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
