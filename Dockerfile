# 使用官方 Node.js 12 轻量级镜像.
# https://hub.docker.com/_/node
FROM node:15

# 定义工作目录
WORKDIR /Volumes/Cream/dockerImage/freerunServer
# WORKDIR /Volumes/Cream/dockerImage/freeRunMysql

#环境变量  MYSQL_ROOT_PASSWORD mysql的root密码  MYSQL_DATABASE mysql的初始化数据库
# ENV MYSQL_ROOT_PASSWORD=123456 MYSQL_DATABASE=freeRun

# EXPOSE

# ln -s ~/node-v14.16.0-linux-x64/bin/node /usr/bin/node
# ln -s ~/node-v14.16.0-linux-x64/bin/npm /usr/bin/npm

# 将依赖定义文件拷贝到工作目录下
COPY package*.json ./

# 以 production 形式安装依赖
RUN npm install

# 将本地代码复制到工作目录内
COPY . ./

# 启动服务
CMD [ "npm", "start" ]