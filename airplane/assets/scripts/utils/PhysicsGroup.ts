 enum PhysicsGroup{
    DEFAULT = 1<<0,
    MY_PLANE = 1<<1,
    ENEMY_PLANE = 1<<2,
    MY_BULLET = 1<<3,
    ENEMY_BULLET = 1<<4,
    BULLET_BUFF = 1<<5
}

export default PhysicsGroup