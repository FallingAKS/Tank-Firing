<script setup>
import { ref } from 'vue'

const npcNum = ref(3)
const difficulty = ref(0)
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
</script>

<template>
  <div style="position: relative; perspective: 1200px;">
    <div class="right-box" style="position: absolute; top: 310px; left: 946px; z-index: 5;
        min-width: 366px; min-height: 460px;">
      <div style="font-size: 24px; float: right;">
        机械恶犬数量：<span style="font-size: 106px;">{{ npcNum }}&nbsp;</span>
      </div>
      <div style="margin: 20px; margin-left: 40px; margin-right: 50px;">
        <el-slider v-model="npcNum" :step="1" :min="1" :max="9" show-stops :show-tooltip="false" />
      </div>

      <div style="font-size: 24px; float: left;">&nbsp;
        <span style="font-size: 94px;" :class="{
          'difficulty-green': difficultyLevel === '休闲',
          'difficulty-yellow': difficultyLevel === '谨慎',
          'difficulty-red': difficultyLevel === '地狱'
        }">
          &nbsp;{{ difficultyLevel }}
        </span>&nbsp;难度！
      </div>
      <div>
        <el-button type="success" size="large" @click="changeDifficulty('g')" style="font-size: large;">休闲难度</el-button>
        <el-button type="warning" size="large" @click="changeDifficulty('y')" style="font-size: large;">谨慎难度</el-button>
        <el-button type="danger" size="large" @click="changeDifficulty('r')" style="font-size: large;">地狱难度</el-button>
      </div>
      <div style="font-size: 20px; margin: 14px;">
        {{ difficultyInfo }}
      </div>
    </div>

    <img src="../assets/img/bg.jpg" style=" z-index: 1;" />

    <img src="../assets/img/pve.png" class="zoomable hover1"
      style="position: absolute; top: 524px; left: 50px; z-index: 5;" />
    <img src="../assets/img/pvp.png" class="zoomable hover2"
      style="position: absolute; top: 53%; left: 36%; z-index: 8;" />
    <img src="../assets/img/pvpve.png" class="zoomable hover3"
      style="position: absolute; top: 68%; left: 37%; z-index: 5;" />

    <img src="../assets/img/robodog.png" id="hover1up"
      style="position: absolute; top: 530px; left: 170px; z-index: 2; transition: transform 0.5s ease-out;" />
    <img src="../assets/img/pveinfo.png" id="hover1down" width="300"
      style="position: absolute; top: 528px; left: 80px; z-index: 4; transition: transform 0.3s ease-out;" />
    <img src="../assets/img/pvpinfo.png" id="hover2down" width="300"
      style="position: absolute; top: 464px; left: 536px; z-index: 6; transition: transform 0.3s ease-out;" />
    <img src="../assets/img/pvpveinfo.png" id="hover3down" width="300"
      style="position: absolute; top: 606px; left: 536px; z-index: 4; transition: transform 0.3s ease-out;" />

    <img src="../assets/img/blank.jpg" width="350" style="position: absolute; top: 530px; left: 85px; z-index: 3;" />
    <img src="../assets/img/blank2.jpg" width="350" style="position: absolute; top: 452px; left: 505px; z-index: 7;" />
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

.hover1:hover~#hover1up {
  transform: translateY(-240px);
}

.hover1:hover~#hover1down {
  transform: translateY(92px);
}

.hover2:hover~#hover2down {
  transform: translateY(92px);
}

.hover3:hover~#hover3down {
  transform: translateY(88px);
}
</style>
