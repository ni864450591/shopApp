<template>
    <!-- position -->
<div>
     <div class="position">
        <span class="iconfont position__icon">&#xe613;</span>
        北京理工大学国防科技园2号楼10层
        <span class="iconfont position__notice">&#xe880;</span>
      </div>
      <!-- search -->
      <div class="search">
        <span class="iconfont">&#xe630;</span>
        <input type="text" placeholder="山姆会员商店优惠商品">
      </div>
      <!-- banner -->
      <div class="banner">
        <img
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        class="banner__img"
        />
      </div>
    <!-- icons -->
      <div class="icons">
        <div class="icons__item" v-for="item in iconList" :key="item.desc">
          <img
            class="icons__item__img"
            :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
          />
          <p class="icons__item__desc">{{item.desc}}</p>
        </div>
      </div>
      <div class='gap'></div>
</div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';  //可以复用的样式
@import '../../style/viriables.scss';//主题颜色等
 // 位置
  .position{
    @include ellipse;   //单行文本隐藏
    position:relative;
    padding:.16rem .24rem 0 0;
    line-height: .22rem;
    font-size:.16rem;
    .position__icon{     //这里涉及到了优先级
      position: relative;   //这里的位置要微调一下
      top:.01rem;
      font-size:.2rem;
    }
    .position__notice{    //这里的位置要调一下
      font-size:.2rem;
      position: absolute;
      right:0;
      top:.17rem;  //因为这里是用了padding挤了 .16rem
    }
    color:$content-fontcolor;  //主题色的引入
  }
  // 搜索框
  .search{
    margin:0.1rem 0 .12rem 0;
    line-height: .32rem;
    background-color: $search-input-bgcolor;
    border-radius: .16rem;
    .iconfont{
      padding:0 .08rem 0 .16rem;
      font-size:.2rem;
    }
    input{
      position: relative;
      top:-.02rem;
      background:none;
      border: none;
      font-size: .14rem;
      color:$search-input-color;
      outline: none;
    }
  }
  // banner
  .banner{
    height:0;
    overflow: hidden;
    padding-bottom: 25.4%; //先撑开屏幕宽的25.4%，留出位置
    &__img{
    width:100%;
    }
  }
  //icons
  .icons{
    display: flex;
    flex-wrap: wrap;
    margin-top: .16rem;
    &__item{
      width:20%;
      &__img{
        display:block;
        width: .4rem;
        height:.4rem;
        margin:0 auto;
      }
      &__desc{
        margin:.06rem 0 .16rem 0;
        text-align: center;
        color:$content-fontcolor;
        font-size: .12rem;
      }
    }
  }
  // gap
  .gap{
    height: .1rem;
    background-color:$content-bgcolor;
    margin: 0 -.18rem;
  }
</style>
