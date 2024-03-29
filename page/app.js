/**
 * Created by zx on 2017/10/31.
 *
 * update by yx on 2017/11/14 15:20
 *
 */
"use strict";
//引用模块
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const logger = require("morgan");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const myEjs = require("ejs");

//配置ejs
app.set("views",__dirname+"/views");
app.engine("html",myEjs.__express);
app.set("view engine","html");
//读取post数据
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//路由引用
const userRoute =require("./route/userRoute.js");     //用户
const shopRoute =require("./route/shopRoute.js");   //商城

//cookie配置
app.use(cookieparser());
app.use(session({
    name:"test",
    secret:"1234",
    cookie:{maxAge:80000},
    rolling:true,
    resave:true
}));


//路由
app.use("/user",userRoute);       //用户
app.use("/shop",shopRoute);     //商品

app.use(logger("dev"));
//配置静态资源
app.use(express.static(path.join(__dirname,"public")));

//创建端口
app.listen(9999,function(){
    console.log("服务器已开启~~port:9999")
});

