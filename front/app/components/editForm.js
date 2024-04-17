'use client'

import { useFormik } from 'formik'
import { selectUser } from '@/lib/features/user/userSelectors'
import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import {
  StyledErrorMessage,
  StyledInput,
} from '@/app/components/styled_components'

const validate = (values) => {
  const errors = {}
  if (!values.published) {
    errors.published = 'Date is required'
  } else {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/
    if (!dateFormatRegex.test(values.published)) {
      errors.published = 'Invalid date format (YYYY-MM-DDTHH:MM:SS)'
    }
  }
  return errors
}

export default function EditForm({ article, updateData }) {
  const user = useAppSelector(selectUser)
  const { push } = useRouter()
  const formik = useFormik({
    initialValues: {
      id: article.id,
      title: article.title,
      image: article.image_href,
      summary: article.summary,
      published: article.published,
      link: article.link,
    },
    validate,
    onSubmit: async (values) => {
      try {
        console.log(JSON.stringify(values))
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${values.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + user.token,
            },
            body: JSON.stringify(values),
          }
        )

        if (!response.ok) {
          let result = await response.json()
          console.log(result.detail)
          formik.errors.api_error = result.detail[0].msg.toString()
        } else {
          push('/admin')
          updateData()
        }
      } catch (error) {
        throw new Error('Error updating article: ' + error.message)
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-2">
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          ID
        </label>
        <StyledInput
          type="text"
          id="id"
          name="id"
          value={formik.values.id}
          disabled
          style={{ width: '50rem' }}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="image_preview"
          className="block text-sm font-medium text-gray-700"
        >
          Preview
        </label>
        <img
          alt="image_preview"
          src={formik.values.image}
          id="image_preview"
          className="w-32 h-32"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <StyledInput
          type="text"
          id="image"
          name="image"
          value={formik.values.image}
          style={{ width: '50rem' }}
          disabled
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <StyledInput
          type="text"
          id="link"
          name="link"
          value={formik.values.link}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ width: '50rem' }}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <StyledInput
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          style={{ width: '50rem' }}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700"
        >
          Summary
        </label>
        <StyledInput
          type="text"
          id="summary"
          name="summary"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.summary}
          style={{ width: '50rem' }}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="published"
          className="block text-sm font-medium text-gray-700"
        >
          Published
        </label>
        <StyledInput
          type="text"
          id="published"
          name="published"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.published}
          style={{ width: '50rem' }}
        />
      </div>
      {formik.errors.published ? (
        <StyledErrorMessage>{formik.errors.published}</StyledErrorMessage>
      ) : null}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Edit
      </button>
      {formik.errors.api_error ? (
        <StyledErrorMessage>{formik.errors.api_error}</StyledErrorMessage>
      ) : null}
    </form>
  )
}
