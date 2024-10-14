import './DeleteModal.css'
import { useRef, useEffect } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

export function DeleteModal ({ onClose, onDelete }) {
  const deleteModal = useRef(null)
  const alreadyIn = useRef(false)
  const alreadyOut = useRef(false)
  const show = () => {
    deleteModal.current.addEventListener('animationend', () => {
      if (alreadyIn.current) return
      alreadyIn.current = true
      deleteModal.current.classList.remove('delete-modal_fadeIn')
    })
  }
  const hide = (remove) => {
    deleteModal.current.classList.add('delete-modal_fadeOut')
    deleteModal.current.addEventListener('animationend', (e) => {
      if (alreadyOut.current) return
      alreadyOut.current = true
      if (remove) onDelete()
      else onClose()
    })
  }

  useEffect(() => show(), [])
  return (
    <div
      className='delete-modal-backdrop delete-modal_fadeIn'
      ref={deleteModal}
      onClick={() => hide(false)}
    >
      <div className='delete-modal' onClick={(e) => e.stopPropagation()}>
        <section className='delete-modal-content'>
          <TrashIcon className='delete-modal-icon' />
          <div className='delete-modal-info'>
            <h2 className='delete-modal-title'>Delete snippet</h2>
            <p className='delete-modal-text'>Are you sure you want to delete this snippet?</p>
          </div>
        </section>
        <section className='delete-modal-actions'>
          <button onClick={() => hide(false)} className='cancel-button'> Cancel </button>
          <button onClick={() => hide(true)} className='delete-button'> Delete </button>
        </section>
      </div>
    </div>
  )
}
