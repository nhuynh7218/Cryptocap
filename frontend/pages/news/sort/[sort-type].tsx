
import { SortedArticles } from '../../../components/news/sort'


function Index()  {
  
  return (

    <SortedArticles ></SortedArticles>

  )
}

export async function getServerSideProps(ctx: {req : Request, res: Response}) {
  try {
    // const articles = await APIService.GetLatestNews(1,11)
  
    return {props: {articles: null}}


  } catch (error) {
    
      return { redirect : { destination : '/404'}}
  }

  

  // Destroy
  // nookies.destroy(ctx, 'cookieName')
  
}
export default Index
