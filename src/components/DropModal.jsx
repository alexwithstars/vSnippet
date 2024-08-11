import './DropModal.css'
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'

export function DropModal ({ onDrop, onDragLeave }) {
  return (
    <section
      className='drop-modal'
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className='drop-modal_content'>
        <DocumentArrowUpIcon className='drop-modal_icon' />
        <p className='drop-modal_text'>Drop your<br />code here</p>
      </div>
    </section>
  )
}
