# h5-render (UI:Vant DevTools:HBuilder X)

## 工具

[HBuilder X工具官网](https://www.dcloud.io/hbuilderx.html)

[规范定义](https://github.com/smallsaas/auto-render)

## 使用方法

h5-render 需要配合工具 HBuilder X 进行开发，请前往上面的地址下载工具

使用 运行>运行到浏览器 打开

## 打包方法

使用 HBuilder X 中的打包功能进行打包

## 全局变量及说明

### this.$config

说明：引用主目录下的 config.js 文件中的 globalConfig 内容

### this.$api

说明：引入主目录下的 common/api.js 文件中的 api 属性

### this.$cache.(function)

说明：永久缓存

**this.$cache.get(key):** 获取指定key的永久缓存

**this.$cache.set(key,value):** 设置指定key的永久缓存

**this.$cache.remove(key):** 删除指定key的永久缓存

**this.$cache.clear()** 清除所有缓存

### this.$timeCache(key,value,time)

说明：临时缓存

**this.$timeCache(key)** 获取指定key缓存
**this.$timeCache(key,value,time)** 设置临时缓存 如果time不设置 默认一天

### this.$reload()

说明：重新加载当前页面

## 全局组件

dynamic-page:自动页面

dynamic-form:自动表单

dynamic-list:自动列表

card:带有标题的容器

## 自动页面、自动列表、自动表单加组件方法

进入 "@/components/dynamic-page/index.vue"，在
```vue
	<div v-for="(item, index) in config.modules" :key="index">
```
下面增加组件，然后 import 引入组件，在components中引入即可

以此类推，自动列表和自动页面同理

### 注意
自动表单加组件需要在"@/components/dynamic-form/BaseVants.vue"中加

## 页面数据

页面数据放置在http文件夹中 请使用Vscode中的rest-client插件进行操作
