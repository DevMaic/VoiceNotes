type NoteCardProps = {
    note: {
      date: Date
      content: string
    }
}

export function NoteCard({note}: NoteCardProps) {
    return (
        <button className='text-left rounded-md bg-slate-800 p-5 overflow-hidden relative hover:ring-slate-600
        hover:ring-2 focus-visible:ring-lime-400 outline-none'>
          <div className='text-slate-200 mb-3 text-sm font-medium'>
            {note.date.toISOString()}
          </div>
          <div className='text-slate-300 leading-6 text-sm'>
            {note.content}
          </div>
          <div className='absolute bottom-0 left-0 right-0  h-1/2 bg-gradient-to-t from-black/60 to-transparent'/>
        </button>
    )
}