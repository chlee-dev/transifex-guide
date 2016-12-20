# Transifex API 핵심 사용 가이드 & 팁

[Official Documentation](https://docs.transifex.com/api/introduction)

__API URL__: `https://www.transifex.com/api/2/`

코드는 [Node.js](https://nodejs.org/) >= 6 기준으로 작성되었습니다.

## Authentication

[Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) 를 사용해야 합니다.

1. `URL` 을 `https://ID:PW@URL` 형식으로 맞춰준다.

	```js
	const request = require('request')
	const API_URL = 'www.transifex.com/api/2/'
	const ID = '...'
	const PW = '...'

	function getApiUrl (url) {
	  return `https://${ID}:${PW}@${API_URL}${url}`
	}

	function getFormats () {
	  return request({
			url: getApiUrl('/formats/'),
			headers: {
			  'Content-Type': 'application/json'
			}
	  })
	  .then(handleApiResponse)
	}
	```

1. (__현재 Transifex 에서는 제대로 안됩니다.__) Header 의 `Authorization` 를 `Basic ` + base64Encode(ID:PW) 형식으로 맞춰준다.

	```js
	const request = require('request')
	const API_URL = 'www.transifex.com/api/2/'
	const ID = '...'
	const PW = '...'
	const CREDENTIAL = Buffer.from(`${ID}:${PW}`).toString('base64')

	function getApiUrl (url) {
		return `https://${API_URL}${url}`
	}

	function getFormats () {
		return request({
			url: getApiUrl('/formats/'),
			headers: {
				'Authorization': 'Basic ' + CREDENTIAL
				'Content-Type': 'application/json'
			}
		})
		.then(handleApiResponse)
	}
	```


## API Response Handling

Transifex 의 API Response Content-Type 이 들쭉날쭉한 편입니다.

- 

```js
export function handleApiResponse (res) {
  const { statusCode, body } = res.toJSON()

  if (statusCode >= 400) {
    throw res
  }
  return JSON.parse(body)
}
```

## Resource 추가

__URL__: `/project/<project_slug>/resources/`
