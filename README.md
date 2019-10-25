# vue-trans
Vue.js app with node backend, deployed on heroku  
User can upload a file to Cloudinary and it gets tagged with "vue-trans"  
Code uses multer to upload file to local server file system and then the file is delete once successfully upload to Cloudinary. 

...Look at just buffering the file?

# Demo
[vue-trans](https://vue-trans.herokuapp.com)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

[Using heroku to server](https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489)

```
git push heroku master
heroku open
```

### Node debugging in VS Code
```
node --inspect-brk server
```