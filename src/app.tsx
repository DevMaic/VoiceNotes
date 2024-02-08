import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

function loremIpsilum() {
  return (
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates officia ad id ut tempore est nisi. Mollitia totam excepturi, nobis maiores est quaerat similique iusto sunt esse ducimus aperiam Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, qui placeat libero, odit blanditiis ut nobis labore molestiae, nesciunt mollitia commodi impedit laborum! Omnis nulla ipsam eius, laboriosam blanditiis dolorem."
  )
}

export function App() {
  
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
        
        <NewNoteCard/>

        <NoteCard note={{
          content: loremIpsilum(), 
          date: new Date()
        }}/>

        <NoteCard note={{
            content: loremIpsilum(),
            date: new Date()
        }}/>

      </div>
    </div>
  )
}