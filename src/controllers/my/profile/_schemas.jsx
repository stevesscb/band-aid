import * as Yup from 'yup'

export const schema = Yup.object({
  displayName: Yup.string().required().label('Display Name'),
  email: Yup.string().required().label('Email'),
  bio: Yup.string().label('Bio'),
  instruments: Yup.array().of(Yup.object({
    type: Yup.string().required().oneOf([
      'Acoustic Guitar',
      'Lead Guitar',
      'Rhythm Guitar',
      'Bass',
      'Vocals',
      'Drums',
      'Keyboard'
    ]).label('Instrument Type')
  })).min(1).label('Instruments'),
  inBand: Yup.boolean().label('inBand'),
  portraits: Yup.array().of(Yup.object({
    file: Yup.mixed()
      .required()
      .test('fileType', 'Unsupported File Format', (value) => {
        const type = toString.call(value).slice(8, -1)
        if (type === 'File') {
          return value.type.includes('image/')
        }
        return true
      })
      .label('Portrait File')
  })).max(4),
  tracks: Yup.array().of(Yup.object({
    file: Yup.mixed()
      .required()
      .test('fileType', 'Unsupported File Format', (value) => {
        const type = toString.call(value).slice(8, -1)
        if (type === 'File') {
          return value.type.includes('audio/')
        }
        return true
      })
      .label('Track File'),
    name: Yup.string().required().label('Track Name')
  }))
})
