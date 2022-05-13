// import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth'
// import Image from 'next/image'
// import { authentication } from '../auth/firebase'

// const Header = () => {
//   const handleSubmit = async () => {
//     const provider = new TwitterAuthProvider()
//     await signInWithPopup(authentication, provider)
//       .then((result) => console.log(result))
//       .catch((error) => console.error(error))
//   }

//   return (
//     <div className='container mx-auto p-4'>
//       <div className='flex justify-between items-center'>
//         <div className='text-xl font-bold text-gray-800'>Thread Builder</div>
//         <button onClick={handleSubmit}>
//           <Image
//             src='https://i.pravatar.cc/150?img=14'
//             alt='avatar'
//             width={35}
//             height={35}
//             className='rounded-3xl'
//           />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Header
