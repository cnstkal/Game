/* Camera app — real device camera only */
let cameraStream=null;
let cameraFacing='environment';

function cameraApp(){
  return `<div class="scr app cameraapp">
    <div class="camera-view">
      <video id="camera-video" autoplay playsinline muted></video>
      <canvas id="camera-canvas" hidden></canvas>
      <div class="camera-top"><button class="camera-flash" type="button">⚡</button><button class="camera-live" type="button">◉</button></div>
      <div class="camera-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="camera-controls"><div class="camera-zoom">1×</div><button class="camera-shutter" data-act="camera-shot" aria-label="사진 촬영"><span></span></button><button class="camera-switch" data-act="camera-switch" aria-label="카메라 전환">↻</button></div>
      <div class="camera-modes"><button type="button">비디오</button><button type="button" class="active">사진</button><button type="button">인물 사진</button></div>
      <button class="camera-back" data-act="home" aria-label="홈으로">➝</button>
    </div>
  </div>`;
}
async function cameraStart(){
  const video=document.getElementById('camera-video');
  if(!video||!navigator.mediaDevices?.getUserMedia)return;
  cameraStop();
  try{
    cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:cameraFacing},width:{ideal:1920},height:{ideal:1080}},audio:false});
    video.srcObject=cameraStream;
  }catch(e){}
}
function cameraStop(){if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null;}}
function cameraShot(){
  const video=document.getElementById('camera-video'),canvas=document.getElementById('camera-canvas');
  if(!video||!canvas||!video.videoWidth)return;
  canvas.width=video.videoWidth;canvas.height=video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
  const view=document.querySelector('.camera-view');
  if(view){view.classList.add('camera-captured');setTimeout(()=>view.classList.remove('camera-captured'),160);}
}
async function cameraSwitch(){cameraFacing=cameraFacing==='environment'?'user':'environment';await cameraStart();}
