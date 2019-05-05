<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel height="150px">
                  <el-carousel-item v-for="item in imglist" :key="item.id">
                    <img :src="item.original_path" alt>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          v-model="num"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <!-- tab切换 -->
                <ul>
                  <li>
                    <a href="javascript:;" @click="index=1" :class="{selected:index==1}">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="index=2" :class="{selected:index==2}">商品评论</a>
                  </li>
                </ul>
              </div>
              <div
                class="tab-content entry"
                style="display: block;"
                v-html="goodsinfo.content"
                v-show="index==1"
              ></div>
              <div class="tab-content" style="display: block;" v-show="index==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model.trim="comments"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="postcomments"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in commentsList" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time|formatTime}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pageIndex"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalcount"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <a href="#/site/goodsinfo/90" class>
                        <img :src="item.img_url">
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/90" class>{{item.title}}</a>
                      <span>{{item.add_time|formatTime}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import moment from "moment";
export default {
  name: "detail",
  data() {
    return {
      hotgoodslist: [],
      goodsinfo: {},
      imglist: [],
      index: 1,
      comments: "",
      pageSize: 10,
      pageIndex: 1,
      commentsList: [],
      totalcount: 0,
      num:1
    };
  },
  created() {
    this.getcomments();
    // console.log(this.$route.params.id);
    const id = this.$route.params.id;
    //获取id,发送请求
    this.$axios
      .get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${id}`)
      .then(res => {
        // console.log(res);
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.goodsinfo = res.data.message.goodsinfo;
        this.imglist = res.data.message.imglist;
      });
  },
  methods: {
    postcomments() {
      if (!this.comments) {
        this.$message.error("写点啥呗!!!");
      } else {
        //有东西发送请求
        this.$axios
          .post(
            `http://111.230.232.110:8899/site/validate/comment/post/goods/${
              this.$route.params.id
            }`,
            {
              commenttxt: this.comments
            }
          )
          .then(res => {
            // console.log(res);
            if (res.data.status == 0) {
              this.$message.success(res.data.message);
              this.getcomments();
            }
          });
      }
      this.comments = "";
    },
    //将获取评论抽取为一个方法多次调用
    getcomments() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(res => {
          console.log(res);
          this.commentsList = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getcomments();
    },
    handleCurrentChange(current) {
      this.pageIndex = current;
      this.getcomments();
    }
  },
  // filters: {
  //   formatTime(value) {
  //     return moment(value).format("YYYY年MM月DD日");
  //   }
  // }
};
</script>

<style>
.tab-content img {
  display: block;
  width: 100%;
}
.pic-box .el-carousel__item {
  width: 395px;
  height: 320px;
}
.pic-box .el-carousel__item img {
  width: 100%;
  height: 100%;
  display: block;
}
.pic-box {
  width: 395px;
  height: 320px;
}
.pic-box .el-carousel {
  width: 100%;
  height: 100%;
}
</style>
