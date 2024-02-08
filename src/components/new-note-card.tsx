export function NewNoteCard() {
    return (
        <div className='rounded-md bg-slate-700 p-5'>
          <div className='text-slate-200 mb-3 text-sm font-medium'>
            Adicionar nota
          </div>
          <div className='text-slate-400 leading-6 text-sm'>
            Grave uma nota em áudio que será convertida para texto automaticamente
          </div>
        </div>
    )
}