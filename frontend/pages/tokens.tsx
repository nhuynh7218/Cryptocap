import type { NextPage } from 'next'
import NavBar from '../components/layout'
const TokenList: NextPage = () => {
  return (
    <div className="text-center">
      
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>
      <h1 className="text-yellow-500">This is token List page</h1>

     
    </div>
  )
}
function wait(ms: any) {
    return new Promise((_, reject) => {
       setTimeout(() => reject(new Error('timeout succeeded')), ms);
    });
 }
export async function getServerSideProps(context: any) {
    await new Promise(resolve => setTimeout(resolve, 5000));

    return {
      props: {}, // will be passed to the page component as props
    }
  }export default TokenList
