'use client'

export default function ConfirmDelete({
  action,
  label,
}: {
  action: () => Promise<void>
  label: string
}) {
  return (
    <form
      action={async () => {
        if (!window.confirm(`Delete this ${label}? This cannot be undone.`)) return
        await action()
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  )
}
