import type { NextPage } from 'next'
import NavBar from '../components/layout'
import News from '../components/news'
const Home: NextPage = () => {
  return (

    <News></News>

  )
}

export async function getServerSideProps(ctx: {req : Request, res: Response}) {
  try {

    return {props: {}}
  

  } catch (error) {
    
      return { redirect : { destination : '/404'}}
  }

  

  // Destroy
  // nookies.destroy(ctx, 'cookieName')
  
}
export default Home
