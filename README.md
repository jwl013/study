## install
```
npm install
```

## run server
```
npm run live
```


## Gulp
컴퓨터에 처음 설치시 npm install --global gulp-cli
### watch
```
gulp watch
```
### build
```
gulp sass
```
### sprite
```
gulp sprite
```

## 웹폰트 변환
-ttf 파일을 woff파일로 변환하기
```
npm install --save-dev gulp-ttf2woff
```
```
gulp ttf2woff
```

## scss
문법 : https://devhints.io/sass
 * `_variables.scss` : scss용 스크립트가 작성되어 있음
 * `gulp sprite`시 `_icons.css`가 새로 생성됨
 * `_icon-list.scss`의 경우 sprite로만들어진 .icon-{} 코드들이 들어 있음


## update
```
npm install -g npm-check-updates
```
```
ncu -u
```
```
npm install
```

## 드롭박스
-node_modules 를 동기화 무시 시키기. 동기화 일시정지 후 npm install

### Mac //터미널에서
```
xattr -w com.dropbox.ignored 1 {경로}
```
### window //powershell 에서
```
Set-Content -Path 'C:\Users\james\Dropbox\작업중\sass-project\node_modules'  -Stream com.dropbox.ignored -Value 1
```

### 동기화 무시 취소할때
```
Set-Content -Path 'C:\Users\Administrator\Dropbox\작업중\sass-project\node_modules'  -Stream com.dropbox.ignored -Value 1
```