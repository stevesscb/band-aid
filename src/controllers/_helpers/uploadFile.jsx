import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import _ from 'lodash'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const uploadFileAsync = async (data, { files }) => {
  const fileKeys = Object.keys(files)

  const promises = []

  for (let i = 0; i < fileKeys.length; i += 1) {
    const key = fileKeys[i]
    const file = files[key]

    if (_.get(data, key)) {
      // Read content from the file
      const fileContent = fs.readFileSync(file.filepath)

      // Uploading files to the bucket and push promise for Promise.all
      promises.push(
        supabase.storage
          .from(process.env.SUPABASE_BUCKET)
          .upload(file.newFilename, fileContent)
          .then(({ data: { Key } }) => {
            _.set(data, key, `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${Key}`)
            fs.unlinkSync(file.filepath)
            return Key
          })
          .catch(({ error }) => {
            console.log(error) // eslint-disable-line
            _.set(data, key, '')
            fs.unlinkSync(file.filepath)
            return error
          })
      )
    } else {
      fs.unlinkSync(file.filepath)
    }
  }

  await Promise.all(promises)
}

export default uploadFileAsync
