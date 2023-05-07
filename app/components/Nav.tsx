'use client ';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export const Nav = () => {
    const { data: session } = useSession();
    const isUserLoggedIn = true;
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const singOut = () => {};
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        };
        setUpProviders();
    }, []);

    return (
        <nav className="flex-between w-full  mb-16 pt-3">
            <Link
                href="/"
                className="flex gap- flex-center"
            >
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-cover"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link
                            href="/create-prompt"
                            className="black_btn"
                        >
                            Create Post{' '}
                        </Link>
                        <button
                            type="button"
                            // onClick={() => singOut}
                            className="outline_btn"
                        >
                            Sing Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src={session?.user?.image}
                                alt="profile-image"
                                height={37}
                                width={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map(provider => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    {provider.name}
                                </button>
                            ))}
                    </>
                )}
            </div>
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user?.image}
                            alt="profile"
                            height={37}
                            width={37}
                            className="rounded-full"
                            onClick={() => setToggleDropDown((prev: boolean) => !prev)}
                        />
                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <button
                                    type="button"
                                    className="black_btn mt-5 w-full"
                                    onClick={() => {
                                        setToggleDropDown(false);
                                        signOut();
                                    }}
                                >
                                    Sing Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map(provider => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    {provider.name}
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};
