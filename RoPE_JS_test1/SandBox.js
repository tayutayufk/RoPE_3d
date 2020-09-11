

window.addEventListener('load', init);

    function init() {
      let cannon_phy = new CANNON_PHYSICS( new THREEJS('#SandBox') );
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