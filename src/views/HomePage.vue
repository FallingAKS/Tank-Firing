<script setup>
import {onMounted, ref} from 'vue'
import {ElMessage} from "element-plus";
import router from "../router";

const npcNum = ref(localStorage.getItem('npcNum') ? parseInt(localStorage.getItem('npcNum')) : 3)
const difficulty = ref(localStorage.getItem('difficulty') ? parseInt(localStorage.getItem('difficulty')) : 0)
const difficultyLevel = ref('休闲')
const difficultyInfo = ref('想来试炼场度假？')

function changeDifficulty(color) {
  if (color === 'g') {
    difficulty.value = 0;
    difficultyLevel.value = '休闲';
    difficultyInfo.value = '想来试炼场度假？';
  } else if (color === 'y') {
    difficulty.value = 1;
    difficultyLevel.value = '谨慎';
    difficultyInfo.value = '谨慎！再谨慎！！';
  } else {
    difficulty.value = 2;
    difficultyLevel.value = '地狱';
    difficultyInfo.value = '已启动自毁倒计时……';
  }
}

function clickPve() {
  localStorage.setItem('npcNum', npcNum.value.toString());
  localStorage.setItem('difficulty', difficulty.value.toString());

  // ElMessage({
  //   message: 'PVE功能暂未开放！',
  //   type: 'warning'
  // });

  // router.push('/pve');
  window.location.href = '../../static/pve.html';
}
function clickPvp() {
  localStorage.setItem('npcNum', npcNum.value.toString());
  localStorage.setItem('difficulty', difficulty.value.toString());

  // ElMessage({
  //   message: 'PVP功能暂未开放！',
  //   type: 'warning'
  // });

  // router.push('/pvp');
  window.location.href = '../../static/pvp.html';
}
function clickPvpve() {
  localStorage.setItem('npcNum', npcNum.value.toString());
  localStorage.setItem('difficulty', difficulty.value.toString());

  // ElMessage({
  //   message: 'PVPVE功能暂未开放！',
  //   type: 'warning'
  // });

  // router.push('/pvpve');
  window.location.href = '../../static/pvpve.html';
}

function clickShiba() {
  localStorage.setItem('npcNum', npcNum.value.toString());
  localStorage.setItem('difficulty', difficulty.value.toString());

  // ElMessage({
  //   message: '十八罗汉塔《试炼场》功能暂未开放！',
  //   type: 'warning'
  // });

  // router.push('/shiba');
  window.location.href = '../../static/shiba.html';
}

// 页面加载时，根据localStorage中的difficulty设置difficultyLevel和difficultyInfo
if (difficulty.value === 0) {
  difficultyLevel.value = '休闲';
  difficultyInfo.value = '想来试炼场度假？';
} else if (difficulty.value === 1) {
  difficultyLevel.value = '谨慎';
  difficultyInfo.value = '谨慎！再谨慎！！';
} else {
  difficultyLevel.value = '地狱';
  difficultyInfo.value = '已启动自毁倒计时……';
}

// const backgroundMusic = ref(null);
//
// onMounted(() => {
//   if (backgroundMusic.value) {
//     backgroundMusic.value.play().catch(e => {
//       console.error("Audio playback failed:", e);
//     });
//   }
// });
</script>

<template>
<!--  <audio ref="backgroundMusic" loop autoplay hidden>-->
<!--    <source src="../../static/epic-hollywood-trailer-9489.mp3" type="audio/mpeg">-->
<!--    Your browser does not support the audio element.-->
<!--  </audio>-->
  <div style="position: relative; perspective: 1200px;">
    <div class="right-box" style="position: absolute; top: 300px; left: 946px; z-index: 5;
        min-width: 366px; min-height: 460px;">
      <div style="font-size: 24px; float: right;">
        机械恶犬数量：<span style="font-size: 106px;">{{ npcNum }}&nbsp;</span>
      </div>
      <div style="margin: 20px; margin-left: 40px; margin-right: 50px;">
        <el-slider v-model="npcNum" :max="9" :min="1" :show-tooltip="false" :step="1" show-stops/>
      </div>

      <div style="font-size: 24px; float: left;">&nbsp;
        <span :class="{
          'difficulty-green': difficultyLevel === '休闲',
          'difficulty-yellow': difficultyLevel === '谨慎',
          'difficulty-red': difficultyLevel === '地狱'
        }" style="font-size: 94px;">
          &nbsp;{{ difficultyLevel }}
        </span>&nbsp;难度！
      </div>
      <div>
        <el-button size="large" style="font-size: large;" type="success" @click="changeDifficulty('g')">休闲难度
        </el-button>
        <el-button size="large" style="font-size: large;" type="warning" @click="changeDifficulty('y')">谨慎难度
        </el-button>
        <el-button size="large" style="font-size: large;" type="danger" @click="changeDifficulty('r')">地狱难度
        </el-button>
      </div>
      <div style="font-size: 20px; margin: 14px;">
        {{ difficultyInfo }}
      </div>
      <el-button  style="font-size: large;" type="primary" @click="clickShiba">十八罗汉塔《试炼场》</el-button>
      <br><span>&nbsp;</span>
    </div>

    <img src="../assets/img/bg.jpg" style=" z-index: 1;"/>

    <img class="zoomable hover1" src="../assets/img/pve.png" style="position: absolute; top: 524px; left: 50px; z-index: 5;"
         @click="clickPve"/>
    <img class="zoomable hover2" src="../assets/img/pvp.png" style="position: absolute; top: 53%; left: 36%; z-index: 8;"
         @click="clickPvp"/>
    <img class="zoomable hover3" src="../assets/img/pvpve.png" style="position: absolute; top: 68%; left: 37%; z-index: 5;"
         @click="clickPvpve"/>

    <img id="hover1up" src="../assets/img/robodog.png"
         style="position: absolute; top: 530px; left: 170px; z-index: 2; transition: transform 0.5s ease-out;"/>
    <img id="hover1down" src="../assets/img/pveinfo.png" style="position: absolute; top: 528px; left: 80px; z-index: 4; transition: transform 0.3s ease-out;"
         width="300"/>
    <img id="hover2down" src="../assets/img/pvpinfo.png" style="position: absolute; top: 464px; left: 536px; z-index: 6; transition: transform 0.3s ease-out;"
         width="300"/>
    <img id="hover3down" src="../assets/img/pvpveinfo.png" style="position: absolute; top: 606px; left: 536px; z-index: 4; transition: transform 0.3s ease-out;"
         width="300"/>

    <img src="../assets/img/blank.jpg" style="position: absolute; top: 530px; left: 85px; z-index: 3;" width="350"/>
    <img src="../assets/img/blank2.jpg" style="position: absolute; top: 452px; left: 505px; z-index: 7;" width="350"/>
  </div>
</template>

<style scoped>
.difficulty-green {
  color: #67c23a;
}

.difficulty-yellow {
  color: #e6a23c;
}

.difficulty-red {
  color: #f56c6c;
}

.right-box {
  border: solid 10px #000;
  color: #000;
  background: #ffffffd2;
  transform: rotateY(-55deg) translateZ(60px) scale(.92);
}

.zoomable {
  transition: transform 0.3s ease-out;
}

.zoomable:hover {
  transform: scale(1.2);
}

.hover1:hover ~ #hover1up {
  transform: translateY(-240px);
}

.hover1:hover ~ #hover1down {
  transform: translateY(92px);
}

.hover2:hover ~ #hover2down {
  transform: translateY(92px);
}

.hover3:hover ~ #hover3down {
  transform: translateY(88px);
}
</style>
