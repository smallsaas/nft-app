cd unpackage/dist/build
tar cvf h5.tar h5
if [ -f ~/Desktop/h5.tar ];then 
  rm -f ~/Desktop/h5.tar
fi

## to server
echo scp unpackage/dist/build/h5.tar root@api.dev.smallsaas.cn:/data/compose/1/attachments
scp h5.tar root@api.dev.smallsaas.cn:/data/compose/1/attachments

echo curl -O http://api.dev.smallsaas.cn:8086/attachments/h5.tar

## to desktop 
# mv h5.tar ~/Desktop
# ls ~/Desktop/h5.tar
