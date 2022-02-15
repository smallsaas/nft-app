## package name
block.metagugu


### h5
unpackage/dist/build/h5

### HBuilderX Account
```
1971130008@qq.com
ruohan7080907900
```


```
location /download {
  add_header Access-Control-Allow-Origin *
  add_header Access-Control-Allow-Credentials true
  add_header Access-Control-Max-Age 1800
  add_header Access-Control-Allow-Methods 'GET, OPTIONS'
  add_header Access-Control-Allow-Headers *

  if ($request_method = 'OPTIONS') {
      return 204;
  }

  alias /usr/share/nginx/download/
}
```
