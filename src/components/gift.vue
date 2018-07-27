<template>
  <div class="luckDraw">
    <!-- <title-bar :title="title"></title-bar> -->
    <div class="container">
      <div class="turntable-wrapper">
        <div class="luck-wrapper">
          <p class="integral">我的积分: <span>1000</span></p>
          <ul class="nineGrid">
            <li class="row">
              <div v-for="(item,n) in row1" :key="n" :class="index === n ? `active` : ``">
                <div class="wrapper">
                  <img :src="item.imgUrl" alt="">
                </div>
                <div class="mask"></div>
              </div>
            </li>
            <li class="row">
              <div :class="index === 7 ? 'active': ''">
                <div class="wrapper">
                  <img src="@/img/lottery/icon-lottery-prize4.png" alt="">
                </div>
                <div class="mask"></div>
              </div>
              <div class="getLuck" @click="startLottery">
                <img src="@/img/lottery/icon-lottery-btn.png" alt="">
              </div>
               <div :class="index === 3 ? 'active': ''">
                <div class="wrapper">
                  <img src="@/img/lottery/icon-lottery-prize5.png" alt="">
                </div>
                <div class="mask"></div>
              </div>
            </li>
            <li class="row">
              <div v-for="(item,n) in row1" :key="n" :class="index === 6-n ? `active` : ``">
                <div class="wrapper">
                  <img :src="item.imgUrl" alt="">
                </div>
                <div class="mask"></div>
              </div>
            </li>
          </ul>
        </div>

        <p class="share">分享领积分 <i class="icon-go"></i></p>
        <div class="rule">
          <p class="rule-title">活动规则</p>
          <ul class="rule-main">
            <li>1、活动时间：2018年8月8日起；</li>
            <li>2、活动期间，谭八爷用户每次抽奖消耗20积分，抽奖次数不限</li>
            <li>3、金钻可用于向投顾提问、送礼、赞赏；</li>
            <li>4、积分赚取：每日签到、分享文章/问答/直播间、点赞、金钻充值均可获得积分哦</li>
            <li>5、活动最终解释权归谭八爷所有。</li>
          </ul>
        </div>

        <div>今日剩余抽奖次数： {{lottery_ticket}}</div>
      </div>

      <luck-toast :showToast="showToast" :toastType="toastType" @closeToast="closeToast" @startLottery="startLottery"></luck-toast>
    </div>
  </div>
</template>
<script>
import LuckToast from "./lucktoast"
export default {
  components:{
    LuckToast
  },
  data(){
    return {
      row1:[
        {imgUrl:require('@/img/lottery/icon-lottery-prize1.png')},
        {imgUrl:require('@/img/lottery/icon-lottery-prize2.png')},
        {imgUrl:require('@/img/lottery/icon-lottery-prize3.png')}
      ],
      row2:[
        {imgUrl:require('@/img/lottery/icon-lottery-prize6.png')},
        {imgUrl:require('@/img/lottery/icon-lottery-prize7.png')},
        {imgUrl:require('@/img/lottery/icon-lottery-prize8.png')}
      ],
      title: '积分转盘',
      index: -1,    // 当前转动到哪个位置，起点位置
      lottery_ticket:3, //初始抽奖次数    
      count: 8,    // 总共有多少个位置
      timer: 0,
      timer2:0,    // 每次转动定时器
      speed: 200,   // 初始转动速度
      times: 0,    // 转动次数
      cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,   // 中奖位置
      click: true,
      showToast: false,
      toastType: 'luck',
    }
  },
  methods:{
    startLottery(){
      if (!this.click) {
        return
      }
      this.closeToast()
      this.speed = 200
      this.click = false
      this.lottery_ticket--
      if(this.lottery_ticket>=0){
        this.startRoll()
      }else{
        this.lottery_ticket=0
      }
    },
     // 开始转动
    startRoll(){
      this.times += 1  // 转动次数
      this.oneRoll()  // 转动过程调用的每一次转动方法，这里是第一次调用初始化

      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if(this.times > this.cycle + 10 && this.prize === this.index){
        clearTimeout(this.timer)   // 清除转动定时器，停止转动
        this.prize = -1
        this.times = 0
        this.click = true
        this.timer2=setTimeout(()=>{
          this.showToast = true
        },1000)
        this.toastType = 'comeOn'
        console.log('你已经中奖了')
      }else{
        if(this.times < this.cycle){
          this.speed -= 10   // 加快转动速度
        }else if(this.times === this.cycle) {    // 随机获得一个中奖位置
          const index = parseInt(Math.random() * 10, 0) || 0
          this.prize = index
          if(this.prize > 7){
            this.prize = 7
          }
          console.log(`中奖位置${this.prize}`)
        }else if(this.times > this.cycle + 10 &&
          ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
          this.speed += 110
        } else{
          this.speed += 20
        }

        if(this.speed < 40){
          this.speed = 40
        }
        this.timer = setTimeout(this.startRoll, this.speed)
      }
    },

    // 每一次转动
    oneRoll(){
      let index = this.index  // 当前转动到哪个位置
      const count = this.count  // 总共有多少个位置
      index += 1
      if(index > count - 1) {
        index = 0
      }
      this.index = index
    },

    // 关闭弹出框
    closeToast(){
      this.showToast = false
      clearTimeout(this.timer2)
    }
  }
}
</script>

