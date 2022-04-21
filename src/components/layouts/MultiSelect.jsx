import MultiSelect from 'multiselect-react-dropdown'

function CompsLayoutsMultiSelect({ field, form, config }) {
  const isInvalid = form.errors?.instruments
                && form.touched?.instruments
                && 'custom-invalid'
  return (
    <>
      <MultiSelect
        className={isInvalid}
        selectedValues={field.value}
        displayValue={config.displayValue || 'value'}
        placeholder={config.placeholder || ''}
        options={config.options || []}
        onRemove={(values) => {
          form.setFieldTouched(field.name)
          form.setFieldValue(field.name, values)
        }}
        onSelect={(values) => {
          form.setFieldTouched(field.name)
          form.setFieldValue(field.name, values)
        }}
      />
      <div className={`${isInvalid && 'd-block'} invalid-feedback`}>Email is a required field</div>
    </>
  )
}

export default CompsLayoutsMultiSelect
