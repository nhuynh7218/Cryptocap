import Tokens from '../../components/tokens'
import { TokenInfo } from '../../interfaces/get';
import { APIService } from '../../services/APIService'
function TokenList(props: {tokens: TokenInfo[], total: number}) {
  console.log(props)
  return (
    <Tokens {...props}/>
  )
}

export async function getServerSideProps(context: any) {
  const tokenInfo = await APIService.GetTokens(1, 10)
  return {
    props: tokenInfo, // will be passed to the page component as props
  }
}
export default TokenList
