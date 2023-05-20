export const convertModelToFormData = <T = unknown>(
  model: T,
  form?: FormData,
  ns = ''
): FormData => {
  const formData = form !== undefined ? form : new FormData()
  for (const propertyName in model) {
    const formKey = ns ? `${ns}[${propertyName}]` : propertyName
    if (model[propertyName] instanceof Date) {
      formData.append(formKey, (model[propertyName] as unknown as Date).toDateString())
    } else if (model[propertyName] instanceof Array) {
      ;(model[propertyName] as unknown as any[]).forEach((element, index) => {
        if (typeof element != 'object') formData.append(`${formKey}[]`, element)
        else {
          const tempFormKey = `${formKey}[${index}]`
          convertModelToFormData(element, formData, tempFormKey)
        }
      })
    } else if (model[propertyName] instanceof File) {
      formData.append(formKey, model[propertyName] as unknown as File)
    } else if (typeof model[propertyName] === 'object') {
      convertModelToFormData(model[propertyName], formData, formKey)
    } else if (model[propertyName] !== undefined) {
      formData.append(formKey, String(model[propertyName]))
    }
  }
  return formData
}
