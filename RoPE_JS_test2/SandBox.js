class THREEJS
{
    constructor(CanvasID)
    {
        const h = 600;
        const w = 1000;

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(CanvasID)
        });
        this.renderer.setClearColor( 0x000000 )
        this.renderer.setSize( w, h )

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 40, w / h, 0.1, 1000 );
        this.camera.position.set(0,7.5,20);
        this.controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( 200, 500, 300 );
        this.scene.add( directionalLight );
    }

    add_mesh( _arg )
    {
        let mesh = new THREE.Mesh(
            new THREE.BoxGeometry( _arg.w,_arg.h,_arg.d),
            new THREE.MeshLambertMaterial( { color:0xffae63} )
        )
        mesh.position.set(_arg.x,_arg.y,_arg.z);
        this.scene.add( mesh )
    }

    render()
    {
        this.renderer.render( this.scene, this.camera )
    }
}





window.addEventListener('load', init);

function init() {

  const canvas = document.querySelector('#SandBox');
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('click',CanvasClick);
  let three = new THREEJS('#SandBox');
  //RayCaster
  const raycaster = new THREE.Raycaster();
  //mouse
  const mouse = new THREE.Vector2();
  //mouseEvent MOVE
  function handleMouseMove(event) {
    const element = event.currentTarget;
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    mouse.x = ( x / w ) * 2 - 1;
    mouse.y = -( y / h ) * 2 + 1;
  }
  //mouseEvent Click on Canvas
  function CanvasClick(event){
    raycaster.setFromCamera(mouse,three.camera);
    const intersects = raycaster.intersectObjects(three.scene.children);
    if(intersects.length > 0){

      let addx = intersects[0].object.position.x + intersects[0].face.normal.x;
      let addy = intersects[0].object.position.y + intersects[0].face.normal.y;
      let addz = intersects[0].object.position.z + intersects[0].face.normal.z;

      three.add_mesh({
        x:addx,y:addy,z:addz, w: 1, h: 1, d: 1
      });
      //intersects[0].object.material.color.setHex("0x000000");
      console.log(addx)
    }
  }


  for(let i = 0;i < 50;i++){
    three.add_mesh( {
        x: 0, y: i*1.1, z: 0, w: 1, h: 1, d: 1
    } )
  }
      
  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    three.render();
    requestAnimationFrame(tick);
  }
}