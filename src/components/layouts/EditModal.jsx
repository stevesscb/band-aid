import * as Yup from 'yup'
import { Modal, Button } from 'react-bootstrap'
import { useState, React } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import { v4 as uuidv4 } from 'uuid'

import CompsLayoutsMultiSelect from '@/components/layouts/MultiSelect'

const initialValues = {
  username: '',
  email: '',
  instruments: [],
  bio: '',
  images: [{ url: null }],
  tracks: [{ url: null }]
}

export default function CompsLayoutsEditModal(props) {
  // const { data: user } = useSWR('/my/profile', fetcher)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onSubmit = async (values) => {
    console.log(values)
    // your update logic here
    // you will need to wait until the request is successful,
    // then call handleClose
    // await updateMusician(values, handleClose)
  }

  return (
    <>
      <Button
        size="medium"
        variant="primary"
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={props.initialValues || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={
            Yup.object({
              username: Yup.string().required().label('Username'),
              email: Yup.string().required().label('Email'),
              instruments: Yup.array().min(1).label('Instrument'),
              bio: Yup.string().label('Bio'),
              images: Yup.array().of(Yup.object({
                url: Yup.mixed()
                  .required()
                  .test('fileType', 'Unsupported File Format', (value) => {
                    const type = toString.call(value).slice(8, -1)
                    if (type === 'File') {
                      return value.type.includes('image/')
                    }
                    return true
                  })
                  .label('Image File')
              })),
              tracks: Yup.array().of(Yup.object({
                url: Yup.mixed()
                  .required()
                  .test('fileType', 'Unsupported File Format', (value) => {
                    const type = toString.call(value).slice(8, -1)
                    if (type === 'File') {
                      return value.type.includes('audio/')
                    }
                    return true
                  })
                  .label('Track File')
              }))
            })
          }
        >
          {
            ({ values: v, errors: e, touched: t, isSubmitting, setFieldValue }) => (
              <Form>
                <Modal.Body>
                  <div className="mb-3">
                    <Field
                      className={`form-control ${e?.username && t?.username && 'is-invalid'}`}
                      name="username"
                      placeholder="Username: 'JonDoe2022'"
                    />
                    <ErrorMessage
                      className="invalid-feedback"
                      name="username"
                      component="div"
                    />
                  </div>

                  <div className="mb-3">
                    <Field
                      className={`form-control ${e?.email && t?.email && 'is-invalid'}`}
                      name="email"
                      placeholder="Email: 'jondoe2022@gmail.com'"
                    />
                    <ErrorMessage
                      className="invalid-feedback"
                      name="email"
                      component="div"
                    />
                  </div>

                  <div className="mb-3">
                    <Field
                      name="instruments"
                      component={CompsLayoutsMultiSelect}
                      config={{
                        displayValue: 'type',
                        placeholder: 'Select: Instruments',
                        options: [
                          { type: 'Acoustic Guitar' },
                          { type: 'Bass Guitar' },
                          { type: 'Lead Guitar' },
                          { type: 'Rhythm Guitar' },
                          { type: 'Vocals' },
                          { type: 'Drums' },
                          { type: 'Keyboard' }
                        ]
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <Field
                      as="textarea"
                      className={`form-control ${e?.description && t?.description && 'is-invalid'}`}
                      name="description"
                      placeholder="Bio"
                    />
                    <ErrorMessage
                      className="invalid-feedback"
                      name="description"
                      component="div"
                    />
                  </div>

                  <div className="form-check form-switch mb-3">
                    <Field
                      type="checkbox"
                      className="form-check-input"
                      name="inBand"
                    />
                    <label className="form-check-label">In a Band?</label>
                    <ErrorMessage
                      className="invalid-feedback"
                      name="inBand"
                      component="div"
                    />
                  </div>

                  <FieldArray name="images">
                    {
                      ({ remove, push }) => (
                        <div className="images-wrapper">
                          <div className="d-flex justify-content-start flex-wrap">
                            {
                              v.images.map((image, i) => (
                                <div key={uuidv4()} className="col col-md-6">
                                  <div className="input-group mb-3 justify-content-center">
                                    <label
                                      className="input-group-text overflow-hidden"
                                      htmlFor={`images-${i}-url`}
                                      style={{ width: 'calc(100% - 35px)' }}
                                    >
                                      {
                                        image?.url?.name || `Choose image ${i + 1}`
                                      }
                                    </label>
                                    <input
                                      id={`images-${i}-url`}
                                      className={`form-control ${e?.images?.[i]?.url && t?.images?.[i]?.url && 'is-invalid'} d-none`}
                                      type="file"
                                      onChange={(event) => setFieldValue(`images[${i}].url`, event.currentTarget.files[0])}
                                      accept="image/*"
                                    />
                                    <button
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={() => remove(i)}
                                    >X</button>
                                    <ErrorMessage
                                      className="invalid-feedback text-center"
                                      name={`images[${i}].url`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          <div className="text-center mb-3">
                            <Button variant="info" onClick={() => push({ url: null })}>Add Image</Button>
                          </div>
                        </div>
                      )
                    }
                  </FieldArray>

                  <FieldArray name="tracks">
                    {
                      ({ remove, push }) => (
                        <div className="tracks-wrapper">
                          <div className="d-flex justify-content-start flex-wrap">
                            {
                              v.tracks.map((track, i) => (
                                <div key={uuidv4()} className="col col-md-6">
                                  <div className="input-group mb-3 justify-content-center">
                                    <label
                                      className="input-group-text overflow-hidden"
                                      htmlFor={`tracks-${i}-url`}
                                      style={{ width: 'calc(100% - 35px)' }}
                                    >
                                      {
                                        track?.url?.name || `Choose track ${i + 1}`
                                      }
                                    </label>
                                    <input
                                      id={`tracks-${i}-url`}
                                      className={`form-control ${e?.tracks?.[i]?.url && t?.tracks?.[i]?.url && 'is-invalid'} d-none`}
                                      type="file"
                                      onChange={(event) => setFieldValue(`tracks[${i}].url`, event.currentTarget.files[0])}
                                      accept="audio/*"
                                    />
                                    <button
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={() => remove(i)}
                                    >X</button>
                                    <ErrorMessage
                                      className="invalid-feedback text-center"
                                      name={`tracks[${i}].url`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          <div className="text-center mb-3">
                            <Button variant="info" onClick={() => push({ url: null })}>Add Track</Button>
                          </div>
                        </div>
                      )
                    }
                  </FieldArray>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">
                  <Button variant="danger" onClick={handleClose}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>Save Changes</Button>
                </Modal.Footer>
              </Form>
            )
          }
        </Formik>
      </Modal>
    </>
  )
}
