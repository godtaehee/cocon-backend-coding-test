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

<details>
  <summary>MONGODB_URL</summary>

![스크린샷 2021-06-21 오전 1 18 02](https://user-images.githubusercontent.com/44861205/122681293-882e5b00-d22e-11eb-9040-7d72540e98b9.png)

포트와 함께 dotenv를 이용해 사용했습니다.

</details>