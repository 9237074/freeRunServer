FROM node:15

# 定义工作目录
# WORKDIR /Volumes/Cream/dockerImage/freerunServer

# 将依赖定义文件拷贝到工作目录下
COPY package*.json ./

# 以 production 形式安装依赖
RUN npm install

# 将本地代码复制到工作目录内
COPY . ./

# 启动服务
CMD [ "npm", "start" ]