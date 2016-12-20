import _ from 'lodash'
import { promisify } from 'bluebird'
import urlJoin from 'url-join'
import { API_URL, ID, PW } from './config'
const request = promisify(require('request'))

export function getApiUrl (url) {
  return `https://${ID}:${PW}@` + urlJoin(API_URL, url)
}

export function handleApiResponse (res) {
  const { statusCode, body } = res.toJSON()

  if (statusCode >= 400) {
    throw res
  }
  return JSON.parse(body)
}

// Format
export function getFormats () {
  return request({
    url: getApiUrl('/formats/'),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleApiResponse)
}

// Project
export function getProjects () {
  return request({
    url: getApiUrl('/projects/'),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleApiResponse)
}

// Resource
export function getResources (projectSlug) {
  return request({
    url: getApiUrl(`/project/${projectSlug}/resources/`),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleApiResponse)
}

export function createResource (projectSlug, {
  slug,
  name,
  i18n_type,
  content
}) {
  let options = {
    method: 'POST',
    url: getApiUrl(`/project/${projectSlug}/resources/`)
  }

  const body = {
    slug,
    name,
    i18n_type,
    content
  }

  if (_.isString(content)) {
    options = Object.assign({}, options, { json: body })
  } else {
    options = Object.assign({}, options, { formData: body })
  }

  return request(options)
    .then(handleApiResponse)
}

export function updateResourceContent (projectSlug, resourceSlug, {
  content
}) {
  return request({
    method: 'PUT',
    url: getApiUrl(`/project/${projectSlug}/resource/${resourceSlug}/content`),
    formData: {
      content
    }
  })
  .then(handleApiResponse)
}

// Translation
export function getTranslations (projectSlug, resourceSlug, langCode, options = {}) {
  const { mode = 'default' } = options
  return request({
    url: getApiUrl(`/project/${projectSlug}/resource/${resourceSlug}/translation/${langCode}/`),
    qs: {
      mode
    }
  })
  .then(handleApiResponse)
}

// Translation String
export function getTranslationStrings (projectSlug, resourceSlug, langCode, options = {}) {
  return request({
    url: getApiUrl(`/project/${projectSlug}/resource/${resourceSlug}/translation/${langCode}/strings/`),
    qs: {}
  })
  .then(handleApiResponse)
}
