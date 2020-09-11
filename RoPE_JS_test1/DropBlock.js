class THREEJS
{
    constructor(CanvasID)
    {
        const w = 540;
        const h = 540;

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(CanvasID)
        });
        this.renderer.setClearColor( 0x8888dd )
        this.renderer.setSize( w, h )

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 40, w / h, 0.1, 1000 )
        this.camera.position.set(0,30,100)
        this.controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 )
        directionalLight.position.set( 200, 500, 300 )
        this.scene.add( directionalLight )

        // this.scene.add( new THREE.AmbientLight( 0x101020 ) )

        //document.body.appendChild( this.renderer.domElement )
    }

    add_mesh( _arg )
    {
        let mesh = new THREE.Mesh(
            new THREE.BoxGeometry( _arg.w,_arg.h,_arg.d),
            new THREE.MeshLambertMaterial( { color:0xffae63} )
        )
        mesh.cannon_rigid_body = _arg.body
        this.scene.add( mesh )
    }

    render()
    {
        for ( let mesh of this.scene.children )
        {
            if ( ! mesh.cannon_rigid_body ) continue

            mesh.position.copy(   mesh.cannon_rigid_body.position   )
            mesh.quaternion.copy( mesh.cannon_rigid_body.quaternion )
        }
        this.renderer.render( this.scene, this.camera )
    }
}


class CANNON_PHYSICS
{
    constructor( _threejs )
    {
        this.cannon_world = new CANNON.World()
        this.cannon_world.gravity.set( 0, -9.80665, 0 )
        this.cannon_world.broadphase = new CANNON.NaiveBroadphase()
        this.cannon_world.solver.iterations = 10

        this.threejs = _threejs
    }

    create_rigid_body( _arg )
    {
        const body  = new CANNON.Body( {
            mass:       _arg.mass,
            shape:      new CANNON.Box( new CANNON.Vec3(_arg.w/2,_arg.h/2,_arg.d/2) ),
            position:   new CANNON.Vec3( _arg.x, _arg.y, _arg.z ),
            material:   new CANNON.Material( { friction: 0.1, } ), // 摩擦係数 0.1 マテリアルを作成
        } )
        this.cannon_world.add( body )
        this.threejs.add_mesh( { body: body,w:_arg.w,h:_arg.h,d:_arg.d} )
    }

    render( _sec )
    {
        this.cannon_world.step( _sec )
        this.threejs.render()
    }
}

window.addEventListener('load', init);

    function init() {
      let cannon_phy = new CANNON_PHYSICS( new THREEJS('#DropBlock') );
      cannon_phy.create_rigid_body( {
        mass:0,x: 0, y: -0.2, z: 0, w: 50, h: 0.4, d: 50, color: 0x333333,
    } )
    


    for(let i = 0;i < 50;i++){
      cannon_phy.create_rigid_body( {
        mass: 1, x: 0, y: 30+i*1.1, z: 0, w: 1, h: 1, d: 1
    } )
    }
      tick();

      // 毎フレーム時に実行されるループイベントです
      function tick() {
        //mesh.rotation.y += 0.01;
        //renderer.render(scene, camera); // レンダリング
        cannon_phy.render( 1 / 60 )
        requestAnimationFrame(tick);
      }
    }