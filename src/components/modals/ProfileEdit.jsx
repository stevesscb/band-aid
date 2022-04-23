import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import { v4 as uuidv4 } from 'uuid'

import { schema } from '@/controllers/my/profile/_schemas'
import useMyProfile from '@/hooks/myProfile'

import CompsInputsMultiSelect from '@/components/inputs/MultiSelect'

export default function CompsModalsProfileEdit() {
  const { myProfile, updateMyProfile } = useMyProfile()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onSubmit = async (values) => {
    await updateMyProfile(values, handleClose)
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
          initialValues={{
            ...myProfile,
            displayName: myProfile.displayName || '',
            email: myProfile.email || '',
            bio: myProfile.bio || '',
            instruments: myProfile.instruments,
            portraits: myProfile.portraits.length > 0 ? myProfile.portraits : [{ file: '' }],
            tracks: myProfile.tracks.length > 0 ? myProfile.tracks : [{ file: '' }]
          }}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={schema}
        >
          {
            ({ values: v, errors: e, touched: t, isSubmitting, setFieldValue }) => (
              <Form>
                <Modal.Body>
                  <div className="mb-3">
                    <Field
                      className={`form-control ${e?.displayName && t?.displayName && 'is-invalid'}`}
                      name="displayName"
                      placeholder="Display Name: 'JonDoe2022'"
                    />
                    <ErrorMessage
                      className="invalid-feedback"
                      name="displayName"
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
                      component={CompsInputsMultiSelect}
                      config={{
                        displayValue: 'type',
                        placeholder: 'Select: Instruments',
                        options: [
                          { type: 'Acoustic Guitar' },
                          { type: 'Lead Guitar' },
                          { type: 'Rhythm Guitar' },
                          { type: 'Bass' },
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
                      className={`form-control ${e?.bio && t?.bio && 'is-invalid'}`}
                      name="bio"
                      placeholder="Bio"
                    />
                    <ErrorMessage
                      className="invalid-feedback"
                      name="bio"
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

                  <FieldArray name="portraits">
                    {
                      ({ remove, push }) => (
                        <div className="portraits-wrapper">
                          <div className="d-flex justify-content-start flex-wrap">
                            {
                              v.portraits.map((portrait, i) => (
                                <div key={uuidv4()} className="col-12 col-md-6">
                                  <div className="input-group mb-3 justify-content-center w-100">
                                    <label
                                      className="input-group-text overflow-hidden"
                                      htmlFor={`portraits-${i}-file`}
                                      style={{ width: 'calc(100% - 35px)' }}
                                    >
                                      {
                                        portrait?.file?.name || portrait?.file || `Choose image ${i + 1}`
                                      }
                                    </label>
                                    <input
                                      id={`portraits-${i}-file`}
                                      className={`form-control ${e?.portraits?.[i]?.file && t?.portraits?.[i]?.file && 'is-invalid'} d-none`}
                                      type="file"
                                      onChange={(event) => setFieldValue(`portraits[${i}].file`, event.currentTarget.files[0])}
                                      accept="image/*"
                                    />
                                    <button
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={() => remove(i)}
                                    >X</button>
                                    <ErrorMessage
                                      className="invalid-feedback text-center"
                                      name={`portraits[${i}].file`}
                                      component="div"
                                    />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          <div className="text-center mb-3">
                            <Button variant="info" onClick={() => push({ file: '' })}>Add Image</Button>
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
                                <React.Fragment key={i}>
                                  <div className="col-12 col-md-6 mb-0">
                                    <Field
                                      className={`form-control ${e?.tracks?.[i]?.name && t?.tracks?.[i]?.name && 'is-invalid'}`}
                                      name={`tracks[${i}].name`}
                                      placeholder={`Track ${i + 1} Name`}
                                    />
                                    <ErrorMessage
                                      className="invalid-feedback"
                                      name={`tracks[${i}].name`}
                                      component="div"
                                    />
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="input-group mb-0 mb-md-3 justify-content-center">
                                      <label
                                        className="input-group-text overflow-hidden"
                                        htmlFor={`tracks-${i}-file`}
                                        style={{ width: 'calc(100% - 35px)' }}
                                      >
                                        {
                                          track?.file.name || track?.file || `Choose track ${i + 1}`
                                        }
                                      </label>
                                      <input
                                        id={`tracks-${i}-file`}
                                        className={`form-control ${e?.tracks?.[i]?.file && t?.tracks?.[i]?.file && 'is-invalid'} d-none`}
                                        type="file"
                                        onChange={(event) => setFieldValue(`tracks[${i}].file`, event.currentTarget.files[0])}
                                        accept="audio/*"
                                      />
                                      <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => remove(i)}
                                      >X</button>
                                      <ErrorMessage
                                        className="invalid-feedback text-center"
                                        name={`tracks[${i}].file`}
                                        component="div"
                                      />
                                    </div>
                                  </div>
                                </React.Fragment>
                              ))
                            }
                          </div>
                          <div className="text-center mb-3">
                            <Button variant="info" onClick={() => push({ file: '', name: '' })}>Add Track</Button>
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
