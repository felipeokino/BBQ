import Header from '@/components/header';
import { Toaster } from 'react-hot-toast';

type LayoutProps = React.ComponentProps<'section'>

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='w-screen h-screen flex flex-col relative'>
      <Header />
      <section className='h-[calc(100vh-88px)]  w-full mt-24 bg-white p-0 box-content py-4'>
        <Toaster  />
        {children}
      </section>
    </div>
  )
}

export default Layout