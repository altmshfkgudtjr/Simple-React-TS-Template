# Simple React TS Template [![GitHub license](https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)](https://github.com/altmshfkgudtjr/Simple-React-TS-Template/blob/master/LICENSE) [![img](https://img.shields.io/github/v/release/altmshfkgudtjr/Simple-React-TS-Template?color=%2312b886)](https://github.com/altmshfkgudtjr/Simple-React-TS-Template/releases/tag/v1.0.0)

**This is React-based typescript code that can be quickly generated.**

빠르게 리액트 타입스크립트 환경을 구축할 수 있는 템플릿입니다.

- **CSS in JS** : styled-components를 사용하여 간편하게 컴포넌트 별로 스타일을 적용할 수 있습니다.

- **Hook**: 상태관리를 하기위해서 *Context API* 와 *useReducer* 을 함께 사용합니다.
- **Build**: `yarn build`를 통해서 작성한 코드들을 production mode로 빌드할 수 있습니다. 본 템플릿에서는 다음과 같은 과정을 빌드가 진행됩니다.
  - **Pre Build** : 작성한 모든 test파일들을 진행합니다. 이 때, 통과하지 못한 파일이 존재하면 빌드과정이 진행되지 않습니다.
  - **Build** : Sourcemap 파일을 제외한 빌드를 진행합니다.
  - **Post Build** : 배포를 위해서 빌드된 파일들을 '*사용자가 지정한 경로* '로 복사를 하게됩니다.

위 과정 및 '*사용자가 지정한 경로* '는 `package.json`파일에서 수정할 수 있습니다.



## How to run?

```shell
yarn install // 필요 패키지를 설치합니다.

yarn start	 // HMR(Hot Module Replacement)이 가능한 개발 서버를 실행합니다.(기본포트:3000)
yarn test	 // .test.js로 끝나는 파일을 대상으로 테스트를 진행합니다.
yarn build 	 // 작성한 코드를 대상으로 빌드과정을 진행합니다.
```



## Directory Structure

```shell
Simple-React-Ts-Template
│
│  .env
│  .gitingnore
│  tsconfig.json
│  yarn.lock
│  package.json
│
├─public
│  │  index.html
│  │  manifest.json
│  │  robots.txt
│  ├─css
│  ├─favicons
│  ├─fonts
│  ├─icons
│  └─images
│
├─@types
│      index.d.ts
│
└─src
    │  App.tsx
    │  index.tsx
    │  serviceWorker.ts
    │  setupTests.ts
    │  react-app-env.d.ts
    │
    ├─components
    │  ├─home
    │  │
    │  └─modal
    │      └─info
    │  └─common
    │          Snackbar.tsx
    │
    ├─containers
    │  └─modal
    │          Index.tsx
    │          info.tsx
    │  └─common
    │          Snackbar.tsx
    │
    ├─controllers
    │      index.ts
    │      fetch.ts
    │
    ├─lib
    │  └─styles
    │          animations.ts
    │          media.ts
    │          palette.ts
    │          styles.ts
    │          zIndex.ts
    │  └─utils
    │          cookieUtil.ts
    │  └─hooks
    │  └─svg
    │
    ├─modules
    │  └─actions
    │          snackbar.ts
    │          modal.ts
    │  └─contexts
    │          snackbar.ts
    │          modal.ts
    │  └─states
    │          snackbar.ts
    │          modal.ts
    │  └─__test__
    │          modal.test.ts
    │          snackbar.test.ts
    │  index.tsx
    │
    ├─pages
    │      HomePage.js
    │      NotFound.js
    │
    └─types
       └─controllers
               index.ts
       └─modules
               snackbar.ts
               modal.ts
    
```

- Public: 정적 자원를 저장하는 폴더입니다. 대표적으로 .html, .css, robots.txt 외에도 각종 Image 파일들이 존재합니다.

