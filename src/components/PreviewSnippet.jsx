import './PreviewSnippet.css'
import {
  ArrowUpOnSquareStackIcon,
  ClipboardDocumentIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useSnippet } from '../hooks/useSnippet'
import { CodeEditor } from './CodeEditor'
import { messages } from '../constants/messages'
import { useSnippetStorage } from '../hooks/useSnippetStorage'
import { useToast } from '../hooks/useToast'
import { useSettings } from '../hooks/useSettings'
import { SETTINGS } from '../constants/settings'
import { useFields } from '../hooks/useFields'
import { DeleteModal } from './DeleteModal'

export function PreviewSnippet ({ fields }) {
  const { settings } = useSettings()
  const snippet = useSnippet({ ...fields, tabSize: settings[SETTINGS.TABS] ? 4 : 2 })
  const { removeSnippet } = useSnippetStorage()
  const { setFields } = useFields()
  const { addToast } = useToast()
  const [confirmDelete, setConfirmDelete] = useState(false)
  return (
    <div className='snippet-preview'>
      <header className='snippet-preview_header'>
        <span className='snippet-preview_name'>{fields.name || 'Untitled'}</span>
        <div className='snippet-preview_actions'>
          <ClipboardDocumentIcon
            className='snippet-preview_action'
            onClick={() => {
              navigator.clipboard.writeText(snippet)
                .then(() => addToast(messages.copiedToClipboard))
                .catch(() => addToast(messages.canNotCopyToClipboard))
            }}
            title='Copy to clipboard'
          />
          <ArrowUpOnSquareStackIcon
            className='snippet-preview_action'
            onClick={() => {
              setFields(fields)
              addToast(messages.snippetSetAsActive)
            }}
            title='Set as active snippet'
          />
          <TrashIcon
            className='snippet-preview_action dangerous-action'
            onClick={() => setConfirmDelete(true)}
            title='Delete snippet'
          />
        </div>
      </header>
      <CodeEditor
        className='snippet-preview_editor'
        data={snippet}
      />
      {confirmDelete && (
        <DeleteModal
          onClose={() => setConfirmDelete(false)}
          onDelete={() => {
            removeSnippet(fields.id)
            addToast(messages.snippetDeleted)
            setConfirmDelete(false)
          }}
        />
      )}
    </div>
  )
}
