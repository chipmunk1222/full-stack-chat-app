﻿# 项目简介
NODE+REACT在线实时聊天应用，采取MERN架构（react+nodejs+mongodb+express），使用socket.io实现实时在线通信

# 功能简介
- 支持用户注册登录，使用JWT权限验证方式，使用bcrypt进行密码加密，确保安全性
- 侧边栏可选择聊天对象，可过滤在线用户，精确定位聊天对象
- 使用socket.io实现实时信息同步，包括用户登录状态以及聊天信息
- 支持发送消息以及图片
- 更多设置功能，包括查看个人资料，更改个人图片信息，设置页面主题，切换中英文等

# 技术栈
- 前端：vite+react+axios+tailwindcss+daisyui+i18next+lucide+zustand+react-hot-toast+socket.io-client
- 后端：node+express+bcrypt+JWT+mongoose+socket.io+nodemon
- 数据库：mongodb
- 图床：cloudinary

# 技术文档
后端部分：https://www.chipmunk.top/posts/MERN全栈聊天项目（一）后端部分/

前端部分：https://www.chipmunk.top/posts/MERN全栈聊天项目（二）前端部分/

项目部署：https://www.chipmunk.top/posts/MERN全栈聊天项目（三）项目部署/

# 项目运行方式
本地运行：
```
cd backend 
npm run dev
```
创建一个新的终端
```
cd frontend
npm run dev
```

服务器部署：
```
npm run build
npm run serve
```

# 项目预览

<img src="https://res.cloudinary.com/dobligy9s/image/upload/v1741657156/Snipaste_2025-03-11_09-35-25_fcocu6.png" alt="https://res.cloudinary.com/dobligy9s/image/upload/v1741657156/Snipaste_2025-03-11_09-35-25_fcocu6.png" width="75%">
<img src="https://res.cloudinary.com/dobligy9s/image/upload/v1741657156/Snipaste_2025-03-11_09-35-04_nnmqli.png" alt="https://res.cloudinary.com/dobligy9s/image/upload/v1741657156/Snipaste_2025-03-11_09-35-04_nnmqli.png" width="75%">

![https://res.cloudinary.com/dobligy9s/image/upload/v1741657157/Snipaste_2025-03-11_09-35-43_z1ydnq.png](https://res.cloudinary.com/dobligy9s/image/upload/v1741657157/Snipaste_2025-03-11_09-35-43_z1ydnq.png)

# 项目结构
```javascript
.
├── backend
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── controllers
│       │   ├── auth.controller.js
│       │   └── message.controller.js
│       ├── index.js
│       ├── lib
│       │   ├── cloudinary.js
│       │   ├── db.js
│       │   ├── socket.js
│       │   └── utils.js
│       ├── middleware
│       │   └── auth.middleware.js
│       ├── models
│       │   ├── message.model.js
│       │   └── user.model.js
│       ├── routes
│       │   ├── auth.route.js
│       │   └── message.route.js
│       └── seeds
│           └── user.seed.js
├── frontend
│   ├── dist
│   │   ├── assets
│   │   │   ├── browser-ponyfill-Bd6fa64C.js
│   │   │   ├── index-CGAKR6dP.js
│   │   │   └── index-DMRtV_m4.css
│   │   ├── avatar.png
│   │   ├── index.html
│   │   ├── locales
│   │   │   ├── en
│   │   │   │   └── translation.json
│   │   │   └── zh
│   │   │       └── translation.json
│   │   └── vite.svg
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── avatar.png
│   │   ├── locales
│   │   │   ├── en
│   │   │   │   └── translation.json
│   │   │   └── zh
│   │   │       └── translation.json
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── AuthImagePattern.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── skeletons
│   │   │       ├── MessageSkeleton.jsx
│   │   │       └── SidebarSkeleton.jsx
│   │   ├── constants
│   │   │   └── index.jsx
│   │   ├── index.css
│   │   ├── lib
│   │   │   ├── axios.js
│   │   │   ├── i18n.js
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   └── store
│   │       ├── useAuthStore.js
│   │       ├── useChatStore.js
│   │       └── useThemeStore.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json
├── package-lock.json
├── README.md
```

