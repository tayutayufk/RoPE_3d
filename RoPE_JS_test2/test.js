window.addEventListener('load', init);

    function init() {

      // サイズを指定
      const width = 540;
      const height = 540;

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      //renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // シーンを作成
      const scene = new THREE.Scene();

    
      // カメラを作成
      const camera = new THREE.PerspectiveCamera(45, width / height,1,10000);
      camera.position.set(0, 0, 1000);

      const controls = new THREE.OrbitControls(camera,renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      //球体を作成
      const geometry = new THREE.SphereGeometry(300,80,80);
      
      const loader = new THREE.TextureLoader();
      const texture = loader.load('earthmap1k.jpg');
      const material = new THREE.MeshToonMaterial(
          {map:texture}
          );

      const mesh = new THREE.Mesh(geometry,material);
      scene.add(mesh);

      const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
      directionalLight.position.set(1, 1, 1);
      // シーンに追加
      scene.add(directionalLight);

      

      tick();

      // 毎フレーム時に実行されるループイベントです
      function tick() {
        //mesh.rotation.y += 0.01;
        renderer.render(scene, camera); // レンダリング

        requestAnimationFrame(tick);
      }
    }