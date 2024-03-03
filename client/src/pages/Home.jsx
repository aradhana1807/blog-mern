import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className='font-display flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto min-h-screen items-center'>
      <h1 className='text-3xl font-bold lg:text-6xl '> Welcome to ds. blog </h1>
      <p className="text-center">

        Welcome to the absolute end of boredom.
        <br></br><br></br>
        Boredom turns into a space of imagination, desires, dreams
        <br></br>
        and many more into this good for nothing world.
        <br></br><br></br>
        <i>A faraway reality.</i>
        <br></br><br></br>
        Good for nothing isn't a negative space to be in.
        <br></br>
        But also, it's not really the reality we see today
        <br></br>
        but wish for it to be part of in our future
      </p>

      <Link
        to='/chapters'
        className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
      >
        View all chapters
      </Link>

    </div >
  )
}
