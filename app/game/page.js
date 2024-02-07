'use client'
import returnTheme from '../returnTheme';
const OpenAI = require('openai');
import { useEffect, useState} from 'react';
import { useRouter } from "next/navigation";

const theme = returnTheme()
const themefinal = theme + ''
const valorAleatorio = Math.floor(Math.random() * 4);

export default function Game({ searchParams }){
    console.log('hey you')
    const [url0,setUrl0] = useState('/loading.gif');
    const [url1,setUrl1] = useState('/loading.gif');
    const [url2,setUrl2] = useState('/loading.gif');
    const [url3,setUrl3] = useState('/yourimg.png');
    const [classname, setClassname] = useState('border-2 border-cyan-700 rounded-xl');
    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const [showRecomendation, setShowRecomendation] = useState(false);
    const openaiKey = searchParams.key
    async function createImage(){

        const openai = new OpenAI({
            apiKey: searchParams.key,
            dangerouslyAllowBrowser: true,
        });
        console.log('inicio la creación de imagenes')
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: themefinal,
            n: 3,
            size: "1024x1024",
          });
          let image_url = response;
          return image_url
      }
    //random
    const urlsIniciales = [
        url0,
        url1,
        url2,
        url3,
      ];
    for (let i = urlsIniciales.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [urlsIniciales[i], urlsIniciales[j]] = [urlsIniciales[j], urlsIniciales[i]]; // Intercambio de elementos
      }
    //fin random


    useEffect(() => {
        async function fetchImageData() {
            const imageUrl = await createImage(); // Asume que createImage es una función asíncrona que retorna la URL de una imagen
            setUrl0(imageUrl.data[0].url);
            setUrl1(imageUrl.data[1].url);
            setUrl2(imageUrl.data[2].url);
        }
        fetchImageData();
    }, []); 
    

    const [valorInput, setValorInput] = useState('');

  // Manejador para actualizar el estado con el valor del input
  const manejarCambio = (e) => {
    setValorInput(e.target.value);
  };

  // Manejador para el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    setUrl3('/loading.gif');
    setMostrarFormulario(false);
    const openai = new OpenAI({
        apiKey:searchParams.key,
        dangerouslyAllowBrowser: true,
    });
    // Aquí puedes llamar a cualquier función o realizar acciones con el valor del input
    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: valorInput,
        n: 1,
        size: "1024x1024",
      });
      let image_url = await response;
      setUrl3(image_url.data[0].url);
      
  };
  const router = useRouter();
    return(
        <main>
        <button
                className='absolute mt-3 ml-4 bg-cyan-100 rounded-xl px-2 text-sm'
                onClick={() => {
                    router.push("/" );
                }}
            >{'<'}</button><div className='p-8'>
          <h1 className='text-center mt-8 mb-10 bg-cyan-100 p-4  rounded-xl font-black text-2xl text-cyan-950'>{theme}</h1>
          <ul className='columns-4 gap-8 mx-8 my-4'>
              <li className='bg-cyan-100 rounded-md text-center py-2'>1</li>
              <li className='bg-cyan-100 rounded-md text-center py-2'>2</li>
              <li className='bg-cyan-100 rounded-md text-center py-2'>3</li>
              <li className='bg-cyan-100 rounded-md text-center py-2'>4</li>
          </ul>
          <ul className='columns-4 gap-8 mx-8'>
          {valorAleatorio==0 ?  <li id='player' className={classname}>
                  <img className='w-100 rounded-xl'
                      src={url3}
                      alt="Descripción de la imagen"
                      width={1024}
                      height={1024}
                  />
                  </li>:null}
              <li className='border-2 border-cyan-700 rounded-xl'>
                  <img
                      className='rounded-xl'
                      src={url0}
                      alt="Descripción de la imagen"
                      width={1024}
                      height={1024}
                  />
                  </li>
                  {valorAleatorio==1 ?  <li id='player' className={classname}>
                  
                  <img className='w-100 rounded-xl'
                      src={url3}
                      alt="Descripción de la imagen"
                      width={1024}
                      height={1024}
                  />
                  </li>:null}
              <li className='border-2 border-cyan-700 rounded-xl'>
                  <img
                      className='rounded-xl'
                      src={url1}
                      alt="Descripción de la imagen"
                      width={1024}
                      height={1024}
                  />
              </li>
              {valorAleatorio==2 ?  <li id='player' className={classname}>
                  
                  <img className='w-100 rounded-xl'
                      src={url3}
                      alt="Descripción de la imagen"
                      width={1024}
                      height={1024}
                  />
                  </li>:null}
              <li className='border-2 border-cyan-700 rounded-xl'>
                  <img
                      className='rounded-xl'
                      src={url2}
                      alt="Descripción de la imagen"
                      width={1024}
                      height={1024}
                  /></li>
                  {valorAleatorio==3 ?  <li id='player' className={classname}>
                  
                  <img className='w-100 rounded-xl'
                      src={url3}
                      alt="Descripción de la imagen"
                      width={1024}
                      height={1024}
                  />
                  </li>:null}
             
          
          </ul>
          {showRecomendation ? <div className='my-8 mx-16 text-center rounded-xl bg-gray-100 p-4'>
              <div className='bg-gray-200 rounded-xl p-8 mb-4' >{valorInput}</div>
              <div className='text-xs'>Talk to the other players about how they would improve the notice</div>
          </div> : null}
          {mostrarFormulario ?
          <form className='bg-cyan-100 rounded-xl p-2 mt-8 mx-16 flex justify-between items-center' onSubmit={manejarEnvio}>
    <div className="flex-grow">
      <label>
        <input type="text" value={valorInput} onChange={manejarCambio} className="w-full p-2 rounded-md" />
      </label>
    </div>
    <button className='bg-cyan-700 rounded-xl p-2 text-white ml-4' type="submit">GENERATE</button>
  </form>
          : <div  className='flex columns-2 gap-8 mx-8 my-10 place-content-center justify-center'>
              <button
                  className='bg-cyan-500 text-white py-2 px-4 m-2 rounded-xl'
                  onClick={() => {
                      setClassname('border-8 border-cyan-700 rounded-xl');
                      setShowRecomendation(true);}}
              >SHOW</button>
              
              <button
                  className='border-cyan-500 border-2 text-cyan-700 rounded-xl border-cyan-500 m-2  px-4'
                  onClick={() => {
                      //router.push("/" );
                      window.location.reload();
                  }}
              >NEW</button>
              </div>}
              </div>
        </main>
    )
}