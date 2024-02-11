import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';

type NewNoteCardProps = {
  onNoteCreated: (text: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard(props: NewNoteCardProps) {
    const [isItRecording, setIsItRecording] = useState(false)
    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
    const [userText, setUserText] = useState("");

    function handleStartRecording() {
      setIsItRecording(true)
      setShouldShowOnBoarding(false)

      const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
      
      if(!isSpeechRecognitionAPIAvailable) {
        alert('Não suportado por o seu navegador')
      }

      const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

      speechRecognition = new speechRecognitionAPI()
      speechRecognition.lang = 'pt-BR'
      speechRecognition.continuous = true
      speechRecognition.maxAlternatives = 1
      speechRecognition.interimResults = true

      speechRecognition.onresult = (event) => {
        const transcription = Array.from(event.results).reduce((text, result) => {
          return text.concat(result[0].transcript)
        }, '')

        setUserText(transcription)
      }

      speechRecognition.onerror = (event) => {
        console.log(event)
      }

      speechRecognition.start()
    }

    function handleStopRecording() {
      setIsItRecording(false)

      if(speechRecognition != null) {
        speechRecognition.stop()
      }
    }

    return (
      <Dialog.Root>
        <Dialog.Trigger className='rounded-md bg-slate-700 p-5 text-left flex flex-col gap-3 hover:ring-2 focus-visible:ring-lime-400 outline-none'>
          <div className='text-slate-200 mb-3 text-sm font-medium'>
            Adicionar nota
          </div>
          <div className='text-slate-400 leading-6 text-sm'>
            Grave uma nota em áudio que será convertida para texto automaticamente
          </div>
        </Dialog.Trigger>

        <Dialog.DialogPortal>
          <Dialog.DialogOverlay className='inset-0 bg-black/50 fixed'>

          </Dialog.DialogOverlay>
          
          <Dialog.Content className='inset-0 md:inset-auto flex flex-col fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md bg-slate-700 md:max-w-[60vh] w-full md:max-h-[60vh] md:h-full outline-none overflow-hidden'>
            
            <Dialog.DialogClose className='absolute right-0 top-0 p-1.5 text-slate-400 bg-slate-800 hover:text-slate-100 rounded-bl-md'>
              <X/>
            </Dialog.DialogClose>
        
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <div className='text-slate-200 mb-3 text-sm font-medium'>
                Adicionar nota
              </div>
              {
                shouldShowOnBoarding ?
                  <div className='text-slate-400 leading-6 text-sm'>
                    Comece <button className='font-medium text-lime-400 hover:underline' onClick={handleStartRecording}>gravando uma nota em áudio</button> ou se preferir <button className='font-medium text-lime-400 hover:underline' onClick={() => {setShouldShowOnBoarding(false)}}>utilize apenas texto</button>
                  </div>
                :
                  <textarea onChange={ (e) => {
                    setUserText(e.target.value)
                    if(e.target.value == '') {
                      setShouldShowOnBoarding(true)
                    }
                  }} className='text-small leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none focus' autoFocus value={userText}/>
              }
            </div>
            
            {isItRecording?
              <button onClick={handleStopRecording} 
                className='flex justify-center items-center gap-1 group w-full bg-slate-900 py-4 text-center text-sm text-slate-300 self-end font-semibold hover:text-slate-100' type='button'>
                  <div className='animate-pulse size-3 bg-red-600 rounded-full flex'/>
                  Parar de gravar
              </button>
            :
              <button onClick={() => {
                if(userText){
                  toast.success('Nota criada com sucesso!')
                  setUserText('')
                  props.onNoteCreated(userText)
                  setShouldShowOnBoarding(true)
                }}} 
                className='group w-full bg-lime-400 py-4 text-center text-sm text-lime-950 self-end font-semibold' type='button'>
                  Salvar nota
              </button>
              }
             
          </Dialog.Content>

        </Dialog.DialogPortal>
      </Dialog.Root>
    )
}