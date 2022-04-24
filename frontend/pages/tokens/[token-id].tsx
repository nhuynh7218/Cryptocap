import Tokens from '../../components/tokens'
import { TokenInfo } from '../../interfaces/get';
import { APIService } from '../../services/APIService'
function Token() {
 
  return (
    <div>TokenList</div>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
export default Token