<style lang="scss">
@import "@/style/reset.scss";
@import "@/style/common.scss";
.luckDraw {
  width:100%;
  height:100%;
  .container{
    width:100%;
    height:100%;
    .turntable-wrapper {
    padding: 0 px-rem(38);
    position: relative;
    /*@include background-cover("background-luck.png");*/
    /* padding-top: px-rem(121); */
    .luck-wrapper {
      width: px-rem(300);
      height: px-rem(377);
      margin: 0 auto;
      position: relative;
      /*@include background-cover("background-turntable.png");*/
      .integral {
        width: 100%;
        color: #6d2d00;
        font-size: px-rem(16);
        font-weight: normal;
        text-align: center;
        position: absolute;
        top: px-rem(58);
        span {
          font-weight: 600;
          color: #ff2f4d;
        }
      }
      .nineGrid {
        position: absolute;
        top: px-rem(86);
        left: 50%;
        margin-left: px-rem(-130);
        width: px-rem(260);
        height: px-rem(260);
        li {
          height: px-rem(80);
          display: flex;
          margin-top: px-rem(5);
          > div {
            flex: 1;
            margin-right: px-rem(5);
            height: 100%;
            text-align: center;
            position: relative;
            .wrapper {
              width: 100%;
              height: 100%;
              margin: 0;
              /*@include background-cover("background-grid.png");*/
            }
            img {
              width: 100%;
              height: 100%;
              vertical-align: middle;
              margin-top: px-rem(8);
            }
            .mask {
              position: absolute;
              top: px-rem(9);
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.5;
              border-radius: px-rem(10);
              background-color: #000;
              display: none;
            }
          }
          > div.active {
            .mask {
              display: block;
            }
          }
          > div:first-child {
            margin-left: px-rem(5);
          }
          > div.getLuck {
            /*@include background-cover("background-getLuck.png");*/
            font-size: 0;
          }
        }
        li:last-child {
          margin-bottom: px-rem(5);
        }
      }
    }
    .share {
      width: px-rem(160);
      height: px-rem(42);
      margin: 0 auto;
      text-align: center;
      line-height:px-rem(42);
      /*@include background-cover("luckShrae.png");*/
      margin-top: px-rem(22);
      color: #6d2d00;
      font-size: px-rem(16);
      font-weight: 600;
      .icon-go {
        /*@include size(30);*/
        /*@include background-cover("goShare-icon.png");*/
        display: inline-block;
        vertical-align: middle;
        margin-bottom: px-rem(2);
      }
    }
    .rule {
      margin-top: px-rem(14);
      color: #fff;
      font-size: px-rem(14);
      padding-bottom: px-rem(39);
      .rule-title {
        text-align: center;
        position: relative;
        font-size: px-rem(16);
        margin-bottom: px-rem(14);
      }
      .rule-title:before,
      .rule-title:after {
        content: '';
        position: absolute;
        top: 52%;
        background: #fff;
        width: 30%;
        height: px-rem(1);
      }
      .rule-title:before {
        left: 0;
      }
      .rule-title:after {
        right: 0;
      }
      .rule-main{
        text-align: left;
      }
    }
  }
  }
  
}
</style>
