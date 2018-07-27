<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
	  <div class="luck" v-if="showToast">
	  		<div class="luck_wrap">
				<div class="desc">
					<i @click="close" class="fa fa-close close"></i>
					<div class="logo"></div>
					<div class="draw">
            <!-- v-if="toastType==='luck'" -->
						<p>恭喜你中奖啦！</p>
						<!-- <p v-else="toastType==='comeOn'">come on!</p> -->
					</div>
				</div>
				<button class="agine" @click="close();open()" >再来一次</button>
			</div>
	  </div>
  	</transition>
</template>

<script>
export default {
  props:["showToast","toastType"],
  data(){
  	return {
  	}
  },	
  methods:{
  	close(){
  		this.showToast = false
  	},
  	open(){
  		// 子组件触发父组件的方法
  		this.$emit("startLottery")
  	}
  }
}
</script>

<style lang="scss">
@import "@/style/reset.scss";
@import "@/style/common.scss";
 .luck{
 	.luck_wrap{
 		position: absolute;
 		top: 33%;
 		left: 50%;
 		transform: translate(-50%,-50%);
 		z-index: 999;
 		width: px-rem(260);
      	height: px-rem(260);
      	background: #fff;
      	border-radius: 0.5rem;
      	.desc{
      		width: 90%;
      		height: 70%;
      		margin: 0 auto;
      		margin-top: 1rem;
      		.close{
      			position: absolute;
      			right: 0.2rem;
      			border: 1px solid #333;
      			border-radius: 50%;
      			width: px-rem(20);
      			height: px-rem(20);
      			line-height: px-rem(20);
      			text-align: center;
      			font-size: px-rem(16);
      		}
      		.logo{
      			width: 80%;
      			height: 60%;
      			margin: 0 auto;
      		}
      		.draw{
      			margin-top: 10%;
      			height: 20%;
      			font-weight: 600;
      			font-size: px-rem(16);
      		}
      	}
		.agine{
			border: none;
			outline: none;
		    width: 80%;
		    height: 1.5rem;
		    border-radius: 1rem;
			background: red;
			background: red;
			font-weight: 600;
			color: #fff;
			font-size: px-rem(16);
		}
 	}
 }
</style>