- [**package.json**](https://github.com/altmshfkgudtjr/Simple-React-TS-Template/blob/master/package.json) : 해당 프로젝트의 이름과 버전 및 프로젝트 정보들을 수정 및 확인할 수 있습니다. 또한 `PostBuild`과정에서 배포 폴더 경로를 수정할 수 있습니다. (아래 스크립트 참조)

  ```json
  "postbuild": "cp -r build/* ../backend/src/client"
  ```

  이 외에도 proxy를 설정하여 개발을 진행할 때, 개발 서버를 대상을 API를 호출할 수 있습니다. 기본적으로 `http://loclhost:5000`으로 설정되어 있습니다.

  ```json
  "proxy": "http://localhost:5000"
  ```

- [**tsconfig.json**](https://github.com/altmshfkgudtjr/Simple-React-TS-Template/blob/master/tsconfig.json) : 해당 타입스크립트 프로젝트에서의 컴파일 옵션 등을 설정할 수 있습니다. (현재 설정은 src를 기준으로 절대경로가 설정되었습니다. 아래 스크립트와 같이 사용할 수 있습니다.)

  ```typescript
  import Component from 'components/path/Component'
  
  // or
  
  import Component from '../../components/path/Component'
  ```

  **3rd-party library 타입**을 선언하는 폴더는 기본적으로 다음과 같습니다.

  ```json
  "typeRoots": [
    "./node_modules/@types",
    "./@types"
  ]
  ```

  - **./@types** : 해당 폴더에서 써드파티라이브러리 명의 폴더를 만들고, index.d.ts를 작성합니다.
  - **./@types/index.d.ts** : 해당 파일에서는 필요 시, 내부 원시 객체에 대한 오바라이딩을 정의합니다.
    **e.g.** window 객체에 대한 오버라이드한 인터페이스 Window

- **.env**: 해당 프로젝트 실행에 필요한 환경변수는 해당 파일에서 추가 및 수정할 수 있습니다. (기본값으로, HOST와 PORT가 작성되어 있어야 합니다.)

- **components** : View를 담당하는 컴포넌트들을 저장하는 폴더입니다.

- **containers** : View와 Store간의 Action을 담당하는 컴포넌트들을 저장하는 폴더입니다.

- **controllers** : API들을 저장하는 폴더입니다.

- **lib** : 프로젝트에 필요한 추가 모듈들을 저장하는 폴더입니다.

  - **styles** : Component에서 사용하는 공통 style에 대해서 모아둔 폴더입니다.
  - **utils** : Component에서 사용하는 공통 로직에 대해서 모아둔 폴더입니다.
  - **hooks** : 커스텀 훅을 모아둔 폴더입니다.
  - **svg** : SVG 형식의 아이콘을 저장하는 폴더입니다. (index.ts에서 svg를 컴포넌트로 만들 수 있습니다.)

- **modules** : Reducer들을 저장하는 폴더입니다.

- **pages** : 각 페이지를 저장하는 폴더입니다.

- **types** : 프로젝트에서 공통으로 사용되는 타입들을 정의합니다. (필요 시, import해서 사용)

- **__ test __** : (test와 __ 사이의 공백은 없습니다.) 각 컴포넌트, 모듈의 테스트 코드를 저장하는 폴더입니다.



# Details

개발 속도를 향상시키기 위해서 필수적이라 생각하는 기능 및 파일들이 존재합니다.

## IE Redirect

이제는 잘 사용되지않는 Internet Explorer 브라우저일 경우에는 리다이렉트 페이지가 표시되도록 구현되어 있습니다. 만약 IE를 대상으로 구현하는 프로젝트일 경우 index.html 파일의 다음 코드를 지워주시길 바랍니다.

```html
<!-- index.html -->

<script>
  // Browsers not supported Redirect Page (IE)
  const agent = navigator.userAgent.toLowerCase();
  if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf("msie") !== -1)) {
  	window.location = "microsoft-edge://" + window.location.href;
  }
</script>
```



## Combined Provider

여러 개의 contexts를 감싸주기 위해서, 불필요한 중첩구조보다는, reduce를 이용하여, contexts들을 하나의 Provider로 묶어주었습니다.  현재 modal 및 snackbar를 제외한 추가 contexts를 작성 시, 아래 파일에서 contexts를 추가해주시면 됩니다.

```typescript
// modules/index.tsx

import ModalProvider from 'modules/contexts/modal'
import SnackbarProvider from 'modules/contexts/snackbar'

/*
	Combine Reducers
*/
const CombinedProvider = ({ contexts, children }) => contexts.reduce(
	(Parent, Child) => <Parent>
		<Child>{children}</Child>
	</Parent>
);


/*
	Create Provider
*/
const AppProvider = ({ children }) => {
	return (
		<CombinedProvider contexts={[
			ModalProvider, 
			SnackbarProvider
		]}>
			{children}
		</CombinedProvider>
	);
}

export default AppProvider
```



## Default Modal

기본적으로 모달이 작동하는 파일이 포함되어 있습니다. useReducer와 useContext를 이용하여 동작합니다. (해당 방식은 선택사항 입니다.)

파일은 `containers/modal/info.js` 이며, 해당 모달을 부르고 싶은 컴포넌트에서 해당 파일을 import하여 사용하게 됩니다. 그 후, modal action에 존재하는 `pushModal` 액션을 사용하여 모달을 작동시킵니다. 각 모달은 **고유의 id값**을 넣어서 호출해야 합니다. 만약 id값이 undefined라면 해당 모달은 정상적으로 작동하지 않을 것입니다. 아래는 리듀서에 작성된 액션입니다.

```typescript
// modules/actions/modal

export const pushModal = (id: string, elem: React.ReactNode, args?: any) => ({ type: PUSH_MODAL, payload: { id, elem, args } });
export const popModal = () => ({ type: POP_MODAL });
export const deleteModal = (id: string) => ({ type: DELETE_MODAL, payload: id });
export const clearModal = () => ({ type: CLEAR_MODAL });
```

- **pushModal** : 모달을 등록하는 함수입니다. 해당 액션을 통해서 여러개의 모달을 스택처럼 등록시킬 수 있으며, 순서를 유지한채로 화면에 표시됩니다.
- **popModal** : 등록된 모달에서 가장 나중에 등록된 모달부터 스택처럼 제거할 수 있습니다.
- **deleteModal** : 모달별로 고유의 id값을 이용하여 특정 모달만 제거할 수 있습니다.
- **clearModal** : 현재 등록된 모든 모달을 제거할 수 있습니다.

모달을 호출하는 방식은 아래 예시를 참고하십시오.

```typescript
import { useContext } from 'react'
import styled from 'styled-components'
// containers
import InfoModal from 'containers/modal/Info'
// modules
import { modalContext } from 'modules/contexts/modal'
import { pushModal } from 'modules/actions/modal'

const Btn = () => {
	const { dispatch: modalDispatch } = useContext(modalContext);
	
	const modalOn = () => modalDispatch(
		pushModal('INFO', InfoModal, {title: "Simple"})
	);

	return <Button onClick={modalOn}>Simple</Button>
}

const Button = styled.button`
	...
`;

export default Btn
```

해당 모달 파일에서는 `PreventModalOff` 와 `ModalOff` 및 `args` 인자가 기본적으로 제공됩니다. `PreventModalOff` 함수는 `onMouseDown` 속성으로 모달 최상위 속성에 등록해주시길 바랍니다. `ModalOff`는 선택적 사항입니다. `args`는 모달을 호출하는 컴포넌트에서 모달에게 매개변수를 전달할 수 있습니다. 기본적으로 Background에 MouseDown 이벤트로 모달이 닫히도록 작동됩니다. 이 외에 버튼을 통해서 모달을 닫는 경우, 해당 함수를 사용해주시길 바랍니다.



## Default Snackbar

기본적으로 사용자에게 보다 나은 Alert 표시를 위해서 Snackbar 구조가 포함되어 있습니다. 본 스낵바는 useReducer와 useContext를 이용하여 동작합니다. (해당 방식은 선택사항 입니다.)

기본적으로 스낵바 타입은 다음과 같습니다. (**Type : Default Color**)

```typescript
export type SnackbarType = 'INFO' |'SUCCESS' |'WARNING' |'ERROR';
```

- **SUCCESS** : Green Color
- **WARNING** : Red Color
- **ERROR** : Orange Color
- **INFO** : Gray Color

스낵바를 호출하는 방식은 아래 예시를 참고하십시오.

```typescript
/* This file is Sample Component to call a snackbar. */

import { useContext } from 'react'
// components
import Button from 'components/path/Button'
// modules
import { snackbarContext } from 'modules/contexts/snackbar'
import { newSnackbar } from 'modules/actions/snackbar'


const Btn = () => {
	const { dispatch: snackbarDispatch } = useContext(snackbarContext);
	const callSnackbar = () => newSnackbar(snackbarDispatch, '테스트 문구', 'INFO');

	return <Button onClick={callSnackbar}>Snackbar</Button>
}

export default Btn
```



## Default Fetch file

기본적으로 비동기 통신을 위해서 [fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)가 사용됩니다. 해당 파일에서는 CRUD를 만족하는 API를 쉽게 사용할 수 있도록 작성되었습니다. (본 파일 사용유무는 선택사항입니다. 사용하지 않으면 지워주시길 바랍니다.)

```typescript
const Fetch = <T = any, U = object | FormData>(
	url: string,
	method: apiType.HttpMethod,
	sendData?: U,
	callback?: (res: apiType.FetchResultExtended<T>) => void,
	failed?: (res: apiType.FetchResultExtended<T>) => void
): Promise<apiType.FetchResultExtended<T>> => { ... };
```

기본적으로 해당 모듈은 다음과 같은 인자를 필요로 합니다.

- **url**: Target url입니다. 예시) `/board/1/post/3`

- **method** : 기본적으로 API는 REST API 메소드를 준수하여 타입을 지정하였습니다. 만약 다른 메소드를 사용할 경우, 해당 타입을 수정할 수 있습니다. `POST`, `GET`, `DELETE`, `PUT`, `PATCH` 등이 존재합니다.

  ```typescript
  // REST API Method
  type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  ```

- **sendData** : HTTP 요청을 할 때, 필요한 data입니다. 기본적으로 *json/application*으로 보내지며, sendData는 JSON화 되어서 통신이 진행됩니다. *FormData* 타입도 지원합니다.

- **callback** : 통신이 완료된 후에 실행될 콜백함수입니다. 선택사항입니다.

- **failed** : 4xx 또는 5xx 에러(대표적으로 404, 502)가 발생할 경우, 실행될 함수입니다. 선택사항입니다.

**headers**값의 Accept 속성에 'application/json' 을 적용하여, 서버로부터 각 API별 json 메세지를 확인할 수 있도록 하였습니다. 또한, server으로부터 받는 반환값에 대한 규약이 존재할 경우 `FetchResultExtended` 타입을 아래와 같이 확장할 수 있습니다. 기본값은 다음과 같습니다.

```typescript
/**
 * API Return Type (Origin)
 */
export interface FetchResult<T> {
	verify: boolean;
	message: string;
	result: T;
}

/**
 * API Return Type (Extended)
 * - Add HTTP Status Code
 */
export interface FetchResultExtended<T> extends FetchResult<T> {
	statusCode: number
};
```

비동기 통신으로 받은 데이터의 타입을 **Fetch**를 실행할 때, 정의할 수 있습니다. 다음과 같이 정의가 가능합니다.

```typescript
Fetch<{name: string, birth: number}>('/api/auth/user', 'GET')
```

Generic 타입을 정의 여부의 차이는 다음과 같이 반환받은 비동기 데이터에 대해서 타입 추론이 가능하게 됩니다. 만약 선언하지 않는다면 기본적으로 `any` 타입으로 추론됩니다.

![Fetch](https://user-images.githubusercontent.com/47492535/106996451-5f984e00-67c4-11eb-97a5-aa988bf17b06.gif)

해당 모듈은 **Promise** 객체를 반환합니다. 아래와 같이 사용 가능합니다.

```typescript
import Fetch from './fetch'

Promise.all([
  Fetch('/api/first', 'POST', {'key': 'value'}),
  Fetch('/api/second', 'POST', {'key': 'value'}),
  Fetch('/api/third', 'POST', {'key': 'value'})
]);

// or (Using Promise .then/.catch)

Fetch('/api/first', 'GET')
.then(data => {
   console.log(data); 
})
.catch(err => {
    console.log(err);
});

// or (Using Callback)

Fetch('/api/first', 'POST', {'key': 'value'}, 
(data) => {
  console.log(data);
},
(err) => {
  console.log(err);
});

Fetch('/api/first', 'POST', {'key': 'value'}, 
function(data) {
  console.log(data);
},
function(err) {
  console.log(err);
};

// Top-Level await 문법은 Typescript 3.8 RC 버전부터 사용가능합니다.
const response = await Fetch('/api/first', 'GET');
```





# Feedback & Issue

[피드백 및 이슈 제기](https://github.com/altmshfkgudtjr/Simple-React-TS-Template/issues) 는 언제나 환영입니다. 필요한 기능이거나 불필요한 기능이라고 생각된다면, 언제든지 Issue로 남겨주시길 바랍니다!



















'

