'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    
    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, []);

    /*useEffect(() => {
        console.log("Providers: ", providers);
    }, [providers]);

    useEffect(() => {
        console.log("Session: ", session)
    }, [session]);*/

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className = 'flex-center gap-2'>
                <Image src='/assets/images/logo.svg' alt='Promptopia logo' width={30} height={30} className = 'object-contain' />
            </Link>
            <p className='logo_text'>Promptopia</p>

            {/*Desktop navigation*/}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className = 'flex gap-3 md:gap-5'>
                        <Link href='/create-prompt' className = 'black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className = 'outline_btn'>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image src={session?.user.image} alt='profile' width={37} height={37} className = 'rounded-full' />
                        </Link>
                    </div>
                    ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button 
                                type='button'
                                key={provider.name}
                                onClick={() => {signIn(provider.id)}}
                                className = 'black_btn'>
                                Sign In
                            </button>
                        ))}
                    </>
                    )
                }
            </div>
            {/*Mobile navigation*/}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className = 'flex'>
                        <Image
                            src={session?.user.image}
                            alt='Profile'
                            width={37}
                            height={37}
                            className = 'rounded-full'
                            onClick={() => {setToggleDropDown((prev) => !prev)}}
                        />
                        {toggleDropDown && (
                            <div className = 'dropdown'>
                                <Link
                                    href = '/profile'
                                    className = 'dropdown_link'
                                    onClick = {() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href = '/create-prompt'
                                    className = 'dropdown_link'
                                    onClick = {() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type = 'button'
                                    onClick = {() => {
                                        setToggleDropDown(false); signOut()
                                    }}
                                    className = 'mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                    ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button 
                                type='button'
                                key={provider.name}
                                onClick={() => {signIn(provider.id)}}
                                className = 'black_btn'>
                                Sign In
                            </button>
                        ))}
                    </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar