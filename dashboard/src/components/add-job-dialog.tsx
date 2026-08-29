'use client'

import { useState } from 'react'
import { Add01Icon, Briefcase01Icon } from '@hugeicons/core-free-icons'
import { createJob } from '@/app/cms-actions'
import Dialog from '@/components/dialog'
import { Icon } from '@/components/icon'
import JobForm from '@/components/job-form'
import SubmitButton from '@/components/submit-button'

export default function AddJobDialog() {
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)

  function close() {
    setOpen(false)
    setFormKey((n) => n + 1)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-500 px-5 text-sm font-bold uppercase tracking-wide text-navy-950 hover:bg-accent-400"
      >
        <Icon icon={Add01Icon} size={16} />
        Add job
      </button>
      <Dialog
        open={open}
        onClose={close}
        icon={Briefcase01Icon}
        title="New job"
        description="Open roles appear on the public careers page."
      >
        <JobForm
          key={formKey}
          embedded
          action={async (formData) => {
            await createJob(formData)
            close()
          }}
          footer={
            <>
              <button
                type="button"
                onClick={close}
                className="min-h-11 rounded-md px-5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <SubmitButton>Add job</SubmitButton>
            </>
          }
        />
      </Dialog>
    </>
  )
}
