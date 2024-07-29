import './PreviewSnippet.css'
import {
  ArrowUpOnSquareStackIcon,
  ClipboardDocumentIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useSnippet } from '../hooks/useSnippet'
import { CodeEditor } from './CodeEditor'

export function PreviewSnippet ({
  fields,
  onSelect = () => {},
  onDelete = () => {},
  onCopy = () => {},
  tabSize = 2
}) {
  const snippet = useSnippet({ ...fields, tabSize })
  return (
    <div className='snippet-preview'>
      <header className='snippet-preview_header'>
        <span className='snippet-preview_name'>{fields.name || 'Untitled'}</span>
        <div className='snippet-preview_actions'>
          <ClipboardDocumentIcon
            className='snippet-preview_action'
            onClick={() => onCopy(snippet)}
            title='Copy to clipboard'
          />
          <ArrowUpOnSquareStackIcon
            className='snippet-preview_action'
            onClick={() => onSelect(fields)}
            title='Set as active snippet'
          />
          <TrashIcon
            className='snippet-preview_action dangerous-action'
            onClick={() => onDelete(fields)}
            title='Delete snippet'
          />
        </div>
      </header>
      <CodeEditor
        className='snippet-preview_editor'
        data={snippet}
      />
    </div>
  )
}
