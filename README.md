# cocon-backend-coding-test

### 2020.06.18 AM 03:34 Create Repository And Done "Hello World" using TypeScript

<details>
    <summary>문제를 읽으며 생각했던 과정</summary>

# **Cocon 백엔드 개발자 테스트**

## **웹페이지 Metadata Crawler**

아래 이미지와 같이 슬랙이나 카톡 등에서 링크를 공유할 경우 링크뿐만 아니라 해당 웹페이지의 제목/설명/이미지 등이 첨부되는 것을 본 적이 있을 겁니다.

- 슬랙 예시

![https://cocon.style/pages/static/metadata-example1.png](https://cocon.style/pages/static/metadata-example1.png)

- 카톡 예시

![https://cocon.style/pages/static/metadata-example2.png](https://cocon.style/pages/static/metadata-example2.png)

이렇게 웹페이지의 메타데이타를 긁어와서 저장하는 웹서버를 구현해야 합니다.
> 메타데이터의 뜻을 다시한번 찾아보면서 [위키백과](https://ko.wikipedia.org/wiki/%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0)를 읽어보았고 "어떠한 목적을 가지고 만들어진 데이터"라는 정의가 눈에 띄었고 위의 예시처럼 저러한 서비스를 사용자에게 제공하기위한 목적을 가지고 메타데이터를 긁어오는 과정을 하겠구나 라고 생각했습니다. 하지만 메타데이터라는 키워드로만은 역부족이였고 '카톡 미리보기 구현'이라는 키워드로 검색했더니 [링크](https://code-study.tistory.com/41) 에서 meta 태그의 property로 `og(Open Graph):`의 형식으로 되어있는 태그의 정보들을 가져와서 링크전달시 사용자에게 링크에 해당하는 사이트의 정보를 제공해줄수 있다는것을 알았습니다. 단순히 BackEnd 코딩테스트라는 것을 넘어서 정말 이 이야기는 재미있었고 정말 이런걸 구현하는 프로그래머들이 멋있고 그들이 되고싶다는 생각을 했습니다. 또한 [링크](https://brunch.co.kr/@jiyeonsongofnt/11) 를 통해 페이스북에서 처음 만들었다는 정보를 얻게되고 웹의 세계에서 아주 높은 위상을 가지고있다는것도 알게되었습니다.

## **제공되어야 하는 API**

### **1. POST /metadata**

- 메소드: POST
- 경로: /metadata
- 요청 헤더
    - Accept: application/json
    - Content-Type: application/json
- 요청 바디: { "url": "http://..." }
- 응답: 메타데이터가 담긴 json 포맷의 데이터

예시

```
$ curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' "http://localhost:3000/metadata" -d '{ "url": "https://visualstudio.microsoft.com/ko/vs/features/node-js" }' | jq
{
  "date": "2020-10-20T17:34:36.000Z",
  "description": "Project templates, IntelliSense, npm integration, debugging, & more. Turn Visual Studio into a powerful Node.js development environment. Download for free.",
  "image": "https://visualstudio.microsoft.com/wp-content/uploads/2018/06/vscom_vs_features_node-js_twitter.png",
  "publisher": "Visual Studio",
  "title": "Node.js Developer Tools | Visual Studio",
  "url": "https://visualstudio.microsoft.com/ko/vs/features/node-js/"
}

```

> 위의 소스코드를 보고 `curl`가 `command line 기반의 웹 요청 도구`라는 것을 알게되었고 평소에 터미널을 매우 자주 사용하는 편인데 이제 웹 요청도 터미널로 보내면 되겠구나라는 생각과 정말 터미널은 안되는게 없다는 생각이 들었습니다. `-X`옵션은 HTTP 메서드를 설정할수 있는 옵션이며 `-H`는 헤더를 보내고 `-d`는 데이터를 전달하는 옵션이다. 저 명령어를 처음에 내 터미널에서 쳐봤는데 `jq`라는 명령어를 찾을수 없다는 오류메시지를 얻었다. 혹시나 해서 `jq`를 뺐더니 ![jq제외 이미지](https://user-images.githubusercontent.com/44861205/122655765-fd971e80-d18f-11eb-84d1-854fdf92741e.png) 아래 이미지같은 결과를 얻었고 분명히 예시의 결과와 달랐다. 바로 검색을 해보니 command line용 Json 처리기로 curl의 명령행 http 처리기와 연계해서 JSON 기반의 REST API를 디버깅할때 유용한 툴이라는것을 알게되었다. [링크](https://www.lesstif.com/software-architect/jq-json-42074200.html) 에서 `jq`를 설치하고 명령어를 사용해봤는데 이번엔 예시와 비슷하게 JSON형태의 데이터를 응답받았습니다.

### **2. GET /metadatas**

- 메소드: GET
- 경로: /metadatas
- 요청 헤더
    - Accept: application/json
- 응답: 지금까지 긁어온 모든 메타데이터가 담긴 json 포맷의 데이터

예시

```
$ curl -X GET -H 'Accept: application/json' "http://localhost:3000/metadatas" | jq
[
  {
    "date": "2020-10-20T17:34:36.000Z",
    "description": "Project templates, IntelliSense, npm integration, debugging, & more. Turn Visual Studio into a powerful Node.js development environment. Download for free.",
    "image": "https://visualstudio.microsoft.com/wp-content/uploads/2018/06/vscom_vs_features_node-js_twitter.png",
    "publisher": "Visual Studio",
    "title": "Node.js Developer Tools | Visual Studio",
    "url": "https://visualstudio.microsoft.com/ko/vs/features/node-js/"
  },
  ...
]

```

## **구현 조건**

1. [Node.js](https://nodejs.org/)로 실행되어야 하고 언어는 [Typescript](https://www.typescriptlang.org/)를 사용해야 합니다.
 
> Node.js로 실행되어야한다까지는 잘 읽다가 갑자기 TypeScript를 언어로 사용해야한다는 글을 읽고 순간 얼었고 일단 계속 읽었는데 4번 구현조건에 docker를 이용해서 빌드 및 사용이 가능해야한다는 글을 읽고 또 얼었다. 하지만 제가 포트폴리오에 적었던 "저는 제가 개발자로 살아가야한다는걸 확신합니다"라는 소개글을 쓸때 장난으로 쓴것이 아니기때문에 단순한 과제라고 생각하지 않고 제가 Cocon이라는 회사에 실제 입사해 이러한 맡은바가 주어진다면 어떻게 해야할지, 어떻게 행동해야하는지를 생각하면서 할수있다는 믿음과 책임감을 가지고 과제에 임했습니다.
2. 메타데이터를 저장하는 DB는 [MongoDB](https://www.mongodb.com/) 를 사용하세요. Node.js 어플리케이션에 MongoDB의 주소가 `MONGODB_URL` 환경변수로 전달되어야 합니다.
3. 기본적인 [eslint](https://eslint.org/) /[prettier](https://prettier.io/) 설정이 되어있어야 합니다.
4. [Docker](https://www.docker.com/) 를 이용해서 빌드 및 실행이 가능해야 합니다.
5. 여기에 명시되지 않은 것은 자유롭게 외부 라이브러리 같은 것을 활용하며 최대한 호율적으로 구현해주시면 됩니다.

## **과제 제출 방식**

1. GitHub의 본인 계정에 `cocon-backend-coding-test`로 private repository를 생성하고 코드를 올립니다.
2. GitHub `cocon-backend-coding-test` repository의 [Settings] - [Manage access]에서 Collaborator로 [mint-seoul](http://github.com/mint-seoul) 계정을 추가합니다.
3. [cocon@blacktangerine.kr](mailto:cocon@blacktangerine.kr) 이메일로 GitHub `cocon-backend-coding-test` repository 링크를 제출합니다.
</details>

## 사용 IDE

- Webstorm

## 기술 스택

- Node.js
- TypeScript
- Docker
- Postman
- open-graph-scraper

## Plugin

- Eslint
- prettier


## package.json

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "src/server.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsc-watch --onSuccess \" node dist/server.js\"",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint --fix src/**/*.ts"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.12",
    "@types/mongoose": "^5.11.97",
    "@types/node": "^15.12.4",
    "@types/open-graph-scraper": "^4.8.0",
    "@typescript-eslint/eslint-plugin": "^4.27.0",
    "@typescript-eslint/parser": "^4.27.0",
    "eslint": "^7.2.0",
    "eslint-config-airbnb": "18.2.1",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-config-airbnb-typescript": "^12.3.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-plugin-react": "^7.24.0",
    "eslint-plugin-react-hooks": "^4.2.0",
    "nodemon": "^2.0.7",
    "prettier": "^2.3.1",
    "ts-node": "^10.0.0",
    "tsc-watch": "^4.4.0",
    "typescript": "^4.3.4"
  },
  "dependencies": {
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "mongoose": "^5.12.14",
    "open-graph-scraper": "^4.9.0"
  }
}


```

## 본격적으로 들어가기에 앞서..

> 처음의 예시를 봤을땐 'data', 'description', 'image', 'publisher', 'title', 'url'으로 스키마가 정해져있는줄 인식하고 있었는데 처음 open-graph-scraper로 MetaData를 크롤링 해왔을때 사이트마다 각각 다른 응답을 받을수 있었습니다. 그래서 스키마를 하나로 정할수 없을것같다는 판단을 하게되었고 그렇게 고민하다가 정한 방법이 `Strig`혹은 `BSON`으로 변환해 한개의 `data`라는 필드를 가진 몽고DB 스키마에 저장하고 메타데이터를 GET요청으로 가져올때는 디비에 저장된 데이터를 다시 JSON형태로 변환하여 보여주는 방식을 택했습니다 그 경우가 `main`브랜치에 작업한 내용이며 `limit`브랜치는 예시에 나와있는 6개의 필드를 스키마로 정하여 작업을 진행했습니다. 이렇듯 두개의 차이를 설명드려야 브랜치마다 어떻게 다르게 구현했는지를 알려드릴수 있을것 같아 남기게 됬습니다.

## Implements

- 아래와 같이 eslint/prettier 설정 완료했습니다.
  
  ![스크린샷 2021-06-20 오후 10 09 55](https://user-images.githubusercontent.com/44861205/122675408-409ad580-d214-11eb-9594-cf7a18a62b04.png)

- 요청 헤더에 맞는 요청은 Reject

<details>
  <summary>PostMan 결과</summary>
  
- main Branch

POST / meatadata

![스크린샷 2021-06-21 오전 12 33 45](https://user-images.githubusercontent.com/44861205/122680033-5dd99f00-d228-11eb-9bdf-6df3b97a0cea.png)

GET / metadatas

![스크린샷 2021-06-21 오전 12 35 12](https://user-images.githubusercontent.com/44861205/122680072-8c577a00-d228-11eb-871f-5e5767699caf.png)


- limit branch


POST / meatadata

![스크린샷 2021-06-21 오전 12 36 38](https://user-images.githubusercontent.com/44861205/122680128-bf9a0900-d228-11eb-8133-a2ad264f9695.png)


GET / metadatas

![스크린샷 2021-06-21 오전 12 37 04](https://user-images.githubusercontent.com/44861205/122680147-cf195200-d228-11eb-9f11-e24e52b87dfb.png)

</details>

<details>
  <summary>MongoDB 저장된 모습</summary>
- data Schema

![스크린샷 2021-06-21 오전 12 20 30](https://user-images.githubusercontent.com/44861205/122679927-dd1aa300-d227-11eb-8894-7d952098edd8.png)

- limitData Schema

![스크린샷 2021-06-21 오전 12 20 38](https://user-images.githubusercontent.com/44861205/122679938-ec99ec00-d227-11eb-90a7-451485765a08.png)



</details>


<details>
  <summary>Docker 결과</summary>
- docker Image (cocon image)

![스크린샷 2021-06-21 오전 12 39 41](https://user-images.githubusercontent.com/44861205/122680230-2fa88f00-d229-11eb-8c3c-fc33043fad15.png)

- `docker run -p 3000:3000 cocon` 실행시 POST, GET 요청

- POST

![스크린샷 2021-06-21 오전 12 42 23](https://user-images.githubusercontent.com/44861205/122680401-e7d63780-d229-11eb-92ff-d1982d1bb846.png)

- GET

  ![스크린샷 2021-06-21 오전 12 43 02](https://user-images.githubusercontent.com/44861205/122680416-f6bcea00-d229-11eb-8ada-2473b513c6b4.png)

</details>