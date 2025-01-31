'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Profile from '@components/Profile';

const UserProfile = () => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`api/users/${params?.id}/posts`);
            const data = await response.json();
        
            setUserPosts(data);
        }
        
        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Suspense>
            <Profile
                name = {userName}
                description = {`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
                data = {userPosts}
            />
        </Suspense>
    )
}

export default UserProfile