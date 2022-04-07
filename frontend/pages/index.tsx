import _ from 'lodash'
import type { NextPage } from 'next'
import NavBar from '../components/layout'
import News from '../components/news'
import { ArticleInfo } from '../interfaces/get'
import { APIService } from '../services/APIService'
function Home(props: {articles: ArticleInfo[], randomArticles: ArticleInfo[]})  {
  return (

    <News {...props}></News>

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
export default Home
