import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

type NoteCardProps = {
    note: {
      date: Date
      content: string
    }
}

export function NoteCard({note}: NoteCardProps) {
    return (
      <Dialog.Root>
        <Dialog.Trigger className='flex flex-col text-left rounded-md bg-slate-800 p-5 overflow-hidden relative hover:ring-slate-600
        hover:ring-2 focus-visible:ring-lime-400 outline-none'>
          <div className='text-slate-200 mb-3 text-sm font-medium'>
            {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
          </div>
          <div className='text-slate-300 leading-6 text-sm'>
            {note.content}
          </div>
          <div className='absolute bottom-0 left-0 right-0  h-1/2 bg-gradient-to-t from-black/60 to-transparent'/>
        </Dialog.Trigger>
        
        <Dialog.DialogPortal>
          <Dialog.DialogOverlay className='inset-0 bg-black/50 fixed'>

          </Dialog.DialogOverlay>
          
          <Dialog.Content className='flex flex-col fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-700 max-w-[60vh] w-full max-h-[60vh] h-full outline-none overflow-hidden'>
            
            <Dialog.DialogClose className='absolute right-0 top-0 p-1.5 text-slate-400 bg-slate-800 hover:text-slate-100 rounded-bl-md outline-none'>
              <X/>
            </Dialog.DialogClose>

            <div className='flex flex-1 flex-col gap-3 p-5'>
              <div className='text-slate-200 mb-3 text-sm font-medium'>
                {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
              </div>
              <div className='text-slate-400 leading-6 text-sm'>
                {note.content}
              </div>
            </div>

            <button  className='group w-full bg-slate-800 py-4 text-center text-sm text-slate-300 self-end' type='button'>
              Deseja <span className='text-red-400 group-hover:underline'>apagar a nota?</span>
            </button> 
            
          </Dialog.Content>

        </Dialog.DialogPortal>

      </Dialog.Root>
    )
}