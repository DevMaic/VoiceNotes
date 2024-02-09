import { useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

type NoteType = {
  id: string,
  content: string,
  date: Date
}

export function App() {
  const [notes, setNotes] = useState<NoteType[]>( () => {
    const notes = localStorage.getItem('notes')
    if(notes) 
      return JSON.parse(notes)
    else
      return [] 
  })
  
  function onNoteCreated(text: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: text
    }
    
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt='NLW Expert'/>
      <form className='w-full'>
        <input
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder: text-slate-500 outline-none' 
          type='text'
          placeholder='Busque em suas notas...'>  
        </input>
      </form>

      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        
        <NewNoteCard onNoteCreated={onNoteCreated}/>

        {notes.map(note => {
          return <NoteCard key={note.id} note={note}/>
        })}

      </div>
    </div>
  )
}