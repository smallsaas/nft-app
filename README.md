# h5-render (UI:Vant DevTools:HBuilder X)

## 工具

[HBuilder X工具官網](https://www.dcloud.io/hbuilderx.html)

[規範定義](https://github.com/smallsaas/auto-render)

## 使用方法

h5-render 需要配合工具 HBuilder X 進行開發，請前往上面的地址下載工具

使用 運行>運行到浏覽器 打開

## 打包方法

使用 HBuilder X 中的打包功能進行打包

## 動态頁面緩存策略

> 緩存策略隻對動态頁面數據進行緩存，不對其餘組件做操作

### 緩存策略配置方法

前往[config.js](./config.js)進行配置

以下是對于有關緩存策略項的說明:

#### cachePolicy

說明：對緩存的策略 以天時間單位來決定頁面緩存的時間 爲0不進行緩存

#### clearPageCache

說明：決定是否在重新進入程序時清除原先的頁面緩存

## 全局變量及說明

### this.$config

說明：引用主目錄下的 config.js 文件中的 globalConfig 内容

### this.$api

說明：引入主目錄下的 common/api.js 文件中的 api 屬性

### this.$cache.(function)

說明：永久緩存

**this.$cache.get(key):** 獲取指定key的永久緩存

**this.$cache.set(key,value):** 設置指定key的永久緩存

**this.$cache.remove(key):** 删除指定key的永久緩存

**this.$cache.clear()** 清除所有緩存

### this.$timeCache(key,value,time)

說明：臨時緩存

**this.$timeCache(key)** 獲取指定key緩存
**this.$timeCache(key,value,time)** 設置臨時緩存 如果time不設置 默認一天

### this.$reload()

說明：重新加載當前頁面

## 全局組件

dynamic-page:自動頁面

dynamic-form:自動表單

dynamic-list:自動列表

card:帶有标題的容器

## 自動頁面、自動列表、自動表單加組件方法

進入 "@/components/dynamic-page/index.vue"，在
```vue
	<view v-for="(item, index) in config.modules" :key="index">
```
下面增加組件，然後 import 引入組件，在components中引入即可

以此類推，自動列表和自動頁面同理

### 注意
自動表單加組件需要在"@/components/dynamic-form/BaseVants.vue"中加

## 頁面數據

頁面數據放置在http文件夾中 請使用Vscode中的rest-client插件進行操作

## vant組件編譯工具

地址 [./utils/vant-build-tools.js](./utils/vant-build-tools.js)
使用方法 node vant-build-tools.js 會生成vantComponents.js 将内容複制到main.js即可