import fs from 'fs'
import po2json from 'po2json'
import {
  getFormats,
  getResources,
  createResource,
  updateResourceContent,
  getTranslations,
  getTranslationStrings
} from './lib/transifex'
import { PROJECT_SLUG } from './lib/config'

async function run () {
  const formats = await getFormats()
  console.log(formats)
  //
  // const resources = await getResources(PROJECT_SLUG)
  // console.log(resources)

  // const uploadedResource = await createResource(PROJECT_SLUG, {
  //   slug: 'example-file3json',
  //   name: 'example-file3.json',
  //   i18n_type: 'KEYVALUEJSON',
  //   content: fs.createReadStream('./SAMPLE.json')
  // })
  // console.log(uploadedResource)

//   await updateResourceContent(PROJECT_SLUG, 'example-file2json', {
//     content: fs.createReadStream('./SAMPLE2.json')
//   })

  const translationStrings = await getTranslationStrings(PROJECT_SLUG, 'example-file3json', 'en')
  console.log(translationStrings)
}

run()
.catch(err => {
  console.log('===ERROR!===')
})
