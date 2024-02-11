import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

type NoteType = {
  id: string,
  content: string,
  date: Date
}

export function App() {
  const [query, setQuery] = useState('')
  const [notes, setNotes] = useState<NoteType[]>( () => {
    const notes = localStorage.getItem('notes')
    if(notes) 
      return JSON.parse(notes)
    else
      return [] 
  })
  const filteredNotes = query != '' ?
    notes.filter(note => note.content.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  :
    notes
  
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

  function handleUserSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5 lg:px-0'>
      <img src={logo} alt='NLW Expert'/>
      <form className='w-full'>
        <input
          onChange={handleUserSearch}
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder: text-slate-500 outline-none' 
          type='text'
          placeholder='Busque em suas notas...'>  
        </input>
      </form>

      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-rows-[250px] gap-6'>
        
        <NewNoteCard onNoteCreated={onNoteCreated}/>

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
        })}

      </div>
    </div>
  )
}