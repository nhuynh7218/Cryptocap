import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import UserInfo from '../../components/user'
import { APIService } from '../../services/APIService'
const UserPage = dynamic(() => import('../../components/user/index'), {ssr: false})

const User: NextPage = () => {
  return (

    <UserPage/>

  )
}
export async function getServerSideProps(ctx: {req : Request, res: Response}) {
  try {
    const articles = await APIService.GetInitialNews()
  
    console.log(articles)
    return {props: {articles: articles.news, randomArticles: articles.news}}


  } catch (error) {
    console.log(error) 
      return { redirect : { destination : '/404'}}
  }

  

  // Destroy
  // nookies.destroy(ctx, 'cookieName')
  
}
export default User
